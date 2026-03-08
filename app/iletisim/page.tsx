import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { getSiteSettings } from "@/lib/get-settings";
import { encodeWhatsAppLink } from "@/lib/whatsapp";

export const revalidate = 60;

export default async function ContactPage() {
    const settings = await getSiteSettings();

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
                        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            <MapPin className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Adresimiz</h3>
                            <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                                {settings.address}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            <Phone className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                            <Link href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-zinc-600 dark:text-zinc-300 hover:text-red-600 transition-colors">
                                {settings.phone}
                            </Link>
                            {settings.working_hours && (
                                <p className="text-sm text-zinc-400 mt-1 flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {settings.working_hours}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">E-posta</h3>
                            <Link href={`mailto:${settings.email}`} className="text-zinc-600 dark:text-zinc-300 hover:text-red-600 transition-colors">
                                {settings.email}
                            </Link>
                        </div>
                    </div>

                    {settings.whatsapp && (
                        <div className="pt-4">
                            <Link href={encodeWhatsAppLink(settings.whatsapp)} target="_blank">
                                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 w-full md:w-auto">
                                    <MessageCircle className="h-5 w-5" />
                                    WhatsApp ile İletişime Geç
                                </Button>
                            </Link>
                        </div>
                    )}

                    <div className="pt-4">
                        <h3 className="font-semibold text-lg mb-4">Sosyal Medya</h3>
                        <div className="flex gap-4">
                            {settings.instagram && (
                                <Link href={settings.instagram} target="_blank">
                                    <Button variant="outline">Instagram</Button>
                                </Link>
                            )}
                            {settings.facebook && (
                                <Link href={settings.facebook} target="_blank">
                                    <Button variant="outline">Facebook</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden relative border border-zinc-300 dark:border-zinc-700">
                    {settings.map_embed_url ? (
                        <iframe
                            src={settings.map_embed_url}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                            <MapPin className="h-12 w-12 mb-2 text-zinc-400" />
                            <span className="font-medium">Google Haritalar</span>
                            <span className="text-sm">Konum haritası buraya gelecek</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
