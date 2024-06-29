import React from "react";
import cn from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultNavItems } from "./DefaultNavItems";
import useAuth from "../../hooks/useAuth";
import { logo } from "../../constants";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
  ShoppingBagIcon,
  FolderPlusIcon,
  BanknotesIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ collapsed, shown, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const { pathname } = location;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;

  return (
    <div
      className={cn({
        "bg-primary text-zinc-50 z-20 h-screen ": true,
        "transition-all duration-300 ease-in-out": true,
        "fixed md:sticky top-0 md:translate-x-0": true,
        "w-[300px]": !collapsed,
        "w-16": collapsed,
        "-translate-x-full": !shown,
      })}
    >
      <div
        className={cn({
          "flex flex-col justify-between": true,
          "h-full": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={cn({
            "flex items-center border-b border-primary": true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && (
            <img className="whitespace-nowrap w-24" src={logo} alt="" />
          )}
          <button
            className={cn({
              "grid place-content-center": true, // position
              "hover:bg-white/[.30] ": true, // colors
              "w-10 h-10 rounded-full": true, // shape
            })}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-grow">
          <ul className={cn({ "my-2 flex flex-col gap-2 items-stretch": true })}>
            {defaultNavItems.map((item, index) => (
              <li
                key={index}
                className={cn({
                  "text-white font-semibold hover:bg-white/[.20] flex": true,
                  "transition-colors duration-300": true,
                  "rounded-md p-2 mx-3 gap-4": !collapsed,
                  "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                  "bg-indigo-600": pathname === item.href, // Highlight if active
                })}
              >
                <button
                  className="flex gap-2"
                  onClick={() => navigate(item.href)}
                >
                  {item.icon} <span>{!collapsed && item.label}</span>
                </button>
              </li>
            ))}
            <li
              className={cn({
                "text-indigo-100 hover:bg-indigo-900 flex": true,
                "transition-colors duration-300": true,
                "rounded-md p-2 mx-3 gap-4": !collapsed,
                "rounded-full p-2 mx-3 w-10 h-10": collapsed,
              })}
            >
              <button className="flex gap-2" onClick={() => handleLogout()}>
                <UserMinusIcon className="w-6 h-6" />{" "}
                <span>{!collapsed && `Logout`}</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className={cn({ "grid place-content-stretch p-4": true })}>
          <div className="flex gap-4 items-center h-11 overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              height={36}
              width={36}
              alt="profile image"
              className="rounded-full"
            />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-indigo-50 my-0">{auth?.username}</span>
                <button
                  onClick={() => navigate("/vendor/profile")}
                  className="text-indigo text-sm"
                >
                  View Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
