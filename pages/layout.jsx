import { React, useState } from "react";
import Sidebar from "@/components/sidebar";

const Layout = (props) => {
  const [collapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="grid min-h-screen bg-gray-900">
      <Sidebar
        collapsed={collapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className={collapsed ? "pl-16" : "pl-60"}> {props.children} </div>
    </div>
  );
};

export default Layout;
