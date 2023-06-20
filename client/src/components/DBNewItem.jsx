import React, { useState } from "react";
import { statuses } from "../utils/styles";
import { Spinner } from "../components";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { alertDanger, alertNull, alertSuccess } from "../context/alertActions";
import { motion, progress } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { buttonClick } from "../animations";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [Price, setPrice] = useState("");
  const [category, setCatagory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image uploaded to the cloud"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setIsLoading(false);
      dispatch(alertSuccess("Image removed from the cloud"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: Price,
      imageURL: imageDownloadURL,
    };
    addNewProduct(data).then((res) => {
      console.log(res);
      dispatch(alertSuccess("New item added"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
      setImageDownloadURL(null);
      setItemName("");
      setPrice("");
      setCatagory(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-24 pt-6">
      <div className="flex flex-col items-center justify-center w-full gap-4 p-4 border border-gray-300 rounded-md">
        <InputValuefield
          type="text"
          placeholder={"Item name here"}
          stateFunc={setItemName}
          stateValue={itemName}
        />

        <div className="flex flex-wrap items-center justify-center w-full gap-3">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCatagory(data.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category
                    ? "bg-red-400 text-primary "
                    : "bg-transparent"
                } `}
              >
                {data.title}
              </p>
            ))}
        </div>

        <InputValuefield
          type="number"
          placeholder={"Item Price here"}
          stateFunc={setPrice}
          stateValue={Price}
        />

        <div className="w-full border-2 border-gray-300 border-dotted rounded-md cursor-pointer bg-card backdrop-blur-md h-370">
          {isLoading ? (
            <div className="flex flex-col items-center w-full h-full px-24 justify-evenly">
              <Spinner />
              {Math.round(progress > 0) && (
                <div className="flex flex-col items-center justify-center w-full gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor ">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${Math.round(progress)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <div className="flex flex-col items-center justify-center cursor-pointer">
                        <p className="text-4xl font-bold">
                          <FaCloudUploadAlt className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an img
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadURL}
                      className="object-cover w-full h-full"
                    />

                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute p-3 text-xl transition-all duration-500 ease-in-out bg-red-500 rounded-full outline-none cursor-pointer top-3 right-3 hover:shadow-md "
                      onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className="w-9/12 py-2 bg-red-400 rounded-md cursor-pointer text-primary hover:bg-red-500"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputValuefield = ({
  type,
  placeholder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-md outline-none bg-lightOverlay focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DBNewItem;
