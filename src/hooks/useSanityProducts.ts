import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data';

interface SanityProductResponse {
  _id: string;
  name: string;
  category: ProductCategory;
  price: string;
  originalPrice?: string;
  description: string;
  purity: string;
  weight?: string;
  isFeatured: boolean;
  isListed: boolean;
  rating?: number;
  image?: { _type: 'image'; asset: { _ref: string } } | null;
}

export function useSanityProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sanityClient) {
      setError('Add your Sanity project ID and dataset in the environment variables to enable product syncing.');
      setProducts(PRODUCTS);
      setIsLoading(false);
      return;
    }

    const query = `*[_type == "product" && isListed == true] | order(isFeatured desc, _createdAt desc){ _id, name, category, price, originalPrice, description, purity, weight, isFeatured, isListed, rating, image }`;

    sanityClient
      .fetch<SanityProductResponse[]>(query)
      .then((data) => {
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
              imageUrl = imgBuilder.width(900).auto('format').url();
            }
          }
          if (!imageUrl) {
            imageUrl = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800';
          }

          return {
            id: item._id,
            name: item.name || 'Untitled Jewelry',
            category: item.category || 'gold',
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

        // Merge Sanity products with default catalog products so full catalog is always available
        const mergedMap = new Map<string, Product>();
        mapped.forEach((p) => mergedMap.set(p.id, p));
        PRODUCTS.forEach((p) => {
          if (!mergedMap.has(p.id)) {
            mergedMap.set(p.id, p);
          }
        });

        setProducts(Array.from(mergedMap.values()));
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn('Sanity fetch notice (using local catalog fallback):', err);
        setError(err.message || 'Failed to load products from Sanity.');
        setProducts(PRODUCTS);
        setIsLoading(false);
      });
  }, []);

  return { products, isLoading, error };
}
