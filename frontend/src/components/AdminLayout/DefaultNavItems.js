// components/defaultNavItems.tsx
import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  FolderPlusIcon,
  PresentationChartLineIcon,
  BuildingStorefrontIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
// define a NavItem prop

export const defaultNavItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label:"Vendors",
    href:"/admin/vendors",
    icon:<BuildingStorefrontIcon className="w-6 h-6"/>
  },
  {
    label:"Add Vendor",
    href:"/admin/addVendor",
    icon:<BuildingStorefrontIcon className="w-6 h-6"/>
  },
  {
    label: "Rangers",
    href: "/admin/rangers",
    icon: <ShoppingBagIcon className="w-6 h-6" />,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: <ShoppingCartIcon className="w-6 h-6" />,
  },
  {
    label: "Add Ranger",
    href: "/admin/addRanger",
    icon: <FolderPlusIcon className="w-6 h-6" />,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: <PresentationChartLineIcon className="w-6 h-6" />,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: <BanknotesIcon className="w-6 h-6" />,
  },
  
];