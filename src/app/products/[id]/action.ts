"use server";

import { getCart, createCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache'; // ✅ Required for revalidation
import React from 'react';

const incrementProductQuantityAction = async (productId: string) => {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find(item => item.productId === productId);

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id, // ✅ Prisma typically uses camelCase
        productId: productId,
        quantity: 1,
      },
    });
  }

  revalidatePath('/products/[id]'); // ✅ Fixed quote
};

export default incrementProductQuantityAction;
