import { supabase } from "@/lib/supabase";
import { Car } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Fuel, Gauge, Settings2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import { getSiteSettings } from "@/lib/get-settings";
import { encodeWhatsAppLink } from "@/lib/whatsapp";
import { SahibindenCard } from "@/components/sahibinden-card";

export const revalidate = 60; // Revalidate every minute

async function getShowcaseCars() {
  const { data } = await supabase
    .from("cars")
    .select("*")
    .eq("is_showcase", true)
    .order("listing_date", { ascending: false })
    .limit(5);
  return (data as Car[]) || [];
}

async function getLatestCars() {
  const { data } = await supabase
    .from("cars")
    .select("*")
    .order("listing_date", { ascending: false })
    .limit(8);
  return (data as Car[]) || [];
}

export const metadata = {
  title: `${siteConfig.name} | Ana Sayfa`,
  description: siteConfig.description,
};

export default async function Home() {
  const showcaseCars = await getShowcaseCars();
  const latestCars = await getLatestCars();
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero / Showcase Section */}
      <section className="relative bg-zinc-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-zinc-900 to-zinc-950"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              dangerouslySetInnerHTML={{ __html: siteConfig.hero.title }}
            />
            <p className="max-w-[700px] text-zinc-400 md:text-xl">
              {siteConfig.hero.subtitle}
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="/ilanlar">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white border-0 px-8">
                  {siteConfig.hero.buttonText}
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button variant="outline" size="lg" className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white px-8">
                  {siteConfig.hero.secondaryButtonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Showcase Slider */}
        {showcaseCars.length > 0 && (
          <div className="container mt-16 px-4 md:px-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-red-600 rounded-full"></span>
              {siteConfig.labels.showcaseTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settings.sahibinden_url && (
                <SahibindenCard url={settings.sahibinden_url} featured />
              )}
              {showcaseCars.map((car) => (
                <CarCard key={car.id} car={car} featured />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Latest Listings */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{siteConfig.labels.latestListingsTitle}</h2>
            <Link href="/ilanlar" className="text-red-600 hover:text-red-700 flex items-center gap-1 font-medium transition-colors text-sm uppercase tracking-wider">
              Tümünü Gör <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {settings.sahibinden_url && (
              <SahibindenCard url={settings.sahibinden_url} />
            )}
            {latestCars.length > 0 ? (
              latestCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-zinc-500 bg-white dark:bg-zinc-900 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                Lütfen bekleyin, ilanlar yükleniyor veya henüz ilan eklenmemiş.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust & Insurance Banner */}
      <section className="py-20 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                Sigorta Hizmetlerimiz
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">{siteConfig.labels.insuranceTitle}</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
                {siteConfig.labels.insuranceDescription}
              </p>
              <ul className="grid gap-4 text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  En Uygun Fiyat Garantisi
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  7/24 Kesintisiz Destek
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  Geniş Anlaşmalı Servis Ağı
                </li>
              </ul>
              <Link href={encodeWhatsAppLink(settings.insurance_whatsapp || settings.whatsapp)} target="_blank">
                <Button className="mt-4 bg-green-600 hover:bg-green-700 px-8 py-6 rounded-xl text-lg transition-all hover:shadow-xl hover:-translate-y-1 gap-2">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp ile Teklif Al
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative h-64 md:h-96 bg-zinc-100 dark:bg-zinc-800 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-2xl">
                {settings.insurance_image ? (
                  <Image
                    src={settings.insurance_image}
                    alt="Karaduman Sigorta"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-400">
                    <Settings2 className="h-16 w-16 opacity-20" />
                    <span className="font-medium">Karaduman Sigorta Görseli</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CarCard({ car, featured = false }: { car: Car; featured?: boolean }) {
  const mainImage = car.images?.[0] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600&h=400";

  return (
    <Link href={`/ilanlar/${car.id}`} className="group relative block overflow-hidden rounded-xl bg-card border border-border transition-all hover:shadow-lg hover:-translate-y-1">
      {featured && (
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
          <p className="text-sm text-zinc-500">{car.description?.substring(0, 50)}...</p>
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
