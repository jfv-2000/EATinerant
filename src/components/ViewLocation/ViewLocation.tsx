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
} from "@chakra-ui/react";
import { FcCheckmark } from "react-icons/fc";
import { GrClose } from "react-icons/gr";
import { Location } from "../../models/Location";
import { AiOutlineClose } from "react-icons/ai";
import "./ViewLocation.scss";

const fontSize = "sm";
const radioSize = "sm";

export default function ViewLocation({
  coordinates,
  createdAt,
  hasPet,
  isPerson,
  lastDelivery,
  needsHygiene,
  sexe,
}: Location) {
  return (
    <Box className="view_container">
      <Box className="header">
        <Heading size="md">Person Spotting</Heading>
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
    </Box>
  );
}
