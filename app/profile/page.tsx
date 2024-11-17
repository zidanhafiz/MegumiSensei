import PageContainer from "@/components/PageContainer";
import { ProfileHeader } from "./ProfileHeader";
import { AccountDetails } from "./AccountDetails";
import { CreditSection } from "./CreditSection";
import { FaUserCircle } from "react-icons/fa";

export default async function ProfilePage() {
  return (
    <div className='max-w-[600px] mx-auto w-full'>
      <PageContainer
        title='Profile'
        icon={<FaUserCircle />}
      >
        <ProfileHeader />
        <AccountDetails />
        <hr className='my-2' />
        <CreditSection />
      </PageContainer>
    </div>
  );
}
