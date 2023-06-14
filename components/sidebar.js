import classNames from "classnames";
import React, { useState } from "react";
import SidebarContent from "./sidebar-content";
import { useRouter } from "next/router";

const Sidebar = (props) => {
  const { pathname } = useRouter();
  console.log(pathname);
  const [collapsed, setSidebarCollapsed] = useState(false);
  return (
    <div
      className={classNames({
        // use grid layout
        "grid min-h-screen": true,
        // toggle the width of the sidebar depending on the state
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        // transition animation classes
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      {/* sidebar */}
      <SidebarContent
        collapsed={collapsed}
        setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
        auth={props.auth}
      />
      {/* page content */}
      <div className=""> {props.children}</div>
    </div>
  );
};
export default Sidebar;
