import classNames from "classnames";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const VendorLayout = (props) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar,setShowSidebar] = useState(false);
  return (
    <div
      className={classNames({
        // 👇 use grid layout
        "grid min-h-screen": true,
        // 👇 toggle the width of the sidebar depending on the state
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        // 👇 transition animation classes
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      {/* sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={()=> setSidebarCollapsed((prev)=> !prev)}
        shown={showSidebar}
      />
      {/* content */}
      <div className="flex flex-col bg-gray-300"> 
        <Navbar onMenuButtonClick={()=> setShowSidebar((prev)=> !prev)}/>
        <Outlet/>
      </div>
      
    </div>
  );
};
export default VendorLayout;