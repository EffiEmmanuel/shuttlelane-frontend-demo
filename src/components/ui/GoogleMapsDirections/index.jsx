import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

const GoogleMapsDirections = ({ pickupAddress, dropoffAddress }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 0,
    lng: 0,
  };

  const onLoad = (map) => {
    console.log("map: ", map);
  };

  useEffect(() => {
    console.log("PICKUP ADDRESS:", pickupAddress);
    console.log("DROPOFF ADDRESS:", dropoffAddress);
  }, [pickupAddress, dropoffAddress]);

  const position = {
    lat: 43.6532,
    lng: -79.3832,
  };

  return (
    <div>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map center={position} zoom={10}></Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMapsDirections;
