"use server";

import { z } from "zod";
import fs from "fs/promises";
import { File } from "buffer";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
  photo: z.string({
    required_error: "사진은 필수입니다.",
  }),
  title: z
    .string({
      required_error: "제목을 입력해 주세요.",
      invalid_type_error: "파일을 업로드해 주세요.",
    })
    .min(3, "제목을 최소 3자 이상 입력해 주세요."),
  description: z
    .string({
      required_error: "설명을 입력해 주세요.",
    })
    .min(3, "설명을 최소 3자 이상 입력해 주세요."),
  price: z.coerce
    .number({
      required_error: "가격을 입력해 주세요.",
    })
    .min(1, "가격을 1원 이상 입력해 주세요."),
});

export async function uploadProduct(_: any, formData: FormData) {
  const session = await getSession();
  if (!session.id) return;
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const product = await db.product.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        price: result.data.price,
        photo: result.data.photo,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/products/${product.id}`);
  }
}
