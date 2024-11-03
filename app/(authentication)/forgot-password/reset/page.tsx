"use client";
import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import { MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordFormData, resetPasswordSchema } from "@/utils/zodSchemas";
import ErrorInputMessage from "@/components/ErrorInputMessage";
import { resetPassword } from "@/actions/authentication";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { getUser } = useUser();

  const onSubmit = async (data: ResetPasswordFormData) => {
    const formData = new FormData();

    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const res = await resetPassword(formData);

    if (!res.success) {
      setError("root", { message: res.data });
      return;
    }

    getUser();
    router.push("/profile");
    return;
  };

  return (
    <div className='mt-12 max-w-md mx-auto'>
      <PageContainer
        title='Reset Password'
        icon={<MdLock />}
      >
        <div>
          <h1 className='text-2xl font-bold'>Reset Password</h1>
          <p className='text-sm text-gray-700 mt-4'>
            Masukkan password baru Anda.
          </p>
          <form
            className='mt-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className='label text-sm font-medium'>New Password</span>
            <label className='input input-bordered flex items-center gap-2'>
              <MdLock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder='New Password'
                className='grow'
                {...register("password")}
                disabled={isSubmitting}
              />
            </label>
            <ErrorInputMessage message={errors.password?.message} />
            <span className='label text-sm font-medium mt-2'>Confirm Password</span>
            <label className='input input-bordered flex items-center gap-2'>
              <MdLock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Confirm Password'
                className='grow'
                {...register("confirmPassword")}
                disabled={isSubmitting}
              />
            </label>
            <ErrorInputMessage message={errors.confirmPassword?.message} />
            <label className='flex items-center justify-end gap-2 mt-3'>
              <span className='text-sm'>Show password</span>
              <input
                type='checkbox'
                className='checkbox checkbox-sm'
                disabled={isSubmitting}
                onChange={() => setShowPassword(!showPassword)}
              />
            </label>
            <button
              type='submit'
              className='btn btn-primary mt-4 w-full'
              disabled={isSubmitting}
            >
              Reset Password
            </button>
            <ErrorInputMessage message={errors.root?.message} />
          </form>
        </div>
      </PageContainer>
    </div>
  );
}
