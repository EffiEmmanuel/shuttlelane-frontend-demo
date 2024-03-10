import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import axios from "axios";

const GoogleMapsWithDirections = ({ pickupAddress, dropoffAddress }) => {
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);

  useEffect(() => {
    getLatLng(pickupAddress).then((coords) => {
      if (coords) {
        setPickup(coords);
      }
    });
  }, [pickupAddress]);

  useEffect(() => {
    getLatLng(dropoffAddress).then((coords) => {
      if (coords) {
        setDropoff(coords);
      }
    });
  }, [dropoffAddress]);

  const getLatLng = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=YOUR_API_KEY`
      );
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

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

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {pickup && <Marker position={pickup} />}
        {dropoff && <Marker position={dropoff} />}

        {pickup && dropoff && (
          <Polyline
            path={[pickup, dropoff]}
            options={{
              strokeColor: "#000000",
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsWithDirections;
