import Link from "next/link";
import { Facebook, Instagram, Phone, MapPin, Mail, Twitter } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import { getSiteSettings } from "@/lib/get-settings";
import Image from "next/image";

export async function Footer() {
    const settings = await getSiteSettings();

    return (
        <footer className="bg-zinc-950 text-zinc-300 py-16 border-t border-zinc-900">
            <div className="container px-4 md:px-6 grid gap-12 md:grid-cols-3 lg:grid-cols-4">
                <div className="space-y-6 lg:col-span-2">
                    <div className="flex items-center gap-4 animate-fade-in">
                        {siteConfig.logo.src ? (
                            <div className="relative h-24 w-24 md:h-28 md:w-28 hover:scale-105 transition-transform duration-500">
                                <Image
                                    src={siteConfig.logo.src}
                                    alt={siteConfig.logo.alt}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ) : null}
                        <div className="flex flex-col -space-y-0.5 leading-none">
                            <span className="text-2xl md:text-3xl font-black tracking-tight uppercase italic">
                                <span className="text-red-600">Kara</span>
                                <span className="text-white">duman</span>
                            </span>
                            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-500">
                                Otomotiv
                            </span>
                        </div>
                    </div>
                    <p className="text-base text-zinc-400 max-w-md leading-relaxed">
                        {siteConfig.description}
                    </p>
                    <div className="flex gap-4">
                        {settings.instagram && (
                            <Link href={settings.instagram} target="_blank" className="bg-zinc-900 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        )}
                        {settings.facebook && (
                            <Link href={settings.facebook} target="_blank" className="bg-zinc-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        )}
                        {settings.twitter && (
                            <Link href={settings.twitter} target="_blank" className="bg-zinc-900 p-3 rounded-full hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider relative inline-block">
                        Hızlı Bağlantılar
                        <span className="absolute -bottom-1 left-0 w-8 h-1 bg-red-600 rounded"></span>
                    </h4>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link href="/" className="hover:text-red-500 transition-colors flex items-center gap-2">Ana Sayfa</Link></li>
                        <li><Link href="/ilanlar" className="hover:text-red-500 transition-colors flex items-center gap-2">Tüm İlanlar</Link></li>
                        <li><Link href="/hakkimizda" className="hover:text-red-500 transition-colors flex items-center gap-2">Hakkımızda</Link></li>
                        <li><Link href="/sizden-gelenler" className="hover:text-red-500 transition-colors flex items-center gap-2">Sizden Gelenler</Link></li>
                        <li><Link href="/admin" className="hover:text-red-500 transition-colors flex items-center gap-2 opacity-50">Yönetici Girişi</Link></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider relative inline-block">
                        İletişim
                        <span className="absolute -bottom-1 left-0 w-8 h-1 bg-red-600 rounded"></span>
                    </h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed whitespace-pre-line">{settings.address}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-green-500 shrink-0" />
                            <Link href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                                {settings.phone}
                            </Link>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                            <Link href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                                {settings.email}
                            </Link>
                        </li>
                    </ul>
                    <div className="pt-6 border-t border-zinc-900 mt-6 lg:max-w-xs">
                        <p className="text-xs text-zinc-500 leading-relaxed italic">
                            Ayrıca <span className="text-red-500 font-bold">{siteConfig.labels.insuranceTitle}</span> bünyesinde kasko ve trafik sigortası çözümleri sunmaktayız.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container px-4 md:px-6 mt-16 pt-8 border-t border-zinc-900 text-center">
                <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
                    &copy; {new Date().getFullYear()} {siteConfig.name}. {siteConfig.labels.footerText}
                </p>
            </div>
        </footer>
    );
}
