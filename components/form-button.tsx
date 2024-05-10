"use client";

import { useFormStatus } from "react-dom";

interface IFormButtonProps {
  text: string;
}

const FormButton = ({ text }: IFormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 font-semibold disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중.." : text}
    </button>
  );
};

export default FormButton;
