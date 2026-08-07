import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';
import { Product, ProductCategory } from '../types';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sanityClient) {
      setError('Add your Sanity project ID and dataset in the environment variables to enable product syncing.');
      setIsLoading(false);
      return;
    }

    const query = `*[_type == "product" && isListed == true] | order(isFeatured desc, _createdAt desc){ _id, name, category, price, originalPrice, description, purity, weight, isFeatured, isListed, rating, image }`;

    sanityClient.fetch<SanityProductResponse[]>(query)
      .then((data) => {
        const mapped = data.map((item) => ({
          id: item._id,
          name: item.name,
          category: item.category,
          price: item.price,
          originalPrice: item.originalPrice,
          description: item.description,
          purity: item.purity,
          weight: item.weight,
          isFeatured: item.isFeatured,
          rating: item.rating ?? 0,
          image: item.image ? urlFor(item.image).width(900).auto('format').url() : '',
        }));
        setProducts(mapped);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load products from Sanity.');
        setIsLoading(false);
      });
  }, []);

  return { products, isLoading, error };
}
