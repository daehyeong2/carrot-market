"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";

const AddProduct = () => {
  const [preview, setPreview] = useState("");
  const [state, action] = useFormState(uploadProduct, null);
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    if (files.length !== 1) return alert("파일은 한개만 업로드해야 합니다.");
    const MB = 1024 * 1024; // 1 MB
    if (files[0].size > 5 * MB) return alert("파일은 최대 5MB입니다.");
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  return (
    <div>
      <form action={action} className="p-5 flex flex-col gap-3">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex flex-col items-center justify-center gap-3 text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="size-20" />
              <div className="text-sm text-neutral-400">
                사진을 추가해 주세요.
              </div>
            </>
          ) : null}
        </label>
        {state?.fieldErrors.photo?.map((error, index) => (
          <span key={index} className="text-red-500 font-medium">
            {error}
          </span>
        ))}
        <input
          type="file"
          id="photo"
          name="photo"
          className="hidden"
          accept="image/*"
          onChange={onImageChange}
          required
        />
        <Input
          name="title"
          required
          placeholder="제목"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          required
          placeholder="가격"
          type="number"
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          required
          placeholder="자세한 설명"
          type="text"
          errors={state?.fieldErrors.description}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
};

export default AddProduct;
