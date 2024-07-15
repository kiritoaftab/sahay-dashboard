// components/defaultNavItems.tsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  PresentationChartLineIcon,
  BuildingStorefrontIcon,
  BanknotesIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import { TbTools } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";

// Define a NavItem prop
export const defaultNavItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Vendors",
    icon: <BuildingStorefrontIcon className="w-6 h-6" />,
    href: "/admin/vendors",
    items: [
      {
        label: "Add Vendor",
        href: "/admin/addVendor",
        icon: <FolderPlusIcon className="w-6 h-6" />,
      },
    ],
  },
  {
    label: "Rangers",
    icon: <ShoppingBagIcon className="w-6 h-6" />,
    href: "/admin/rangers",
    items: [
      {
        label: "Add Ranger",
        href: "/admin/addRanger",
        icon: <FolderPlusIcon className="w-6 h-6" />,
      },
    ],
  },
  {
    label: "VRO",
    icon: <CiUser className="w-6 h-6" />,
    href: "/admin/allVro",
    items: [
      {
        label: "Add VRO",
        href: "/admin/addVro",
        icon: <FolderPlusIcon className="w-6 h-6" />,
      },
    ],
  },
  {
    label: "Services",
    href: "/admin/allServices",
    icon: <TbTools className="w-6 h-6" />,
    items: [
      {
        label: "Add Service",
        href: "/admin/addServices",
        icon: <FolderPlusIcon className="w-6 h-6" />,
      },
    ],
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: <ShoppingCartIcon className="w-6 h-6" />,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: <BanknotesIcon className="w-6 h-6" />,
  },
  {
    label: "Privacy Policy",
    href: "/admin/privacy-policy",
    icon: <IoDocumentTextOutline className="w-6 h-6" />,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col">
      {defaultNavItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          className={({ isActive }) =>
            `flex items-center p-2 my-1 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-200"
            }`
          }
        >
          {item.icon}
          <span className="ml-3">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
