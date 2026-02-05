# Karaduman Otomotiv - Proje Bilgi Bankası (GEMINI.md)

Bu dosya, projeyi inceleyen yapay zeka asistanları (Gemini, Antigravity vb.) için kapsamlı bir rehber ve bağlam dokümanıdır. Projenin mimarisi, teknik yığını ve geliştirme standartları hakkında bilgi içerir.

## 🚀 Proje Genel Bakış
Karaduman Otomotiv, ikinci el araç alım satımı ve sigorta hizmetleri sunan bir galerinin kurumsal web sitesidir. Hedef, müşterilere güvenilir bir araç listesi sunmak ve sigorta teklifi gibi ek hizmetlere kolay erişim sağlamaktır.

## 🛠 Teknik Yığın (Tech Stack)
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Dil:** [TypeScript](https://www.typescriptlang.org/)
- **Stil:** [Tailwind CSS 4](https://tailwindcss.com/) (PostCSS ile)
- **Veritabanı & Auth:** [Supabase](https://supabase.com/)
- **UI Bileşenleri:** [Radix UI](https://www.radix-ui.com/) + [Lucide React](https://lucide.dev/)
- **Tipografi:** Geist (Sans & Mono)
- **Görüntü İşleme:** Sharp

## 📂 Proje Yapısı
```text
/
├── app/                    # Next.js App Router (Sayfalar ve Layouts)
│   ├── (public)/           # Herkese açık sayfalar (Varsayımı)
│   ├── admin/              # Yönetici paneli
│   ├── auth/               # Giriş/Kayıt işlemleri
│   ├── ilanlar/            # Araç listeleme ve detay sayfaları
│   ├── iletisim/           # İletişim sayfası
│   └── globals.css         # Global CSS ve Tailwind konfigurasyonu
├── components/             # Yeniden kullanılabilir React bileşenleri
│   ├── ui/                 # Temel UI bileşenleri (Button, Label vb.)
│   ├── layout/             # Navbar, Footer gibi iskelet bileşenler
│   └── admin/              # Admin paneline özel bileşenler
├── config/                 # Site genel ayarları (site-config.ts)
├── lib/                    # Kütüphane yapılandırmaları (Supabase istemcisi vb.)
├── types/                  # TypeScript tip tanımlamaları
├── utils/                  # Yardımcı fonksiyonlar
└── public/                 # Statik varlıklar (Logolar, resimler)
```

## 📝 Geliştirme Kuralları ve Standartlar

### 🎨 Tasarım ve Stil
- **Tailwind 4:** Stil işlemleri için Tailwind CSS 4 kullanılmaktadır. `globals.css` dosyasındaki değişkenlere sadık kalınmalıdır.
- **Renk Paleti:** Kurumsal renkler (Kırmızı, Çinko Tonları) `site-config.ts` ve Tailwind konfigürasyonuna göre kullanılmalıdır.
- **Responsive Tasarım:** Tüm bileşenler mobil öncelikli (mobile-first) olmalıdır.

### 🧩 Bileşen Yapısı
- Yeni bileşenler `components/` dizini altında kategorize edilmelidir.
- Temel UI öğeleri için `components/ui/` kullanılmalıdır.
- Bileşenlerde `Lucide React` ikonları tercih edilmelidir.

### 💾 Veri Yönetimi
- **Supabase:** Veritabanı işlemleri için `@/lib/supabase` istemcisi kullanılmalıdır.
- **SSR & Client Components:** Mümkün olduğunda Server Components kullanılmalı, sadece etkileşim gereken yerlerde `'use client'` direktifi eklenmelidir.
- **Revalidation:** Dinamik veriler (ilanlar gibi) `export const revalidate = 60;` gibi tanımlamalarla güncel tutulmalıdır.

### 🌐 Konfigürasyon
- Sitedeki metinler ve ayarlar `config/site-config.ts` dosyasından okunmalıdır. Hard-coded metinlerden kaçınılmalıdır.

## 🤖 Yapay Zeka (AI) Talimatları
- Bu projede değişiklik yaparken `GEMINI.md` ve `config/site-config.ts` dosyalarını her zaman referans alın.
- Kod yazarken mevcut dosya yapısına ve isimlendirme kurallarına uyun.
- Projede önemli bir mimari değişiklik yapıldığında bu dosyayı (`GEMINI.md`) güncelleyin.

---
*Son Güncelleme: 05.02.2026*
