async function getProduct() {
  await new Promise((resolve) => setTimeout(resolve, 60000));
}

const ProductDetail = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await getProduct();
  return <span>Product detail of the product {id}</span>;
};

export default ProductDetail;
