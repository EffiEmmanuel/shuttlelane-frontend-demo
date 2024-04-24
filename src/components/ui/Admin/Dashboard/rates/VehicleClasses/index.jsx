// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVehicleClasses,
  createVisaOnArrivalRate,
  deleteVehicleClass,
  deleteVisaOnArrivalRate,
  fetchCity,
  fetchCurrencies,
  fetchRatePerMile,
  fetchVehicleClasses,
  fetchVisaOnArrivalBaseRates,
  fetchVisaOnArrivalRates,
  setRatePerMile,
  setVisaOnArrivalBaseFees,
  updateVehicleClass,
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
import Select from "react-select";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiSolidCity } from "react-icons/bi";

// Images
import empty from "../../../../../../assets/images/empty.png";

function AdminVehicleClassesRate() {
  const { token, isLoading, cities, currentCity } = useSelector(
    (store) => store.admin
  );
  const dispatch = useDispatch();

  // Modal states
  const [isAddVehicleClassModalOpen, setIsAddVehicleClassModalOpen] =
    useState(false);

  // Add Vehicle Class Form Fields
  const [image, setImage] = useState();
  const [vehicleClassName, setVehicleClassName] = useState();
  const [vehicleClassDescription, setVehicleClassDescription] = useState();
  const [passengers, setPassengers] = useState();
  const [luggages, setLuggages] = useState();
  const [basePrice, setBasePrice] = useState();

  // FUNCTION: This function handles the creation of a vehicle class
  async function handleAddVehicleClass(e) {
    e.preventDefault();
    if (
      !image ||
      !vehicleClassName ||
      !vehicleClassDescription ||
      !passengers ||
      !luggages ||
      !basePrice
    ) {
      toast.error("Please fill in the missing fields");
      return;
    }
    dispatch(
      createVehicleClasses({
        image,
        vehicleClassName,
        description: vehicleClassDescription,
        passengers,
        luggages,
        basePrice,
        cityId: selectedCity?.value,
        token,
      })
    );

    dispatch(
      fetchCity({
        cityId: selectedCity?.value,
        token: token,
      })
    );
    setIsAddVehicleClassModalOpen(false);
  }

  // Fetch vehicle classes
  useEffect(() => {
    dispatch(fetchVehicleClasses(token));
  }, [token]);

  // MODIFY VEHICLE CLASS
  const [isVehicleDetailModalOpen, setIsVehicleDetailModalOpen] =
    useState(false);
  const [currentVehicleClass, setCurrentVehicleClass] = useState();

  // MODIFY VEHICLE CLASS FORM FIELDS
  const [modifiedImage, setModifiedImage] = useState();
  const [modifiedClassName, setModifiedClassName] = useState();
  const [modifiedClassDescription, setModifiedClassDescription] = useState();
  const [modifiedPassengers, setModifiedPassengers] = useState();
  const [modifiedLuggages, setModifiedLuggages] = useState();
  const [modifiedbasePrice, setModifiedBasePrice] = useState();
  useEffect(() => {
    setModifiedImage(currentVehicleClass?.image ?? "");
    setModifiedClassName(currentVehicleClass?.className ?? "");
    setModifiedClassDescription(currentVehicleClass?.description ?? "");
    setModifiedPassengers(currentVehicleClass?.passengers ?? "");
    setModifiedLuggages(currentVehicleClass?.luggages ?? "");
    setModifiedBasePrice(currentVehicleClass?.basePrice ?? "");
  }, [currentVehicleClass]);

  async function handleUpdateVehicleClass(e) {
    e.preventDefault();

    if (
      !modifiedImage ||
      !modifiedClassName ||
      !modifiedClassDescription ||
      !modifiedPassengers ||
      !modifiedLuggages ||
      !modifiedbasePrice
    ) {
      toast.error("Please fill in the missing fields");
      return;
    }

    console.log("TOKEN:", token);
    console.log("CVC ID:", currentVehicleClass?._id);

    dispatch(
      updateVehicleClass({
        token,
        image: modifiedImage,
        className: modifiedClassName,
        description: modifiedClassDescription,
        passengers: modifiedPassengers,
        luggages: modifiedLuggages,
        basePrice: modifiedbasePrice,
        vehicleClassId: currentVehicleClass?._id,
        cityId: selectedCity?.value,
      })
    );
    setIsVehicleDetailModalOpen(false);
  }
  async function handleDeleteVehicleClass(e) {
    e.preventDefault();
    dispatch(
      deleteVehicleClass({
        token,
        vehicleClassId: currentVehicleClass?._id,
        cityId: selectedCity?.value,
      })
    );

    dispatch(
      fetchCity({
        cityId: selectedCity?.value,
        token: token,
      })
    );
    setIsVehicleDetailModalOpen(false);
  }

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

  const [selectedCity, setSelectedCity] = useState();
  const [modalSelectedCity, setModalSelectedCity] = useState();
  // Prepare city data
  const [cityData, setCityData] = useState();

  useEffect(() => {
    function prepareCityData() {
      let citiesData = [];
      cities?.forEach((city) => {
        citiesData?.push({
          value: `${city?._id}`,
          label: `${city?.cityName}`,
        });
      });

      setCityData(citiesData);
    }

    prepareCityData();
  }, [cities]);

  // Set the current city
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
      {/* Add Vehicle Class Modal */}
      <Modal
        isOpen={isAddVehicleClassModalOpen}
        onRequestClose={() => setIsAddVehicleClassModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="h-[90%] overflow-y-scroll shuttlelaneScrollbar bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">Add Vehicle Class</h4>
              <small>Setup a new vehicle class</small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsAddVehicleClassModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Add Vehicle Class */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <div className="w-full relative border-dashed border-[1px] border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center overflow-hidden">
                  <>
                    <MdOutlineAddAPhoto size={24} className="text-gray-300" />
                    <small className="text-gray-300 text-center">
                      Click to insert Image
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
                        className="lg:w-[50%] w-[60%] object-contain h-full z-10"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full">
                {/* City */}
                <div className="w-full flex flex-col gap-y-1">
                  <label htmlFor="service" className="text-sm">
                    Select City
                  </label>
                  <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
                    <div className="w-[5%]">
                      <BiSolidCity size={16} className="text-gray-500" />
                    </div>

                    <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[0]">
                      <Select
                        value={modalSelectedCity}
                        onChange={(value) => {
                          setModalSelectedCity(value);
                        }}
                        options={cityData}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "transparent"
                              : "transparent",
                            borderWidth: state.isFocused ? "0" : "0",
                            backgroundColor: "transparent",
                            position: "relative",
                            zIndex: 0,
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

              <div className="w-full flex flex-col">
                <label htmlFor="vehicleClassName" className="text-sm">
                  Vehicle Class Name
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Economy"
                    name="vehicleClassName"
                    value={vehicleClassName}
                    onChange={(e) => {
                      setVehicleClassName(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="vehicleClassDescription" className="text-sm">
                  Vehicle Class Description
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Desctiption..."
                    name="vehicleClassDescription"
                    value={vehicleClassDescription}
                    onChange={(e) => {
                      setVehicleClassDescription(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="passengers" className="text-sm">
                  Passengers
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="number"
                    placeholder="2"
                    name="passengers"
                    value={passengers}
                    onChange={(e) => {
                      setPassengers(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="luggages" className="text-sm">
                  Luggages
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="number"
                    placeholder="2"
                    name="luggages"
                    value={luggages}
                    onChange={(e) => {
                      setLuggages(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="basePrice" className="text-sm">
                  Base Price
                </label>
                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="basePrice"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      ₦
                    </label>
                    <input
                      type="number"
                      placeholder="25000"
                      name="basePrice"
                      value={basePrice}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setBasePrice(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => handleAddVehicleClass(e)}
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
      {/* Vehicle Class Details Modal */}
      <Modal
        isOpen={isVehicleDetailModalOpen}
        onRequestClose={() => setIsVehicleDetailModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <div className="">
              <h4 className="font-semibold">
                {currentVehicleClass?.className}
              </h4>
              <small>
                More details on the {currentVehicleClass?.className} vehicle
                class
              </small>
            </div>

            <FaXmark
              size={20}
              onClick={() => setIsVehicleDetailModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Modify Vehicle Class / See more details */}
          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              <div className="w-full flex flex-col">
                <div className="w-full relative border-dashed border-[1px] border-gray-300 rounded-lg h-24 flex flex-col items-center justify-center overflow-hidden">
                  <>
                    <MdOutlineAddAPhoto size={24} className="text-gray-300" />
                    <small className="text-gray-300 text-center">
                      Click to insert Image
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

                  {modifiedImage && (
                    <div className="absolute w-full h-full top-0 flex justify-center items-center">
                      <FaXmark
                        onClick={() => {
                          setModifiedImage(null);
                        }}
                        size={16}
                        className="absolute top-3 right-3 cursor-pointer"
                      />
                      <img
                        src={`${modifiedImage}`}
                        alt="Uploaded"
                        className="lg:w-[50%] w-[60%] object-contain h-full z-10"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="vehicleClassName" className="text-sm">
                  Vehicle Class Name
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Economy"
                    name="vehicleClassName"
                    value={modifiedClassName}
                    onChange={(e) => {
                      setModifiedClassName(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="vehicleClassDescription" className="text-sm">
                  Vehicle Class Description
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Description..."
                    name="vehicleClassDescription"
                    value={modifiedClassDescription}
                    onChange={(e) => {
                      setModifiedClassDescription(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="passengers" className="text-sm">
                  Passengers
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="number"
                    placeholder="2"
                    name="passengers"
                    value={modifiedPassengers}
                    onChange={(e) => {
                      setModifiedPassengers(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="luggages" className="text-sm">
                  Luggages
                </label>

                <div className="w-full flex items-center justify-between">
                  <input
                    type="number"
                    placeholder="2"
                    name="luggages"
                    value={modifiedLuggages}
                    onChange={(e) => {
                      setModifiedLuggages(e.target.value);
                    }}
                    className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="basePrice" className="text-sm">
                  Base Price
                </label>
                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <label
                      htmlFor="basePrice"
                      className="text-sm inline-block p-3 bg-gray-200 h-11 rounded-tl-lg rounded-bl-lg"
                    >
                      ₦
                    </label>
                    <input
                      type="number"
                      placeholder="25000"
                      name="basePrice"
                      value={modifiedbasePrice}
                      onChange={(e) => {
                        console.log("RATE:", e.target.value);
                        setModifiedBasePrice(e.target.value);
                      }}
                      className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center lg:justify-between lg:flex-row flex-col gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => handleUpdateVehicleClass(e)}
                  className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-lg"
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
                  onClick={(e) => handleDeleteVehicleClass(e)}
                  className="w-full flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-red-500 focus:outline-none border-gray-400 rounded-lg"
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
          <p className="text-lg font-semibold">Vehicle Classes Rates</p>
          <small className="">
            The rates for <strong className="text-xs">Vehicle Classes</strong>{" "}
            on Shuttlelane. These also serves as the "Base Fee" for Airport
            Transfer and Priority Pass Bookings.
          </small>
        </div>

        {/* Add country button */}
        <button
          onClick={() => setIsAddVehicleClassModalOpen(true)}
          className="w-auto border-dashed border-[.8px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
        >
          <AiOutlinePlus size={16} />
          <span className="text-xs">Add Vehicle Class</span>
        </button>
      </div>

      {/* VEHICLE CLASSES TABLE */}
      {!isLoading && (
        <div className="mt-5 w-full lg:overflow-x-hidden overflow-x-scroll shuttlelaneScrollbarHoriz shuttlelaneScrollbar">
          <div className="">
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
                    options={cityData}
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

          {/* Table header */}
          <div className="maxContent lg:max-w-full lg:min-w-full flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
            <p className="w-[200px] lg:w-[20%] text-xs">Image</p>
            <p className="w-[200px] lg:w-[20%] text-xs">Class Name</p>
            <p className="w-[200px] lg:w-[20%] text-xs">Passengers</p>
            <p className="w-[200px] lg:w-[20%] text-xs">Luggages</p>
            <p className="w-[200px] lg:w-[20%] text-xs">Base Price</p>
          </div>

          {/* Table body */}
          {currentCity?.vehicleClasses?.map((vehicleClass) => (
            <div
              onClick={() => {
                setIsVehicleDetailModalOpen(true);
                setCurrentVehicleClass(vehicleClass);
              }}
              className="flex maxContent cursor-pointer lg:max-w-full lg:min-w-full justify-between items-center mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4"
            >
              <div
                className={`w-[200px] lg:w-[20%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                <img
                  src={`${vehicleClass?.image}`}
                  alt={`${vehicleClass?.className}`}
                  className="h-[40px] max-h[40px] min-h-[40px] object-contain"
                />
              </div>
              <p
                className={`w-[200px] lg:w-[20%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                {vehicleClass?.className}
              </p>
              <p
                className={`w-[200px] lg:w-[20%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                {vehicleClass?.passengers}
              </p>
              <p
                className={`w-[200px] lg:w-[20%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                {vehicleClass?.luggages}
              </p>
              <p
                className={`w-[200px] lg:w-[20%] text-xs ${
                  isLoading && "text-gray-400"
                }`}
              >
                ₦
                {Intl.NumberFormat("en-US", {}).format(vehicleClass?.basePrice)}
              </p>
            </div>
          ))}

          {currentCity?.vehicleClasses?.length < 1 && (
            <div className="flex flex-col items-center gap-y-5 text-center">
              <img
                src={empty}
                className="max-w-[150px] w-[150px] object-contain"
              />
              <p className="text-center text-sm">
                No vehicle classes to show for now...
              </p>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col gap-y-5 mt-5">
          <ImSpinner2
            size={20}
            className="text-shuttlelanePurple animate-spin"
          />
        </div>
      )}
    </div>
  );
}

export default AdminVehicleClassesRate;
