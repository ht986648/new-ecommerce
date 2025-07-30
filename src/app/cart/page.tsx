import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/formatPrice";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import Link from "next/link";
import { FaShoppingCart, FaArrowLeft, FaLock, FaTruck, FaGift, FaTrash, FaHeart, FaCreditCard } from "react-icons/fa";

// ✅ Mark this page as dynamic because it uses `cookies()` internally
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your Cart - Flowmazon",
};

export default async function CartPage() {
  const cart = await getCart();
  const hasItems = cart && cart.items.length > 0;
  const itemCount = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;
  
  // Calculate potential savings (mock data for demonstration)
  const originalTotal = cart ? cart.subtotal * 1.25 : 0;
  const savings = originalTotal - (cart?.subtotal || 0);

  if (!hasItems) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Empty Cart State */}
          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto flex items-center justify-center">
                <FaShoppingCart className="text-6xl text-base-content/30" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-error rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">0</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-base-content mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-base-content/70 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/" 
                className="btn btn-primary btn-lg gap-2 hover:btn-primary-focus hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <FaArrowLeft />
                Continue Shopping
              </Link>
              
              <div className="flex justify-center gap-4 text-sm text-base-content/60">
                <div className="flex items-center gap-1">
                  <FaTruck className="text-success" />
                  <span>Free Shipping Over $50</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaLock className="text-info" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-base-content/70 mb-4">
            <Link href="/" className="hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <span>Shopping Cart</span>
          </div>

          {/* Page Title */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-focus rounded-2xl flex items-center justify-center shadow-lg">
                  <FaShoppingCart className="text-2xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-error rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{itemCount}</span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-base-content">Shopping Cart</h1>
                <p className="text-lg text-base-content/70">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
            
            <Link 
              href="/" 
              className="btn btn-outline gap-2 hover:btn-primary transition-all duration-300"
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-xl border border-base-300/50">
              <div className="card-body p-0">
                {/* Cart Header */}
                <div className="flex items-center justify-between p-6 border-b border-base-300">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-sm gap-1 hover:text-error">
                      <FaTrash />
                      Clear All
                    </button>
                    <button className="btn btn-ghost btn-sm gap-1 hover:text-info">
                      <FaHeart />
                      Save for Later
                    </button>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-base-300">
                  {cart.items.map((cartItem, index) => (
                    <div 
                      key={cartItem.id}
                      className="opacity-0 animate-fade-in-up"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <CartEntry
                        cartItem={cartItem}
                        setProductQuantity={setProductQuantity}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="card bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaGift className="text-primary" />
                  You might also like
                </h3>
                <p className="text-sm text-base-content/70">
                  Based on items in your cart, we recommend checking out our featured products.
                </p>
                <div className="mt-4">
                  <Link href="/" className="btn btn-outline btn-sm">
                    View Recommendations
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="card bg-base-100 shadow-xl border border-base-300/50 sticky top-4">
              <div className="card-body p-6 space-y-6">
                <h2 className="text-xl font-semibold border-b border-base-300 pb-3">
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Subtotal ({itemCount} items)</span>
                    <span className="font-medium">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Shipping</span>
                    <span className="font-medium text-success">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Tax</span>
                    <span className="font-medium">{formatPrice(cart.subtotal * 0.08)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-success">
                      <span>You Save</span>
                      <span className="font-semibold">-{formatPrice(savings)}</span>
                    </div>
                  )}
                  
                  <div className="divider my-2"></div>
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(cart.subtotal + (cart.subtotal * 0.08))}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="btn btn-primary btn-lg w-full gap-2 hover:btn-primary-focus hover:scale-105 transition-all duration-300 shadow-lg">
                  <FaLock />
                  Secure Checkout
                </button>

                {/* Payment Methods */}
                <div className="text-center space-y-3 pt-4 border-t border-base-300">
                  <p className="text-sm text-base-content/70">We accept</p>
                  <div className="flex justify-center gap-2">
                    {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((method) => (
                      <div key={method} className="badge badge-outline text-xs">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Code Card */}
            <div className="card bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
              <div className="card-body p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FaGift className="text-success" />
                  Promo Code
                </h3>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Enter promo code" 
                    className="input input-bordered w-full input-sm"
                  />
                  <button className="btn btn-success btn-sm w-full">
                    Apply Code
                  </button>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="card bg-gradient-to-br from-info/5 to-info/10 border border-info/20">
              <div className="card-body p-6">
                <h3 className="font-semibold mb-4 text-info">Why Shop With Us?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <FaLock className="text-success" />
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaTruck className="text-info" />
                    <span>Free shipping over $50</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCreditCard className="text-warning" />
                    <span>Easy returns within 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
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
