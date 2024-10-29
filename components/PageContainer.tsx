import { ReactNode } from "react";
import Heading from "./Heading";

export default function PageContainer({ children, title, icon }: { children: ReactNode; title: string; icon: ReactNode }) {
  return (
    <div className='w-full my-10 lg:max-w-[1280px] lg:mx-auto'>
      <main className='w-full grid gap-4'>
        <Heading>
          {icon} {title}
        </Heading>
        <hr />
        {children}
      </main>
    </div>
  );
}
