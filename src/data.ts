/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial, GalleryItem, LuxuryFeature } from './types';

export const STORE_INFO = {
  name: "Prashant Jewellers",
  tagline: "Timeless Elegance, Crafted for You",
  foundedYear: 1957,
  location: "Shop No. 2, Shopping Complex, Rawatbhata, Rajasthan - 323307",
  phone: "+91 96800 77124, +91 9414444025",
  whatsapp: "+919680077124",
  email: "info@prashantjewellers.com",
  timings: "Monday - Saturday: 11:00 AM to 9:00 PM (Sunday: Closed)",
  mapsIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14436.257045155985!2d75.67205799999999!3d24.96425985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396fc3d5966bfceb%3A0xe5a64a386cb69b30!2sRawatbhata%2C%20Rajasthan%20323307!5e0!3m2!1sen!2sin!4v1717891200000!5m2!1sen!2sin"
};

export const LUXURY_FEATURES: LuxuryFeature[] = [
  {
    id: "feat-1",
    title: "100% BIS 916 Hallmarked",
    description: "Every ornament carries the government-approved BIS Hallmark, proving supreme gold purity and ensuring certified authenticity.",
    iconName: "ShieldCheck"
  },
  {
    id: "feat-2",
    title: "Over 3 Decades of Legacy",
    description: "Established in 1993, Prashant Jewellers is built upon a foundation of trust, transparent rates, and Rajasthani hospitality.",
    iconName: "Award"
  },
  {
    id: "feat-3",
    title: "Bespoke Custom Orders",
    description: "Transform your unique vision into high-definition realities or bridal replicas custom crafted by our elite master smiths.",
    iconName: "Sparkles"
  },
  {
    id: "feat-4",
    title: "Transparent Valuation",
    description: "No hidden weight fees or synthetic blowups. You receive complete detailed slip invoices with laser-engraved details.",
    iconName: "Scale"
  }
];

