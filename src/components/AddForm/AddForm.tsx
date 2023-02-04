import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GeoPoint } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import "./AddForm.scss";
import { GrClose } from "react-icons/gr";

const fontSize = "sm";
const radioSize = "sm";

export default function AddForm({
  firebase,
  firestore,
  auth,
  lat,
  long,
  setAddLocationPopup,
}: {
  firebase: any;
  firestore: any;
  auth: any;
  lat: number;
  long: number;
  setAddLocationPopup: Dispatch<SetStateAction<boolean>>;
}) {
  const locationsCollection = firestore.collection("locations");

  const [sexe, setSexe] = useState("M");
  const [hasPet, setHasPet] = useState(false);
  const [needsHygiene, setNeedsHygiene] = useState(false);

  const closePopup = async (e: any) => {
    e.preventDefault();
    await locationsCollection.add({
      coordinates: new GeoPoint(lat, long),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      hasPet,
      sexe,
      lastDelivery: firebase.firestore.FieldValue.serverTimestamp(),
      isPerson: true,
      needsHygiene,
    });
    setAddLocationPopup(false);
  };

  return (
    <Box className="add_container">
      <Box className="header">
        <Heading size="md">Add Person Spotting</Heading>
        <IconButton
          size="xs"
          aria-label="Close Modal"
          icon={<GrClose />}
          onClick={() => setAddLocationPopup(false)}
        />
      </Box>
      <Divider />
      <Box className="row">
        <Text fontSize={fontSize}>Pinned Location</Text>
        <Text fontSize={fontSize}>
          {lat}° N, {long}° E
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
