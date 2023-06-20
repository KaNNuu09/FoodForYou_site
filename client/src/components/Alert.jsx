import React from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";
import { FaCheck } from "../assets/icons";
import {
  BsExclamationTriangle,
  BsExclamationTriangleFill,
} from "react-icons/bs";

const Alert = ({ type, message }) => {
  if (type === "success") {
    return (
      <motion.div
        {...fadeInOut}
        className="fixed z-50 flex items-center gap-4 px-4 py-2 rounded-md shadow-md top-32 right-12 backdrop-blur-sm bg-emerald-300"
      >
        <FaCheck className="text-xl text-emerald-700" />
        <p className="text-xl text-emerald-700">{message}</p>
      </motion.div>
    );
  }

  if (type === "warning") {
    return (
      <motion.div
        {...fadeInOut}
        className="fixed z-50 flex items-center gap-4 px-4 py-2 bg-orange-300 rounded-md shadow-md top-32 right-12 backdrop-blur-sm"
      >
        <BsExclamationTriangleFill className="text-xl text-orange-700" />
        <p className="text-xl text-orange-700">{message}</p>
      </motion.div>
    );
  }

  if (type === "danger") {
    return (
      <motion.div
        {...fadeInOut}
        className="fixed z-50 flex items-center gap-4 px-4 py-2 bg-red-300 rounded-md shadow-md top-32 right-12 backdrop-blur-sm"
      >
        <BsExclamationTriangleFill className="text-xl text-red-700" />
        <p className="text-xl text-red-700">{message}</p>
      </motion.div>
    );
  }

  if (type === "info") {
    return (
      <motion.div
        {...fadeInOut}
        className="fixed z-50 flex items-center gap-4 px-4 py-2 bg-blue-300 rounded-md shadow-md top-32 right-12 backdrop-blur-sm"
      >
        <BsExclamationTriangleFill className="text-xl text-blue-700" />
        <p className="text-xl text-blue-700">{message}</p>
      </motion.div>
    );
  }
};

export default Alert;
