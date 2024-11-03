"use client";
import PageContainer from "@/components/PageContainer";
import { MdSettings } from "react-icons/md";
import { EditForm } from "./EditForm";
import { useUser } from "@/contexts/UserContext";

export default function EditPage() {
  const { user, getUser } = useUser();

  if (!user) {
    return null;
  }

  return (
    <PageContainer
      title='Edit Profile'
      icon={<MdSettings />}
    >
      <div className='max-w-xl mx-auto mt-6'>
        <EditForm user={user} getUser={getUser} />
      </div>
    </PageContainer>
  );
}
