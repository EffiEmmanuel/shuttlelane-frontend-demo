import React from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";

function GoogleLocationInput({ placeholder }) {
  const inputRef = useRef();
  function handlePlacesChanged() {
    const [place] = inputRef.current?.getPlaces();
    if (place) {
      console.log("Formatted address:", place?.formatted_address);
      console.log("Latitude:", place?.geometry?.location?.lat());
      console.log("Longitude:", place?.geometry?.location?.lng());
    }
  }
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBPFsC1VWxb-utvgfTUO0d3XIDyjkHTYc4"
      libraries={["places"]}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent w-full focus:outline-none text-sm text-shuttlelaneBlack"
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
}

export default GoogleLocationInput;
