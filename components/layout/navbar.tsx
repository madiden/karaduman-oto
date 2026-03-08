import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site-config";
import { getSiteSettings } from "@/lib/get-settings";
import { encodeWhatsAppLink } from "@/lib/whatsapp";

export async function Navbar() {
    const settings = await getSiteSettings();

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-20 items-center justify-between px-4 md:px-6 relative">
                <Link href="/" className="flex items-center gap-2 group">
                    {siteConfig.logo.src ? (
                        <div className="relative h-[140px] w-[400px] -ml-4 md:-ml-8 -mt-2">
                            <Image
                                src={siteConfig.logo.src}
                                alt={siteConfig.logo.alt}
                                fill
                                className="object-contain group-hover:scale-105 transition-transform"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col -space-y-1">
                            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">
                                <span className="text-red-600">Kara</span>
                                <span className="text-foreground">duman</span>
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground pl-0.5">
                                Otomotiv
                            </span>
                        </div>
                    )}
                </Link>
                <div className="hidden md:flex gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-red-600">
                        Ana Sayfa
                    </Link>
                    <Link href="/ilanlar" className="transition-colors hover:text-red-600">
                        İlanlar
                    </Link>
                    <Link href="/hakkimizda" className="transition-colors hover:text-red-600">
                        Hakkımızda
                    </Link>
                    <Link href="/iletisim" className="transition-colors hover:text-red-600">
                        İletişim
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menüyü aç</span>
                    </Button>
                    {settings.whatsapp && (
                        <Link href={encodeWhatsAppLink(settings.whatsapp)} target="_blank" className="hidden md:flex">
                            <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                                <Phone className="h-4 w-4" />
                                WhatsApp
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
