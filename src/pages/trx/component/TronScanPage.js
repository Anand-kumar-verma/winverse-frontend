import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function TronScanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.tron_id;
  return (
    <Container
      className="no-scrollbar"
      sx={{
        background: "#F48901",
        width: "100%",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Box sx={style.header}>
        <Box component={NavLink} onClick={() => navigate(-1)}>
          <KeyboardArrowLeftOutlinedIcon />
        </Box>
        <Typography variant="body1" color="initial">
          TRX
        </Typography>
        <Box component={NavLink} onClick={() => navigate(-1)}></Box>
      </Box>

      <iframe
        className="!mb-[10%]"
        title="External Website"
        src={`https://tronscan.io/#/block/${data}`}
        width={"100%"}
        height={"100%"}
      ></iframe>
    </Container>
  );
}

export default TronScanPage;

const style = {
  header: {
    padding: "15px 8px",
    background: "#F48901",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
};
