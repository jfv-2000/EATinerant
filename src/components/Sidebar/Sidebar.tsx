import {
  Box,
  Button,
  Divider,
  IconButton,
  Image,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiFilter2Fill } from "react-icons/ri";
import { initialFilters } from "../../assets/constants";
import Logo from "../../assets/logo.png";
import "./Sidebar.scss";

export default function Sidebar({
  auth,
  filters,
  setFilters,
  closeFunction,
}: {
  auth: any;
  filters: any;
  setFilters: Dispatch<
    SetStateAction<{
      type: string;
      needsHygiene: string;
      pet: string;
      lastFed: string;
      gender: string;
    }>
  >;
  closeFunction?: () => void;
}) {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
    xl: false,
  });

  function handleFilterChange(e: any, field: string) {
    const updatedFilters = { ...filters, [field]: e.target.value };
    setFilters(updatedFilters);
  }

  return (
    <Box
      className="sidebar_container"
      sx={{ width: isMobile ? "100%" : "38vw", height: "100%" }}
    >
      <Box className="header_container" boxShadow={"base"}>
        <Box className="header">
          <Image src={Logo} alt="Logo" className="logo_img" boxSize="50px" />
          <Text
            className="app_name"
            fontSize="3xl"
            textShadow={"1px 1px #7BA0C2"}
          >
            EATinérant
          </Text>
        </Box>
        {closeFunction && (
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            onClick={closeFunction}
            icon={<AiOutlineClose />}
          />
        )}
      </Box>
      <Box className="sidebar_section" boxShadow={"lg"}>
        <Box className="sidebar_section_title">
          <RiFilter2Fill />
          <Text fontSize="md" className="sidebar_section_title_text">
            Filters
          </Text>
        </Box>
        <Box className="title_divider">
          <Divider
            sx={{ borderBottomWidth: 1.25, borderBottomColor: "#6e6e6e" }}
          />
        </Box>
        <Box className="dropdown_option">
          <Text>Type</Text>
          <Select
            variant="unstyled"
            defaultValue={filters.type}
            w="115px"
            size="sm"
            onChange={(e) => handleFilterChange(e, "type")}
          >
            <option value="all">All</option>
            <option value="itinerant">Itinérant</option>
            <option value="foodBank">Help Centers</option>
          </Select>
        </Box>
        <Box className="divider_container">
          <Divider className="option_divider" />
        </Box>
        <Box className="dropdown_option">
          <Text>Gender</Text>
          <Select
            w="115px"
            variant="unstyled"
            disabled={filters.type === "foodBank"}
            defaultValue={filters.gender}
            size="sm"
            onChange={(e) => handleFilterChange(e, "gender")}
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </Box>
        <Box className="divider_container">
          <Divider className="option_divider" />
        </Box>
        <Box className="dropdown_option">
          <Text>Needs hygiene products</Text>
          <Select
            variant="unstyled"
            disabled={filters.type === "foodBank"}
            defaultValue={filters.needsHygiene}
            w="115px"
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
            variant="unstyled"
            disabled={filters.type === "foodBank"}
            defaultValue={filters.pet}
            w="115px"
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
          <Text>Last delivered</Text>
          <Select
            w="115px"
            variant="unstyled"
            disabled={filters.type === "foodBank"}
            defaultValue={filters.lastFed}
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
