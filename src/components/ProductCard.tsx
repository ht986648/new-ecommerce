import React from 'react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import PriceTag from './PriceTag';
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <Link href={`/products/${product.id}`} className="card w-full max-w-sm bg-base-100 hover:shadow-xl">
      <div className="shadow-sm">
        <figure>
          <Image
            src={product.imageUrl}
            alt={product.name || 'Product Image'}
            width={500}
            height={192}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.name}
            {isNew && <span className="badge badge-success ml-2">NEW</span>}
          </h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
          <PriceTag price={product.price}/>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
