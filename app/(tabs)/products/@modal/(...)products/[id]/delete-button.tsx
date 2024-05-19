"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { onDelete } from "./actins";

const DeleteButton = ({ id, isOwner }: { id: number; isOwner: boolean }) => {
  const onClick = async () => {
    await onDelete(id, isOwner);
    window.location.href = "/products";
  };
  return (
    <form action={onClick}>
      <button className="bg-red-500 px-2.5 py-1.5 rounded-md text-white font-semibold flex items-center justify-center">
        <TrashIcon className="size-6" />
      </button>
    </form>
  );
};

export default DeleteButton;
