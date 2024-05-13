"use server";

import { z } from "zod";

function checkUsername(username: string) {
  return !username.includes("potato");
}

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "이름은 문자열이 되어야 합니다.",
        required_error: "이름은 필수 항목입니다.",
      })
      .min(3, "이름은 최소 3자 이상 입력해 주세요.")
      .max(10, "이름은 최대 10자 이하로 입력해 주세요.")
      .refine(checkUsername, "potato는 허용되지 않습니다."),
    email: z
      .string({
        invalid_type_error: "이메일은 문자열이 되어야 합니다.",
        required_error: "이메일은 필수 항목입니다.",
      })
      .email(),
    password: z
      .string({
        invalid_type_error: "비밀번호는 문자열이 되어야 합니다.",
        required_error: "비밀번호는 필수 항목입니다.",
      })
      .min(6, "비밀번호는 최소 6글자 이상 입력해 주세요."),
    confirm_password: z
      .string({
        invalid_type_error: "확인 비밀번호는 문자열이 되어야 합니다.",
        required_error: "확인 비밀번호는 필수 항목입니다.",
      })
      .min(6, "비밀번호는 최소 6글자 이상 입력해 주세요."),
  })
  .refine(checkPassword, {
    message: "확인 비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
};
