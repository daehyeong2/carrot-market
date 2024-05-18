import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

const ProductsPage = async () => {
  const initialProducts = await getInitialProducts();
  return (
    <>
      <h1 className="text-white text-4xl">Products</h1>
      <div>
        <ProductList initialProduct={initialProducts} />
      </div>
    </>
  );
};

export default ProductsPage;
