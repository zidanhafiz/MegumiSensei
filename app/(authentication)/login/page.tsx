"use client";
import { login, loginAsGuest } from "@/actions/authentication";
import PageContainer from "@/components/PageContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdLock, MdVisibility } from "react-icons/md";
import { useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import ErrorInputMessage from "@/components/ErrorInputMessage";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { loginSchema } from "@/utils/zodSchemas";
import { LoginFormData } from "@/utils/zodSchemas";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoadingLoginAsGuest, setIsLoadingLoginAsGuest] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormData) => {
    if (isSubmitting || isLoadingLoginAsGuest) return;

    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      await login(formData);
    } catch (error) {
      console.error(error);
      const message = (error as Error).message;
      setError("root.serverError", { message });
    }
  };

  const handleLoginAsGuest = async () => {
    if (isSubmitting || isLoadingLoginAsGuest) return;

    setIsLoadingLoginAsGuest(true);
    try {
      await loginAsGuest();
    } catch (error) {
      console.error(error);
      setError("root.serverError", { message: "Failed to login as guest" });
    } finally {
      setIsLoadingLoginAsGuest(false);
    }
  };

  return (
    <div className='flex justify-center mt-8 max-w-xl mx-auto'>
      <PageContainer
        title='Login'
        icon={<FaUserCircle />}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-[350px] mx-auto'
        >
          <span className='label'>Email</span>
          <label className='input input-bordered flex items-center gap-2'>
            <MdEmail />
            <input
              type='email'
              className='grow'
              placeholder='Email'
              {...register("email")}
              disabled={isSubmitting}
            />
          </label>
          <ErrorInputMessage message={errors.email?.message} />
          <span className='label'>Password</span>
          <label className='input input-bordered flex items-center gap-2'>
            <MdLock />
            <input
              type={showPassword ? "text" : "password"}
              className='grow'
              placeholder='Password'
              {...register("password")}
              disabled={isSubmitting}
            />
            <button
              type='button'
              className=''
              onClick={() => setShowPassword(!showPassword)}
            >
              <MdVisibility />
            </button>
          </label>
          <ErrorInputMessage message={errors.password?.message} />
          <button
            type='submit'
            className='btn btn-primary w-full mt-6'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
            <IoLogInOutline size={20} />
          </button>
          <div className='flex justify-center mt-2'>
            <ErrorInputMessage message={errors.root?.serverError?.message} />
          </div>
          <div className='flex justify-center my-2'>
            <span className='text-sm text-gray-500'>or</span>
          </div>
          <button
            type='button'
            className='btn w-full'
            onClick={handleLoginAsGuest}
            disabled={isSubmitting || isLoadingLoginAsGuest}
          >
            {isLoadingLoginAsGuest ? "Continuing as guest..." : "Continue as guest"}
            <FaUser size={16} />
          </button>
          <hr className='my-4' />
          <div className='flex justify-center text-sm text-gray-500'>
            <span>
              Don&apos;t have an account?{" "}
              <Link
                href='/sign-up'
                className='underline'
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </PageContainer>
    </div>
  );
}
