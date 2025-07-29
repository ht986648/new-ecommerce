import { Cart, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = CartWithProducts["items"][0];

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  try {
    const localCartId = (await cookies()).get("localCartId")?.value;

    if (!localCartId) {
      return null;
    }

    const cart = await prisma.cart.findUnique({
      where: { id: localCartId },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      return null;
    }

    return {
      ...cart,
      size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal: cart.items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      ),
    };
  } catch (error) {
    console.error("Error retrieving cart:", error);
    return null;
  }
}

export async function createCart(): Promise<ShoppingCart> {
  try {
    const session = await getServerSession(authOptions);
    const newCart = await prisma.cart.create({
      data: session?.user?.id ? { userId: session.user.id } : {},
    });

    (await cookies()).set("localCartId", newCart.id);

    return {
      ...newCart,
      items: [],
      size: 0,
      subtotal: 0,
    };
  } catch (error) {
    console.error("Error creating cart:", error);
    throw new Error("Failed to create cart");
  }
}
