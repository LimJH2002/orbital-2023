import classNames from "classnames";
import React from "react";
import SidebarContent from "./sidebar-content";

const Sidebar = (props) => {
  return (
    <div
      className={classNames({
        // use grid layout
        "grid min-h-screen": true,
        // toggle the width of the sidebar depending on the state
        "grid-cols-sidebar": !props.collapsed,
        "grid-cols-sidebar-collapsed": props.collapsed,
        // transition animation classes
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
        fixed: true,
      })}
    >
      {/* sidebar */}
      <SidebarContent
        collapsed={props.collapsed}
        setCollapsed={() => props.setSidebarCollapsed((prev) => !prev)}
        auth={props.auth}
        pathname={props.pathname}
      />
    </div>
  );
};
export default Sidebar;
