import { Button, Box } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function Login({ firebase, auth }: any) {
  function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        className="login_button"
        variant="solid"
        onClick={googleLogin}
        colorScheme="blue"
        backgroundColor="white"
        color="#0f83f5"
        sx={{ border: "#0f83f5 1px solid" }}
        rightIcon={<FcGoogle />}
      >
        Log In
      </Button>
    </Box>
  );
}
