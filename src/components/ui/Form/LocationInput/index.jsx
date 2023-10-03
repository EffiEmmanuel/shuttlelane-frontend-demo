import { IoAirplaneOutline } from "react-icons/io5";
import GoogleLocationInput from "../../GoogleLocationInput";
import { useState } from "react";

function LocationInput({ setLocation, placeholder }) {
  const [isAirportSelectOpen, setIsAirportSelectOpen] = useState(false);
  return (
    <>
      <GoogleLocationInput
        setIsAirportSelectOpen={setIsAirportSelectOpen}
        placeholder={placeholder}
        setLocation={setLocation}
      />
      {/* Show the airport select dialog conditionally i.e Only when the input is
      in focus && when it is empty and hide it when it is out of focus */}

      {isAirportSelectOpen && (
        <div className="bg-white shadow-lg h-auto w-full absolute top-10 z-[99] left-0 p-5">
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-3">
              <IoAirplaneOutline
                size={20}
                className="text-gray-500 -rotate-45"
              />

              <div className="flex flex-col gap-y-1">
                <p className="font-semibold text-gray-500">
                  Murtala Mohammed International Airport I (MMIA)
                </p>
                <p className="text-xs text-gray-500">
                  Murtala Mohammed International Airport I
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <IoAirplaneOutline
                size={20}
                className="text-gray-500 -rotate-45"
              />

              <div className="flex flex-col gap-y-1">
                <p className="font-semibold text-gray-500">
                  Murtala Mohammed International Airport II (MMIA)
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
