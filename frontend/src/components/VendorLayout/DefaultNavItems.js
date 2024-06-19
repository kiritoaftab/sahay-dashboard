import React from "react";
import {
  HomeIcon,
  ShoppingBagIcon,
  FolderPlusIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
// define a NavItem prop

export const defaultNavItems = [
  {
    label: "Dashboard",
    href: "/vendor",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Rangers",
    href: "/vendor/rangers",
    icon: <ShoppingBagIcon className="w-6 h-6" />,
  },
  {
    label: "Add Ranger",
    href: "/vendor/addRanger",
    icon: <FolderPlusIcon className="w-6 h-6" />,
  },
  {
    label: "Bookings",
    href: "/vendor/bookings",
    icon: <BanknotesIcon className="w-6 h-6" />,
  },
  
];