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
  const query = locationsCollection.limit(25);
  const [locations] = useCollectionData(query);
  const [addLocationPopup, setAddLocationPopup] = useState(true);
  const [lat, setLat] = useState(0.0);
  const [long, setLong] = useState(0.0);

  function updateFilters(filters: any) {
    console.log(filters)
  }
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
        <Sidebar locations={locations} auth={auth} updateFilters={(filters) => updateFilters(filters)} />
        <Box>
          <p>{locations?.length} locations in the db</p>
          <AddForm
            firestore={firestore}
            firebase={firebase}
            auth={auth}
            lat={lat}
            long={long}
            setAddLocationPopup={setAddLocationPopup}
          />
          {locations && <ViewLocation {...locations[5]} />}
          <CustomMap />
        </Box>
      </Box>
    )
  );
}
