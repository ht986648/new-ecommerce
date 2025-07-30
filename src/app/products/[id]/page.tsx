import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import PriceTag from '../../../components/PriceTag';
import AddToCartButton from './AddToCartButton';
import { FaShoppingCart, FaHeart, FaShare, FaStar, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
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
    <div className="min-h-screen bg-gradient-to-br from-base-200/50 to-base-300/30 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li><a href="/" className="text-primary hover:text-primary-focus">Home</a></li>
            <li><a href="/products" className="text-primary hover:text-primary-focus">Products</a></li>
            <li className="text-base-content/70">{product.name}</li>
          </ul>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden group">
              <figure className="relative w-full h-96 lg:h-[500px] overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Action buttons overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <button className="btn btn-circle btn-sm bg-base-100/90 border-none shadow-lg hover:bg-base-100 hover:scale-110 transition-all duration-200">
                    <FaHeart className="text-error" />
                  </button>
                  <button className="btn btn-circle btn-sm bg-base-100/90 border-none shadow-lg hover:bg-base-100 hover:scale-110 transition-all duration-200">
                    <FaShare className="text-info" />
                  </button>
                </div>
              </figure>
            </div>

            {/* Trust badges */}
            <div className="flex justify-center gap-4 text-xs text-base-content/60">
              <div className="flex items-center gap-1">
                <FaTruck className="text-success" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <FaShieldAlt className="text-warning" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUndo className="text-info" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body p-8 space-y-6">
                {/* Product Title & Rating */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-3xl lg:text-4xl font-bold text-base-content leading-tight">
                      {product.name}
                    </h1>
                    <div className="badge badge-primary badge-lg font-semibold">
                      NEW
                    </div>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-warning">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < 4 ? "text-warning" : "text-base-300"} />
                      ))}
                    </div>
                    <span className="text-sm text-base-content/70">(4.0) • 124 reviews</span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <PriceTag price={product.price} className="text-4xl font-bold" />
                    <span className="text-xl text-base-content/50 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                    <div className="badge badge-error text-white font-semibold">
                      20% OFF
                    </div>
                  </div>
                  <p className="text-sm text-success font-medium">
                    ✓ In stock and ready to ship
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-base-content">Description</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-base-content/80 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-base-content">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-base-content/70">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      High Quality Materials
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Premium Design
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Fast Delivery
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Satisfaction Guaranteed
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4 border-t border-base-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <AddToCartButton
                      productId={product.id}
                      incrementProductQuantityAction={incrementProductQuantityAction}
                      className="btn btn-primary btn-lg gap-2 hover:btn-primary-focus hover:scale-105 transition-all duration-200 shadow-lg"
                    />
                    <button className="btn btn-accent btn-lg gap-2 hover:btn-accent-focus hover:scale-105 transition-all duration-200 shadow-lg">
                      <FaShoppingCart className="text-lg" />
                      Buy Now
                    </button>
                  </div>
                  
                  {/* Secondary Actions */}
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-outline btn-sm gap-1 hover:scale-105 transition-transform duration-200">
                      <FaHeart />
                      Add to Wishlist
                    </button>
                    <button className="btn btn-outline btn-sm gap-1 hover:scale-105 transition-transform duration-200">
                      <FaShare />
                      Share
                    </button>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-success/10 border border-success/20 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-success flex items-center gap-2">
                    <FaTruck />
                    Free Shipping & Returns
                  </h4>
                  <p className="text-sm text-base-content/70">
                    Free standard shipping on orders over $50. Free returns within 30 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Tabs */}
        <div className="mt-12">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-8">
              <div className="tabs tabs-lifted">
                <input type="radio" name="product_tabs" role="tab" className="tab" aria-label="Reviews" defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    <div className="border-b border-base-300 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-warning">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <span className="font-semibold">John D.</span>
                        <span className="text-sm text-base-content/60">Verified Purchase</span>
                      </div>
                      <p className="text-base-content/80">
                        "Excellent product! Exactly as described and arrived quickly. Highly recommend!"
                      </p>
                    </div>
                  </div>
                </div>

                <input type="radio" name="product_tabs" role="tab" className="tab" aria-label="Specifications" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-base-content/70">Brand:</span>
                        <span className="font-medium">Flowmazon</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/70">Model:</span>
                        <span className="font-medium">{product.id}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <input type="radio" name="product_tabs" role="tab" className="tab" aria-label="Shipping" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                  <div className="space-y-3 text-sm">
                    <p><strong>Standard Shipping:</strong> 5-7 business days (Free over $50)</p>
                    <p><strong>Express Shipping:</strong> 2-3 business days ($9.99)</p>
                    <p><strong>Overnight Shipping:</strong> Next business day ($19.99)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
