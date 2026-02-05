"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // We need to create this
import { Label } from "@/components/ui/label"; // We need to create this
import { Textarea } from "@/components/ui/textarea"; // We need to create this
import { Loader2, X, Upload, Star } from "lucide-react";
import Image from "next/image";
import { Car } from "@/types";

// Client-side supabase
const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CarFormProps {
    initialData?: Car;
}

export function CarForm({ initialData }: CarFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>(initialData?.images || []);
    const [uploading, setUploading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            brand: formData.get("brand") as string,
            model: formData.get("model") as string,
            year: Number(formData.get("year")),
            price: Number(formData.get("price")),
            km: Number(formData.get("km")),
            fuel_type: formData.get("fuel_type") as string,
            gear_type: formData.get("gear_type") as string,
            engine_power: formData.get("engine_power") as string,
            description: formData.get("description") as string,
            is_showcase: formData.get("is_showcase") === "on",
            images: images,
        };

        try {
            if (initialData) {
                // Update
                const { error } = await supabase
                    .from("cars")
                    .update(data)
                    .eq("id", initialData.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase.from("cars").insert(data);
                if (error) throw error;
            }

            router.refresh();
            router.push("/admin/dashboard/cars");
        } catch (error: any) {
            alert("Hata oluştu: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const newImages: string[] = [];

        try {
            for (const file of files) {
                const fileExt = file.name.split(".").pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("car-images")
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from("car-images")
                    .getPublicUrl(filePath);

                newImages.push(publicUrl);
            }

            setImages([...images, ...newImages]);
        } catch (error: any) {
            alert("Resim yüklenirken hata: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="brand">Marka</Label>
                    <Input id="brand" name="brand" placeholder="BMW, Audi..." defaultValue={initialData?.brand} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" name="model" placeholder="3.20i, A4..." defaultValue={initialData?.model} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="year">Yıl</Label>
                    <Input id="year" name="year" type="number" defaultValue={initialData?.year} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Fiyat (TL)</Label>
                    <Input id="price" name="price" type="number" defaultValue={initialData?.price} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="km">Kilometre</Label>
                    <Input id="km" name="km" type="number" defaultValue={initialData?.km} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fuel_type">Yakıt Tipi</Label>
                    <select id="fuel_type" name="fuel_type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={initialData?.fuel_type || "Benzin"}>
                        <option value="Benzin">Benzin</option>
                        <option value="Dizel">Dizel</option>
                        <option value="Hibrit">Hibrit</option>
                        <option value="Elektrik">Elektrik</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gear_type">Vites Tipi</Label>
                    <select id="gear_type" name="gear_type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={initialData?.gear_type || "Otomatik"}>
                        <option value="Otomatik">Otomatik</option>
                        <option value="Manuel">Manuel</option>
                        <option value="Yarı Otomatik">Yarı Otomatik</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="engine_power">Motor Gücü</Label>
                    <Input id="engine_power" name="engine_power" placeholder="170 HP" defaultValue={initialData?.engine_power} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea id="description" name="description" className="h-32" placeholder="Araç hakkında detaylı bilgi..." defaultValue={initialData?.description} />
            </div>

            <div className="space-y-4">
                <Label>Resimler</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] bg-zinc-100 rounded-md overflow-hidden group border-2 transition-all hover:border-blue-500 hover:shadow-md">
                            <Image src={img} alt="Car" fill className="object-cover" />

                            {/* Actions Overlay */}
                            <div className="absolute inset-x-0 top-0 flex justify-between p-1 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newImages = [...images];
                                        const [selected] = newImages.splice(idx, 1);
                                        newImages.unshift(selected);
                                        setImages(newImages);
                                    }}
                                    className="bg-zinc-800/80 text-white rounded-full p-1.5 hover:bg-yellow-500 hover:text-white transition-colors"
                                    title="Vitrin Resmi Yap"
                                >
                                    <Star className={`h-3.5 w-3.5 ${idx === 0 ? "fill-yellow-400 text-yellow-400" : ""}`} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="bg-red-600/80 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors"
                                    title="Resmi Sil"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {/* Cover Badge */}
                            {idx === 0 && (
                                <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-[10px] font-bold text-center py-1">
                                    VİTRİN GÖRSELİ
                                </div>
                            )}
                        </div>
                    ))}
                    <label className="border-2 border-dashed border-zinc-200 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-zinc-400 transition-colors h-32 md:h-auto aspect-[4/3]">
                        {uploading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
                        ) : (
                            <>
                                <Upload className="h-6 w-6 text-zinc-400 mb-2" />
                                <span className="text-xs text-zinc-500">Resim Ekle</span>
                            </>
                        )}
                        <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <input type="checkbox" id="is_showcase" name="is_showcase" className="h-4 w-4 rounded border-gray-300" defaultChecked={initialData?.is_showcase} />
                <Label htmlFor="is_showcase">Bu ilanı vitrinde göster</Label>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "İlanı Güncelle" : "İlanı Yayınla"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} className="w-full md:w-auto">
                    İptal
                </Button>
            </div>
        </form>
    );
}
