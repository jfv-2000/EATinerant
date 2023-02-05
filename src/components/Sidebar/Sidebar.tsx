import {
  Box,
  Button,
  Checkbox,
  Divider,
  Image,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import "./Sidebar.scss";
import Logo from "../../assets/logo.png";
import { RiFilter2Fill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

export default function Sidebar({
  locations,
  auth,
}: {
  locations: any;
  auth: any;
}) {
  const [filters, setFilters] = useState({
    itinerant: true,
    foodBank: true,
    shelter: false,
    needsHygiene: false,
    hasPet: true,
  });
  return (
    <Box className="sidebar_container">
      <Box className="header_container">
        <Image src={Logo} alt="Logo" className="logo_img" boxSize="50px" />
        <Text className="app_name" fontSize="3xl">
          EATinérant
        </Text>
      </Box>
      <Box className="sidebar_body">
        <Box className="sidebar_section">
          <Box className="sidebar_section_title">
            <RiFilter2Fill />
            <Text fontSize="md" className="sidebar_section_title_text">
              Filters
            </Text>
          </Box>
          <Divider
            className="title_divider"
            sx={{ borderBottomWidth: 1.25, borderBottomColor: "#6e6e6e" }}
          />
          <Box className="filter_option">
            <Text>Itinerant</Text>
            <Checkbox isChecked={filters.itinerant} />
          </Box>
          <Box className="divider_container">
            <Divider className="option_divider" />
          </Box>
          <Box className="filter_option">
            <Text>Food Bank</Text>
            <Checkbox isChecked={filters.foodBank} />
          </Box>
          <Box className="divider_container">
            <Divider className="option_divider" />
          </Box>
          <Box className="filter_option">
            <Text>Shelter</Text>
            <Checkbox isChecked={filters.shelter} />
          </Box>
          <Box className="divider_container">
            <Divider className="option_divider" />
          </Box>
          <Box className="filter_option">
            <Text>Needs hygiene products</Text>
            <Checkbox isChecked={filters.needsHygiene} />
          </Box>
          <Box className="divider_container">
            <Divider className="option_divider" />
          </Box>
          <Box className="filter_option">
            <Text>Has a pet</Text>
            <Checkbox isChecked={filters.hasPet} />
          </Box>
          <Box className="divider_container">
            <Divider className="option_divider" />
          </Box>
        </Box>
      </Box>
      <Button
        className="login_button"
        variant="solid"
        onClick={() => auth.signOut()}
        colorScheme="blue"
        backgroundColor="white"
        color="#0f83f5"
        sx={{ border: "#0f83f5 1px solid", borderRadius: "0px" }}
        _hover={{ color: "white", backgroundColor: "blue.500" }}
        rightIcon={<FcGoogle />}
      >
        Log Out
      </Button>
    </Box>
  );
}
