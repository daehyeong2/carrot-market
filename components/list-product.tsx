import Image from "next/image";
import Link from "next/link";

interface IListProductPromps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

const ListProduct = ({
  title,
  price,
  created_at,
  photo,
  id,
}: IListProductPromps) => {
  return (
    <Link href={`/products/${id}`} className="">
      <div className="flex gap-5">
        <div className="relative w-52">
          <Image fill src={photo} alt={title} />
        </div>
        <div className="flex flex-col gap-1 *:text-white">
          <span className="text-xl">{title}</span>
          <span className="text-lg font-semibold">{price}</span>
          <span className="text-sm text-neutral-500">{created_at + ""}</span>
        </div>
      </div>
    </Link>
  );
};

export default ListProduct;
