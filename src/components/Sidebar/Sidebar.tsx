import { Box, Button, Divider, Image, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiFilter2Fill } from "react-icons/ri";
import { initialFilters } from "../../assets/constants";
import Logo from "../../assets/logo.png";
import "./Sidebar.scss";

export default function Sidebar({
  auth,
  updateFilters,
}: {
  auth: any;
  updateFilters: (filters: any) => void;
}) {
  const [filters, setFilters] = useState(initialFilters);

  function handleFilterChange(e: any, field: string) {
    const updatedFilters = { ...filters, [field]: e.target.value };
    setFilters(updatedFilters);
    updateFilters(updatedFilters);
  }

  return (
    <Box className="sidebar_container">
      <Box className="header_container">
        <Image src={Logo} alt="Logo" className="logo_img" boxSize="50px" />
        <Text className="app_name" fontSize="3xl" textShadow={"1px 1px #7BA0C2"}>
          EATinérant
        </Text>
      </Box>
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
        <Box className="dropdown_option">
          <Text>Type</Text>
          <Select
            defaultValue={filters.type}
            w="100px"
            size="sm"
            onChange={(e) => handleFilterChange(e, "type")}
          >
            <option value="all">All</option>
            <option value="itinerant">Itinerant</option>
            <option value="foodBank">Food Bank</option>
          </Select>
        </Box>
        <Box className="divider_container">
          <Divider className="option_divider" />
        </Box>
        <Box className="dropdown_option">
          <Text>Needs hygiene products</Text>
          <Select
            disabled={filters.type === "foodBank"}
            defaultValue={filters.needsHygiene}
            w="65px"
            size="sm"
            onChange={(e) => handleFilterChange(e, "needsHygiene")}
          >
            <option value="all">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </Box>
        <Box className="divider_container">
          <Divider className="option_divider" />
        </Box>
        <Box className="dropdown_option">
          <Text>Has a pet</Text>
          <Select
            disabled={filters.type === "foodBank"}
            defaultValue={filters.pet}
            w="65"
            size="sm"
            onChange={(e) => handleFilterChange(e, "pet")}
          >
            <option value="all">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </Box>
        <Box className="divider_container">
          <Divider className="option_divider" />
        </Box>
        <Box className="dropdown_option">
          <Text>Last fed</Text>
          <Select
            disabled={filters.type === "foodBank"}
            defaultValue={filters.lastFed}
            w="65px"
            size="sm"
            onChange={(e) => handleFilterChange(e, "lastFed")}
          >
            <option value="all">All</option>
            <option value="four">&gt; 4 hrs</option>
            <option value="eight">&gt; 8 hrs</option>
            <option value="twelve">&gt; 12 hrs</option>
          </Select>
        </Box>
        <Box className="divider_container">
          <Divider className="option_divider" />
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
