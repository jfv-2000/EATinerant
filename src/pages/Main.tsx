import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CustomMap from "../components/Map/Map";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useState, useRef } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

export default function Map({
  firebase,
  firestore,
  auth,
}: {
  firebase: any;
  firestore: any;
  auth: any;
}) {
  const locationsCollection = firestore.collection("locations");
  const query = locationsCollection.limit(25);
  const [locations] = useCollectionData(query);
  const [pins, setPins] = useState(locations);
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
    xl: false,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    setPins(locations);
  }, [locations]);

  function updateFilters(filters: any) {
    const updatedPins: any = [];
    locations?.map((pin) => {
      if (
        !pin.isPerson &&
        (filters.type === "foodBank" || filters.type === "all")
      ) {
        updatedPins.push(pin);
      } else if (
        pin.isPerson &&
        (filters.type === "itinerant" || filters.type === "all")
      ) {
        if (
          filters.pet === "all" ||
          (filters.pet === "yes" && pin.hasPet) ||
          (filters.pet === "no" && !pin.hasPet)
        ) {
          if (
            filters.needsHygiene === "all" ||
            (filters.needsHygiene === "yes" && pin.needsHygiene) ||
            (filters.needsHygiene === "no" && !pin.needsHygiene)
          ) {
            const lastFedHourDifference = pin.lastDelivery ? (Date.now() / 1000 - pin.lastDelivery.seconds) / 3600 : 10000
            if (
              filters.lastFed === "all" ||
              (filters.lastFed === "twelve" && lastFedHourDifference > 12) ||
              (filters.lastFed === "eight" && lastFedHourDifference > 8) ||
              (filters.lastFed === "four" && lastFedHourDifference > 4)
            ) {
              if (filters.gender === "all" ||
                (filters.gender === "male" && pin.sexe === "M") ||
                (filters.gender === "female" && pin.sexe === "F") ||
                (filters.gender === "other" && pin.sexe === "A")) {
                updatedPins.push(pin);
              }
            }
          }
        }
      }
    });
    setPins(updatedPins);
  }
  return (
    auth.currentUser && (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
        }}
      >
        {!isMobile ? (
          <Sidebar
            auth={auth}
            updateFilters={(filters) => updateFilters(filters)}
          />
        ) : (
          <>
            <IconButton
              sx={{
                position: "absolute",
                zIndex: 10,
                top: "90vh",
                left: "5vw",
              }}
              colorScheme="blue"
              aria-label="Search database"
              onClick={onOpen}
              ref={btnRef as any}
              icon={isOpen ? <BsChevronLeft /> : <BsChevronRight />}
            />
            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              initialFocusRef={btnRef as any}
            >
              <DrawerOverlay />
              <DrawerContent>
                <Sidebar
                  auth={auth}
                  updateFilters={(filters) => updateFilters(filters)}
                  closeFunction={onClose}
                />
              </DrawerContent>
            </Drawer>
          </>
        )}
        <CustomMap locations={pins} firebase={firebase} firestore={firestore} />
      </Box>
    )
  );
}
