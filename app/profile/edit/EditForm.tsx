"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import ErrorInputMessage from "@/components/ErrorInputMessage";
import { updateProfile } from "@/actions/profile";
import z from "zod";
import { FaUserCircle } from "react-icons/fa";
import { User } from "@/types/tableTypes";
import { useRouter } from "next/navigation";

export const editProfileSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }).max(32, { message: "Full name must be at most 32 characters" }).trim(),
  avatar: z
    .any()
    .refine((files) => files instanceof FileList, "File is required.")
    .refine((files) => files.length > 0 && files[0]?.size <= 5 * 1024 * 1024, `Max file size is 5MB.`)
    .refine(
      (files) => files.length > 0 && ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .nullable(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

export function EditForm({ user, getUser }: { user: User; getUser: () => void }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: user?.full_name ?? "",
      avatar: null,
    },
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);

      if (data.avatar) {
        formData.append("avatar", data.avatar[0]);
      }

      const res = await updateProfile(user.user_id, formData);

      if (!res.success) {
        setError("root.serverError", { message: res.data });
      }

      getUser();
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("root.serverError", { message: "Something went wrong" });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <ErrorInputMessage message={errors.root?.serverError?.message} />
      <div className='flex items-end gap-3'>
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt='AV'
            width={100}
            height={100}
            className='rounded-lg'
          />
        ) : (
          <div className='md:w-20 md:h-20 w-12 h-12 rounded-full overflow-hidden'>
            <FaUserCircle className='w-10 h-10' />
          </div>
        )}
        <label className='form-control'>
          <span className='label'>Upload Avatar</span>
          <input
            className='file-input file-input-bordered file-input-sm w-full max-w-xs'
            type='file'
            disabled={isSubmitting}
            {...register("avatar")}
          />
          <ErrorInputMessage message={errors.avatar?.message as string} />
        </label>
      </div>
      <label className='form-control mt-4'>
        <span className='label'>Full Name</span>
        <input
          type='text'
          className='input input-bordered'
          placeholder='John Doe'
          disabled={isSubmitting}
          {...register("fullName")}
        />
        <ErrorInputMessage message={errors.fullName?.message} />
      </label>
      <div className='flex justify-end gap-3 mt-4'>
        {!isSubmitting && (
          <Link
            className='btn mt-4'
            href='/profile'
          >
            Cancel
          </Link>
        )}
        <button
          type='submit'
          className='btn btn-primary mt-4'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Save"}
        </button>
      </div>
    </form>
  );
}
