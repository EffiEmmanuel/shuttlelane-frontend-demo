// @ts-nocheck
import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

// Images
import profilePicPlaceholder from "../../../../assets/logos/icon.png";
import {
  disable2fa,
  enable2fa,
  generateAuthSecret,
} from "../../../../redux/slices/adminSlice";

function AdminTopBar(props) {
  const {
    admin,
    token,
    isLoading,
    qrcode,
    secret,
    isGeneratingSecret,
    is2faLoading,
  } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  // 2FA modal
  const [is2faModalOpen, setIs2faModalOpen] = useState(false);

  async function handleGenerateSecret() {
    dispatch(generateAuthSecret({ adminId: admin?._id, token: token }));
  }

  async function handleEnable2fa() {
    dispatch(enable2fa({ adminId: admin?._id, token: token }));
    setIs2faModalOpen(false);
  }

  async function handleDisable2fa() {
    dispatch(disable2fa({ adminId: admin?._id, token: token }));
    setIs2faModalOpen(false);
  }

  return (
    <>
      <div
        className={`${
          is2faModalOpen ? "flex" : "hidden"
        } fixed z-[4000] top-0 left-0 right-0 bottom-0 h-screen min-h-screen max-h-screen bg-opacity-[2%] bg-black flex items-center justify-center lg:p-14 p-7`}
      >
        <div className="bg-white rounded-lg p-7 shuttlelaneScrollbar overflow-y-scroll max-h-[90vh] lg:w-[40%] w-full">
          {/* Heading */}
          <div className="flex flex-col gap-y-1">
            <h3 className="text-2xl font-semibold">2 Factor Authentication</h3>
            <p className="text-sm">
              Scan the code or input the code in your authenticator app (Google
              Authenticator, Authy etc). Click Enable 2fa after you have done
              this
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-y-1">
            {/* Show QR code here */}
            {isLoading ? (
              <div className="flex justify-center">
                <ImSpinner8
                  size={18}
                  className="text-shuttlelanePurple animate-spin"
                />
              </div>
            ) : (
              // Show qr code here
              <div className="flex flex-col items-center w-full gap-y-6 mt-6">
                {!admin?.qrcode || !admin?.authSecret ? (
                  <button
                    //   type="submit"
                    onClick={() => handleGenerateSecret()}
                    disabled={isLoading}
                    className="w-auto h-13 p-3 focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
                  >
                    {isGeneratingSecret ? (
                      <ImSpinner8
                        size={21}
                        className="text-white animate-spin"
                      />
                    ) : (
                      "Generate Secret"
                    )}
                  </button>
                ) : (
                  <div className="">
                    <div className="flex justify-center w-full">
                      <img
                        src={admin?.qrcode}
                        className="w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="flex items-center w-full justify-between h-9 p-2">
                        <span className="inline-block">
                          {secret[0] ?? admin?.authSecret[0]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[1] ?? admin?.authSecret[1]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[2] ?? admin?.authSecret[2]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[3] ?? admin?.authSecret[3]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[4] ?? admin?.authSecret[4]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[5] ?? admin?.authSecret[5]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[6] ?? admin?.authSecret[6]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[7] ?? admin?.authSecret[7]}{" "}
                        </span>
                      </p>
                      <p className="flex items-center w-full justify-between h-9 p-2 bg-slate-100">
                        <span className="inline-block">
                          {secret[8] ?? admin?.authSecret[8]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[9] ?? admin?.authSecret[9]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[10] ?? admin?.authSecret[10]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[11] ?? admin?.authSecret[11]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[12] ?? admin?.authSecret[12]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[13] ?? admin?.authSecret[13]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[14] ?? admin?.authSecret[14]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[15] ?? admin?.authSecret[15]}{" "}
                        </span>
                      </p>
                      <p className="flex items-center w-full justify-between h-9 p-2">
                        <span className="inline-block">
                          {secret[16] ?? admin?.authSecret[16]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[17] ?? admin?.authSecret[17]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[18] ?? admin?.authSecret[18]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[19] ?? admin?.authSecret[19]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[20] ?? admin?.authSecret[20]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[21] ?? admin?.authSecret[21]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[22] ?? admin?.authSecret[22]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[23] ?? admin?.authSecret[23]}{" "}
                        </span>
                      </p>
                      <p className="flex items-center w-full justify-between h-9 p-2 bg-slate-100">
                        <span className="inline-block">
                          {secret[24] ?? admin?.authSecret[24]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[25] ?? admin?.authSecret[25]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[26] ?? admin?.authSecret[26]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[27] ?? admin?.authSecret[27]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[28] ?? admin?.authSecret[28]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[29] ?? admin?.authSecret[29]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[30] ?? admin?.authSecret[30]}{" "}
                        </span>
                        <span className="inline-block">
                          {secret[31] ?? admin?.authSecret[31]}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex lg:flex-row flex-col items-center lg:justify-between gap-3 mt-7">
            <button
              onClick={() => setIs2faModalOpen(false)}
              className="lg:w-[50%] w-full h-13 p-3 focus:outline-none bg-tranasparent border-[1px] flex items-center justify-center text-gray-400 border-gray-400 rounded-lg"
            >
              Close
            </button>
            {!admin?.is2faTurnedOn && (
              <button
                //   type="submit"
                onClick={() => handleEnable2fa()}
                disabled={!admin?.qrcode && admin?.authSecret}
                className="disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 lg:w-[50%] w-full h-13 p-3 focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
              >
                {is2faLoading ? (
                  <ImSpinner8 size={21} className="text-white animate-spin" />
                ) : (
                  "Enable 2fa"
                )}
              </button>
            )}
            {admin?.is2faTurnedOn && (
              <button
                //   type="submit"
                onClick={() => handleDisable2fa()}
                disabled={is2faLoading}
                className="disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 lg:w-[50%] w-full h-13 p-3 focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
              >
                {is2faLoading ? (
                  <ImSpinner8 size={21} className="text-white animate-spin" />
                ) : (
                  "Disable 2fa"
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex fixed top-0 py-5 bg-white left-0 lg:pl-[8%] px-7 z-[55] lg:z-[3] w-full justify-between border-b-[0.5px] border-b-gray-100 pb-3">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">
            Welcome back, {admin?.firstName}
          </h2>
          <p className="text-sm text-gray-400 ">
            {admin?.firstName} {admin?.lastName} ({admin?.role})
          </p>
        </div>

        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setIs2faModalOpen(true)}
            className={`gap-x-1 p-2 h-7 w-20 flex items-center justify-center rounded-full border-[1px] border-slate-400`}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                admin?.is2faTurnedOn ? "bg-green-400" : "bg-red-400"
              } flex items-center justify-center`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  admin?.is2faTurnedOn ? "bg-green-600" : "bg-red-600"
                } animate-ping`}
              ></div>
            </div>
            <span className="text-sm">2FA</span>
          </button>

          <div className="h-9 w-9 rounded-full bg-transparent flex justify-center items-center overflow-hidden">
            <img
              src={admin?.image ?? profilePicPlaceholder}
              alt={`${admin?.firstName} ${admin?.lastName}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="inline-block lg:hidden">
            <button
              className={`transition-all ${
                !props?.isNavbarOpen ? "inline-block" : "hidden"
              }`}
              onClick={() => {
                props?.setIsNavbarOpen(true);
              }}
            >
              <MdOutlineMenu size={28} />
            </button>

            <button
              className={`transition-all ${
                props?.isNavbarOpen ? "inline-block" : "hidden"
              }`}
              onClick={() => {
                props?.setIsNavbarOpen(false);
              }}
            >
              <FaXmark size={28} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminTopBar;
