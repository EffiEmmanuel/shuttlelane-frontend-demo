// @ts-nocheck
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import {
  APIProvider,
  useApiIsLoaded,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

const GoogleMapsWithDirections = ({
  pickupCoordinates,
  pickupAddress,
  dropoffCoordinates,
  dropoffAddress,
}) => {
  const isLoaded = useApiIsLoaded();

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const [center, setCenter] = useState({
    lat: 43.6532,
    lng: -79.3832,
  });

  const onLoad = (map) => {
    console.log("map: ", map);
  };

  useEffect(() => {
    console.log("PICKUP COORDS:", pickupCoordinates);
    console.log("DROPOFF COORDS:", dropoffCoordinates);
    console.log("PICKUP ADDRESS:", pickupAddress);
    console.log("DROPOFF ADDRESS:", dropoffAddress);
    if (pickupCoordinates && dropoffCoordinates) {
      const avgLat =
        (Number(pickupCoordinates.lat) + Number(dropoffCoordinates.lat)) / 2;
      const avgLng =
        (Number(pickupCoordinates.lng) + Number(dropoffCoordinates.lng)) / 2;
      setCenter({ lat: avgLat, lng: avgLng });
    } else if (pickupCoordinates) {
      setCenter({
        lat: Number(pickupCoordinates?.lat),
        lng: Number(pickupCoordinates?.lng),
      });
    } else if (dropoffCoordinates) {
      setCenter({
        lat: Number(dropoffCoordinates?.lat),
        lng: Number(dropoffCoordinates?.lng),
      });
    }
  }, [pickupCoordinates, dropoffCoordinates]);

  return (
    <APIProvider
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["maps", "routes"]}
    >
      <>
        <Map center={center} zoom={10}>
          <Directions
            pickupAddress={pickupAddress}
            dropoffAddress={dropoffAddress}
          />
        </Map>
      </>
    </APIProvider>
  );
};

export default GoogleMapsWithDirections;

function Directions(props) {
  const map = useMap(); // Get a map to render the directions on
  const routesLibrary = useMapsLibrary("routes"); // Get the routes library using this hook

  // These states store the instances of the direction service and directions renderer
  // They both work hand-in-hand to find the directions and render them on the map
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();

  // This state holds the alternative routes
  const [routes, setRoutes] = useState([]);

  // INIT SERVICES: Listen for when the map and routes lilbrary are available
  useEffect(() => {
    if (
      !routesLibrary ||
      !map ||
      !props?.pickupAddress ||
      !props?.dropoffAddress
    )
      return;

    // Create instances of the directions service and directions renderer
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [map, routesLibrary, props?.pickupAddress, props?.dropoffAddress]);

  // This hook finds our route using the directions service
  useEffect(() => {
    if (
      !directionsService ||
      !directionsRenderer ||
      !props?.pickupAddress ||
      !props?.dropoffAddress
    )
      return;

    console.log("PICKUP LOCATION:", props?.pickupAddress);

    directionsService
      ?.route({
        origin: `${props?.pickupAddress}`,
        destination: `${props?.dropoffAddress}`,
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
      })
      .then((res) => {
        directionsRenderer?.setDirections(res); // Pass the response to the renderer
        setRoutes(res?.routes);
      });
  }, [
    directionsService,
    directionsRenderer,
    props?.pickupAddress,
    props?.dropoffAddress,
  ]);

  console.log(routes);

  return null;
}
