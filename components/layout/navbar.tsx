import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site-config";
import { getSiteSettings } from "@/lib/get-settings";
import { encodeWhatsAppLink } from "@/lib/whatsapp";
import { MobileMenu } from "./mobile-menu";

export async function Navbar() {
    const settings = await getSiteSettings();

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container relative flex h-20 items-center px-4 md:px-6">
                {/* Mobile: hamburger on left */}
                <div className="md:hidden">
                    <MobileMenu whatsapp={settings.whatsapp ?? null} />
                </div>

                {/* Logo + wordmark — centered on mobile, left on desktop */}
                <Link
                    href="/"
                    className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-3 group animate-fade-in-down"
                >
                    {siteConfig.logo.src ? (
                        <div className="relative h-14 w-14 md:h-20 md:w-20 group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-300 ease-out">
                            <Image
                                src={siteConfig.logo.src}
                                alt={siteConfig.logo.alt}
                                fill
                                className="object-contain"
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
                    <div className="flex flex-col -space-y-0.5 leading-none">
                        <span className="text-base md:text-xl font-black tracking-tight uppercase italic">
                            <span className="text-red-600">Kara</span>
                            <span className="text-foreground">duman</span>
                        </span>
                        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">
                            Otomotiv
                        </span>
                    </div>
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:flex gap-6 text-base font-medium ml-auto mr-6">
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

                {/* Desktop WhatsApp */}
                {settings.whatsapp && (
                    <Link href={encodeWhatsAppLink(settings.whatsapp)} target="_blank" className="hidden md:flex">
                        <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                            <Phone className="h-4 w-4" />
                            WhatsApp
                        </Button>
                    </Link>
                )}

                {/* Mobile right spacer (keeps logo visually centered against the hamburger) */}
                <div className="md:hidden ml-auto w-9 h-9" aria-hidden />
            </div>
        </nav>
    );
}
