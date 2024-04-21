// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCar,
  createPass,
  createVisaOnArrivalRate,
  deleteCar,
  deletePass,
  deleteVisaOnArrivalRate,
  fetchCars,
  fetchCurrencies,
  fetchPasses,
  fetchRatePerMile,
  fetchVisaOnArrivalBaseRates,
  fetchVisaOnArrivalRates,
  setRatePerMile,
  setVisaOnArrivalBaseFees,
  updateCar,
  updatePass,
  updateVisaOnArrivalRate,
} from "../../../../../../redux/slices/adminSlice";
import { ImSpinner2 } from "react-icons/im";
import { calculateExchangeRate } from "../../../../../../util";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import {
  FaHandHoldingDollar,
  FaTrash,
  FaTrashCan,
  FaXmark,
} from "react-icons/fa6";
import Modal from "react-modal";

// Images
import empty from "../../../../../../assets/images/empty.png";

function AdminPriorityPassRates() {
  const { token, isLoading, passes } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Modal states
  const [isModifyBaseFeesModalOpen, setIsModifyBaseFeesModalOpen] =
    useState(false);
  const [isCreatePassModalOpen, setIsCreatePassModalOpen] = useState(false);

  // Add Country Form Fields
  const [passName, setPassName] = useState();
  const [price, setPrice] = useState();

  // FUNCTION: This function handles the creation of a new pass
  async function handleCreatePass(e) {
    e.preventDefault();
    if (!passName || !price) {
      toast.error("Please fill in the missing fields");
      return;
    }
    dispatch(
      createPass({
        token,
        name: passName,
        price: price,
      })
    );

    setIsCreatePassModalOpen(false);
  }

  // Fetch passes
  useEffect(() => {
    dispatch(fetchPasses(token));
  }, [token]);

  // UPDATE PASS
  const [isPassDetailModalOpen, setIsPassDetailModalOpen] = useState(false);
  const [currentPass, setCurrentPass] = useState();
  const [passNameModified, setPassNameModified] = useState();
  const [priceModified, setPriceModified] = useState();
  useEffect(() => {
    setPassNameModified(currentPass?.name ?? "");
    setPriceModified(currentPass?.price ?? 0);
  }, [currentPass]);

  async function handleUpdatePass(e) {
    e.preventDefault();

    if (!priceModified) {
      toast.error("Please fill in the missing fields");
      return;
    }
    dispatch(
      updatePass({
        token,
        passId: currentPass?._id,
        name: passNameModified,
        price: priceModified,
      })
    );
    setIsPassDetailModalOpen(false);
  }
  async function handleDeletePass(e) {
    e.preventDefault();

    dispatch(deletePass({ token, passId: currentPass?._id }));
    setIsPassDetailModalOpen(false);
  }

  return (
    <div className="mt-10">
      <ToastContainer />
      {/* Create Pass Modal */}
      <Modal
        isOpen={isCreatePassModalOpen}
        onRequestClose={() => setIsCreatePassModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Create Pass</h4>
              <small>Create a new pass</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsCreatePassModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Create Pass */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="name" className="text-sm">
                  Pass Type
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Standard Pass"
                    name="name"
                    value={passName}
                    onChange={(e) => {
                      console.log("RATE:", e.target.value);
                      setPassName(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="price" className="text-sm">
                  Price
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="price"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      ₦
                    </label>
                    <input
                      type="number"
                      placeholder="40,000"
                      name="price"
                      value={price}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setPrice(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  handleCreatePass(e);
                  setIsPassDetailModalOpen(false);
                }}
                className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
              >
                {isLoading ? (
                  <ImSpinner2 size={21} className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/* Car Details Modal */}
      <Modal
        isOpen={isPassDetailModalOpen}
        onRequestClose={() => setIsPassDetailModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">{currentPass?.name}</h4>
              <small>More details for {currentPass?.name}</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsPassDetailModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Update Pass */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="name" className="text-sm">
                  Pass Type
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Standard Pass"
                    name="name"
                    value={passNameModified}
                    onChange={(e) => {
                      console.log("RATE:", e.target.value);
                      setPassNameModified(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="price" className="text-sm">
                  Price
                </label>

                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="price"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      ₦
                    </label>
                    <input
                      type="number"
                      placeholder="40,000"
                      name="price"
                      value={priceModified}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setPriceModified(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex lg:flex-row flex-col lg:justify-between items-center gap-5">
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => {
                    handleUpdatePass(e);
                    setIsPassDetailModalOpen(false);
                  }}
                  className="w-full lg:w-[50%] flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
                >
                  {isLoading ? (
                    <ImSpinner2 size={21} className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => {
                    handleDeletePass(e);
                    setIsPassDetailModalOpen(false);
                  }}
                  className="w-full lg:w-[50%] flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-red-500 focus:outline-none border-gray-400 rounded-lg"
                >
                  {isLoading ? (
                    <ImSpinner2 size={21} className="animate-spin" />
                  ) : (
                    <div className="flex items-center gap-x-2">
                      <FaTrashCan size={16} />
                      <span className="text-sm">Delete</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <div className="flex gap-x-5 flex-wrap gap-y-3 items-end pb-3 border-b-[1.3px] lg:border-b-[.5px] border-b-gray-200">
        <div className="">
          <p className="text-lg font-semibold">Priority Pass Rates</p>
          <small className="">
            The rates per pass for{" "}
            <strong className="text-xs">Priority Pass</strong> bookings on
            Shuttlelane
          </small>
        </div>

        {/* Add car button */}
        <button
          onClick={() => setIsCreatePassModalOpen(true)}
          className="w-auto border-dashed border-[.8px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
        >
          <AiOutlinePlus size={16} />
          <span className="text-xs">Create Pass</span>
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-y-5 mt-5">
          <ImSpinner2
            size={20}
            className="text-shuttlelanePurple animate-spin"
          />
        </div>
      )}

      {/* CARS TABLE */}
      {!isLoading && (
        <div className="mt-5 w-full lg:overflow-x-hidden overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
          {/* Table header */}
          <div className="maxContent lg:max-w-full lg:min-w-full flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
            <p className="w-[200px] lg:w-[50%] text-xs">Pass Type</p>
            <p className="w-[200px] lg:w-[50%] text-xs">Price</p>
          </div>

          {/* Table body */}
          {passes?.map((pass) => (
            <div
              onClick={() => {
                setIsPassDetailModalOpen(true);
                setCurrentPass(pass);
              }}
              className="flex maxContent cursor-pointer lg:max-w-full lg:min-w-full justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4"
            >
              <p
                className={`w-[200px] lg:w-[50%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                {pass?.name}
              </p>
              <p
                className={`w-[200px] lg:w-[50%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                ₦{Intl.NumberFormat("en-US", {}).format(pass?.price)}
              </p>
            </div>
          ))}

          {passes?.length < 1 && (
            <div className="flex flex-col items-center gap-y-5 text-center">
              <img
                src={empty}
                className="max-w-[150px] w-[150px] object-contain"
              />
              <p className="text-center text-sm">
                No passes to show for now...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPriorityPassRates;
