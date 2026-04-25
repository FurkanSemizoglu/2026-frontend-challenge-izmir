# Detective Podo · 2026 Frontend Challenge (İzmir)

Dedektif Podo'nun davasını çözmesine yardım eden, **JotForm API** üzerinden canlı veri çeken React tabanlı bir vaka panosu uygulaması. Beş farklı form kategorisindeki ipuçları (check-in'ler, görgü tanıkları, mesajlar, kişisel notlar ve isimsiz ihbarlar) tek bir interaktif arayüzde toplanır.

## Özellikler

- **Vaka Panosu** — JotForm hesabınızdan çekilen 5 form kategorisinin özet kartları.
- **Form Detayı** — Her form için tüm gönderimlerin "delil notu" stilinde listelendiği sayfa.
- **Şüpheli Listesi** — Tüm gönderimlerden otomatik olarak çıkarılan kişilerin profilleri ve geçmişleri.
- **Canlı Veri** — Sahte veri yok; her ziyarette JotForm API'sinden taze çekim.
- **Modern Stack** — React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router 7.

## Gereksinimler

- **Node.js** 20.19+ veya 22.12+ (Vite 8 için)
- **npm** (veya pnpm / yarn)
- Geçerli bir **JotForm API anahtarı** ([buradan alabilirsiniz](https://www.jotform.com/myaccount/api))

## Kurulum

### 1) Depoyu klonlayın

```bash
git clone <repo-url>
cd 2026-frontend-challenge-izmir
```

### 2) Bağımlılıkları yükleyin

```bash
npm install
```

### 3) Ortam değişkenlerini ayarlayın

Kök dizinde `.env.local` adında bir dosya oluşturun (`.env.example` dosyasını şablon olarak kullanabilirsiniz):

```bash
VITE_JOTFORM_API_KEY=buraya_jotform_api_anahtarinizi_yazin
VITE_JOTFORM_BASE_URL=https://api.jotform.com
```

> **Not:** API anahtarı yoksa uygulama çalışır ama formlar yüklenmez ve konsola uyarı düşer.

### 4) JotForm formlarını eşleştirin (opsiyonel)

Uygulama 5 belirli form ID'sini bekler. Kendi JotForm hesabınızı kullanıyorsanız `src/constants/forms.ts` içindeki `id` değerlerini kendi form ID'lerinizle değiştirin:

```typescript
CHECKINS:        { id: '261134527667966', ... },
SIGHTINGS:       { id: '261133720555956', ... },
MESSAGES:        { id: '261133651963962', ... },
PERSONAL_NOTES:  { id: '261134449238963', ... },
ANONYMOUS_TIPS:  { id: '261134430330946', ... },
```

## Çalıştırma

### Geliştirme sunucusu

```bash
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresini açın. HMR (Hot Module Replacement) aktiftir.

### Production build

```bash
npm run build
```

Çıktı `dist/` klasörüne üretilir.

### Build önizlemesi

```bash
npm run preview
```

### Lint kontrolü

```bash
npm run lint
```

## Komutlar Özeti

| Komut             | Açıklama                                        |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Vite dev sunucusunu başlatır (varsayılan: 5173) |
| `npm run build`   | TypeScript kontrolü + production build          |
| `npm run preview` | Production build'i lokalde sunar                |
| `npm run lint`    | ESLint ile kod kalitesi kontrolü                |

## Sayfalar / Rotalar

| Yol               | Sayfa             | Açıklama                                    |
| ----------------- | ----------------- | ------------------------------------------- |
| `/`               | `HomePage`        | Ana sayfa, kahraman bölümü ve ipucu kartları |
| `/case`           | `CaseBoardPage`   | 5 form kategorisinin özet panosu            |
| `/case/:formKey`  | `FormDetailPage`  | Seçilen formun tüm gönderimleri              |
| `/suspects`       | `SuspectsPage`    | Tüm gönderimlerden çıkarılan kişiler         |

## Proje Yapısı

```
src/
├── api/             # Axios client (JotForm API)
├── assets/          # Görseller (detective_podo.png)
├── components/
│   ├── case/        # NoteCard, EvidenceCard, ConversationBoard, ...
│   └── layout/      # Navbar
├── constants/       # forms.ts (form ID/etiket eşlemeleri)
├── hooks/           # useUserForms, useFormSubmissions, useAllSubmissions, ...
├── pages/           # HomePage, CaseBoardPage, FormDetailPage, SuspectsPage
├── services/        # formService, submissionService (cache'li API çağrıları)
├── types/           # jotform.ts (TypeScript tipleri)
├── utils/           # answers, messages, persons, date yardımcıları
├── App.tsx          # Router tanımları
├── main.tsx         # React giriş noktası
└── index.css        # Global stiller + Tailwind
```

## Teknoloji Yığını

- **React 19** + **TypeScript**
- **Vite 8** — geliştirme ve build aracı
- **Tailwind CSS 4** — `@tailwindcss/vite` plugin'i ile
- **React Router DOM 7** — istemci tarafı yönlendirme
- **Axios** — JotForm API istekleri
- **ESLint** + **typescript-eslint** — statik analiz

## Sorun Giderme

- **`VITE_JOTFORM_API_KEY is not set` uyarısı** — `.env.local` dosyasını oluşturup geçerli bir anahtar yazdığınızdan emin olun. Dosya değişikliğinden sonra dev sunucusunu yeniden başlatın.
- **`401: API anahtarı geçersiz veya eksik`** — JotForm hesabınızdan yeni bir API anahtarı üretip izinlerini kontrol edin.
- **`429: Çok fazla istek gönderildi`** — JotForm rate limit'ine takıldınız; kısa bir süre bekleyin. Servisler bellek içi cache kullanır, sayfa içi tekrar gezintiler yeni istek üretmez.
- **Boş kategori kartları** — `src/constants/forms.ts` içindeki form ID'leri sizin hesabınızdaki ID'lerle eşleşmiyor olabilir.

## Lisans

Bu proje 2026 Frontend Challenge (İzmir) kapsamında hazırlanmıştır.
