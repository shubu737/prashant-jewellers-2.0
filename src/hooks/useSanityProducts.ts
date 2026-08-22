import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data';

interface SanityProductResponse {
  _id: string;
  name: string;
  category?: string;
  price: string;
  originalPrice?: string;
  description?: string;
  purity?: string;
  weight?: string;
  isFeatured?: boolean;
  isListed?: boolean;
  rating?: number;
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
    };
  } | null;
}

function normalizeCategory(category?: string): ProductCategory {
  const value = category?.toLowerCase().trim();

  switch (value) {
    case 'bridal':
    case 'kundan-bridal':
    case 'kundan & bridal':
    case 'kundan and bridal':
      return 'bridal';

    case 'gold':
    case 'royal-gold':
    case 'royal gold':
      return 'gold';

    case 'diamond':
    case 'flawless-diamonds':
    case 'flawless diamonds':
      return 'diamond';

    case 'silver':
    case 'fine-silver':
    case 'fine silver':
      return 'silver';

    case 'ring':
    case 'rings':
      return 'ring';

    case 'necklace':
    case 'necklaces':
      return 'necklace';

    case 'bracelet':
    case 'bracelets':
      return 'bracelet';

    default:
      console.warn(
        `Unknown Sanity category: "${category}"`
      );

      return 'gold';
  }
}

export function useSanityProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sanityClient) {
      setError(
        'Add your Sanity project ID and dataset in the environment variables.'
      );
      setProducts(PRODUCTS);
      setIsLoading(false);
      return;
    }

    const query = `
      *[
        _type == "product" &&
        isListed == true
      ]
      | order(isFeatured desc, _createdAt desc) {
        _id,
        name,
        category,
        price,
        originalPrice,
        description,
        purity,
        weight,
        isFeatured,
        isListed,
        rating,
        image
      }
    `;

    sanityClient
      .fetch<SanityProductResponse[]>(query)
      .then((data) => {
        console.log(
          'SANITY PRODUCTS:',
          data.map((item) => ({
            name: item.name,
            sanityCategory: item.category,
            websiteCategory: normalizeCategory(item.category),
          }))
        );

        if (!data || data.length === 0) {
          setProducts(PRODUCTS);
          setIsLoading(false);
          return;
        }

        const mapped: Product[] = data.map((item) => {
          let imageUrl = '';

          if (item.image) {
            const imgBuilder = urlFor(item.image);

            if (imgBuilder) {
              imageUrl = imgBuilder
                .width(900)
                .auto('format')
                .url();
            }
          }

          if (!imageUrl) {
            imageUrl =
              'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800';
          }

          const category = normalizeCategory(item.category);

          return {
            id: item._id,
            name: item.name || 'Untitled Jewelry',
            category,
            price: item.price || '₹0',
            originalPrice: item.originalPrice,
            description: item.description || '',
            purity: item.purity || '22K Hallmarked',
            weight: item.weight || 'N/A',
            isFeatured: !!item.isFeatured,
            rating: item.rating ?? 5,
            image: imageUrl,
          };
        });

        const mergedMap = new Map<string, Product>();

        mapped.forEach((product) => {
          mergedMap.set(product.id, product);
        });

        PRODUCTS.forEach((product) => {
          if (!mergedMap.has(product.id)) {
            mergedMap.set(product.id, product);
          }
        });

        const finalProducts = Array.from(mergedMap.values());

        console.log(
          'FINAL PRODUCTS BY CATEGORY:',
          {
            bridal: finalProducts.filter(p => p.category === 'bridal'),
            gold: finalProducts.filter(p => p.category === 'gold'),
            diamond: finalProducts.filter(p => p.category === 'diamond'),
            silver: finalProducts.filter(p => p.category === 'silver'),
            ring: finalProducts.filter(p => p.category === 'ring'),
            necklace: finalProducts.filter(p => p.category === 'necklace'),
            bracelet: finalProducts.filter(p => p.category === 'bracelet'),
          }
        );

        setProducts(finalProducts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(
          'Sanity fetch notice:',
          err
        );

        setError(
          err.message || 'Failed to load products from Sanity.'
        );

        setProducts(PRODUCTS);
        setIsLoading(false);
      });
  }, []);

  return {
    products,
    isLoading,
    error,
  };
}