import { supabase } from "@/lib/supabase";
import { Car } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpDown, Calendar, Fuel, Gauge, Settings2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/get-settings";
import { SahibindenCard } from "@/components/sahibinden-card";

export const revalidate = 60; // Revalidate every minute

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

async function getCars(sort: string = 'date_desc') {
    let query = supabase.from("cars").select("*");

    switch (sort) {
        case 'price_asc':
            query = query.order('price', { ascending: true });
            break;
        case 'price_desc':
            query = query.order('price', { ascending: false });
            break;
        case 'date_asc':
            query = query.order('listing_date', { ascending: true });
            break;
        case 'date_desc':
        default:
            query = query.order('listing_date', { ascending: false });
            break;
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching cars:", error);
        return [];
    }

    return (data as Car[]) || [];
}

export const metadata = {
    title: "İkinci El İlanlar | Karaduman Otomotiv",
    description: "Tüm ikinci el araç ilanlarımızı inceleyin. BMW, Audi, Volkswagen ve daha fazlası.",
};

export default async function ListingsPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'date_desc';
    const cars = await getCars(sort);
    const settings = await getSiteSettings();

    return (
        <div className="container py-12 px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tüm İlanlar</h1>
                    <p className="text-zinc-500">Toplam {cars.length} araç listeleniyor.</p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-500 hidden sm:inline-block">Sırala:</span>
                    <div className="flex gap-2">
                        <Link href="/ilanlar?sort=date_desc">
                            <Button variant={sort === 'date_desc' ? "default" : "outline"} size="sm">
                                En Yeni
                            </Button>
                        </Link>
                        <Link href="/ilanlar?sort=price_asc">
                            <Button variant={sort === 'price_asc' ? "default" : "outline"} size="sm">
                                Fiyat (Artan)
                            </Button>
                        </Link>
                        <Link href="/ilanlar?sort=price_desc">
                            <Button variant={sort === 'price_desc' ? "default" : "outline"} size="sm">
                                Fiyat (Azalan)
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {settings.sahibinden_url && (
                    <SahibindenCard url={settings.sahibinden_url} />
                )}
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
                        <Filter className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-zinc-900">Araç Bulunamadı</h3>
                        <p className="text-zinc-500">Şu anda kriterlerinize uygun araç bulunmuyor.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function CarCard({ car }: { car: Car }) {
    const mainImage = car.images?.[0] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600&h=400";

    return (
        <Link href={`/ilanlar/${car.id}`} className="group relative block overflow-hidden rounded-xl bg-card border border-border transition-all hover:shadow-lg hover:-translate-y-1">
            {car.is_showcase && (
                <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Fırsat
                </span>
            )}
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
                <Image
                    src={mainImage}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                    <p className="text-white font-bold text-lg">{parseInt(car.price.toString()).toLocaleString('tr-TR')} ₺</p>
                </div>
            </div>
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-semibold text-lg leading-tight text-foreground">{car.brand} {car.model}</h3>
                    <p className="text-sm text-zinc-500 truncate">{car.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500">
                    <div className="flex items-center gap-1 bg-secondary/50 p-1.5 rounded">
                        <Calendar className="h-3.5 w-3.5" />
                        {car.year}
                    </div>
                    <div className="flex items-center gap-1 bg-secondary/50 p-1.5 rounded">
                        <Gauge className="h-3.5 w-3.5" />
                        {car.km.toLocaleString()} KM
                    </div>
                    <div className="flex items-center gap-1 bg-secondary/50 p-1.5 rounded">
                        <Fuel className="h-3.5 w-3.5" />
                        {car.fuel_type}
                    </div>
                    <div className="flex items-center gap-1 bg-secondary/50 p-1.5 rounded">
                        <Settings2 className="h-3.5 w-3.5" />
                        {car.gear_type}
                    </div>
                </div>
            </div>
        </Link>
    )
}
