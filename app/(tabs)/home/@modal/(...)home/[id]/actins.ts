"use server";

import db from "@/lib/db";

export const onDelete = async (id: number, isOwner: boolean) => {
  if (!isOwner) return;
  await db.product.delete({
    where: {
      id,
    },
    select: null,
  });
};
