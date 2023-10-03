import React, { useRef } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

function GoogleLocationInput({
  placeholder, // Placeholder prop to make search input dynamic
  setIsAirportSelectOpen,
  setLocation,
}) {
  const inputRef = useRef();

  // FUNCTION: This function handles when a location is selected from the Google autocomplete dialog
  function handlePlacesChanged() {
    // Close the airport select dialog
    setIsAirportSelectOpen(false);

    // Get the place object from the Google autocomplete dialog
    const [place] = inputRef.current?.getPlaces();

    // Check if place exists before performing any operation on it
    if (place) {
      // SET THE LOCATION
      // The location has to be an object that carries both the latitude and longitude because
      // these informations will be used to display the location on the map.
      setLocation({
        address: place?.formatted_address,
        latitude: place?.geometry?.location?.lat(),
        longitude: place?.geometry?.location?.lng(),
      });
    }
  }

  return (
    <LoadScript
      googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
      libraries={["places"]}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          placeholder={placeholder}
          // Check for when to hide and show the airport select dialog
          onFocus={(e) => {
            if (e.target.value.trim() === "") {
              setIsAirportSelectOpen(true);
            } else {
              setIsAirportSelectOpen(false);
            }
          }}
          // Check for when to hide and show the airport select dialog
          onChange={(e) => {
            console.log("TARGET VALUE:", e.target.value);
            if (e.target.value.trim() === "") {
              setIsAirportSelectOpen(true);
            } else {
              setIsAirportSelectOpen(false);
            }
          }}
          // Hide the airport select dialog once the input is out of focus
          onBlur={() => {
            setIsAirportSelectOpen(false);
          }}
          className="bg-transparent w-full focus:outline-none text-sm text-shuttlelaneBlack"
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
}

export default GoogleLocationInput;
