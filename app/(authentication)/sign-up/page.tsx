"use client";
import { signup } from "@/actions/authentication";
import PageContainer from "@/components/PageContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import ErrorInputMessage from "@/components/ErrorInputMessage";
import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import { signupSchema } from "@/utils/zodSchemas";
import { SignupFormData } from "@/utils/zodSchemas";
import { CgRename } from "react-icons/cg";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: SignupFormData) => {
    if (isSubmitting) return;

    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    try {
      await signup(formData);
    } catch (error) {
      console.error(error);
      const message = (error as Error).message;
      setError("root.serverError", { message });
    }
  };

  return (
    <div className='flex justify-center mt-8 max-w-xl mx-auto'>
      <PageContainer
        title='Sign Up'
        icon={<FaUserCircle />}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-[350px] mx-auto mt-6'
        >
          <div className='flex flex-col gap-4'>
            <label className='input input-bordered flex items-center gap-2'>
              <CgRename />
              <input
                type='text'
                className='grow'
                placeholder='Your full name'
                {...register("fullName")}
                disabled={isSubmitting}
              />
            </label>
            <ErrorInputMessage message={errors.fullName?.message} />
            <label className='input input-bordered flex items-center gap-2'>
              <FaCircleUser />
              <input
                type='text'
                className='grow'
                placeholder='Your username'
                {...register("username")}
                disabled={isSubmitting}
              />
            </label>
            <ErrorInputMessage message={errors.username?.message} />
            <label className='input input-bordered flex items-center gap-2'>
              <MdEmail />
              <input
                type='email'
                className='grow'
                placeholder='Your email'
                {...register("email")}
                disabled={isSubmitting}
              />
            </label>
            <ErrorInputMessage message={errors.email?.message} />
            <label className='input input-bordered flex items-center gap-2'>
              <MdLock />
              <input
                type={showPassword ? "text" : "password"}
                className='grow'
                placeholder='Your password'
                {...register("password")}
                disabled={isSubmitting}
              />
            </label>
            <ErrorInputMessage message={errors.password?.message} />
            <label className='input input-bordered flex items-center gap-2'>
              <MdLock />
              <input
                type={showPassword ? "text" : "password"}
                className='grow'
                placeholder='Confirm your password'
                {...register("confirmPassword")}
                disabled={isSubmitting}
              />
            </label>
            <label className='flex items-center justify-end gap-2'>
              <span className='text-sm'>Show password</span>
              <input
                type='checkbox'
                className='checkbox checkbox-sm'
                disabled={isSubmitting}
                onChange={() => setShowPassword(!showPassword)}
              />
            </label>
            <ErrorInputMessage message={errors.confirmPassword?.message} />
          </div>
          <button
            type='submit'
            className='btn btn-primary w-full mt-6'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
            <IoLogInOutline size={20} />
          </button>
          <div className='flex justify-center mt-2'>
            <ErrorInputMessage message={errors.root?.serverError?.message} />
          </div>
          <hr className='my-4' />
          <div className='flex justify-center text-sm text-gray-500'>
            <span>
              Already have an account?{" "}
              <Link
                href='/login'
                className='underline'
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </PageContainer>
    </div>
  );
}
