import { IoAirplaneOutline } from "react-icons/io5";
import GoogleLocationInput from "../../GoogleLocationInput";
import { useState } from "react";

function LocationInput({
  setLocation,
  placeholder,
  location,
  locationRef,
  locationInput,
  setLocationInput,
}) {
  const [isAirportSelectOpen, setIsAirportSelectOpen] = useState(false);

  const [isAirportSelectClicked, setIsAirportSelectClicked] = useState(false);

  // Programmatically set the value of the input
  const setAutocompleteValue = (value) => {
    if (locationRef.current) {
      setIsAirportSelectClicked(true);
      console.log("CURRENT LOCATION:", value);
      locationRef.current.value = value;
      setLocationInput(value);
      //   setIsAirportSelectClicked(false);
    }
  };

  return (
    <>
      <GoogleLocationInput
        setIsAirportSelectOpen={setIsAirportSelectOpen}
        placeholder={placeholder}
        setLocation={setLocation}
        location={location}
        locationRef={locationRef}
        locationInput={locationInput}
        setLocationInput={setLocationInput}
        isAirportSelectClicked={isAirportSelectClicked}
      />
      {/* Show the airport select dialog conditionally i.e Only when the input is
      in focus && when it is empty and hide it when it is out of focus */}

      {isAirportSelectOpen && (
        <div className="bg-white shadow-lg h-auto w-full absolute top-10 z-[99] left-0 p-5">
          <div className="flex flex-col gap-y-6">
            <div
              onClick={() => {
                setIsAirportSelectClicked(true);
                setAutocompleteValue(
                  "Murtala Mohammed International Airport I (MMIA I)"
                );
              }}
              className="cursor-pointer flex items-center gap-x-3"
            >
              <IoAirplaneOutline
                size={20}
                className="text-gray-500 -rotate-45 lg:inline-block hidden"
              />
              <IoAirplaneOutline
                size={30}
                className="text-gray-500 -rotate-45 lg:hidden inline-block"
              />

              <div className="flex flex-col gap-y-1">
                <p className="font-semibold text-gray-500 text-sm lg:text-md">
                  Murtala Mohammed International Airport I (MMIA)
                </p>
                <p className="text-xs text-gray-500">
                  Murtala Mohammed International Airport I
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setLocation(
                  "Murtala Mohammed International Airport Ii (MMIA iI"
                );
              }}
              className="cursor-pointer flex items-center gap-x-3"
            >
              <IoAirplaneOutline
                size={20}
                className="text-gray-500 -rotate-45 lg:inline-block hidden"
              />
              <IoAirplaneOutline
                size={30}
                className="text-gray-500 -rotate-45 lg:hidden inline-block"
              />

              <div className="flex flex-col gap-y-1">
                <p className="font-semibold text-gray-500 text-sm lg:text-md">
                  Murtala Mohammed International Airport II (MMIA II)
                </p>
                <p className="text-xs text-gray-500">
                  Murtala Mohammed International Airport II
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LocationInput;
