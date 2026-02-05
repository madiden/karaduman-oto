import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export const revalidate = 3600;

export default function ContactPage() {
    return (
        <div className="container py-12 px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">İletişim</h1>
                <p className="text-zinc-500">
                    Sorularınız için bizimle iletişime geçmekten çekinmeyin.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-100 rounded-lg">
                            <MapPin className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Adresimiz</h3>
                            <p className="text-zinc-600 dark:text-zinc-300">
                                Oto Galericiler Sitesi<br />
                                B Blok No: 12<br />
                                Merkez / Şehir
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-100 rounded-lg">
                            <Phone className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                            <p className="text-zinc-600 dark:text-zinc-300">
                                +90 555 555 55 55
                            </p>
                            <p className="text-sm text-zinc-400 mt-1">Haftanın her günü 09:00 - 19:00</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-100 rounded-lg">
                            <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">E-posta</h3>
                            <p className="text-zinc-600 dark:text-zinc-300">
                                info@karadumanotomotiv.com
                            </p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <h3 className="font-semibold text-lg mb-4">Sosyal Medya</h3>
                        <div className="flex gap-4">
                            {/* Social Buttons */}
                            <Button variant="outline" className="w-full">Instagram</Button>
                            <Button variant="outline" className="w-full">Facebook</Button>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-96 bg-zinc-200 rounded-xl overflow-hidden relative border border-zinc-300">
                    {/* In a real app, embed Google Maps iframe here */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                        <MapPin className="h-12 w-12 mb-2 text-zinc-400" />
                        <span className="font-medium">Google Haritalar</span>
                        <span className="text-sm">Konum haritası buraya gelecek</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
