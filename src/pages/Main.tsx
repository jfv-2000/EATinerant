import { Button, Box } from "@chakra-ui/react";
import { GeoPoint } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CustomMap from "../components/Map/Map";

export default function Map({ firebase, firestore, auth }: any) {
  const locationsCollection = firestore.collection("locations");
  const query = locationsCollection.limit(25);
  const [locations] = useCollectionData(query);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [isMale, setIsMale] = useState(false);
  const [hasPet, setHasPet] = useState(false);

  const addLocation = async (e: any) => {
    e.preventDefault();
    await locationsCollection.add({
      coordinates: new GeoPoint(lat, long),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      hasPet,
      isMale,
      lastDelivery: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    auth.currentUser && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Button onClick={addLocation}>
          test add {locations?.length} locations
        </Button>
        <CustomMap />
      </Box>
    )
  );
}
