import { Box } from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CustomMap from "../components/Map/Map";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setPins(locations);
  }, [locations]);

  function updateFilters(filters: any) {
    const updatedPins: any = [];
    locations?.map((pin) => {
      if (pin.isPerson && (filters.type === "itinerant" || filters.type === "all")) {
        if (
          filters.pet === "both" ||
          (filters.pet === "yes" && pin.hasPet) ||
          (filters.pet === "no" && !pin.hasPet)
        ) {
          if (
            filters.needsHygiene === "both" ||
            (filters.needsHygiene === "yes" && pin.needsHygiene) ||
            (filters.needsHygiene === "no" && !pin.needsHygiene)
          ) {
            const lastDelivery = new Date(0);
            lastDelivery.setUTCSeconds(pin.lastDelivery.seconds);
            const lastFedHourDifference =
              new Date().getHours() - lastDelivery.getHours();
            if (
              filters.lastFed === "idc" ||
              (filters.lastFed === "twelve" && lastFedHourDifference > 12) ||
              (filters.lastFed === "eight" && lastFedHourDifference > 8) ||
              (filters.lastFed === "four" && lastFedHourDifference > 4)
            ) {
              updatedPins.push(pin);
            }
          }
        }
      } else if (!pin.isPerson && (filters.type === "foodBank" || filters.type === "all")) {
        updatedPins.push(pin);
      }
    });
    setPins(updatedPins);
    console.log(pins)
  }
  return (
    auth.currentUser && (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
        }}
      >
        <Sidebar
          auth={auth}
          updateFilters={(filters) => updateFilters(filters)}
        />
        <CustomMap locations={pins} firebase={firebase} firestore={firestore} />
      </Box>
    )
  );
}
