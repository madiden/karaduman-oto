import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users, Phone } from "lucide-react";

export const revalidate = 3600;

export default function AboutPage() {
    return (
        <div className="container py-12 px-4 md:px-6">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        <span className="text-red-600">Güven</span> ve <span className="text-red-600">Kalite</span> ile Hizmetinizdeyiz
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Karaduman Otomotiv olarak, ikinci el araç sektöründe yılların verdiği tecrübe ile müşterilerimize hizmet vermekteyiz.
                        Amacımız, şeffaf ve güvenilir bir ticaret ortamı sağlayarak, hayalinizdeki araca en uygun koşullarda ulaşmanızı sağlamaktır.
                    </p>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Tüm araçlarımız ekspertiz garantili olup, satış öncesi detaylı kontrollerden geçirilmektedir.
                    </p>
                </div>
                <div className="flex-1 relative h-64 md:h-96 w-full bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200">
                    {/* Placeholder for About Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-medium">
                        Ofis / Galeri Fotoğrafı
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center space-y-4">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                        <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">Ekspertiz Garantisi</h3>
                    <p className="text-zinc-500">
                        Satışa sunduğumuz her araç, bağımsız ekspertiz merkezlerinde test edilir ve raporlanır.
                    </p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center space-y-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                        <Award className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">Uygun Fiyat</h3>
                    <p className="text-zinc-500">
                        Piyasa koşullarına göre en rekabetçi fiyatları ve ödeme kolaylıklarını sunuyoruz.
                    </p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center space-y-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">Mutlu Müşteriler</h3>
                    <p className="text-zinc-500">
                        Yüzlerce mutlu müşterimiz referansımızdır. Satış sonrası da yanınızdayız.
                    </p>
                </div>
            </div>

            {/* Insurance Section */}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-8 md:p-12 text-center md:text-left md:flex items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                    <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100">Karaduman Sigorta</h2>
                    <p className="text-blue-800/80 dark:text-blue-200/80 text-lg">
                        Aracınızı aldınız, peki ya sigortası? Karaduman Sigorta olarak kasko, trafik sigortası ve DASK işlemlerinizde
                        20'den fazla sigorta şirketinden teklif alarak en uygun fiyatı sunuyoruz.
                    </p>
                </div>
                <div className="mt-6 md:mt-0 flex-shrink-0">
                    <Link href="https://wa.me/905555555555?text=Merhaba, sigorta teklifi almak istiyorum." target="_blank">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                            <Phone className="h-5 w-5" /> Teklif Al
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
