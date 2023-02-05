import { Heading, Divider, Box, Text, Button } from "@chakra-ui/react";
import { FcCheckmark } from "react-icons/fc";
import { Location } from "../../models/location";
import { AiOutlineClose } from "react-icons/ai";
import "./ViewLocation.scss";

const fontSize = "sm";

export default function ViewLocation({
  coordinates,
  createdAt,
  hasPet,
  isPerson = false,
  lastDelivery,
  needsHygiene,
  sexe,
  name,
  link,
  firebase,
  firestore,
}: {
  firebase: any;
  firestore: any;
} & Location) {
  const locationsCollection = firestore.collection("locations");

  //firestore.where("name", "==", bookName).get()
  // .then(querySnapshot => {
  //     querySnapshot.docs[0].ref.delete();
  // });
  return (
    <Box className="view_container">
      <Heading size="md" className="header">
        {name && !isPerson ? name : "Person Spotting"}
      </Heading>
      <Divider />
      <Box className="row">
        <Text fontSize={fontSize}>Pinned Location</Text>
        <Text fontSize={fontSize} sx={{ textAlign: "end" }}>
          {coordinates._lat}° N, {coordinates._long}° E
        </Text>
      </Box>
      {isPerson && (
        <Box className="row">
          <Text fontSize={fontSize}>Sexe</Text>
          <Text fontSize={fontSize}>
            {sexe === "M" ? "Male" : sexe === "F" ? "Female" : "Other"}
          </Text>
        </Box>
      )}
      {isPerson && (
        <Box className="row">
          <Text fontSize={fontSize}>Pet</Text>
          {hasPet ? <FcCheckmark /> : <AiOutlineClose color="red" />}
        </Box>
      )}
      {isPerson && (
        <Box className="row">
          <Text fontSize={fontSize}>Female Hygiene Products</Text>
          {needsHygiene ? <FcCheckmark /> : <AiOutlineClose color="red" />}
        </Box>
      )}
      <Button
        className="map"
        size="xs"
        colorScheme="blue"
        sx={{
          alignSelf: "flex-end",
          marginTop: "10px",
        }}
        onClick={() =>
          window.open(
            link
              ? link
              : `http://maps.google.com?q=${coordinates._lat},${coordinates._long}`,
            "_blank"
          )
        }
      >
        View in Maps
      </Button>
    </Box>
  );
}
