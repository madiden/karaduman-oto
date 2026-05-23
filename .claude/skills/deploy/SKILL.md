---
name: deploy
description: Use when deploying karadumanotomotiv.com (this Next.js project) to Cloudflare Workers production via OpenNext adapter
---

# Deploy to Cloudflare Workers

Bu site `@opennextjs/cloudflare` ile Cloudflare Workers'ta host edilir. Manuel deploy mekanizmasi (GitHub Actions yok).

## Komut

```bash
npm run deploy
```

Bu, `opennextjs-cloudflare build && opennextjs-cloudflare deploy` zincirini calistirir.

## Onkosul kontrolleri (deploy oncesi)

1. `npx wrangler whoami` — Cloudflare hesabi ile login olmali. Degilse: `npx wrangler login`.
2. `.env.local` mevcut ve `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` dolu.
3. `wrangler.jsonc` icindeki KV namespace id placeholder degil (yani `87c0ab4b...` gibi gercek bir deger).

## Beklenen ciktiyi dogrula

Basarili deploy sonrasi:
- `Worker Startup Time: <100 ms`
- `Total Upload: ... / gzip: <3 MB` (3 MB compressed Worker bundle limiti)
- Bindings listesi: `NEXT_INC_CACHE_KV`, `ASSETS`, `NEXT_PUBLIC_SUPABASE_URL`
- Triggers: `karadumanotomotiv.com` ve `www.karadumanotomotiv.com`

## Production smoke test

```bash
curl -sI https://karadumanotomotiv.com/ | head -10
```

Beklenen header'lar:
- `HTTP/2 200`
- `server: cloudflare`
- `x-opennext: 1`
- `x-nextjs-cache: HIT` (ISR cache devrede)

## Yaygin hatalar

| Hata | Cozum |
|------|-------|
| `You are not authenticated` | `npx wrangler login` |
| `Hostname '...' already has externally managed DNS records` | Cloudflare DNS panelinden catisan A/CNAME kaydini sil (apex A veya www CNAME). `_dmarc` TXT ve `_domainconnect` CNAME'i koru. |
| `peer next@...` peer dep hatasi | Next.js surumunu kontrol et — `@opennextjs/cloudflare` `next >=15.5.18 <16 \|\| >=16.2.6` ister. 16.0–16.2.5 araligi uyumsuz. |
| Worker bundle > 3 MB | Sharp veya benzeri native modul eklendiyse cikar. `images: { unoptimized: true }` korunmali. |
| Auth callback 400/500 | Supabase Dashboard > Auth > URL Configuration: Site URL = `https://karadumanotomotiv.com` ve Redirect URLs listesinde `https://karadumanotomotiv.com/auth/callback` olmali. |

## Konfigurasyon dokunma noktalari

- `wrangler.jsonc` — KV binding, routes (custom domains), compatibility flags
- `open-next.config.ts` — ISR cache adapter (KV)
- `next.config.ts` — `images.unoptimized: true` (Sharp Workers'ta calismaz) ve `initOpenNextCloudflareForDev()`

## Lokal preview (Workers ortamini simule et)

```bash
npm run preview
```

Cutover veya buyuk degisiklik oncesi `next dev` yerine bunu kullan — KV bindings, Workers runtime fark gibi durumlar yakalanir.

## Secret/binding ekleme

Yeni runtime env var:
- **Public ve hassas degil:** `wrangler.jsonc` > `vars`
- **Hassas:** `npx wrangler secret put <NAME>`
