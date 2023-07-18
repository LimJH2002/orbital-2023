import { React, useState } from "react";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";

const Layout = (props) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const { pathname } = useRouter();

  return (
    <div className="grid min-h-screen bg-gray-900">
      <Sidebar
        collapsed={collapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        auth={props.auth}
        pathname={pathname}
      />
      <div
        className={`transition-spacing duration-300 ease-in-out ${
          !collapsed ? "pl-60" : "pl-16"
        }`}
      >
        {" "}
        {props.children}{" "}
      </div>
    </div>
  );
};

export default Layout;
