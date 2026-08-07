# Prashant Jewellers CMS setup

This project now includes a minimal Sanity CMS workflow so a shop owner can manage products from a simple dashboard and have the website update automatically.

## 1) Install dependencies

Run these commands in the project root:

```bash
npm install
npm install --prefix sanity
```

## 2) Create environment variables

Copy the example file and replace the placeholder values:

```bash
cp .env.example .env.local
```

In [.env.local](.env.local), add:

```env
VITE_SANITY_PROJECT_ID="your-project-id"
VITE_SANITY_DATASET="production"
SANITY_STUDIO_PROJECT_ID="your-project-id"
SANITY_STUDIO_DATASET="production"
```

## 3) Start the app and studio

```bash
npm run dev
```

```bash
npm run dev --prefix sanity
```

Open the studio at http://localhost:3333 and the site at http://localhost:3000.

## 4) Sanity Studio workflow for your client

- Open the studio link on a phone or laptop.
- Sign in with the Sanity account that owns the project.
- Open the Products section.
- Create, edit, or delete products.
- Fill in the fields: name, price, image, description, category, and Show on Website.
- When you turn on Show on Website, the product appears on the website.

## 5) Deploy Sanity Studio

Deploy the studio with Sanity Hosting or Vercel/Netlify after connecting your project.

Typical commands:

```bash
cd sanity
npx sanity deploy
```

Use the generated Studio URL for your client login and product management.

## 6) Notes

- The frontend fetches only products where isListed is true.
- Images are optimized through the Sanity image URL helper.
- The product schema is defined in [sanity/schemaTypes/product.ts](sanity/schemaTypes/product.ts).
