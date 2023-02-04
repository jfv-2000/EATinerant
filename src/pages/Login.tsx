import { Button, Box } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import "./Login.module.scss";

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
        sx={{
          border: "#0f83f5 1px solid",
          color: "#0f83f5",
          backgroundColor: "white",
          ":hover&": {
            color: "white",
            backgroundColor: "#4395e6",
            border: "none",
          },
        }}
        onClick={googleLogin}
        rightIcon={<FcGoogle />}
      >
        Log In
      </Button>
    </Box>
  );
}
