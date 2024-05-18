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
  const [page, setPage] = useState(0);
  const [isLastPage, setLastPage] = useState(false);
  const onLoadMore = async () => {
    setLoading(true);
    const newProducts = await getMoreProducts(page + 1);
    if (newProducts.length === 0) return setLastPage(true);
    setProducts((prev) => [...prev, ...newProducts]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {!isLastPage ? (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="p-2 rounded-md text-sm font-semibold bg-orange-500 w-fit mx-auto disabled:bg-neutral-600 disabled:cursor-not-allowed active:scale-90"
        >
          {isLoading ? "더 불러오는 중.." : "더 불러오기"}
        </button>
      ) : (
        <span className="text-neutral-600 mx-auto">
          더 이상 상품이 없습니다.
        </span>
      )}
    </div>
  );
};

export default ProductList;
