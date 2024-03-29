// @ts-nocheck
import React, { useEffect, useRef } from "react";
import {
  LoadScript,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_LIBRARIES = ["places"];

function GoogleLocationInput({
  placeholder, // Placeholder prop to make search input dynamic
  setIsAirportSelectOpen,
  setLocation,
  location,
  locationRef,
  locationInput,
  setLocationInput,
  isAirportSelectClicked,
}) {
  // Load Google Maps API here
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });
  // FUNCTION: This function handles when a location is selected from the Google autocomplete dialog
  function handlePlacesChanged() {
    console.log("CURRENT LOCATION INPUT VALUE:", locationInput);
    // Close the airport select dialog
    setIsAirportSelectOpen(false);

    // Get the place object from the Google autocomplete dialog
    const [place] = locationRef.current?.getPlaces();

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

      setLocationInput(place?.formatted_address);
    }
  }

  useEffect(() => {
    console.log("LOCATION REF:", locationRef);
    if (locationRef.current) {
      locationRef.current.value = locationInput;
    }

    console.log("LOCATION INPUT:", locationInput);
  }, [locationInput]);

  return (
    <>
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (locationRef.current = ref)}
          ref={locationRef}
          onPlacesChanged={handlePlacesChanged}
        >
          <>
            <input
              type="text"
              placeholder={placeholder}
              value={locationInput}
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
                setLocationInput(e.target.value);
                if (e.target.value.trim() === "") {
                  setIsAirportSelectOpen(true);
                } else {
                  setIsAirportSelectOpen(false);
                  console.log("Hello:::::", locationRef.current?.value);
                }
              }}
              // Hide the airport select dialog once the input is out of focus
              onBlur={(e) => {
                console.log("isAirportSelectClicked:", isAirportSelectClicked);
                console.log("hi:", locationRef.current);
                if (!location) {
                  console.log("Hello:", location);
                  setLocationInput("");
                }
                setTimeout(() => {
                  setIsAirportSelectOpen(false);
                }, 300);
              }}
              className="bg-transparent w-full focus:outline-none text-sm text-shuttlelaneBlack"
            />
          </>
        </StandaloneSearchBox>
      )}
    </>
  );
}

export default GoogleLocationInput;
