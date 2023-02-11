import React from "react";
import Header from "./Header";
import SideMenu from "@/layouts/SideMenu";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={"min-h-screen mx-auto flex max-w-full flex-col"}>
      <Header />
      <main className="mb-20 flex-1">{children}</main>
    </div>
  );
};

export default Layout;
