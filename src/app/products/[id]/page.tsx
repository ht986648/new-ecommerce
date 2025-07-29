import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import PriceTag from '../../../components/PriceTag';
import AddToCartButton from './AddToCartButton';
import { FaShoppingCart } from 'react-icons/fa';
import incrementProductQuantityAction from './action';
import React from 'react';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await prisma.product.findUnique({
    where: { id: (await params).id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="card bg-base-100 shadow-2xl border border-base-300">
        <figure className="relative w-full h-64">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body p-6 space-y-4">
          <h2 className="card-title text-2xl font-semibold text-neutral">
            {product.name}
          </h2>

          <PriceTag price={product.price} />

          <p className="text-sm text-gray-600">{product.description}</p>

          <AddToCartButton
            productId={product.id}
            incrementProductQuantityAction={incrementProductQuantityAction}
          />

          <div className="card-actions justify-end">
            <button className="btn btn-accent gap-2">
              <FaShoppingCart className="text-lg" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
