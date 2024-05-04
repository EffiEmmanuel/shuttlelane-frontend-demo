// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCar,
  deleteCar,
  fetchCities,
  fetchCity,
  updateCar,
} from "../../../../../../redux/slices/adminSlice";
import { ImSpinner2 } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import {
  FaHandHoldingDollar,
  FaTrash,
  FaTrashCan,
  FaXmark,
} from "react-icons/fa6";
import Modal from "react-modal";
import Select from "react-select";

// Images
import empty from "../../../../../../assets/images/empty.png";
import { BiSolidCity } from "react-icons/bi";

function AdminCarRates() {
  const {
    token,
    isLoading,
    visaOnArrivalRates,
    voaBaseFees,
    cars,
    cities,
    currentCity,
  } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // Modal states
  const [isModifyBaseFeesModalOpen, setIsModifyBaseFeesModalOpen] =
    useState(false);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);

  // Add Country Form Fields
  const [city, setCity] = useState();
  const [carName, setCarName] = useState();
  const [price, setPrice] = useState();

  const [selectedCity, setSelectedCity] = useState();
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
        city: selectedCity?.value,
        name: carName,
        price: price,
      })
    );

    setIsAddCarModalOpen(false);
  }

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
        city: currentCar?.city,
      })
    );
    setIsCarDetailModalOpen(false);
  }
  async function handleDeleteCar(carId) {
    dispatch(
      deleteCar({
        token,
        carId: carId,
        city: currentCar?.city ?? selectedCity?.value,
      })
    );
    setIsCarDetailModalOpen(false);
  }

  //   Fetch currencies and rate per mile
  useEffect(() => {
    dispatch(fetchCities(token));
  }, [token]);

  // Format cities
  const [citiesData, setCitiesData] = useState();
  useEffect(() => {
    let updatedCityData = [];
    cities?.forEach((city) => {
      updatedCityData.push({
        value: city?._id,
        label: city?.cityName,
      });
    });

    setCitiesData(updatedCityData);
  }, [cities]);

  //   useEffect(() => {}, [])

  // This useEffect handles fetching the selected city
  useEffect(() => {
    cities.forEach((city) => {
      if (city?._id == selectedCity?.value) {
        dispatch(
          fetchCity({
            cityId: city?._id,
            token: token,
          })
        );
      }
    });
  }, [selectedCity]);

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
                <label htmlFor="visaFee" className="text-sm">
                  City
                </label>
                <div className="flex items-center bg-gray-100 h-[47px] px-2 gap-x-2 w-full rounded-lg">
                  <div className="w-full text-shuttlelaneBlack text-sm relative">
                    <Select
                      value={city}
                      onChange={(value) => setCity(value)}
                      options={citiesData}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused
                            ? "transparent"
                            : "transparent",
                          borderWidth: state.isFocused ? "0" : "0",
                          backgroundColor: "transparent",
                          position: "relative",
                        }),

                        placeholder: (baseStyles, state) => ({
                          ...baseStyles,
                          // fontSize: ".75rem",
                        }),

                        menuList: (baseStyles, state) => ({
                          ...baseStyles,
                          // fontSize: ".75rem",
                        }),

                        input: (baseStyles, state) => ({
                          ...baseStyles,
                          // fontSize: ".75rem",
                        }),
                      }}
                      placeholder="Select City"
                    />
                  </div>
                </div>
              </div>

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
                  className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
                >
                  {isLoading ? (
                    <ImSpinner2 size={21} className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <div className="flex gap-x-5 flex-wrap gap-y-3 items-end pb-3 border-b-[1.3px] lg:border-b-[.5px] border-b-gray-200">
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
          className="w-auto border-dashed border-[8px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
        >
          <AiOutlinePlus size={16} />
          <span className="text-xs">Add Car</span>
        </button>
      </div>

      <div className="mt-5">
        {/* City */}
        <div className="lg:w-[30%] w-full flex flex-col gap-y-1">
          <label htmlFor="service" className="text-sm">
            Select City
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-[5%]">
              <BiSolidCity size={16} className="text-gray-500" />
            </div>

            <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[90]">
              <Select
                value={selectedCity}
                onChange={(value) => {
                  setSelectedCity(value);
                }}
                options={citiesData}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused
                      ? "transparent"
                      : "transparent",
                    borderWidth: state.isFocused ? "0" : "0",
                    backgroundColor: "transparent",
                    position: "relative",
                  }),

                  placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: ".875rem",
                  }),

                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: ".875rem",
                  }),

                  input: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: ".875rem",
                  }),
                }}
                placeholder="Select City"
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-y-5 mt-5 w-full">
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
            <p className="w-[200px] lg:w-[33.3%] text-xs">Car Name</p>
            <p className="w-[200px] lg:w-[33.3%] text-xs">Price per day</p>
            <p className="w-[200px] lg:w-[33.3%] text-xs">Actions</p>
          </div>

          {/* Table body */}
          {currentCity?.cars?.map((car) => (
            <div className="flex maxContent cursor-pointer lg:max-w-full lg:min-w-full justify-between items-baseline mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
              <p
                onClick={() => {
                  setIsCarDetailModalOpen(true);
                  setCurrentCar(car);
                }}
                className={`w-[200px] lg:w-[33.3%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                {car?.name}
              </p>
              <p
                onClick={() => {
                  setIsCarDetailModalOpen(true);
                  setCurrentCar(car);
                }}
                className={`w-[200px] lg:w-[33.3%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                ₦{Intl.NumberFormat("en-US", {}).format(car?.price)}
              </p>

              <p
                className={`w-[200px] lg:w-[33.3%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                <AiFillDelete
                  onClick={() => {
                    handleDeleteCar(car?._id);
                  }}
                  size={16}
                  className="text-red-500"
                />
              </p>
            </div>
          ))}

          {currentCity?.cars?.length < 1 && (
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
