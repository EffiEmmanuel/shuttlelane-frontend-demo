import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { BiSolidCity } from "react-icons/bi";

// Images
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import LocationInput from "../../../../components/ui/Form/LocationInput";
import { IoLocationOutline } from "react-icons/io5";
import { addAirportToCity } from "../../../../redux/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";

function AdminAddAirportToCityForm({
  selectedCity,
  setSelectedCity,
  setSelectedCityLabel,
}) {
  const { cities, isLoading, token } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  // FORM FIELDS
  const [airportLocation, setAirportLocation] = useState();
  const airportLocationRef = useRef(null);
  const [airportLocationInput, setAirportLocationInput] = useState();

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

  // Onsubmit handler
  async function handleAddAirportToCity(e) {
    e.preventDefault();
    if (
      !selectedCity ||
      !airportLocationInput ||
      airportLocationInput?.trim() === ""
    ) {
      toast.error("Airport field cannot be empty!");
      return;
    }

    dispatch(
      addAirportToCity({
        cityId: selectedCity.value,
        airport: airportLocationInput,
        token: token,
      })
    );
  }

  return (
    <>
      <ToastContainer />
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

              <div className="w-[95%] text-shuttlelaneBlack text-sm relative">
                <Select
                  value={selectedCity}
                  onChange={(value) => {
                    setSelectedCity(value);
                    setSelectedCityLabel(value.label);
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

        <div className="flex flex-col lg:flex-row gap-y-5 lg:items-center gap-x-4">
          {/* Airport */}
          <div className="lg:w-[90%] w-full flex flex-col gap-y-1">
            <label htmlFor="airport" className="text-sm">
              Airport
            </label>

            <div className="relative flex h-[47px] items-center border-[0.3px] border-gray-400 py-2 px-2 gap-x-2 w-full rounded-lg">
              <div className="w-[5%]">
                <IoLocationOutline size={16} className="text-gray-700" />
              </div>

              <div className="w-full relative text-shuttlelaneBlack">
                <LocationInput
                  placeholder="Eg. Murtala Muhammed International Airport"
                  setLocation={setAirportLocation}
                  location={airportLocation}
                  locationRef={airportLocationRef}
                  locationInput={airportLocationInput}
                  setLocationInput={setAirportLocationInput}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => handleAddAirportToCity(e)}
          type="submit"
          disabled={isLoading}
          className="lg:w-[90%] disabled:bg-shuttlelaneLightPurple disabled:text-gray-400 text-sm w-full h-11 p-3 border-[0.3px] focus:outline-none bg-shuttlelanePurple flex items-center justify-center text-white border-gray-400 rounded-lg"
        >
          {isLoading ? (
            <ImSpinner2 size={21} className="text-white animate-spin" />
          ) : (
            "Add Airport"
          )}
        </button>
      </form>
    </>
  );
}

export default AdminAddAirportToCityForm;
