"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, Trash2, Star } from "lucide-react";
import Image from "next/image";
import { GalleryPhoto } from "@/types";

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface GalleryManagerProps {
    photos: GalleryPhoto[];
}

export function GalleryManager({ photos: initialPhotos }: GalleryManagerProps) {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [settingHero, setSettingHero] = useState<string | null>(null);
    const [caption, setCaption] = useState("");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);

        try {
            for (const file of files) {
                const fileExt = file.name.split(".").pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from("gallery-images")
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from("gallery-images")
                    .getPublicUrl(fileName);

                const { error: insertError } = await supabase
                    .from("gallery_photos")
                    .insert({ image_url: publicUrl, caption: caption || null });

                if (insertError) throw insertError;
            }

            setCaption("");
            router.refresh();
        } catch (error: any) {
            alert("Yükleme hatası: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSetHero = async (photo: GalleryPhoto) => {
        setSettingHero(photo.id);
        try {
            // Remove hero from all photos first
            const { error: resetError } = await supabase
                .from("gallery_photos")
                .update({ is_hero: false })
                .eq("is_hero", true);

            if (resetError) throw resetError;

            // Set this photo as hero
            const { error } = await supabase
                .from("gallery_photos")
                .update({ is_hero: true })
                .eq("id", photo.id);

            if (error) throw error;

            router.refresh();
        } catch (error: any) {
            alert("Hata: " + error.message);
        } finally {
            setSettingHero(null);
        }
    };

    const handleDelete = async (photo: GalleryPhoto) => {
        if (!confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) return;

        setDeleting(photo.id);
        try {
            // Extract file name from URL
            const urlParts = photo.image_url.split("/");
            const fileName = urlParts[urlParts.length - 1];

            // Delete from storage
            await supabase.storage.from("gallery-images").remove([fileName]);

            // Delete from database
            const { error } = await supabase
                .from("gallery_photos")
                .delete()
                .eq("id", photo.id);

            if (error) throw error;

            router.refresh();
        } catch (error: any) {
            alert("Silme hatası: " + error.message);
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Yeni Fotoğraf Ekle</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="caption">Açıklama (Opsiyonel)</Label>
                        <Input
                            id="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Fotoğraf açıklaması..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Fotoğraf</Label>
                        <label className="flex items-center justify-center gap-2 h-10 px-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-md cursor-pointer hover:border-zinc-400 transition-colors">
                            {uploading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    <Upload className="h-4 w-4 text-zinc-500" />
                                    <span className="text-sm text-zinc-500">Fotoğraf Seç</span>
                                </>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={handleUpload}
                                disabled={uploading}
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {initialPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        className={`relative group aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden border-2 ${photo.is_hero ? "border-yellow-400 shadow-lg shadow-yellow-400/20" : "border-zinc-200 dark:border-zinc-700"}`}
                    >
                        <Image
                            src={photo.image_url}
                            alt={photo.caption || "Galeri fotoğrafı"}
                            fill
                            className="object-cover"
                        />
                        {/* Hero Badge */}
                        {photo.is_hero && (
                            <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-white text-[10px] font-bold text-center py-1">
                                KAPAK FOTOĞRAFI
                            </div>
                        )}
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-yellow-500 hover:bg-yellow-600 text-white rounded-full h-10 w-10"
                                onClick={() => handleSetHero(photo)}
                                disabled={settingHero === photo.id || photo.is_hero}
                                title="Kapak Fotoğrafı Yap"
                            >
                                {settingHero === photo.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Star className={`h-4 w-4 ${photo.is_hero ? "fill-white" : ""}`} />
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white rounded-full h-10 w-10"
                                onClick={() => handleDelete(photo)}
                                disabled={deleting === photo.id}
                                title="Sil"
                            >
                                {deleting === photo.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {/* Caption */}
                        {photo.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                <p className="text-white text-xs">{photo.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
                {initialPhotos.length === 0 && (
                    <div className="col-span-full text-center py-12 text-zinc-500">
                        Henüz galeri fotoğrafı eklenmemiş.
                    </div>
                )}
            </div>

        </div>
    );
}
