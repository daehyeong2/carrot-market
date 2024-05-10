"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

const CreateAccount = () => {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="Email" required />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
        />
        <FormButton text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
};

export default CreateAccount;
