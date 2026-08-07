import React from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  category?: string;
}

export default function ProductCard({ name, price, image, category }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="aspect-square bg-stone-100">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-500">No image</div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-600">{category || 'Jewellery'}</p>
        <h3 className="text-lg font-semibold text-stone-900">{name}</h3>
        <p className="text-sm font-medium text-stone-700">{price}</p>
      </div>
    </div>
  );
}
