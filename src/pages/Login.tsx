import { Box, Button, Heading, useBreakpointValue } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import Logo from "../components/Logo";

export default function Login({
  firebase,
  auth,
}: {
  firebase: any;
  auth: any;
}) {
  function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box className="login_pg_contents">
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}
        >
          <Logo size={150}></Logo>
          <Heading
            color={"#3182CE"}
            className="title"
            as={"h1"}
            size={"4xl"}
            margin={10}
          >
            EATinerant
          </Heading>
        </Box>

        <Box
          className="login_box"
          justifyContent={"center"}
          alignContent="center"
          display={"flex"}
        >
          <Button
            className="login_button"
            variant="solid"
            onClick={googleLogin}
            colorScheme="blue"
            backgroundColor="white"
            color="#0f83f5"
            sx={{ border: "#0f83f5 1px solid" }}
            _hover={{ color: "white", backgroundColor: "blue.500" }}
            rightIcon={<FcGoogle />}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
