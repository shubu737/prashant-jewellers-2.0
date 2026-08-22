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

/**
 * Converts Sanity category values into the exact values
 * expected by the frontend.
 *
 * Supports both the NEW values and OLD values already
 * stored in existing Sanity products.
 */
function normalizeCategory(category?: string): ProductCategory {
  const value = category?.toLowerCase().trim();

  switch (value) {
    // Kundan & Bridal
    case 'bridal':
    case 'kundan-bridal':
    case 'kundan & bridal':
    case 'kundan and bridal':
      return 'bridal';

    // Royal Gold
    case 'gold':
    case 'royal-gold':
    case 'royal gold':
      return 'gold';

    // Flawless Diamonds
    case 'diamond':
    case 'flawless-diamonds':
    case 'flawless diamonds':
      return 'diamond';

    // Fine Silver
    case 'silver':
    case 'fine-silver':
    case 'fine silver':
      return 'silver';

    // Rings
    case 'ring':
    case 'rings':
      return 'ring';

    // Necklaces
    case 'necklace':
    case 'necklaces':
      return 'necklace';

    // Bracelets
    case 'bracelet':
    case 'bracelets':
      return 'bracelet';

    // "All Jewelry" should NOT be a product category.
    // Use gold as a safe fallback for old/invalid products.
    case 'all-jewelry':
    case 'all jewelry':
    case 'all':
    default:
      console.warn(
        `Unknown Sanity category "${category}". Falling back to "gold".`
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
        'Add your Sanity project ID and dataset in the environment variables to enable product syncing.'
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
            categoryFromSanity: item.category,
            categoryForWebsite: normalizeCategory(item.category),
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

          return {
            id: item._id,
            name: item.name || 'Untitled Jewelry',

            // IMPORTANT:
            // Normalize Sanity category before the product
            // reaches Collections.tsx.
            category: normalizeCategory(item.category),

            price: item.price || '₹0',
            originalPrice: item.originalPrice,
            description: item.description || '',
            purity: item.purity || '22K Hallmarked',
            weight: item.weight || 'N/A',
            isFeatured: !!item.isFeatured,
            rating: item.rating ?? 5.0,
            image: imageUrl,
          };
        });

        // Keep local catalog products as fallback/additional products.
        const mergedMap = new Map<string, Product>();

        mapped.forEach((product) => {
          mergedMap.set(product.id, product);
        });

        PRODUCTS.forEach((product) => {
          if (!mergedMap.has(product.id)) {
            mergedMap.set(product.id, product);
          }
        });

        setProducts(Array.from(mergedMap.values()));
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(
          'Sanity fetch notice (using local catalog fallback):',
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