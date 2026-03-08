import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SettingsForm } from "@/components/admin/settings-form";
import { SiteSettings } from "@/types";

export const revalidate = 0;

export default async function AdminSettingsPage() {
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

    const { data: settings } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .single<SiteSettings>();

    if (!settings) {
        return <div className="text-zinc-500">Ayarlar yüklenemedi.</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Site Ayarları</h1>
            <SettingsForm settings={settings} />
        </div>
    );
}
