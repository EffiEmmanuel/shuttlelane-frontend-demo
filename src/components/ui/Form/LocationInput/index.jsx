import React from "react";
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
  airports,
}) {
  const [isAirportSelectOpen, setIsAirportSelectOpen] = useState(false);

  const [isAirportSelectClicked, setIsAirportSelectClicked] = useState(false);

  // Programmatically set the value of the input
  const setAutocompleteValue = (value, lng, lat) => {
    console.log("LOCATION REF 1:", locationRef.current);
    if (locationRef.current) {
      setIsAirportSelectClicked(true);
      console.log("CURRENT LOCATION:", value);
      locationRef.current.value = value;
      setLocationInput(value);
      setIsAirportSelectClicked(false);

      // SET THE LOCATION
      // The location has to be an object that carries both the latitude and longitude because
      // these informations will be used to display the location on the map.
      setLocation({
        address: value,
        latitude: lat,
        longitude: lng,
      });

      setLocationInput(value);
      console.log("LOCATION INPUT OOOOOOOOOOOOOOOOOOOOO:::::", locationInput);
      console.log("LOCATION OOOOOOOOOOOOOOOOOOOOO:::::", location);
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
            {airports?.map((airport) => (
              <div
                onClick={() => {
                  console.log("Hello from here oooooo");
                  setIsAirportSelectClicked(true);
                  setAutocompleteValue(
                    `${airport?.airportName}`,
                    airport?.lng,
                    airport?.lat
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
                    {airport?.airportDisplayName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {airport?.airportName}
                  </p>
                </div>
              </div>
            ))}

            {(!airports || airports?.length < 1) && (
              <small>Start typing to find an address or airport...</small>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LocationInput;
