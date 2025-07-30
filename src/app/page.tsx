import { prisma } from '@/lib/db/prisma';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaArrowRight, FaFire, FaTags, FaShippingFast } from 'react-icons/fa';

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
  });

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
        <div className="text-center space-y-4">
          <div className="text-6xl">🛍️</div>
          <p className="text-xl text-base-content/70">No products available yet.</p>
          <p className="text-sm text-base-content/50">Check back soon for amazing deals!</p>
        </div>
      </div>
    );
  }

  const [heroProduct, ...otherProducts] = products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        </div>
        
        <div className="relative px-4 py-12 lg:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Hero Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <FaFire className="animate-pulse" />
                Featured Product
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
                Discover Amazing Products
              </h1>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Explore our curated collection of premium products, handpicked just for you
              </p>
            </div>

            {/* Hero Product Card */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative bg-base-100 shadow-2xl border border-base-300/50 backdrop-blur-sm rounded-2xl overflow-hidden max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  <div className="relative lg:w-3/5 w-full h-80 lg:h-[600px] overflow-hidden">
                    <Image
                      src={heroProduct.imageUrl}
                      alt={heroProduct.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent lg:bg-gradient-to-t lg:from-transparent lg:via-transparent lg:to-black/10"></div>
                    
                    {/* Floating Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <div className="badge badge-error shadow-lg text-white font-semibold">
                        HOT DEAL
                      </div>
                      <div className="badge badge-success shadow-lg text-white font-semibold">
                        FREE SHIPPING
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-6 right-6 bg-base-100/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-warning text-sm" />
                        <span className="text-sm font-semibold">4.8</span>
                        <span className="text-xs text-base-content/60">(124)</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-base-100 to-base-200/50">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="badge badge-primary">NEW ARRIVAL</div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4 leading-tight">
                          {heroProduct.name}
                        </h2>
                        <p className="text-base-content/70 text-lg leading-relaxed">
                          {heroProduct.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-base-content/70">
                          <FaShippingFast className="text-success" />
                          <span>Free shipping & fast delivery</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-base-content/70">
                          <FaTags className="text-warning" />
                          <span>Best price guaranteed</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-8 space-y-4">
                      <Link 
                        href={`/products/${heroProduct.id}`}
                        className="btn btn-primary btn-lg w-full gap-2 hover:btn-primary-focus hover:scale-105 transition-all duration-300 shadow-lg group/btn"
                      >
                        <span>Explore Now</span>
                        <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                      
                      <div className="text-center">
                        <span className="text-sm text-base-content/60">
                          ⚡ Limited time offer - Act fast!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="px-4 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FaTags />
              More Products
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
              Explore Our Collection
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Discover more amazing products carefully selected for quality and value
            </p>
          </div>

          {/* Products Grid */}
          {otherProducts.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {otherProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="opacity-0 animate-fade-in-up"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎁</div>
              <p className="text-lg text-base-content/70">More amazing products coming soon!</p>
            </div>
          )}
          
          {/* Load More Button */}
          {otherProducts.length > 8 && (
            <div className="text-center mt-12">
              <button className="btn btn-outline btn-lg gap-2 hover:btn-primary hover:scale-105 transition-all duration-300">
                <span>Load More Products</span>
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-focus rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaShippingFast className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-base-content/70">Free delivery on orders over $50</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-success-focus rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaStar className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-base-content/70">Premium products with warranty</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-focus rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaTags className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-base-content/70">Competitive pricing every day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
