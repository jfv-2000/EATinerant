import { Button, Box } from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CustomMap from "../components/Map/Map";
import AddForm from "../components/AddForm/AddForm";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";
import ViewLocation from "../components/ViewLocation/ViewLocation";

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
  const [locations] = useCollectionData(locationsCollection);

  return (
    auth.currentUser && (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
        }}
      >
        <Sidebar locations={locations} auth={auth} />
        <CustomMap
          locations={locations}
          firebase={firebase}
          firestore={firestore}
        />
      </Box>
    )
  );
}
