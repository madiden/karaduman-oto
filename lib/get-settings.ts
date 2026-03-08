import { supabase } from "@/lib/supabase";
import { SiteSettings } from "@/types";

const defaultSettings: SiteSettings = {
    id: "",
    phone: "+90 555 123 45 67",
    whatsapp: "https://wa.me/905551234567",
    email: "info@karadumanoto.com",
    address: "Otokent Galericiler Sitesi, B Blok No: 12, İzmir",
    map_embed_url: "",
    working_hours: "Haftanın her günü 09:00 - 19:00",
    instagram: "https://instagram.com/karadumanoto",
    facebook: "https://facebook.com/karadumanoto",
    twitter: "",
    insurance_whatsapp: "",
    insurance_image: "",
    sahibinden_url: "",
    updated_at: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
    const { data } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .single();

    return (data as SiteSettings) || defaultSettings;
}
