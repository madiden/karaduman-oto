"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Upload, X } from "lucide-react";
import Image from "next/image";
import { SiteSettings } from "@/types";

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SettingsFormProps {
    settings: SiteSettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [insuranceImage, setInsuranceImage] = useState(settings.insurance_image);
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleInsuranceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploadingImage(true);
        try {
            const file = e.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `insurance-${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("gallery-images")
                .upload(fileName, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from("gallery-images")
                .getPublicUrl(fileName);

            setInsuranceImage(publicUrl);
        } catch (error: any) {
            alert("Görsel yükleme hatası: " + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setSaved(false);

        const formData = new FormData(event.currentTarget);
        const data = {
            phone: formData.get("phone") as string,
            whatsapp: formData.get("whatsapp") as string,
            email: formData.get("email") as string,
            address: formData.get("address") as string,
            map_embed_url: formData.get("map_embed_url") as string,
            working_hours: formData.get("working_hours") as string,
            instagram: formData.get("instagram") as string,
            facebook: formData.get("facebook") as string,
            twitter: formData.get("twitter") as string,
            sahibinden_url: formData.get("sahibinden_url") as string,
            insurance_whatsapp: formData.get("insurance_whatsapp") as string,
            insurance_image: insuranceImage,
            updated_at: new Date().toISOString(),
        };

        try {
            const { error } = await supabase
                .from("site_settings")
                .update(data)
                .eq("id", settings.id);

            if (error) throw error;

            setSaved(true);
            router.refresh();
            setTimeout(() => setSaved(false), 3000);
        } catch (error: any) {
            alert("Hata: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8 max-w-3xl">
            {/* İletişim Bilgileri */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold border-b border-zinc-200 dark:border-zinc-800 pb-3">İletişim Bilgileri</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" name="phone" defaultValue={settings.phone} placeholder="+90 555 123 45 67" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Linki</Label>
                        <Input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp} placeholder="https://wa.me/905551234567" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input id="email" name="email" type="email" defaultValue={settings.email} placeholder="info@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="working_hours">Çalışma Saatleri</Label>
                        <Input id="working_hours" name="working_hours" defaultValue={settings.working_hours} placeholder="Haftanın her günü 09:00 - 19:00" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Textarea id="address" name="address" defaultValue={settings.address} placeholder="Tam adres..." className="h-20" />
                </div>
            </div>

            {/* Harita */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold border-b border-zinc-200 dark:border-zinc-800 pb-3">Harita</h2>
                <div className="space-y-2">
                    <Label htmlFor="map_embed_url">Google Maps Embed URL</Label>
                    <Input id="map_embed_url" name="map_embed_url" defaultValue={settings.map_embed_url} placeholder="https://www.google.com/maps/embed?pb=..." />
                    <p className="text-xs text-zinc-500">
                        Google Maps'te konumunuzu bulun &rarr; Paylaş &rarr; Haritayı yerleştir &rarr; iframe src URL'sini buraya yapıştırın.
                    </p>
                </div>
                {settings.map_embed_url && (
                    <div className="rounded-lg overflow-hidden border border-zinc-200 h-48">
                        <iframe
                            src={settings.map_embed_url}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                )}
            </div>

            {/* Sosyal Medya */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold border-b border-zinc-200 dark:border-zinc-800 pb-3">Sosyal Medya</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input id="instagram" name="instagram" defaultValue={settings.instagram} placeholder="https://instagram.com/..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input id="facebook" name="facebook" defaultValue={settings.facebook} placeholder="https://facebook.com/..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter / X</Label>
                        <Input id="twitter" name="twitter" defaultValue={settings.twitter} placeholder="https://twitter.com/..." />
                    </div>
                </div>
            </div>

            {/* Sahibinden */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold border-b border-zinc-200 dark:border-zinc-800 pb-3">Sahibinden.com</h2>
                <div className="space-y-2">
                    <Label htmlFor="sahibinden_url">Sahibinden Mağaza Linki</Label>
                    <Input
                        id="sahibinden_url"
                        name="sahibinden_url"
                        defaultValue={settings.sahibinden_url}
                        placeholder="https://karadumanoto.sahibinden.com/"
                    />
                    <p className="text-xs text-zinc-500">
                        Sahibinden.com mağaza sayfanızın linki. Ana sayfa vitrin ve ilanlar sayfasında ilk kart olarak gösterilir.
                    </p>
                </div>
            </div>

            {/* Karaduman Sigorta */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold border-b border-zinc-200 dark:border-zinc-800 pb-3">Karaduman Sigorta</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="insurance_whatsapp">Sigorta WhatsApp Linki</Label>
                        <Input
                            id="insurance_whatsapp"
                            name="insurance_whatsapp"
                            defaultValue={settings.insurance_whatsapp}
                            placeholder="https://wa.me/905551234567?text=Sigorta teklifi almak istiyorum"
                        />
                        <p className="text-xs text-zinc-500">
                            Sigorta teklif butonu için ayrı WhatsApp numarası. Boş bırakılırsa genel WhatsApp kullanılır.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label>Sigorta Görseli</Label>
                        {insuranceImage ? (
                            <div className="relative aspect-video bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                                <Image src={insuranceImage} alt="Sigorta görseli" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setInsuranceImage("")}
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex items-center justify-center gap-2 h-24 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-400 transition-colors">
                                {uploadingImage ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                                ) : (
                                    <>
                                        <Upload className="h-5 w-5 text-zinc-400" />
                                        <span className="text-sm text-zinc-500">Görsel Yükle</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleInsuranceImageUpload}
                                    disabled={uploadingImage}
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Ayarları Kaydet
                </Button>
                {saved && (
                    <span className="text-green-600 text-sm font-medium">Kaydedildi!</span>
                )}
            </div>
        </form>
    );
}
