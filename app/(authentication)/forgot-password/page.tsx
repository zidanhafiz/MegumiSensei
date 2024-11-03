"use client";
import PageContainer from "@/components/PageContainer";
import { MdEmail, MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/utils/zodSchemas";
import ErrorInputMessage from "@/components/ErrorInputMessage";
import { forgotPassword } from "@/actions/authentication";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);

    const res = await forgotPassword(formData);

    if (!res.success) {
      setError("root", { message: res.data });
      return;
    }

    return;
  };

  return (
    <div className='mt-12 max-w-md mx-auto'>
      <PageContainer
        title='Lupa Password'
        icon={<MdLock />}
      >
        <div>
          <h1 className='text-2xl font-bold'>Lupa Password</h1>
          <p className='text-sm text-gray-700 mt-4'>
            Masukkan alamat email yang Anda gunakan untuk mendaftar akun Anda, dan kami akan mengirimkan instruksi untuk mengatur ulang password Anda.
          </p>
          <form
            className='mt-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className='label text-sm font-medium'>Email</span>
            <label className='input input-bordered flex items-center gap-2'>
              <MdEmail />
              <input
                type='email'
                placeholder='Email'
                className='grow'
                {...register("email")}
                disabled={isSubmitting}
              />
            </label>
            <ErrorInputMessage message={errors.email?.message} />
            <button
              type='submit'
              className='btn btn-primary mt-4 w-full'
              disabled={isSubmitting}
            >
              Kirim
            </button>
            <ErrorInputMessage message={errors.root?.message} />
            {isSubmitSuccessful && <p className='text-sm text-center text-green-700 mt-4'>Cek email Anda untuk instruksi mengatur ulang password.</p>}
          </form>
        </div>
      </PageContainer>
    </div>
  );
}
