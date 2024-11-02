import PageContainer from "@/components/PageContainer";
import { ProfileHeader } from "./ProfileHeader";
import { AccountDetails } from "./AccountDetails";
import { CreditSection } from "./CreditSection";
import { FaUserCircle } from "react-icons/fa";
import { getUserSession } from "@/actions/authentication";
import { redirect } from "next/navigation";
import { getUserAvatar } from "@/actions/profile";

export default async function ProfilePage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  const avatar = await getUserAvatar(user.user_metadata.avatar_url);

  return (
    <div className='max-w-[600px] mx-auto'>
      <PageContainer
        title='Profile'
        icon={<FaUserCircle />}
      >
        <ProfileHeader user={user} avatar={avatar} />
        <AccountDetails user={user} />
        <hr className='my-2' />
        <CreditSection />
      </PageContainer>
    </div>
  );
}
