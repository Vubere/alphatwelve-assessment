import React, { ReactNode } from "react";
import Nav from "../../components/header-navigation";

// Define the type for the props, specifying that `children` can be any valid React node.
interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps): React.ReactElement {
  return (

    <div className="sm:flex sm:flex-row sm:gap-0 text-black dark:text-white bg-white dark:bg-[#383544]">
      <Nav />
      <main className="w-full h-full lg:px-[28px] lg:pt-[40px] sm:h-[100vh] nsm:h-[calc(100vh-65px)] sm:max-h-[100vh] nsm:max-h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden p-[20px] sm:p-[40px] pt-[10px] sm:pt-[20px]">
        {children}
      </main>
    </div>
  );
}
