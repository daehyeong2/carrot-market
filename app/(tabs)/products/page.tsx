async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}

const ProductsPage = async () => {
  const products = await getProducts();
  return <h1 className="text-white text-4xl">Products</h1>;
};

export default ProductsPage;
