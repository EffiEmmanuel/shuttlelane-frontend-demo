// @ts-nocheck
import { useFormik } from "formik";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, resetMessage } from "../../../redux/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import {
  redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";

function AdminCompleteSignupForm() {
  const navigate = useNavigate();
  // Search params setup
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const adminId = searchParams.get("adminId");

  const [isLoading, setIsLoading] = useState();
  const [image, setImage] = useState();
  const [password, setPassword] = useState();

  // Handle On Image change
  const [renderImage, setRenderImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    console.log("FILE:", file);
    setImage(file);

    reader.onloadend = () => {
      setRenderImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function: Handle complete admin signup
  async function handleCompleteAdminSignup(e) {
    setIsLoading(true);
    e.preventDefault();
    console.log("adminid::", adminId);

    if (!password || !image) {
      toast.info("Please fill in the missing fields!");
      return;
    }

    // UPLOAD IMAGE TO CLOUDINARY FIRST
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "shuttlelane-web"); // Replace with your preset name

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/shuttlelane/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("upload successful");
        const data = await response.json();
        return fetch(
          `https://www.shuttlelane.com/api/v1/auth/admin/signup/complete-signup/${adminId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: data.secure_url,
              password: password,
            }),
          }
        )
          .then((res) => {
            const response = res.json();
            console.log("RESPONSE FROM COMPLETE ADMIN:", response);
            toast.success("Your admin account has been setup🎉");
            navigate("/admin");
            setIsLoading(false);
          })
          .catch((err) => {
            toast.error(
              "An error occured while we processed your request. Please, try again."
            );
            console.log("ERROR:", err);
          });
      } else {
        toast.error(
          "An error occured while we processed your request. Please, try again."
        );
        // Handle error
        console.error("Upload failed");
      }
    } catch (error) {
      toast.error(
        "An error occured while we processed your request. Please, try again."
      );
      console.error("Error uploading image:", error);
    }
  }

  return (
    <div className="px-10 pt-10">
      <ToastContainer />
      <h2 className="font-semibold text-2xl text-shuttlelaneBlack">
        Finish Setting Up Your Account
      </h2>
      <p className="text-sm">Complete your admin account registration</p>

      {/* FORM */}
      <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
        {/* Image */}
        <div className="w-full flex flex-col">
          <label htmlFor="username" className="text-sm">
            Profile Picture
          </label>
          <div className="w-full relative border-dashed border-[1px] border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center overflow-hidden">
            <>
              <MdOutlineAddAPhoto size={24} className="text-gray-300" />
              <small className="text-gray-300 text-center">
                Click to Insert Profile Picture
              </small>
              <input
                className="absolute top-0 bg-transparent w-full h-full opacity-0 cursor-pointer"
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </>

            {renderImage && image && (
              <div className="absolute w-full h-full top-0 flex justify-center items-center">
                <FaXmark
                  onClick={() => {
                    setRenderImage(null);
                    setImage(null);
                  }}
                  size={16}
                  className="absolute top-3 right-3 cursor-pointer"
                />
                <img
                  src={renderImage}
                  alt="Uploaded"
                  className="object-cover h-full w-full z-10"
                />
              </div>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-y-1">
          <label htmlFor="username" className="text-sm">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="w-full h-13 p-3 border-[0.3px] focus:outline-none border-gray-400 rounded-lg"
          />
        </div>

        <button
          type="submit"
          onClick={(e) => handleCompleteAdminSignup(e)}
          className="lg:w-1/4 w-full h-13 p-3 border-[0.3px] focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
        >
          {isLoading ? (
            <ImSpinner2 size={21} className="text-white animate-spin" />
          ) : (
            "Finish Setup"
          )}
        </button>
      </form>
    </div>
  );
}

export default AdminCompleteSignupForm;
