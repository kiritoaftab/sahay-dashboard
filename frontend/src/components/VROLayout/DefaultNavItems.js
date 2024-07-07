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
    href: "/vro",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label:"Vendors",
    href:"/vro/vendors",
    icon:<BuildingStorefrontIcon className="w-6 h-6"/>
  },
  {
    label:"Add Vendor",
    href:"/vro/addVendor",
    icon:<BuildingStorefrontIcon className="w-6 h-6"/>
  },
  {
    label: "Rangers",
    href: "/vro/rangers",
    icon: <ShoppingBagIcon className="w-6 h-6" />,
  },
  {
    label: "Add Ranger",
    href: "/vro/addRanger",
    icon: <FolderPlusIcon className="w-6 h-6" />,
  },
  {
    label: "Customers",
    href: "/vro/customers",
    icon: <ShoppingCartIcon className="w-6 h-6" />,
  },
  {
    label: "Bookings",
    href: "/vro/bookings",
    icon: <BanknotesIcon className="w-6 h-6" />,
  },
  
];