import { supabase } from "@/lib/supabase";
import { Car } from "@/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Fuel, Gauge, Settings2, Share2, ArrowLeft, Phone, ShieldCheck, MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/get-settings";

export const revalidate = 60;

type Params = Promise<{ id: string }>

async function getCar(id: string) {
    const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        return null;
    }
    return data as Car;
}

export default async function CarDetailPage(props: { params: Params }) {
    const params = await props.params;
    const car = await getCar(params.id);
    const settings = await getSiteSettings();

    if (!car) {
        notFound();
    }

    const images = car.images?.length > 0
        ? car.images
        : ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800&h=600"];

    return (
        <div className="container py-8 md:py-12 px-4 md:px-6">
            <Link href="/ilanlar" className="inline-flex items-center text-sm text-zinc-500 hover:text-red-600 mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" />
                İlanlara Dön
            </Link>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Left Column: Gallery */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative aspect-[16/9] bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
                        <Image
                            src={images[0]}
                            alt={`${car.brand} ${car.model}`}
                            fill
                            className="object-cover"
                            priority
                        />
                        {car.is_showcase && (
                            <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                                Fırsat Aracı
                            </span>
                        )}
                    </div>
                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative aspect-[4/3] bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 cursor-pointer hover:opacity-80 transition-opacity">
                                    <Image src={img} alt={`Görsel ${idx + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Araç Açıklaması</h2>
                        <div className="prose prose-zinc max-w-none text-zinc-600 whitespace-pre-wrap">
                            {car.description || "Açıklama girilmemiş."}
                        </div>
                    </div>
                </div>

                {/* Right Column: Details & Contact */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm sticky top-24">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-foreground">{car.brand} {car.model}</h1>
                            <p className="text-3xl font-bold text-red-600 mt-2">
                                {parseInt(car.price.toString()).toLocaleString('tr-TR')} ₺
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">İlan Tarihi: {new Date(car.created_at).toLocaleDateString('tr-TR')}</p>
                        </div>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-zinc-500">Yıl</span>
                                <span className="font-medium text-foreground">{car.year}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-zinc-500">Kilometre</span>
                                <span className="font-medium text-foreground">{car.km.toLocaleString()} KM</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-zinc-500">Yakıt Tipi</span>
                                <span className="font-medium text-foreground">{car.fuel_type}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-zinc-500">Vites Tipi</span>
                                <span className="font-medium text-foreground">{car.gear_type}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-zinc-500">Motor Gücü</span>
                                <span className="font-medium text-foreground">{car.engine_power || "-"}</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <Link href={`${settings.whatsapp}${settings.whatsapp.includes('?') ? '&' : '?'}text=${encodeURIComponent(`Merhaba, ${car.brand} ${car.model} ilanınız (${car.year}) hakkında bilgi almak istiyorum.`)}`} target="_blank">
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp ile Yaz
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full border-zinc-300">
                                <Share2 className="mr-2 h-4 w-4" /> Paylaş
                            </Button>
                        </div>

                        <div className="mt-8 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-blue-100 dark:border-blue-900/30">
                            <h4 className="flex items-center gap-2 font-semibold text-blue-800 dark:text-blue-400 mb-2">
                                <ShieldCheck className="h-5 w-5" />
                                Karaduman Güvencesi
                            </h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Bu araç Karaduman Otomotiv ekspertiz garantisi altındadır. Kilometre ve ekspertiz bilgileri taahhüt ettiğimiz gibidir.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
