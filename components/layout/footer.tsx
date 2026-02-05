import Link from "next/link";
import { Facebook, Instagram, Phone, MapPin, Mail, Twitter } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-zinc-950 text-zinc-300 py-16 border-t border-zinc-900">
            <div className="container px-4 md:px-6 grid gap-12 md:grid-cols-3 lg:grid-cols-4">
                <div className="space-y-6 lg:col-span-2">
                    <div className="flex items-center gap-2">
                        {siteConfig.logo.src ? (
                            <div className="relative h-[108px] w-[264px] grayscale brightness-200 contrast-125 hover:grayscale-0 transition-all duration-500 -ml-4 md:-ml-8">
                                <Image
                                    src={siteConfig.logo.src}
                                    alt={siteConfig.logo.alt}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col -space-y-1">
                                <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">
                                    <span className="text-red-600">Kara</span>
                                    <span className="text-white">duman</span>
                                </span>
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 pl-0.5">
                                    Otomotiv
                                </span>
                            </div>
                        )}
                    </div>
                    <p className="text-base text-zinc-400 max-w-md leading-relaxed">
                        {siteConfig.description}
                    </p>
                    <div className="flex gap-4">
                        {siteConfig.social.instagram && (
                            <Link href={siteConfig.social.instagram} target="_blank" className="bg-zinc-900 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        )}
                        {siteConfig.social.facebook && (
                            <Link href={siteConfig.social.facebook} target="_blank" className="bg-zinc-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        )}
                        {siteConfig.social.twitter && (
                            <Link href={siteConfig.social.twitter} target="_blank" className="bg-zinc-900 p-3 rounded-full hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1">
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
                            <span className="leading-relaxed whitespace-pre-line">{siteConfig.contact.address}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-green-500 shrink-0" />
                            <Link href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                                {siteConfig.contact.phone}
                            </Link>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                            <Link href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                                {siteConfig.contact.email}
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
                    © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.labels.footerText}
                </p>
            </div>
        </footer>
    );
}
