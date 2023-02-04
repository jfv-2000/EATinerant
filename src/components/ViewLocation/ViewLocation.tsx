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
import { GrClose } from "react-icons/gr";
import { Location } from "../../models/Location";

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
  console.log(
    coordinates,
    createdAt,
    hasPet,
    isPerson,
    lastDelivery,
    needsHygiene,
    sexe
  );
  return (
    <Box className="container">
      <Box className="header">
        <Heading size="md">Person Spotting</Heading>
        <IconButton size="xs" aria-label="Close Modal" icon={<GrClose />} />
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
        <RadioGroup value={sexe}>
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
        <Checkbox disabled isChecked={hasPet} />
      </Box>
      <Box className="row">
        <Text fontSize={fontSize}>Female Hygiene Products</Text>
        <Checkbox disabled isChecked={needsHygiene} />
      </Box>
    </Box>
  );
}
