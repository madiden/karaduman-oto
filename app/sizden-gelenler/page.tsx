import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, User, CheckCircle2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function getApprovedComments() {
    const { data } = await supabase
        .from("comments")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
    return data || [];
}

async function addComment(formData: FormData) {
    "use server";

    const rawFormData = {
        user_name: formData.get("user_name") as string,
        message: formData.get("message") as string,
    };

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.from("comments").insert(rawFormData);
    revalidatePath("/sizden-gelenler");
}

import { createClient } from "@supabase/supabase-js"; // Direct import for server action inside checking

export default async function TestimonialsPage() {
    const comments = await getApprovedComments();

    return (
        <div className="container py-12 px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Sizden Gelenler</h1>
                <p className="text-zinc-500">
                    Müşterilerimizin değerli yorumları bizim için önemlidir. Siz de deneyimlerinizi paylaşın.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Comment Form */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm h-fit sticky top-24">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-red-600" /> Bir Yorum Bırakın
                    </h2>
                    <form action={addComment} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="user_name">Adınız Soyadınız</Label>
                            <Input id="user_name" name="user_name" placeholder="Örn: Ahmet Yılmaz" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Mesajınız</Label>
                            <Textarea id="message" name="message" placeholder="Deneyimlerinizi paylaşın..." className="h-32" required />
                        </div>
                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Gönder</Button>
                        <p className="text-xs text-zinc-400 text-center">
                            Yorumunuz yönetici onayından sonra yayınlanacaktır.
                        </p>
                    </form>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="h-10 w-10 bg-zinc-200 rounded-full flex items-center justify-center flex-shrink-0 text-zinc-500">
                                    <User className="h-6 w-6" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-foreground">{comment.user_name}</h3>
                                        <span className="text-xs text-zinc-400">• {new Date(comment.created_at).toLocaleDateString('tr-TR')}</span>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                                        {comment.message}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-zinc-500">
                            Henüz onaylanmış yorum bulunmuyor. İlk yorumu siz yapın!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