export const PRODUCTS: Product[] = [
  // Bridal Collection
  {
    id: "p-bridal-1",
    name: "Kundan Mahal Emperor Choker",
    category: "bridal",
    price: "₹7,25,000",
    originalPrice: "₹7,80,000",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    isFeatured: true,
    description: "A breathtaking antique bridal collar crafted in 22 Karat certified yellow gold, featuring flawless uncut Kundan gemstones, imperial red spinels, and dangling natural Basra river pearls.",
    purity: "22K Yellow Gold (91.6% Purity)",
    weight: "112.4g"
  },
  {
    id: "p-bridal-2",
    name: "Mayur Imperial Polki Jhumkas",
    category: "bridal",
    price: "₹3,45,000",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    isFeatured: true,
    description: "Magnificent bridal temple earrings replicating the royal Indian dancing peacock, intricately layered with precious hand-cut Polki diamonds and dangling emerald clusters.",
    purity: "22K Gold & Natural Polki",
    weight: "48.2g"
  },
  {
    id: "p-bridal-3",
    name: "Royal Rajkumari Kundan Hathphool",
    category: "bridal",
    price: "₹2,65,000",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    isFeatured: false,
    description: "Elegant adjustable gold bracelet extending with masterfully crafted filigree chains to ring medallions, detailed in traditional Rajasthani Meenakari work.",
    purity: "22K Yellow Gold",
    weight: "35.8g"
  },

  // Diamond Collection
  {
    id: "p-diamond-1",
    name: "Astraea Marquise Diamond Band",
    category: "diamond",
    price: "₹1,85,000",
    originalPrice: "₹2,10,000",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    isFeatured: true,
    description: "A continuous ribbon of brilliance featuring marquise and round brilliant-cut diamonds. VVS1 clarity and E-color certification, set on an 18 Karat solid pristine white gold band.",
    purity: "18K White Gold (VVS-DF Diamonds)",
    weight: "4.5g (Total Carat: 1.8ct)"
  },
  {
    id: "p-diamond-2",
    name: "Elysian Solitaire Halo Ring",
    category: "diamond",
    price: "₹4,12,000",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    isFeatured: true,
    description: "An legendary 1.2 carat cushion-cut central diamond floating within an elegant double-layered halo of micro-pave diamonds on an exquisite ethical platinum band.",
    purity: "950 Platinum & Natural Diamond",
    weight: "6.2g (Total Carat: 2.15ct)"
  },
  {
    id: "p-diamond-3",
    name: "Aura Diamond Cascade Earrings",
    category: "diamond",
    price: "₹2,98,000",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    isFeatured: false,
    description: "Breathtaking chandelier-style drop earrings featuring precision-crafted diamond strands that capture and fracture every ray of ambient light.",
    purity: "18K White Gold",
    weight: "12.4g (Total Carat: 3.50ct)"
  },

  // Gold Collection
  {
    id: "p-gold-1",
    name: "Chandra Graha Antique Choker",
    category: "gold",
    price: "₹4,95,000",
    originalPrice: "₹5,20,000",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    isFeatured: true,
    description: "An ornate masterpiece embodying the crescent phases of the moon, complete with hand-etched micro-filigree borders and authentic Rajasthani nakshi reliefs.",
    purity: "22K Yellow Gold (91.6% BIS Hallmark)",
    weight: "74.5g"
  },
  {
    id: "p-gold-2",
    name: "Padma Vibhushit Kada Bangles",
    category: "gold",
    price: "₹3,15,000",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    isFeatured: false,
    description: "A pair of heavy gold bangles detailing nested lotus leaves with gorgeous red and green enamel inner trims, secured by an antique screw hinge closure.",
    purity: "22K Gold (91.6% Pure)",
    weight: "45.0g (Pair)"
  },
  {
    id: "p-gold-3",
    name: "Deva Shanti Filigree Ring",
    category: "gold",
    price: "₹68,500",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    isFeatured: false,
    description: "Intricately detailed 22 Karat gold band featuring openwork floral grids reminiscent of Udaipur palace jaali arches.",
    purity: "22K Yellow Gold",
    weight: "9.2g"
  },

  // Silver Collection
  {
    id: "p-silver-1",
    name: "Classic Rajputana Hansli Torc",
    category: "silver",
    price: "₹24,500",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    isFeatured: false,
    description: "A high-purity solid sterling silver classic Rajasthani neck torc, boasting polished mirrors and deep oxidized borders to represent historic desert elegance.",
    purity: "92.5 Sterling Silver (Oxidized)",
    weight: "145g"
  },
  {
    id: "p-silver-2",
    name: "Aura Zirconia Elegant Cuff",
    category: "silver",
    price: "₹18,200",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    isFeatured: true,
    description: "Stunning minimal open-front hand cuff layered with pristine Swiss cubic zirconia diamonds on double sterling silver branches, highly resistant to tarnishing.",
    purity: "92.5 Sterling Silver (Rhodium Plating)",
    weight: "22.6g"
  },
  {
    id: "p-silver-3",
    name: "Arali Emerald Cascade Ring",
    category: "silver",
    price: "₹12,800",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    isFeatured: false,
    description: "Fine luxury silver ring enclosing custom lab-grown royal emerald gemstones, displaying modern geometric edges.",
    purity: "92.5 Sterling Silver",
    weight: "6.8g"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Anjali Shekhawat",
    role: "Elite Kundan Patron",
    text: "For my daughter's wedding in Rawatbhata, we got the complete Kundan Maharani choker custom-designed from Prashant Jewellers. The final set surpassed all our dreams! Their pricing is highly honest, and their care for Rajasthan's royal craftsmanship is truly unmatched.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "t-2",
    name: "Rajesh Khandelwal",
    role: "Investor & Regular Buyer",
    text: "I trust nobody else but Prashant Jewellers for regular gold purchases. They always display their daily gold weights and charges with absolute honesty on digital scales, explaining the BIS Hallmark symbols. Incredible service for over 20 years.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "t-3",
    name: "Dr. Meenakshi Sharma",
    role: "Collector of Bridal Sets",
    text: "Prashant Jewellers is a rare gemstone brand in Rawatbhata! Their bespoke design sessions let us tweak the filigree gold work easily over digital consultations. Their 18K white gold range was absolutely mesmerizing, glowing beautifully under the bridal lights.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Master craftsmanship filigree design session",
    category: "Craftsmanship",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g-2",
    title: "Pristine cushion-cut diamonds reflection",
    category: "Diamonds",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g-3",
    title: "The royal bridal heritage showcase",
    category: "Bridal",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g-4",
    title: "Authentic Rajasthani gold smithing furnace",
    category: "Legacy",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g-5",
    title: "Luxury velvet collection trays",
    category: "Showcase",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "g-6",
    title: "Refined hand polished diamond bands",
    category: "Diamonds",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"
  }
];
