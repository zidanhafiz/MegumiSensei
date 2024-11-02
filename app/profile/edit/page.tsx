import PageContainer from "@/components/PageContainer";
import { MdSettings } from "react-icons/md";
import { EditForm } from "./EditForm";
import { getUserSession } from "@/actions/authentication";
import { redirect } from "next/navigation";
import { getUserAvatar } from "@/actions/profile";

export default async function EditPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  const avatar = await getUserAvatar(user.user_metadata.avatar_url);

  return (
    <PageContainer
      title='Edit Profile'
      icon={<MdSettings />}
    >
      <div className='max-w-xl mx-auto mt-6'>
        <EditForm user={user} avatar={avatar} />
      </div>
    </PageContainer>
  );
}
