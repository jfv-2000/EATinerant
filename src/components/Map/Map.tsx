import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Box, IconButton, Spinner } from "@chakra-ui/react";
import { IoMdLocate } from "react-icons/io";
import { mapStyle } from "../../MapStyling";
import AddForm from "../AddForm/AddForm";
import ViewLocation from "../ViewLocation/ViewLocation";
import CustomMarker from "./CustomMarker";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 45.508888,
  lng: -73.561668,
};
const DEFAULT_ZOOM = 13;

export default function Map({
  locations,
  firebase,
  firestore,
}: {
  locations: any;
  firebase: any;
  firestore: any;
}) {
  const [map, setMap] = React.useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [popup, setPopup] = useState<string | null>(null);
  const [showlocationMarker, setShowLocationMarker] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  const onLoad = React.useCallback(function callback(map: any) {
    map.set("styles", mapStyle);
    setMap(map);
  }, []);

  function getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(currentLocation);
        setShowLocationMarker(true);
        setZoom(19);
      });
    }
  }

  function showPopupAdd(event: any) {
    if (event) {
      setPopup("N");
      setLat(event.latLng.lat());
      setLong(event.latLng.lng());
    }
  }

  function showExistingAdd(location: any) {
    setLocation(location);
    setLat(location.coordinates._lat);
    setLong(location.coordinates._long);
    setPopup("E");
  }

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
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      options={{ streetViewControl: false }}
      onUnmount={onUnmount}
      onClick={(e) => showPopupAdd(e)}
      onDrag={() => setShowLocationMarker(false)}
    >
      {showlocationMarker && (
        <CustomMarker
          position={center}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillOpacity: 1,
            strokeWeight: 2,
            fillColor: "#5384ED",
            strokeColor: "#ffffff",
          }}
        />
      )}

      <IconButton
        sx={{
          position: "absolute",
          bottom: "130px",
          right: "10px",
        }}
        aria-label="locate me"
        colorScheme={"blue"}
        onClick={getCurrentPosition}
      >
        <IoMdLocate size={26} />
      </IconButton>

      {locations &&
        locations.map((location: any) => (
          <Marker
            onClick={() => showExistingAdd(location)}
            position={{
              lat: location.coordinates._lat,
              lng: location.coordinates._long,
            }}
            key={location.id}
          />
        ))}
      {popup === "N" && (
        <Marker
          position={{ lat, lng: long }}
          animation={window.google.maps.Animation.BOUNCE}
          onClick={(e) => showPopupAdd(e)}
        />
      )}
      {popup && (
        <InfoWindow
          position={{ lat, lng: long }}
          options={{
            pixelOffset: new window.google.maps.Size(0, -20),
          }}
          onCloseClick={() => setPopup(null)}
        >
          {popup === "E" && location ? (
            <ViewLocation
              {...location}
              firebase={firebase}
              firestore={firestore}
            />
          ) : (
            popup === "N" && (
              <AddForm
                firebase={firebase}
                firestore={firestore}
                lat={lat}
                lng={long}
                setPopup={() => setPopup(null)}
              />
            )
          )}
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "blue",
      }}
    >
      <Spinner size="xl" sx={{ width: "100px", height: "100px" }} />
    </Box>
  );
}
