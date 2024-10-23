import React, { ReactNode } from "react";
import SideNav from "../../components/side-nav";

// Define the type for the props, specifying that `children` can be any valid React node.
interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps): React.ReactElement {
  return (

    <div className="sm:flex sm:flex-row sm:gap-0 text-black dark:text-white bg-white dark:bg-[#383544]">
      <SideNav />
      <main className="w-full lg:px-[28px] lg:pt-[40px]">
        {children}
      </main>
    </div>
  );
}
