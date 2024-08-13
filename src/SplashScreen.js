import { Box, Container } from "@mui/material";
import React from "react";
import splash_screen from "./assets/images/2.jpg";

const SplashScreen = () => {
  // const [message, setMessage] = useState('');
  // const timeoutId = setTimeout(() => {
  //   setMessage('Delayed message after 2 seconds!');
  // }, 2000);

  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Box>
        <img src={splash_screen} className="!h-[100vh] !w-[100%]" />
      </Box>
    </Container>
  );
};

export default SplashScreen;
