import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon, getProduct } from "@/lib/utils";
import {
  ChevronLeftIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

const getCachedProduct = nextCache(getProduct, ["product-detail"], {
  tags: ["product-detail"],
});

async function getProductTitle(id: number) {
  console.log("title");
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });
  return product;
}

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
  tags: ["product-title"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = await getCachedProductTitle(id);
  if (!product) return;
  return {
    title: product.title,
  };
}

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const product = await getCachedProduct(id);
  if (!product) return notFound();
  const session = await getSession();
  const isOwner = session.id === product.userId;
  const onDelete = async () => {
    "use server";
    if (!isOwner) return;
    revalidateTag("product-title");
    // await db.product.delete({
    //   where: {
    //     id,
    //   },
    //   select: null,
    // });
    // redirect("/home");
  };
  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          src={`${product.photo}/public`}
          alt={product.title}
          className="object-cover"
        />
      </div>
      <div className="px-3 py-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full overflow-hidden">
          {product.user.avatar ? (
            <Image
              src={product.user.avatar}
              alt={product.user.username}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <UserIcon className="" />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="px-3 py-5 ">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full max-w-md bottom-0 mx-auto p-5 bg-neutral-800 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link href="/home">
            <ChevronLeftIcon className="size-9" />
          </Link>
          <span className="font-semibold text-xl">
            {formatToWon(product.price)}원
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
            href={``}
          >
            채팅하기
          </Link>
          {isOwner ? (
            <form action={onDelete}>
              <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold flex items-center justify-center">
                <TrashIcon className="size-6" />
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
