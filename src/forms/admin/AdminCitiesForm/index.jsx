// @ts-nocheck
import React, { useRef, useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineFlightTakeoff, MdOutlineLocationCity } from "react-icons/md";
import AdminAddAirportToCityForm from "./AddAirportToCityForm";
import { FaXmark } from "react-icons/fa6";
import Modal from "react-modal";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  createCity,
  deleteCity,
  fetchCities,
  fetchCity,
  resetMessage,
  updateCity,
} from "../../../redux/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import AdminVehicleClassesRate from "../../../components/ui/Admin/Dashboard/rates/VehicleClasses";
import LocationInput from "../../../components/ui/Form/LocationInput";

function AdminCitiesForm() {
  const dispatch = useDispatch();
  const { token, isLoading, message, requestStatus, cities, currentCity } =
    useSelector((store) => store.admin);

  const [isOverview, setIsOverview] = useState(true);
  const [isManageAirports, setIsManageAirports] = useState(false);
  const [isVehicleClasses, setIsVehicleClasses] = useState(false);

  const [selectedCity, setSelectedCity] = useState();
  const [selectedCityLabel, setSelectedCityLabel] = useState();

  // Add City Modal Setup
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false);
  const [cityName, setCityName] = useState("");

  // Create City Handler
  async function createNewCity(e) {
    console.log("hI");
    e.preventDefault();
    if (!cityName || cityName.trim().length === 0) {
      toast.error("You must specify a city name!");
      return;
    }
    dispatch(createCity({ token, cityName }));
    setIsAddCityModalOpen(false);
  }

  // This useEffect handles fetching all cities
  useEffect(() => {
    dispatch(fetchCities(token));
  }, [token]);

  // This useEffect handles fetching the selected city
  useEffect(() => {
    dispatch(fetchCity({ token, cityId: selectedCity?.value }));
    console.log("SELECTED CITYYYYYYY::", currentCity);
  }, [selectedCity]);

  // Update City Modal
  const [currentClickedCity, setCurrentClickedCity] = useState();
  const [isUpdateCityModalOpen, setIsUpdateCityModalOpen] = useState(false);
  // Form fields
  const [modifiedCityName, setModifiedCityName] = useState();
  const [modifiedCityAirports, setModifiedCityAirports] = useState();
  const [cityAirport, setCityAirport] = useState();
  const [airportLocation, setAirportLocation] = useState();
  const airportLocationRef = useRef(null);
  const [airportLocationInput, setAirportLocationInput] = useState();

  // FUNCTION: Handles adding airports to the city array
  function handleAddAirportToCity(
    airportToAdd,
    airportArrayArray,
    airportArrayArraySetter
  ) {
    if (airportToAdd.trim() != "") {
      airportArrayArraySetter([...airportArrayArray, airportToAdd]);
    } else {
      toast.info(
        "Cannot perform operation on an empty string. You must specify an airport."
      );
    }
  }

  // FUNCTION: Handles removing an airport from the city array
  function handleRemoveAirportFromCity(
    airportToRemove,
    airportArray,
    airportArraySetter
  ) {
    const indexToRemove = airportArray.indexOf(airportToRemove);
    const newArray = airportArray.filter((_, index) => index !== indexToRemove);
    airportArraySetter(newArray);
  }

  // Update fields for the modify city modal
  useEffect(() => {
    if (currentClickedCity) {
      setModifiedCityName(currentClickedCity?.cityName);
      setModifiedCityAirports(currentClickedCity?.airports);
    }
  }, [currentClickedCity]);

  async function handleDeleteCity(cityId) {
    dispatch(
      deleteCity({
        cityId: cityId,
        token: token,
      })
    );
  }

  async function handleUpdateCity(e) {
    e.preventDefault();
    dispatch(
      updateCity({
        cityId: currentClickedCity?._id,
        cityName: modifiedCityName,
        cityAirports: modifiedCityAirports,
        token: token,
      })
    );

    setIsUpdateCityModalOpen(false);
  }

  return (
    <div className="">
      <ToastContainer />
      <Modal
        isOpen={isAddCityModalOpen}
        onRequestClose={() => setIsAddCityModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Add New City</h4>

            <FaXmark
              size={20}
              onClick={() => setIsAddCityModalOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              {/* Airport */}
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="city" className="text-sm">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Lagos"
                  name="city"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>
              <button
                type="submit"
                name="city"
                onClick={(e) => createNewCity(e)}
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

      <Modal
        isOpen={isUpdateCityModalOpen}
        onRequestClose={() => setIsUpdateCityModalOpen(false)}
        className="flex h-full min-h-screen justify-center items-center lg:px-24 px-7"
      >
        <div className="bg-white shuttlelaneScrollbar min-h-[90vh] max-h-[90vh] h-[90vh] overflow-y-scroll shadow-lg rounded-lg text-shuttlelaneBlack lg:w-2/4 w-full p-7 px-10">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Modify City</h4>

            <div className="flex items-center gap-2">
              <FaXmark
                size={20}
                onClick={() => setIsUpdateCityModalOpen(false)}
                className="cursor-pointer"
              />
            </div>
          </div>

          <form className="w-full mt-5">
            <div className="flex flex-col gap-y-5 lg:items-center gap-x-4">
              {/* Modified City Name */}
              <div className="w-full flex flex-col">
                <label htmlFor="modifiedCityName" className="text-sm">
                  City Name
                </label>
                <input
                  type="text"
                  placeholder="Lagos"
                  name="modifiedCityName"
                  value={modifiedCityName}
                  onChange={(e) => setModifiedCityName(e.target.value)}
                  className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
                />
              </div>

              {/* Modified City Airports */}
              <div className="w-full flex flex-col">
                <label htmlFor="modifiedCityAirport" className="text-sm">
                  Airports
                </label>
                <div className="flex items-center flex-wrap gap-4 my-2">
                  {modifiedCityAirports?.map((modifiedCityAirport) => (
                    <div className="bg-shuttlelanePurple text-white h-10 p-2 flex items-center justify-between rounded-md">
                      <span className="text-sm">{modifiedCityAirport}</span>
                      <FaXmark
                        size={16}
                        onClick={() =>
                          handleRemoveAirportFromCity(
                            modifiedCityAirport,
                            modifiedCityAirports,
                            setModifiedCityAirports,
                            setModifiedCityAirports
                          )
                        }
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                  {modifiedCityAirports?.length < 1 && (
                    <div className="border-[2px] border-gray-300 border-dashed text-gray-300 h-10 p-2 flex items-center justify-between rounded-md">
                      <span className="text-sm">Add airports</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="relative w-[85%] text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-tl-lg rounded-bl-lg">
                    <LocationInput
                      placeholder="Eg. Murtala Muhammed International Airport"
                      setLocation={setAirportLocation}
                      location={airportLocation}
                      locationRef={airportLocationRef}
                      locationInput={airportLocationInput}
                      setLocationInput={setAirportLocationInput}
                    />
                  </div>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={(e) =>
                      handleAddAirportToCity(
                        airportLocationInput,
                        modifiedCityAirports,
                        setModifiedCityAirports
                      )
                    }
                    className="w-[15%] flex justify-center items-center text-sm text-white hover:text-shuttlelaneBlack h-11 p-3 transition-all hover:border-[1px] hover:bg-transparent bg-shuttlelanePurple focus:outline-none border-gray-400 rounded-tr-lg rounded-br-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => handleUpdateCity(e)}
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

      <h2 className="font-semibold text-xl text-shuttlelaneBlack">
        Cities and Airports
      </h2>
      <p className="text-sm">Manage cities and airports on Shuttlelane</p>

      {/* Options */}
      <div className="mt-9 flex justify-between items-baseline pb-1 transition-all border-b-[.3px] border-b-gray-200">
        <div className="flex items-center gap-x-10">
          <span
            onClick={() => {
              setIsOverview(true);
              setIsManageAirports(false);
              setIsVehicleClasses(false);
              setSelectedCity("");
            }}
            className={`text-xs cursor-pointer transition-all ${
              isOverview
                ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                : "text-gray-400"
            }`}
          >
            Overview
          </span>
          {/* <span
            onClick={() => {
              setIsOverview(false);
              setIsManageAirports(true);
              setIsVehicleClasses(false);
            }}
            className={`text-xs cursor-pointer transition-all ${
              isManageAirports
                ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                : "text-gray-400"
            }`}
          >
            Manage Airports
          </span> */}
          <span
            onClick={() => {
              setIsOverview(false);
              setIsManageAirports(false);
              setIsVehicleClasses(true);
            }}
            className={`text-xs cursor-pointer transition-all ${
              isVehicleClasses
                ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                : "text-gray-400"
            }`}
          >
            Vehicle Classes
          </span>
        </div>

        {/* Add city button */}
        <button
          onClick={() => setIsAddCityModalOpen(true)}
          className="w-auto border-dashed border-[.8px] lg:border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
        >
          <AiOutlinePlus size={16} />
          <span className="text-xs">Add City</span>
        </button>
      </div>

      <div className="w-full">
        {isOverview && (
          <div className="mt-7">
            <div className="W-full h-auto flex gap-x-3 rounded-lg">
              {/* Total Card */}
              <div className="flex flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                  <MdOutlineLocationCity size={16} className="text-white" />
                </div>
                <div className="">
                  {isLoading ? (
                    <ImSpinner2
                      size={20}
                      className="text-shuttlelanePurple animate-spin"
                    />
                  ) : (
                    <p className="text-2xl font-semibold spaceGroteskText">
                      {cities?.length}
                    </p>
                  )}
                  <small className="text-sm text-gray-400">Cities</small>
                </div>
              </div>
              {/* Total Card */}
              {/* <div className="flex flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                  <MdOutlineFlightTakeoff size={16} className="text-white" />
                </div>
                <div className="">
                  <p className="text-2xl font-semibold spaceGroteskText">8</p>
                  <small className="text-sm text-gray-400">Airports</small>
                </div>
              </div> */}
            </div>

            {/* Display cities info here */}
            <div className="mt-5 shuttlelaneScrollbarHoriz overflow-x-scroll">
              {/* Table header */}
              <div className="maxContent lg:max-w-full lg:min-w-full flex justify-between items-baseline mb-2 border-b-[.3px] border-b-gray-100 text-gray-400 mt-2">
                <p className="w-[200px] lg:w-[33.3%] text-xs">City</p>
                <p className="w-[200px] lg:w-[33.3%] text-xs">Airports</p>
                <p className="w-[200px] lg:w-[33.3%] text-xs">Actions</p>
              </div>

              {/* Table body */}
              {!isLoading && (
                <>
                  {cities?.map((city) => (
                    <div className="flex maxContent cursor-pointer lg:max-w-full lg:min-w-full justify-between items-center mb-2 pb-2 border-b-[.3px] border-b-gray-100 text-shuttlelaneBlack mt-4">
                      <p
                        onClick={() => {
                          setIsUpdateCityModalOpen(true);
                          setCurrentClickedCity(city);
                        }}
                        className={`w-[200px] lg:w-[33.3%] text-xs ${
                          isLoading && "text-gray-400"
                        }`}
                      >
                        {city?.cityName}
                      </p>
                      <p
                        onClick={() => {
                          setIsUpdateCityModalOpen(true);
                          setCurrentClickedCity(city);
                        }}
                        className={`w-[200px] lg:w-[33.3%] text-xs ${
                          isLoading && "text-gray-400"
                        }`}
                      >
                        <ol className="list-decimal">
                          {city?.airports?.map((airport) => (
                            <li className="text-xs">{airport}</li>
                          ))}
                        </ol>
                        {city?.airports?.length < 1 && (
                          <span className="text-xs">NIL</span>
                        )}
                      </p>

                      <div className="w-[200px] lg:w-[33.3%] flex items-center gap-x-3">
                        {!isLoading ? (
                          <button
                            onClick={() => {
                              handleDeleteCity(city?._id);
                            }}
                            className="text-xs"
                          >
                            <AiFillDelete size={16} className="text-red-500" />
                          </button>
                        ) : (
                          <ImSpinner2
                            size={16}
                            className="text-gray-400 animate-spin"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {cities?.length < 1 && (
                <div className="flex flex-col items-center gap-y-5 text-center">
                  {/* <img
                    src={empty}
                    className="max-w-[150px] w-[150px] object-contain"
                  /> */}
                  <p className="text-center text-sm">
                    No cities to show for now...
                  </p>
                </div>
              )}

              {isLoading && (
                <ImSpinner2
                  size={20}
                  className="text-shuttlelanePurple animate-spin"
                />
              )}
            </div>
          </div>
        )}

        {isVehicleClasses && <AdminVehicleClassesRate />}
      </div>
    </div>
  );
}

export default AdminCitiesForm;
