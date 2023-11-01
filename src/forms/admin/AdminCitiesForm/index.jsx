// @ts-nocheck
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineFlightTakeoff, MdOutlineLocationCity } from "react-icons/md";
import AdminAddAirportToCityForm from "./AddAirportToCityForm";
import { FaXmark } from "react-icons/fa6";

function AdminCitiesForm() {
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

  return (
    <div className="">
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

        <button className="w-auto border-dashed border-[.3px] border-shuttlelaneBlack p-1 rounded-sm flex items-center gap-x-1">
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
                  <p className="text-2xl font-semibold spaceGroteskText">3</p>
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
          </div>
        )}

        {isManageAirports && (
          <div className="w-full flex lg:flex-row flex-col gap-y-4 gap-x-5">
            <div className="lg:w-[40%] w-full">
              <AdminAddAirportToCityForm
                cityData={cityData}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
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
                          Airports in {selectedCity}
                        </p>
                        <div className="h-2 w-2 rounded-full bg-shuttlelanePurple"></div>
                      </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-x-4 gap-y-5 mt-5">
                      {/* Airport card */}
                      <div className="flex items-center gap-x-4 border-dashed border-shuttlelaneBlack border-[.3px] maxContent p-3 rounded-full">
                        <span className="text-xs">
                          Murtala Mohammed International Airport
                        </span>
                        <FaXmark size={16} />
                      </div>
                      {/* Airport card */}
                      <div className="flex items-center gap-x-4 border-dashed border-shuttlelaneBlack border-[.3px] maxContent p-3 rounded-full">
                        <span className="text-xs">
                          Murtala Mohammed International Airport
                        </span>
                        <FaXmark size={16} />
                      </div>
                      {/* Airport card */}
                      <div className="flex items-center gap-x-4 border-dashed border-shuttlelaneBlack border-[.3px] maxContent p-3 rounded-full">
                        <span className="text-xs">
                          Murtala Mohammed International Airport
                        </span>
                        <FaXmark size={16} />
                      </div>
                      {/* Airport card */}
                      <div className="flex items-center gap-x-4 border-dashed border-shuttlelaneBlack border-[.3px] maxContent p-3 rounded-full">
                        <span className="text-xs">
                          Murtala Mohammed International Airport
                        </span>
                        <FaXmark size={16} />
                      </div>
                      {/* Airport card */}
                      <div className="flex items-center gap-x-4 border-dashed border-shuttlelaneBlack border-[.3px] maxContent p-3 rounded-full">
                        <span className="text-xs">
                          Murtala Mohammed International Airport
                        </span>
                        <FaXmark size={16} />
                      </div>
                      {/* Airport card */}
                      <div className="flex items-center gap-x-4 border-dashed border-shuttlelaneBlack border-[.3px] maxContent p-3 rounded-full">
                        <span className="text-xs">
                          Murtala Mohammed International Airport
                        </span>
                        <FaXmark size={16} />
                      </div>
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
