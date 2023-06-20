import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
  return (
    <div className="flex flex-col h-full gap-3 py-12 shadow-md bg-lightOverlay backdrop-blur-md min-w-210 w-300">
      <NavLink to={"/"} className="flex items-center justify-start gap-2 px-4">
        <img src={Logo} className="w-12 " alt="" />
        <p className="text-xl font-semibold">FoodForYou</p>
      </NavLink>
      <hr />

      <ul className="flex flex-col gap-2">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/dashboard/order"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink>
        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Items
        </NavLink>
        <NavLink
          to={"/dashboard/newItem"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Add new items
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          User
        </NavLink>
      </ul>

      <div className="flex items-center justify-center w-full px-2 mt-auto h-225 ">
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 px-3 bg-red-400 rounded-md ">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full borde ">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl font-semibold text-primary">Help Center</p>
          <p className="text-base text-center text-gray-300">
            Having trouble in city. Please contact us for more questions{" "}
          </p>
          <p className="px-4 py-2 text-red-400 rounded-full cursor-pointer bg-primary">
            Get in touch
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
