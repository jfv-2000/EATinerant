import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const defaultCenter = {
  lat: 45.508888,
  lng: -73.561668,
};

function Map() {
  const [map, setMap] = React.useState(null);
  const [center, setCenter] = useState(defaultCenter);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  function getCurrentPosition() {
    console.log("kkkk ssss");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("nani");
        console.log("currentLocation: ", currentLocation);
        setCenter(currentLocation);
      });
    } else {
      alert("Please allow use of geo-location in your browser settings.");
      return;
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAwuB2MmYz2O8BLRyNH7wae45H_4AXLYhE",
  });

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        options={{ streetViewControl: false }}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
      <button onClick={getCurrentPosition}>KINKY KELVIN SUSSY SERGE</button>
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
