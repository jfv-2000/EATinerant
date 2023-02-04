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

function getCurrentPosition() {
  console.log("kkkk ssss");
}

function Map() {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAwuB2MmYz2O8BLRyNH7wae45H_4AXLYhE",
  });

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={13}
      onLoad={onLoad}
      options={{ streetViewControl: false }}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
