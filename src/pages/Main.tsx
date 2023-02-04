import { Button, Box } from "@chakra-ui/react";
import { GeoPoint } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CustomMap from "../components/Map/Map";
import AddForm from "../components/AddForm";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Map({ firebase, firestore, auth }: any) {
  const locationsCollection = firestore.collection("locations");
  const query = locationsCollection.limit(25);
  const [locations] = useCollectionData(query);

  return (
    auth.currentUser && (
      <Box
        sx={{
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          height: "100vh",
          display: "flex",
        }}
      >
        <Sidebar />
        <Box>
          <p>{locations?.length} locations in the db</p>
          <AddForm firestore={firestore} firebase={firebase} auth={auth} />
          <CustomMap />
        </Box>
      </Box>
    )
  );
}
