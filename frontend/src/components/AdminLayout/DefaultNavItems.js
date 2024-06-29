// components/defaultNavItems.tsx
import React from "react";
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
// define a NavItem prop

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
    icon: <CiUser  className="w-6 h-6" />,
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
    label: "Customers",
    href: "/admin/customers",
    icon: <ShoppingCartIcon className="w-6 h-6" />,
  },
  // {
  //   label: "Payments",
  //   href: "/admin/payments",
  //   icon: <PresentationChartLineIcon className="w-6 h-6" />,
  // },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: <BanknotesIcon className="w-6 h-6" />,
  },
  {
    label: "Add Services",
    href: "/admin/addServices",
    icon: <TbTools className="w-6 h-6" />,
  },
  
];
