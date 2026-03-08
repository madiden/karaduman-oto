# Karaduman Otomotiv - CLAUDE.md

Bu dosya, Claude Code'un bu projede verimli calisabilmesi icin olusturulmus bir rehberdir.

## Proje Ozeti
Karaduman Otomotiv - ikinci el arac alim satimi ve sigorta hizmetleri sunan bir galerinin kurumsal web sitesi. Next.js 16 (App Router) + TypeScript + Supabase + Tailwind CSS 4.

## Hizli Baslangi Komutlari
```bash
npm run dev      # Gelistirme sunucusu (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint kontrolu
```

## Teknik Yigin
- **Framework:** Next.js 16.1.6 (App Router)
- **Dil:** TypeScript 5 (strict mode)
- **Stil:** Tailwind CSS 4 (PostCSS) - globals.css'deki CSS degiskenlerine sadik kal
- **Veritabani & Auth:** Supabase (PostgreSQL + Google OAuth)
- **UI:** Radix UI + Lucide React ikonlari + CVA (class-variance-authority)
- **Font:** Geist (Sans & Mono)
- **Goruntu:** Sharp

## Proje Yapisi
```
app/                    # Next.js App Router
  (public)/             # Herkese acik sayfa gruplari
  admin/                # Yonetici paneli (korunmus)
    dashboard/          # Dashboard sayfalari
      cars/             # Arac CRUD islemleri
      comments/         # Yorum yonetimi
  auth/                 # Auth callback & signout
  ilanlar/              # Arac listeleme & detay ([id])
  hakkimizda/           # Hakkimizda
  iletisim/             # Iletisim
  sizden-gelenler/      # Musteri yorumlari
components/
  ui/                   # Temel UI (button, input, label, textarea)
  layout/               # Navbar, Footer
  admin/                # Admin bilesen (car-form)
config/site-config.ts   # Tum metin ve ayarlar (hard-coded metin YAZMA)
lib/supabase.ts         # Supabase istemcisi
lib/utils.ts            # cn() helper (clsx + tailwind-merge)
types/index.ts          # Car, Comment tipleri
utils/supabase/         # Middleware yardimcilari
middleware.ts           # Route koruma + session yonetimi
```

## Veritabani Tablolari
- **cars:** id, brand, model, year, price, km, fuel_type, gear_type, engine_power, description, is_showcase, images[], listing_date
- **comments:** id, user_name, user_image, message, is_approved
- **admins:** Email bazli yetkilendirme

## Gelistirme Kurallari

### Bilesenler
- Yeni bilesenler `components/` altinda kategorize et
- UI ogeleri `components/ui/` altinda CVA pattern ile
- Ikonlar icin **Lucide React** kullan
- `cn()` helper ile Tailwind class birlestir

### Server vs Client Components
- **Varsayilan:** Server Components kullan
- **`'use client'`:** Sadece etkilesim gereken yerlerde (formlar, state, event handler)
- Server: `createServerClient` | Client: `createBrowserClient`

### Revalidation Surerleri
- Anasayfa & ilanlar: `revalidate = 60`
- Statik sayfalar (hakkimizda, iletisim): `revalidate = 3600`
- Admin sayfalari: `revalidate = 0`

### Stil
- Tailwind CSS 4 - `globals.css`'deki degiskenlere sadik kal
- Mobile-first responsive tasarim
- Kurumsal renkler: `site-config.ts` ve Tailwind konfigurasyonuna uy

### Konfigürasyon
- Tum sabit metinler `config/site-config.ts`'den okunmali
- Hard-coded metin KULLANMA
- Cevre degiskenleri: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Gorsel Yonetimi
- Gorseller Supabase `car-images` bucket'ina yuklenir
- next.config.ts'de Unsplash ve Supabase CDN remote pattern'leri tanimli

### Path Alias
- `@/*` -> proje koku (ornek: `@/components/ui/button`, `@/lib/supabase`)

## Onemli Dosyalar
- `config/site-config.ts` - Site ayarlari, metinler, iletisim bilgileri
- `types/index.ts` - Car ve Comment tipleri
- `lib/supabase.ts` - Supabase client olusturma
- `middleware.ts` - Auth koruma ve session
- `GEMINI.md` - Diger AI asistanlari icin rehber (bu dosya ile senkron tut)
