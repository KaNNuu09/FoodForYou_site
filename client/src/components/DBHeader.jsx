import React from "react";
import { BsFillBellFill, BsToggles2 } from "react-icons/bs";
import { MdLogout, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { Avatar } from "../assets";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { setUserNull } from "../context/actions/userActions";

const DBHeader = () => {
  const user = useSelector((state) => state.user);
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
    <div className="flex items-center justify-between w-full gap-3">
      <p className="text-2xl text-headingColor ">
        Welcome to FoodForYou{" "}
        {user?.name && (
          <spam className="block text-base text-gray-500">{`Hello ${user?.name}...!`}</spam>
        )}
      </p>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-md shadow-md bg-lightOverlay backdrop-blur-md">
          <MdSearch className="text-2xl text-gray-400" />
          <input
            type="text"
            placeholder="Search Here..."
            className="w-32 text-base font-semibold bg-transparent border-none outline-none text-textColor"
          />
          <BsToggles2 className="text-2xl text-gray-400" />
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center w-10 h-10 rounded-md shadow-md cursor-printer bg-lightOverlay backdrop-blur-md"
        >
          <BsFillBellFill className="text-2xl text-gray-400" />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 overflow-hidden rounded-md shadow-md cursor-pointer ">
            <motion.img
              className="object-cover w-full h-full"
              src={user?.picture ? user?.picture : Avatar}
              whileHover={{ scale: 1.15 }}
              re
              ferrerPolicy="no-referrer"
            />
          </div>

          <motion.div
            {...buttonClick}
            onClick={signOut}
            className="flex items-center justify-center w-10 h-10 rounded-md shadow-md cursor-pointer bg-lightOverlay backdrop-blur-md"
          >
            <MdLogout className="text-xl text-gray-400" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DBHeader;
