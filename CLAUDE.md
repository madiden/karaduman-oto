# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proje Ozeti
Karaduman Otomotiv - ikinci el arac alim-satimi ve sigorta hizmetleri sunan bir galerinin kurumsal web sitesi. Next.js 16 (App Router) + TypeScript + Supabase + Tailwind CSS 4.

## Komutlar
```bash
npm run dev      # Gelistirme sunucusu (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint kontrolu
npm run preview  # Cloudflare Workers ortamini lokal simule et (wrangler dev)
npm run deploy   # OpenNext build + Cloudflare Workers'a deploy
```
Test framework'u yoktur. Production deploy `main` branch'e push ile GitHub Actions uzerinden de tetiklenir.

## Teknik Yigin
- **Framework:** Next.js 16.2.6 (App Router), React 19
- **Dil:** TypeScript 5
- **Stil:** Tailwind CSS 4 (PostCSS) - `globals.css`'deki CSS degiskenlerine sadik kal
- **Veritabani & Auth:** Supabase (PostgreSQL + Google OAuth)
- **UI:** Radix UI + Lucide React ikonlari + CVA (class-variance-authority)
- **Font:** Geist (Sans & Mono)
- **Hosting:** Cloudflare Workers (free plan) via `@opennextjs/cloudflare`
- **Path Alias:** `@/*` -> proje koku

## Mimari: Cift Katmanli Konfigurasyon

Bu proje iki ayri konfigurasyon katmani kullanir — bunu anlamak kritik:

1. **Statik konfigurasyon** (`config/site-config.ts`): Derleme zamaninda sabit metinler (hero, etiketler, logo ayarlari). Hard-coded metin YAZMA, buradan oku.
2. **Dinamik konfigurasyon** (`site_settings` tablosu, `lib/get-settings.ts` ile cekilir): Admin panelinden degistirilebilen veriler (telefon, WhatsApp, sosyal medya, harita, sigorta). Calisma zamaninda Supabase'den okunur, fallback olarak `defaultSettings` kullanilir.

Navbar, Footer ve ana sayfa her ikisini de kullanir: `siteConfig` + `getSiteSettings()`.

## Veritabani Tablolari (Supabase)

| Tablo | Aciklama |
|-------|----------|
| `cars` | Arac ilanlari (brand, model, year, price, km, fuel_type, gear_type, engine_power, description, is_showcase, images[], listing_date) |
| `comments` | Musteri yorumlari (user_name, user_image, message, is_approved) |
| `admins` | Email bazli admin yetkilendirme |
| `site_settings` | Dinamik site ayarlari (telefon, whatsapp, sosyal medya, sigorta, sahibinden URL) - tek satir |
| `gallery_photos` | Galeri fotograflari (image_url, caption, is_hero) |

**Storage Bucket'lari:** `car-images` (arac gorselleri), `gallery-images` (galeri + sigorta gorselleri)

## Auth Akisi
1. `/admin` → Google OAuth ile giris (`signInWithOAuth`)
2. `/auth/callback` → Code exchange, session olusturma
3. `/admin/dashboard/layout.tsx` → Session kontrolu + `admins` tablosundan email dogrulamasi
4. Yetkisiz kullanici otomatik sign-out ve redirect
5. `middleware.ts` → Tum route'larda session yenileme (`updateSession`)

## Supabase Client Kullanimi

Iki farkli Supabase client pattern'i var:

- **Server Components & Route Handlers:** `createServerClient` (`@supabase/ssr`), cookies ile (her kullanim noktasinda yeniden olusturulur)
- **Client Components:** `createBrowserClient` (`@supabase/ssr`), dosya basinda olusturulur
- **Basit sorgular:** `lib/supabase.ts`'deki singleton `supabase` (anon key ile, server-side veri cekme icin - auth gerektirmeyen islemler)

## Gelistirme Kurallari

### Server vs Client Components
- Varsayilan: Server Components kullan
- `'use client'`: Sadece etkilesim gereken yerlerde (formlar, state, event handler, lightbox)

### Revalidation Sureleri
- Anasayfa & ilanlar: `revalidate = 60`
- Statik sayfalar (hakkimizda, iletisim): `revalidate = 3600`
- Admin sayfalari: `revalidate = 0`

### Bilesenler
- UI ogeleri `components/ui/` altinda CVA pattern ile
- Ikonlar icin Lucide React kullan
- `cn()` helper ile Tailwind class birlestir (`lib/utils.ts`)

### Gorsel Yonetimi
- `next.config.ts`'de izin verilen remote pattern'ler: `images.unsplash.com` ve Supabase CDN
- Yeni bir remote kaynak eklenmesi gerekirse `next.config.ts`'e ekle

## Onemli Dosyalar
- `config/site-config.ts` — Statik metinler ve ayarlar
- `lib/get-settings.ts` — Dinamik ayarlari Supabase'den ceker (`getSiteSettings()`)
- `lib/whatsapp.ts` — WhatsApp link encoding
- `types/index.ts` — Car, Comment, SiteSettings, GalleryPhoto, Database tipleri
- `middleware.ts` — Route koruma + session yenileme
- `GEMINI.md` — Diger AI asistanlari icin rehber (bu dosya ile senkron tut)
