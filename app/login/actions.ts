"use server";
export const onSubmit = async (prevState: any, formData: FormData) => {
  return {
    errors: ["wrong password", "password too short"],
  };
};
