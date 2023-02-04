import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import { GeoPoint } from "firebase/firestore";
import { useState } from "react";

export default function AddForm({ firebase, firestore, auth }: any) {
  const locationsCollection = firestore.collection("locations");

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
    <Box>
      <Heading size="md">Client Report</Heading>
      <Divider />
      <Box sx={{ display: "flex" }}>
        Pinned Location
        <Text fontSize="sm">(sm) In love with React & Next</Text>
      </Box>
    </Box>
  );
}
