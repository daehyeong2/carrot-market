import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";
import Link from "next/link";

const getCachedProducts = nextCache(getInitialProducts, ["home-products"]);

export const revalidate = 30;

async function getInitialProducts() {
  console.log("hit.");
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: "Home",
};

const ProductsPage = async () => {
  const initialProducts = await getInitialProducts();
  return (
    <>
      <h1 className="text-white text-4xl">Products</h1>
      <div>
        <ProductList initialProduct={initialProducts} />
      </div>
      <Link
        href="/home/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 left-0 right-0 mx-auto translate-x-36 sm:translate-x-44 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </>
  );
};

export default ProductsPage;
