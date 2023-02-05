import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GeoPoint } from "firebase/firestore";
import { useState } from "react";
import "./AddForm.scss";
import { v4 as uuidv4 } from "uuid";

const fontSize = "sm";
const radioSize = "sm";

export default function AddForm({
  firebase,
  firestore,
  lat,
  lng,
  setPopup,
}: {
  firebase: any;
  firestore: any;
  lat: number;
  lng: number;
  setPopup: () => void;
}) {
  const locationsCollection = firestore.collection("locations");

  const [sexe, setSexe] = useState("M");
  const [hasPet, setHasPet] = useState(false);
  const [needsHygiene, setNeedsHygiene] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<any>(null);

  const closePopup = async (e: any) => {
    e.preventDefault();
    await locationsCollection.add({
      coordinates: new GeoPoint(lat, lng),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      hasPet,
      sexe,
      lastDelivery: null,
      isPerson: true,
      needsHygiene,
      id: uuidv4(),
      phoneNumber,
    });
    setPopup();
  };

  return (
    <Box className="add_container">
      <Heading className="header" size="md">
        Add Person Spotting
      </Heading>

      <Divider />
      <Box className="row">
        <Text fontSize={fontSize}>Pinned Location</Text>
        <Text fontSize={fontSize} sx={{ textAlign: "end" }}>
          {lat}° N, {lng}° E
        </Text>
      </Box>
      <Box className="row">
        <Text fontSize={fontSize}>Sexe</Text>
        <RadioGroup onChange={setSexe} value={sexe}>
          <Stack direction="row">
            <Radio size={radioSize} value="M">
              Male
            </Radio>
            <Radio size={radioSize} value="F">
              Female
            </Radio>
            <Radio size={radioSize} value="A">
              Other
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Box className="row">
        <Text fontSize={fontSize}>Pet</Text>
        <Checkbox
          isChecked={hasPet}
          onChange={(e) => setHasPet(e.target.checked)}
        />
      </Box>
      <Box className="row">
        <Text fontSize={fontSize}>Female Hygiene Products</Text>
        <Checkbox
          isChecked={needsHygiene}
          onChange={(e) => setNeedsHygiene(e.target.checked)}
        />
      </Box>
      <Box className="row">
        <Text fontSize={fontSize}>Phone Number (optional)</Text>
        <Input
          placeholder="Phone Number"
          size="sm"
          sx={{ width: "50%" }}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Box>
      <Button
        size="xs"
        colorScheme="blue"
        sx={{ alignSelf: "flex-end", marginTop: "10px" }}
        onClick={closePopup}
      >
        Add Spotting
      </Button>
    </Box>
  );
}
