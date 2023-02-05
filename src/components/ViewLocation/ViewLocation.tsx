import { Heading, Divider, Box, Text, Button } from "@chakra-ui/react";
import { FcCheckmark } from "react-icons/fc";
import { Location } from "../../models/location";
import { AiOutlineClose } from "react-icons/ai";
import "./ViewLocation.scss";
import { SiGooglemaps } from "react-icons/si";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiInvisible } from "react-icons/gi";
import { twilioCode1, twilioCode2, twilioCode3 } from "../../credentials";

const fontSize = "sm";

const button_props = {
  className: "map",
  size: "xs",
  sx: {
    alignSelf: "flex-end",
    marginTop: "10px",
  },
};

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
  setPopup,
  id,
  phoneNumber,
}: {
  firebase: any;
  firestore: any;
  setPopup: () => void;
} & Location) {
  const locationsCollection = firestore.collection("locations");

  const noLongerHere = async (e: any) => {
    e.preventDefault();
    const toDelete = await locationsCollection.where("id", "==", id).get();
    toDelete.forEach((location: any) => {
      location.ref.delete();
    });
    setPopup();
  };

  const justDelivered = async (e: any) => {
    e.preventDefault();
    const toUpdate = await locationsCollection.where("id", "==", id).get();
    toUpdate.forEach((location: any) => {
      location.ref.update({
        lastDelivery: firebase.firestore.FieldValue.serverTimestamp(),
      });
    });
    setPopup();
    phoneNumber &&
      fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioCode1}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(`${twilioCode1}:${twilioCode2}`),
          },
          body: new URLSearchParams({
            To: phoneNumber,
            MessagingServiceSid: twilioCode3,
            Body: "Un(e) initérant(e) que vous avez marqué(e) a reçu un don. \n\nMerci pour votre contribution!",
          }),
        }
      );
  };

  return (
    <Box className="view_container">
      <Heading size="md" className="header">
        {name && !isPerson ? name : "Person Spotted"}
      </Heading>
      <Divider />
      <Box className="content">
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
        {isPerson && (
          <Box className="row">
            <Text fontSize={fontSize}>Last Delivery</Text>
            <Text fontSize={fontSize}>
              {lastDelivery
                ? new Date(lastDelivery?.seconds * 1000).toLocaleString()
                : "Never"}
            </Text>
          </Box>
        )}
      </Box>

      <Box className="buttons_list">
        {isPerson && (
          <Button
            {...button_props}
            colorScheme="blue"
            rightIcon={<CiDeliveryTruck />}
            onClick={justDelivered}
          >
            Just delivered
          </Button>
        )}

        <Button
          {...button_props}
          rightIcon={<SiGooglemaps />}
          colorScheme="green"
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
        {isPerson && (
          <Button
            {...button_props}
            colorScheme="red"
            rightIcon={<GiInvisible />}
            onClick={noLongerHere}
          >
            No Longer Here
          </Button>
        )}
      </Box>
    </Box>
  );
}
