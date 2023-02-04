import {
  Heading,
  IconButton,
  Divider,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { FcCheckmark } from "react-icons/fc";
import { GrClose } from "react-icons/gr";
import { Location } from "../../models/Location";
import { AiOutlineClose } from "react-icons/ai";
import "./ViewLocation.scss";

const fontSize = "sm";

export default function ViewLocation({
  coordinates,
  createdAt,
  hasPet,
  isPerson,
  lastDelivery,
  needsHygiene,
  sexe,
  name,
  link,
}: Location) {
  return (
    <Box className="view_container">
      <Box className="header">
        <Heading size="md">
          {name && !isPerson ? name : "Person Spotting"}
        </Heading>
        <IconButton
          className="close"
          size="xs"
          aria-label="Close Modal"
          icon={<GrClose />}
        />
      </Box>
      <Divider />
      <Box className="row">
        <Text fontSize={fontSize}>Pinned Location</Text>
        <Text fontSize={fontSize}>
          {coordinates._lat}° N, {coordinates._long}° E
        </Text>
      </Box>
      <Box className="row">
        <Text fontSize={fontSize}>Sexe</Text>
        <Text fontSize={fontSize}>
          {sexe === "M" ? "Male" : sexe === "F" ? "Female" : "Unknown"}
        </Text>
      </Box>
      <Box className="row">
        <Text fontSize={fontSize}>Pet</Text>
        {hasPet ? <FcCheckmark /> : <AiOutlineClose color="red" />}
      </Box>
      <Box className="row">
        <Text fontSize={fontSize}>Female Hygiene Products</Text>
        {needsHygiene ? <FcCheckmark /> : <AiOutlineClose color="red" />}
      </Box>
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
