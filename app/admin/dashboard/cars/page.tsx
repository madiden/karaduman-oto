import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Car } from "@/types";

export const revalidate = 0;

export default async function AdminCarsPage() {
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

    const { data: cars } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false })
        .returns<Car[]>();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">İlan Yönetimi</h1>
                <Link href="/admin/dashboard/cars/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Yeni İlan
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                        <tr>
                            <th className="px-6 py-4 font-medium text-zinc-500">Araç</th>
                            <th className="px-6 py-4 font-medium text-zinc-500">Fiyat</th>
                            <th className="px-6 py-4 font-medium text-zinc-500">Durum</th>
                            <th className="px-6 py-4 font-medium text-zinc-500 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        {cars?.map((car) => (
                            <tr key={car.id} className="hover:bg-zinc-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-12 w-16 bg-zinc-100 rounded overflow-hidden flex-shrink-0">
                                            <Image
                                                src={car.images?.[0] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=100&h=100"}
                                                alt="Car"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">{car.brand} {car.model}</div>
                                            <div className="text-zinc-500 text-xs">{car.year} • {car.km} KM</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {parseInt(car.price.toString()).toLocaleString('tr-TR')} ₺
                                </td>
                                <td className="px-6 py-4">
                                    {car.is_showcase ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            Vitrinde
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                                            Yayında
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/admin/dashboard/cars/${car.id}`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    {/* Delete button will need a server action or client component wrapper */}
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {(!cars || cars.length === 0) && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                    Henüz hiç ilan eklenmemiş.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
