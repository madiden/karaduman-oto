import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { GalleryPhoto } from "@/types";

export const revalidate = 0;

export default async function AdminGalleryPage() {
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
                        );
                    } catch {
                    }
                },
            },
        }
    );

    const { data: photos } = await supabase
        .from("gallery_photos")
        .select("*")
        .order("created_at", { ascending: false })
        .returns<GalleryPhoto[]>();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Galeri Yönetimi</h1>
            <GalleryManager photos={photos || []} />
        </div>
    );
}
