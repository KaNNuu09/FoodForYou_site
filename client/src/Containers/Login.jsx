import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { setUserDetails } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { alertInfo, alertWarning } from "../context/alertActions";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((usercred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      dispatch(alertInfo("Required field should not be empty"));
    } else {
      if (password === confirm_password) {
        setUserEmail("");
        setConfirm_password("");
        setPassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((usercred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
        console.log("equal");
      } else {
        dispatch(alertWarning("Password doesn't match"));
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (usercred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Password doesn't match"));
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden realtive">
      {/* Bgroung img */}
      <img
        src={LoginBg}
        className="absolute top-0 left-0 object-cover w-full h-full"
        alt=""
      />

      {/* box */}
      <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        <div className="flex items-center justify-start w-full gap-4">
          <img src={Logo} className="w-7" alt="" />
          <p className="text-2xl font-semibold text-headingColor">City</p>
        </div>

        {/* welcome msg */}
        <p className="text-3xl font-semibold text-headingColor">Welcome back</p>
        <p className="-mt-6 text-xl text-textColor">
          {isSignUp ? "Sign Up" : "Sign In"} with following
        </p>

        {/* login input */}
        <div className="flex flex-col items-center justify-center w-full gap-6 px-4 py-4 md:px-12">
          <LoginInput
            placeholder={"Email Here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStatefunc={setUserEmail}
            type="Email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeholder={"Passwowd Here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStatefunc={setPassword}
            type="Password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeholder={"Confirm Passwowd Here"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirm_password}
              inputStatefunc={setConfirm_password}
              type="Password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p className="-mt-5 text-0xl">
              Dosen't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-600 underline bg-transparent cursor-pointer"
                onClick={() => setIsSignUp(true)}
              >
                Create One
              </motion.button>
            </p>
          ) : (
            <p className="-mt-5 text-0xl">
              {" "}
              Already have an acoount:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-600 underline bg-transparent cursor-pointer"
                onClick={() => setIsSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}

          {/* sign button */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-2 py-2 text-xl text-white capitalize transition-all duration-150 bg-red-500 rounded-md cursor-pointer hover:bg-red-400"
              onClick={signUpWithEmailPass}
            >
              {" "}
              Sign Up{" "}
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signUpWithEmailPass}
              className="w-full px-2 py-2 text-xl text-white capitalize transition-all duration-150 bg-red-500 rounded-md cursor-pointer hover:bg-red-400"
            >
              {" "}
              Sign In{" "}
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center gap-4 px-5 py-2 cursor-pointer bg-lightOverlay backdrop-blur-md rounded-3xl"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="" text-3xl />
          <p className="text-base capitalize text-headingColor">
            Sign in with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
