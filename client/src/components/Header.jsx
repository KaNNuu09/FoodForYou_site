import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animations";
import { MdLogout, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userActions";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate;
  const dispatch = useDispatch();

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-12 py-6 backdrop-blur-md md:px-20">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-12 " alt="" />
        <p className="text-xl font-semibold">FoodForYou</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-6">
        <ul className="items-center justify-center hidden gap-2 md:flex">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>

        <motion.div {...buttonClick} className="relative cursor-pointer ">
          <MdShoppingCart className="text-3xl text-textColor" />
          <div className="absolute flex items-center justify-center w-6 h-6 bg-red-500 rounded-full -top-4 -right-1">
            <p className="text-base font-semibold text-primary">1</p>
          </div>
        </motion.div>

        {user ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsMenu(true)}
            >
              <div className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full shadow-md cursor-pointer">
                <motion.img
                  className="object-cover w-full h-full"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  re
                  ferrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className="absolute right-0 flex flex-col w-48 gap-4 px-6 py-4 rounded-md shadow-md bg-lightOverlay backdrop-blur-md top-12"
                >
                  <Link
                    className="text-xl hover:text-red-500 text-textColor"
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>

                  <Link
                    className="text-xl hover:text-red-500 text-textColor"
                    to={"/profile"}
                  >
                    My Profile
                  </Link>

                  <Link
                    className="text-xl hover:text-red-500 text-textColor"
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>
                  <hr />
                  <motion.div
                    {...buttonClick}
                    onClick={signOut}
                    className="flex items-center justify-center gap-3 px-3 py-2 bg-gray-100 shadow-md group rounder-md hover:bg-gray-200"
                  >
                    <MdLogout className="text-2xl text-textColor group-hover:text-headingColor" />
                    <p className="text-xl text-textColor group-hover:text-headingColor ">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 border border-red-300 rounded-md shadow-md cursor-pointer bg-lightOverlay"
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
