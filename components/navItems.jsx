import React from "react";
import {
  HomeIcon,
} from "@heroicons/react/24/outline";
import { AiOutlineBank, AiOutlineStock } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiOutlineNewspaper } from "react-icons/hi";

export const defaultNavItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Bank",
    href: "/bank",
    icon: <AiOutlineBank className="w-6 h-6" />,
  },
  {
    label: "Stocks",
    href: "/stocks",
    icon: <AiOutlineStock className="w-6 h-6" />,
  },
  {
    label: "News",
    href: "/news",
    icon: <HiOutlineNewspaper className="w-6 h-6" />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <CgProfile className="w-6 h-6" />,
  },
];
