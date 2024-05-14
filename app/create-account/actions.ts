"use server";

import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "이름은 문자열이 되어야 합니다.",
        required_error: "이름은 필수 항목입니다.",
      })
      .trim()
      .refine(checkUniqueUsername, "이 이름은 이미 사용 중인 이름입니다."),
    email: z
      .string({
        invalid_type_error: "이메일은 문자열이 되어야 합니다.",
        required_error: "이메일은 필수 항목입니다.",
      })
      .email()
      .toLowerCase()
      .refine(checkUniqueEmail, "이 이메일은 이미 사용 중인 이메일입니다."),
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
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const cookie = await getIronSession(cookies(), {
      cookieName: "session",
      password: process.env.COOKIE_SECRET!,
    });
    //@ts-ignore
    cookie.id = user.id;
    await cookie.save();

    redirect("/profile");
  }
};
