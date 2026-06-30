/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'gold' | 'diamond' | 'bridal' | 'silver';
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  isFeatured: boolean;
  description: string;
  purity: string;
  weight?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface LuxuryFeature {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to dynamically map Lucide icons
}
