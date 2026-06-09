# Bowlz-I# Bowlz-I

**Healthy Meals. Available in Seconds.**

India's healthy food infrastructure company — fresh bowls, cold-pressed juices, immunity shots and functional snacks served through smart daily-restocked vending machines.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📦 Build & Export (GitHub Pages)

```bash
npm run build
# Outputs static files to /out directory
```

## 🌐 Deploy to GitHub Pages

1. Push to your GitHub repository
2. Go to **Settings → Pages**
3. Set source to **GitHub Actions**
4. Push to `main` — GitHub Actions will automatically build and deploy

The workflow file is at `.github/workflows/deploy-github-pages.yml`.

**Custom domain:** Add your domain in Settings → Pages and set `CNAME` in your DNS.

## 📁 Project Structure

```
bowlz-i/
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/
│   │   ├── sections/      # Full-page sections (Hero, About, Products...)
│   │   └── shared/        # Header, Footer
│   ├── data/              # JSON data files (Phase 1)
│   │   ├── products.json
│   │   ├── categories.json
│   │   ├── locations.json
│   │   ├── machines.json
│   │   └── blog-posts.json
│   └── lib/
│       ├── types/         # TypeScript interfaces
│       ├── hooks/         # Custom React hooks
│       └── utils/         # Helper utilities
└── .github/workflows/     # CI/CD
```

## 🗃️ Data Architecture

**Phase 1 (current):** All data lives in `src/data/*.json` files. The `src/data/index.ts` is the data access layer — functions like `getAllProducts()`, `getActiveLocations()` etc.

**Phase 2 (Supabase):** Replace the implementations in `src/data/index.ts` with API calls to Supabase. The function signatures stay the same — only the data source changes.

**Phase 3 (Spring Boot):** Replace with calls to your microservices. Same interface contract.

## 📝 Adding Data

### Add a new product
Edit `src/data/products.json` — follow the existing schema. Match `categoryId` to an entry in `categories.json`.

### Add a location
Edit `src/data/locations.json` — add latitude/longitude for the SVG map pin. The city must be in the `CITY_COORDS` map in `LocationsSection.tsx` or add a new one.

### Add a blog post / testimonial
Edit `src/data/blog-posts.json` — set `"type": "testimonial"` for customer reviews or `"type": "article"` for editorial content.

## 🎨 Design System

- **Primary font:** Playfair Display (headings)
- **Body font:** DM Sans
- **Green:** `#1a5c3a` (forest-600), `#2d8c58` (forest-500)
- **Cream:** `#f5f0e8` (light backgrounds)
- **Dark:** `#0d0d0d` (dark sections)

Colors are configured in `tailwind.config.ts`.

## 🖼️ Adding Real Images

Images go in `public/images/`. Update `imageUrl` fields in JSON files.

Recommended sizes:
- Products: `800×600px` WebP
- Blog/testimonials: `1200×800px` WebP  
- Machine: `600×900px` WebP
- OG image: `1200×630px` JPG

## 📍 Placeholder Notes

Items marked `PLACEHOLDER` in the data files need real content:
- Blog post full content (`content` field)
- Location partner names for coming-soon locations
- Real product and location images
- Author avatars for blog posts

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** Vanilla React (Phase 2: React Hook Form + Zod)
- **Hosting:** GitHub Pages → Vercel (Phase 2)
- **DB:** JSON → PostgreSQL/Supabase (Phase 2)

## 📧 Contact

Sonali Shakya — hello@bowlz-i.com

---

*Bowlz-I — Making healthy food as accessible as bottled water.*
