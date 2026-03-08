import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface SahibindenCardProps {
    url: string;
    featured?: boolean;
}

export function SahibindenCard({ url, featured = false }: SahibindenCardProps) {
    if (!url) return null;

    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-yellow-500"
        >
            <div className="relative aspect-[4/3] overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 p-6">
                <div className="bg-white rounded-2xl px-6 py-3 shadow-lg mb-4">
                    <span className="text-2xl font-black tracking-tight text-zinc-900">
                        sahibinden
                        <span className="text-yellow-500">.com</span>
                    </span>
                </div>
                <p className="text-white/90 text-sm font-medium text-center">
                    Tüm ilanlarımızı sahibinden.com'da da inceleyebilirsiniz
                </p>
            </div>
            <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg leading-tight text-foreground">
                        Sahibinden İlanlarımız
                    </h3>
                    <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-yellow-600 transition-colors" />
                </div>
                <p className="text-sm text-zinc-500">
                    sahibinden.com mağazamızı ziyaret edin
                </p>
            </div>
        </Link>
    );
}
