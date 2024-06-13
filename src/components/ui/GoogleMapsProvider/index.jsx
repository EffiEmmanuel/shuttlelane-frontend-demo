import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Preloader from "../Preloader";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_LIBRARIES = ["places"];

function GoogleMapsProvider({ children }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <Preloader fullOpacity={true} />; // Use the custom preloader
  }

  return <>{children}</>;
}

export default GoogleMapsProvider;
