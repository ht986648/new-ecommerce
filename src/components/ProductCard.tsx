import React from 'react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import PriceTag from './PriceTag';
import { FaHeart, FaEye, FaShoppingCart, FaStar, FaFire } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;
  
  // Mock rating for demonstration (you can replace with actual rating from database)
  const rating = 4.2;
  const reviewCount = Math.floor(Math.random() * 100) + 10;
  
  return (
    <div className="group relative">
      {/* Card Container */}
      <div className="card w-full bg-base-100 shadow-lg border border-base-300/50 hover:shadow-2xl hover:border-primary/30 transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
        {/* Image Section */}
        <figure className="relative overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.imageUrl}
              alt={product.name || 'Product Image'}
              width={500}
              height={240}
              className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <div className="badge badge-success shadow-lg text-white font-semibold px-3 py-2 animate-pulse">
                <FaFire className="mr-1" />
                NEW
              </div>
            )}
            <div className="badge badge-error shadow-lg text-white font-semibold px-3 py-2">
              20% OFF
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <button className="btn btn-circle btn-sm bg-base-100/90 border-none shadow-lg hover:bg-base-100 hover:scale-110 transition-all duration-200 tooltip tooltip-left" data-tip="Add to Wishlist">
              <FaHeart className="text-error" />
            </button>
            <Link 
              href={`/products/${product.id}`}
              className="btn btn-circle btn-sm bg-base-100/90 border-none shadow-lg hover:bg-base-100 hover:scale-110 transition-all duration-200 tooltip tooltip-left" 
              data-tip="Quick View"
            >
              <FaEye className="text-info" />
            </Link>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button className="btn btn-primary btn-sm gap-2 shadow-lg hover:btn-primary-focus">
              <FaShoppingCart />
              Quick Add
            </button>
          </div>
        </figure>

        {/* Content Section */}
        <div className="card-body p-6 space-y-4">
          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-warning">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`text-xs ${i < Math.floor(rating) ? 'text-warning' : 'text-base-300'}`} 
                />
              ))}
            </div>
            <span className="text-base-content/70">({reviewCount})</span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.id}`}>
            <h2 className="card-title text-lg font-bold hover:text-primary transition-colors duration-200 line-clamp-2 leading-tight">
              {product.name}
            </h2>
          </Link>

          {/* Description */}
          <p className="text-base-content/70 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <PriceTag price={product.price} className="text-xl font-bold" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-base-content/50 line-through">
                  ${(product.price * 1.25).toFixed(2)}
                </span>
                <span className="text-xs text-success font-semibold">Save 20%</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-success font-medium">✓ In Stock</div>
              <div className="text-xs text-base-content/60">Fast Shipping</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card-actions justify-between items-center pt-2">
            <Link 
              href={`/products/${product.id}`}
              className="btn btn-outline btn-sm hover:btn-primary transition-all duration-300"
            >
              View Details
            </Link>
            <button className="btn btn-primary btn-sm gap-2 hover:btn-primary-focus hover:scale-105 transition-all duration-300 shadow-md">
              <FaShoppingCart />
              Buy Now
            </button>
          </div>
        </div>

        {/* Bottom Highlight Bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Floating Sale Badge */}
      <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-error to-error-focus rounded-full flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
        <span className="text-white text-xs font-bold">SALE</span>
      </div>
    </div>
  );
};

export default ProductCard;
