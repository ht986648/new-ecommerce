import { prisma } from '@/lib/db/prisma';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
  });

  if (products.length === 0) {
    return <p className="p-4">No products available.</p>;
  }

  const [heroProduct, ...otherProducts] = products;

  return (
    <div className="p-4 space-y-12">
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Featured Product</h1>

        <div className="bg-base-100 shadow-xl w-full max-w-6xl  max-h-9xl flex flex-col md:flex-row overflow-hidden rounded-lg">
          {/* Image Section */}
          <div className="relative md:w-1/2 w-full h-96 md:h-[500px]">
  <Image
    src={heroProduct.imageUrl}
    alt={heroProduct.name}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>


          {/* Content Section */}
          <div className="p-6 flex flex-col justify-between md:w-1/2">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{heroProduct.name}</h2>
              <p className="text-gray-600 mb-4">{heroProduct.description}</p>
            </div>
            <div className="self-end mt-4">

              <Link href={`/products/${heroProduct.id}`} className="badge badge-secondary">
                Check Out
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Other Products */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {otherProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
