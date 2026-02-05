import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Car, MessageSquare, Eye } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminDashboardPage() {
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

    const { count: carCount } = await supabase.from("cars").select("*", { count: "exact", head: true });
    const { count: commentCount } = await supabase.from("comments").select("*", { count: "exact", head: true });
    const { count: pendingComments } = await supabase.from("comments").select("*", { count: "exact", head: true }).eq('is_approved', false);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Genel Bakış</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <Car className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">Toplam İlan</p>
                            <h3 className="text-2xl font-bold">{carCount || 0}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">Toplam Yorum</p>
                            <h3 className="text-2xl font-bold">{commentCount || 0}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                            <Eye className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">Bekleyen Yorum</p>
                            <h3 className="text-2xl font-bold">{pendingComments || 0}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Hızlı İşlemler</h2>
                <div className="flex gap-4">
                    <Link href="/admin/dashboard/cars/new" className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-zinc-800">
                        + Yeni İlan Ekle
                    </Link>
                    <Link href="/admin/dashboard/comments" className="px-4 py-2 bg-white border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50">
                        Yorumları Yönet ({pendingComments})
                    </Link>
                </div>
            </div>
        </div>
    );
}
