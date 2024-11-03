import { ReactNode } from "react";
import Heading from "./Heading";
import BackButton from "./BackButton";

export default function PageContainer({ children, title, icon }: { children: ReactNode; title: string; icon: ReactNode }) {
  return (
    <div className='w-full my-6 lg:max-w-[1280px] lg:mx-auto'>
      <main className='w-full grid gap-4'>
        <BackButton />
        <Heading>
          {icon} {title}
        </Heading>
        <hr />
        {children}
      </main>
    </div>
  );
}
