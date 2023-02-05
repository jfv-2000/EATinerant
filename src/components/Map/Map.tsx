import { IconButton } from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import { IoMdLocate } from "react-icons/io";
import CustomMarker from "./CustomMarker";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const defaultCenter = {
  lat: 45.508888,
  lng: -73.561668,
};

const DEFAULT_ZOOM = 13;

function Map() {
  const [map, setMap] = useState<any>(null)
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [showlocationMarker, setShowLocationMarker] = useState(false);

  const onLoad = React.useCallback(function callback(map: any) {
    const customStyle = [
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ];
    map.set("styles", customStyle);
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
        setShowLocationMarker(true);
        setZoom(19);
      });
    } else {
      alert("Please allow use of geo-location in your browser settings.");
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
        zoom={zoom}
        onLoad={onLoad}
        options={{ streetViewControl: false }}
        onUnmount={onUnmount}
        onDrag={() => setShowLocationMarker(false)}
      >
        {showlocationMarker ? <CustomMarker position={center} icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillOpacity: 1,
          strokeWeight: 2,
          fillColor: '#5384ED',
          strokeColor: '#ffffff',
        }}></CustomMarker> : <></>}
        <IconButton
          aria-label="locate me"
          colorScheme={"blue"}
          onClick={getCurrentPosition}
        >
          <IoMdLocate size={26} />
        </IconButton>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
