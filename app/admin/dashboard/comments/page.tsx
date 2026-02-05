import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Check, Trash2, X } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Comment } from "@/types";

export const revalidate = 0;

async function approveComment(id: string) {
    "use server";
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { getAll: () => cookieStore.getAll(), setAll: () => { } } }
    );
    await supabase.from("comments").update({ is_approved: true }).eq("id", id);
    revalidatePath("/admin/dashboard/comments");
}

async function deleteComment(id: string) {
    "use server";
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { getAll: () => cookieStore.getAll(), setAll: () => { } } }
    );
    await supabase.from("comments").delete().eq("id", id);
    revalidatePath("/admin/dashboard/comments");
}

export default async function AdminCommentsPage() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    );

    const { data: comments } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false })
        .returns<Comment[]>();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Yorum Yönetimi</h1>

            <div className="grid gap-4">
                {comments?.map((comment) => (
                    <div key={comment.id} className="flex items-start justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold">{comment.user_name}</h3>
                                {comment.is_approved ? (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Yayında</span>
                                ) : (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Bekliyor</span>
                                )}
                                <span className="text-xs text-zinc-400">{new Date(comment.created_at).toLocaleString('tr-TR')}</span>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">{comment.message}</p>
                        </div>

                        <div className="flex gap-2">
                            {!comment.is_approved && (
                                <form action={approveComment.bind(null, comment.id)}>
                                    <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                        <Check className="h-4 w-4 mr-1" /> Onayla
                                    </Button>
                                </form>
                            )}
                            <form action={deleteComment.bind(null, comment.id)}>
                                <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                ))}
                {(!comments || comments.length === 0) && (
                    <div className="p-12 text-center text-zinc-500 bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
                        Henüz hiç yorum yapılmamış.
                    </div>
                )}
            </div>
        </div>
    );
}
