import logo from "@/assets/logo.png";
import { getCart } from "@/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession, Session } from 'next-auth';
import { authOptions } from "@/auth/authOptions";

async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  
  return (
    <div className="bg-gradient-to-r from-base-100 to-base-200 shadow-lg border-b border-base-300">
      <div className="navbar m-auto max-w-7xl flex-col gap-3 sm:flex-row px-4 py-3">
        {/* Logo and Brand */}
        <div className="flex-1">
          <Link 
            href="/" 
            className="btn-ghost btn text-xl normal-case hover:bg-primary/10 transition-all duration-300 rounded-xl group"
          >
            <div className="relative">
              <Image 
                src={logo} 
                height={40} 
                width={40} 
                alt="Flowmazon logo" 
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
            </div>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold tracking-wide">
              Flowmazon
            </span>
          </Link>
        </div>

        {/* Search and Actions */}
        <div className="flex-none gap-3 flex items-center">
          {/* Enhanced Search Form */}
          <form action={searchProducts} className="relative group">
            <div className="form-control">
              <div className="relative">
                <input
                  name="searchQuery"
                  placeholder="Search products..."
                  className="input input-bordered w-full min-w-[200px] sm:min-w-[300px] pl-12 pr-4 
                           bg-base-100/80 backdrop-blur-sm border-2 border-base-300 
                           focus:border-primary focus:bg-base-100 focus:shadow-lg 
                           transition-all duration-300 rounded-xl
                           placeholder:text-base-content/60"
                />
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/60 group-focus-within:text-primary transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {/* Search Button */}
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary btn-sm 
                           hover:btn-secondary transition-all duration-300 rounded-lg
                           shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </form>

          {/* Action Buttons with Enhanced Styling */}
          <div className="flex items-center gap-2">
            <div className="hover:scale-105 transition-transform duration-200">
              <ShoppingCartButton cart={cart} />
            </div>
            <div className="hover:scale-105 transition-transform duration-200">
              <UserMenuButton session={session} />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom glow effect */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </div>
  );
}
