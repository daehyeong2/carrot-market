"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
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
      .trim()
      .refine(checkUsername, "potato는 허용되지 않습니다."),
    email: z
      .string({
        invalid_type_error: "이메일은 문자열이 되어야 합니다.",
        required_error: "이메일은 필수 항목입니다.",
      })
      .email()
      .toLowerCase(),
    password: z
      .string({
        invalid_type_error: "비밀번호는 문자열이 되어야 합니다.",
        required_error: "비밀번호는 필수 항목입니다.",
      })
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}글자 이상 입력해 주세요.`
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string({
        invalid_type_error: "확인 비밀번호는 문자열이 되어야 합니다.",
        required_error: "확인 비밀번호는 필수 항목입니다.",
      })
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}글자 이상 입력해 주세요.`
      ),
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
  } else {
    console.log(result.data);
  }
};
