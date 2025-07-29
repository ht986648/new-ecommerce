import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/formatPrice";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";

// ✅ Mark this page as dynamic because it uses `cookies()` internally
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your Cart - Flowmazon",
};

export default async function CartPage() {
  const cart = await getCart();

  const hasItems = cart && cart.items.length > 0;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

      {hasItems ? (
        <>
          {cart.items.map((cartItem) => (
            <CartEntry
              cartItem={cartItem}
              key={cartItem.id}
              setProductQuantity={setProductQuantity}
            />
          ))}
          <div className="flex flex-col items-end sm:items-center">
            <p className="mb-3 font-bold">
              Total: {formatPrice(cart.subtotal)}
            </p>
            <button className="btn-primary btn sm:w-[200px]">Checkout</button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
