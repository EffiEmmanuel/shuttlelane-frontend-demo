// GoogleMapsProvider.js
import React from "react";
import { LoadScript, useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_LIBRARIES = ["places"];

function GoogleMapsProvider({ children }) {
  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
    >
      {children}
    </LoadScript>
  );
}

export default GoogleMapsProvider;
