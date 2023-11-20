// @ts-nocheck
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineFlightTakeoff, MdOutlineLocationCity } from "react-icons/md";
import AdminAddAirportToCityForm from "./AddAirportToCityForm";
import { FaXmark } from "react-icons/fa6";
import Modal from "react-modal";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  createCity,
  fetchCities,
  fetchCity,
  resetMessage,
} from "../../../redux/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

function AdminCitiesForm() {
  const dispatch = useDispatch();
  const { token, isLoading, message, requestStatus, cities, currentCity } =
    useSelector((store) => store.admin);

  const [isOverview, setIsOverview] = useState(true);
  const [isManageAirports, setIsManageAirports] = useState(false);

  // Form data
  const cityData = [
    { value: "Lagos", label: "Lagos" },
    { value: "Accra", label: "Accra" },
    { value: "Ogun", label: "Ogun" },
    { value: "Ibadans", label: "Ibadanss" },
  ];

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
          <span
            onClick={() => {
              setIsOverview(false);
              setIsManageAirports(true);
            }}
            className={`text-xs cursor-pointer transition-all ${
              isManageAirports
                ? "font-semibold text-shuttlelaneBlack border-b-2 border-b-shuttlelaneBlack"
                : "text-gray-400"
            }`}
          >
            Manage Airports
          </span>
        </div>

        {/* Add city button */}
        <button
          onClick={() => setIsAddCityModalOpen(true)}
          className="w-auto border-dashed border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1"
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
              <div className="flex flex-row gap-x-2 p-3 items-center rounded-lg border-[.3px] border-gray-100 lg:w-1/4 w-full">
                <div className="h-10 w-10 rounded-full bg-shuttlelanePurple shadow-[#4540cf85] shadow-md flex justify-center items-center">
                  <MdOutlineFlightTakeoff size={16} className="text-white" />
                </div>
                <div className="">
                  <p className="text-2xl font-semibold spaceGroteskText">8</p>
                  <small className="text-sm text-gray-400">Airports</small>
                </div>
              </div>
            </div>

            {/* Display cities info here */}
            <div className="mt-5">
              <h4 className="">Cities</h4>

              {isLoading && (
                <ImSpinner2
                  size={20}
                  className="text-shuttlelanePurple animate-spin"
                />
              )}

              {cities?.length < 1 && (
                <p className="text-sm">No data to show for now...</p>
              )}

              <ol className="list-decimal pl-4" start="1">
                {cities?.map((city) => (
                  <li>
                    <p>{city?.cityName}</p>
                    <ul className="list-">
                      {city?.airports?.map((airport) => (
                        <li>{airport}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {isManageAirports && (
          <div className="w-full flex lg:flex-row flex-col gap-y-4 gap-x-5">
            <div className="lg:w-[40%] w-full">
              <AdminAddAirportToCityForm
                cityData={cityData}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                setSelectedCityLabel={setSelectedCityLabel}
              />
            </div>
            <div className="lg:w-[60%] w-full mt-16">
              <div className="border-gray-200 border-[.3px] rounded-lg w-full h-auto p-3">
                {!selectedCity && (
                  <div className="">
                    <p className="text-xs text-center text-gray-400">
                      Select a City to see airport data
                    </p>
                  </div>
                )}

                {selectedCity && (
                  <>
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-x-2">
                        <p className="font-medium">
                          Airports in {selectedCityLabel}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-x-4 gap-y-5 mt-5">
                      {!isLoading && (
                        <>
                          {currentCity?.airports?.map((airport) => (
                            <div className="flex items-center gap-x-4 border-dashed border-shuttlelaneBlack border-[.3px] maxContent p-3 rounded-full">
                              <span className="text-xs">{airport}</span>
                              <FaXmark size={16} />
                            </div>
                          ))}
                        </>
                      )}

                      {currentCity?.airports?.length < 1 && !isLoading && (
                        <span className="text-xs text-center">
                          You have not added any airport to this city yet
                        </span>
                      )}

                      {isLoading && (
                        <div className="flex items-center justify-center">
                          <ImSpinner2
                            size={32}
                            className="text-shuttlelanePurple animate-spin"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCitiesForm;
