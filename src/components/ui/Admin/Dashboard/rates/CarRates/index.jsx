// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCar,
  createVisaOnArrivalRate,
  deleteCar,
  deleteVisaOnArrivalRate,
  fetchCars,
  fetchCurrencies,
  fetchRatePerMile,
  fetchVisaOnArrivalBaseRates,
  fetchVisaOnArrivalRates,
  setRatePerMile,
  setVisaOnArrivalBaseFees,
  updateCar,
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

function AdminCarRates() {
  const { token, isLoading, visaOnArrivalRates, voaBaseFees, cars } =
    useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Modal states
  const [isModifyBaseFeesModalOpen, setIsModifyBaseFeesModalOpen] =
    useState(false);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);

  // Add Country Form Fields
  const [carName, setCarName] = useState();
  const [price, setPrice] = useState();

  // FUNCTION: This function handles the creation of a new car
  async function handleAddCar(e) {
    e.preventDefault();
    if (!carName || !price) {
      toast.error("Please fill in the missing fields");
      return;
    }
    dispatch(
      createCar({
        token,
        name: carName,
        price: price,
      })
    );

    setIsAddCarModalOpen(false);
  }

  // Fetch cars
  useEffect(() => {
    dispatch(fetchCars(token));
  }, [token]);

  // MODIFY CAR
  const [isCarDetailModalOpen, setIsCarDetailModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState();
  const [carNameModified, setCarNameModified] = useState();
  const [priceModified, setPriceModified] = useState();
  useEffect(() => {
    setCarNameModified(currentCar?.name ?? "");
    setPriceModified(currentCar?.price ?? 0);
  }, [currentCar]);

  async function handleUpdateCar(e) {
    e.preventDefault();

    if (!priceModified || !carNameModified) {
      toast.error("Please fill in the missing fields");
      return;
    }
    dispatch(
      updateCar({
        token,
        carId: currentCar?._id,
        name: carNameModified,
        price: priceModified,
      })
    );
    setIsCarDetailModalOpen(false);
  }
  async function handleDeleteCar(e) {
    e.preventDefault();

    dispatch(deleteCar({ token, carId: currentCar?._id }));
    setIsCarDetailModalOpen(false);
  }

  return (
    <div className="mt-10">
      <ToastContainer />
      {/* Add Car Modal */}
      <Modal
        isOpen={isAddCarModalOpen}
        onRequestClose={() => setIsAddCarModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Add Car</h4>
              <small>Create a new car</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsAddCarModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Add Car */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="name" className="text-sm">
                  Car Name
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Toyota Camry 2019"
                    name="car"
                    value={carName}
                    onChange={(e) => {
                      console.log("RATE:", e.target.value);
                      setCarName(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="price" className="text-sm">
                  Price per day
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
                  handleAddCar(e);
                  setIsCarDetailModalOpen(false);
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
        isOpen={isCarDetailModalOpen}
        onRequestClose={() => setIsCarDetailModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">{currentCar?.name}</h4>
              <small>More details for {currentCar?.name}</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsCarDetailModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Update Car */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <label htmlFor="name" className="text-sm">
                  Car Name
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Toyota Camry 2019"
                    name="car"
                    value={carNameModified}
                    onChange={(e) => {
                      console.log("RATE:", e.target.value);
                      setCarNameModified(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="price" className="text-sm">
                  Price per day
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
                    handleUpdateCar(e);
                    setIsCarDetailModalOpen(false);
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
                    handleDeleteCar(e);
                    setIsCarDetailModalOpen(false);
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

      <div className="flex gap-x-5 flex-wrap gap-y-3 items-end pb-3 border-b-[.5px] border-b-gray-200">
        <div className="">
          <p className="text-lg font-semibold">Car Rates</p>
          <small className="">
            The rates per car for{" "}
            <strong className="text-xs">Car Rental</strong> bookings on
            Shuttlelane
          </small>
        </div>

        {/* Add car button */}
        <button
          onClick={() => setIsAddCarModalOpen(true)}
          className="w-auto border-dashed border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
        >
          <AiOutlinePlus size={16} />
          <span className="text-xs">Add Car</span>
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
            <p className="w-[200px] lg:w-[50%] text-xs">Car Name</p>
            <p className="w-[200px] lg:w-[50%] text-xs">Price per day</p>
          </div>

          {/* Table body */}
          {cars?.map((car) => (
            <div
              onClick={() => {
                setIsCarDetailModalOpen(true);
                setCurrentCar(car);
              }}
              className="flex maxContent cursor-pointer lg:max-w-full lg:min-w-full justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4"
            >
              <p
                className={`w-[200px] lg:w-[50%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                {car?.name}
              </p>
              <p
                className={`w-[200px] lg:w-[50%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                ₦{Intl.NumberFormat("en-US", {}).format(car?.price)}
              </p>
            </div>
          ))}

          {cars?.length < 1 && (
            <div className="flex flex-col items-center gap-y-5 text-center">
              <img
                src={empty}
                className="max-w-[150px] w-[150px] object-contain"
              />
              <p className="text-center text-sm">No cars to show for now...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminCarRates;
