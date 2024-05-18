"use client";

import { InitialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
  initialProduct: InitialProducts;
}

const ProductList = ({ initialProduct }: ProductListProps) => {
  const [products, setProducts] = useState(initialProduct);
  const [isLoading, setLoading] = useState(false);
  const onLoadMore = async () => {
    setLoading(true);
    const newProducts = await getMoreProducts(1);
    setProducts((prev) => [...prev, ...newProducts]);
    setLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="p-2 rounded-md text-sm font-semibold bg-orange-500 w-fit mx-auto disabled:bg-neutral-600 disabled:cursor-not-allowed active:scale-90"
      >
        {isLoading ? "더 불러오는 중.." : "더 불러오기"}
      </button>
    </div>
  );
};

export default ProductList;
