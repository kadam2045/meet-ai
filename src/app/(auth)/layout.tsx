import { Card } from "@/components/ui/card";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className=" bg-muted flex min-h-svh  flex-col items-center justify-center p-6 md:p-10">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
