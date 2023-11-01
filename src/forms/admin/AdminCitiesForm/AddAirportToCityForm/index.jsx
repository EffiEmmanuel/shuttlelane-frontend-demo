import React, { useState, useRef } from "react";
import Select from "react-select";
import { BiSolidCity } from "react-icons/bi";

// Images
import { ImSpinner2 } from "react-icons/im";

function AdminAddAirportToCityForm({
  cityData,
  selectedCity,
  setSelectedCity,
}) {
  const [isLoading, setIsLoading] = useState(false);

  // FORM FIELDS
  const [airport, setAirport] = useState("");

  // Function: Handle log in admin
  async function onSubmit(values, actions) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }

  return (
    <form className="text-shuttlelaneBlack mt-10 flex flex-col gap-y-5">
      <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
        {/* City */}
        <div className="lg:w-[90%] w-full flex flex-col gap-y-1">
          <label htmlFor="service" className="text-sm">
            Select City
          </label>
          <div className="flex h-11 items-center border-[0.3px] bg-transparent focus:outline-none border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
            <div className="w-[5%]">
              <BiSolidCity size={16} className="text-gray-500" />
            </div>

            <div className="w-[95%] text-shuttlelaneBlack text-sm relative z-[0]">
              <Select
                value={selectedCity}
                onChange={(value) => setSelectedCity(value.value)}
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

      <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
        {/* Airport */}
        <div className="lg:w-[90%] w-full flex flex-col gap-y-1">
          <label htmlFor="airport" className="text-sm">
            Airport
          </label>
          <input
            type="text"
            placeholder="Murtala Mohammed International Airport"
            name="airport"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            className="w-full text-sm h-11 p-3 border-[0.3px] bg-transparent focus:outline-none border-gray-400 rounded-lg"
          />
        </div>
      </div>

      <button className="lg:w-[90%] text-sm w-full h-11 p-3 border-[0.3px] focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg">
        {isLoading ? (
          <ImSpinner2 size={21} className="text-white animate-spin" />
        ) : (
          "Add Airport"
        )}
      </button>
    </form>
  );
}

export default AdminAddAirportToCityForm;
