import React from "react";
import cn from "classnames";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { defaultNavItems } from "./navItems";
import { GoSignOut } from "react-icons/go";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth();
const Sidebar = ({ collapsed, setCollapsed, logout }) => {
  // use the correct icon depending on the state.
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  return (
    <div
      className={cn({
        "bg-gray-900 text-zinc-50 z-20": true,
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
            "flex items-center border-b border-b-gray-800": true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && <Image src="/Logo.png" width={90} height={50} />}
          <button
            className={cn({
              "grid place-content-center": true, // position
              "hover:bg-gray-800 ": true, // colors
              "w-10 h-10 rounded-full": true, // shape
            })}
            // 👇 set the collapsed state on click
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        {/* NavItems */}
        <nav className="flex-grow">
          <ul
            className={cn({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            {defaultNavItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={cn({
                    "text-indigo-100 hover:bg-gray-800 flex": true, //colors
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                  })}
                >
                  <Link href={item.href} className="flex gap-2">
                    {item.icon} <span>{!collapsed && item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sign Out */}
        <nav>
          <ul
            className={cn({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            <li
              className={cn({
                "text-indigo-100 hover:bg-gray-800 flex": true, //colors
                "transition-colors duration-300": true, //animation
                "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                "rounded-full p-2 mx-3 w-10 h-10": collapsed,
              })}
            >
              <Link
                href="/"
                onClick={() => logout()}
                className="flex gap-2"
              >
                <GoSignOut className="w-6 h-6" />
                <span>{!collapsed && "Sign Out"}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
