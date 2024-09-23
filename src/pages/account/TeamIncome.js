import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../component/layout/Layout";
import { logOutFunction } from "../../services/apiCallings";
import { Box, Stack, Typography } from "@mui/material";
import theme from "../../utils/theme";
import { endpoint, front_end_domain } from "../../services/urls";
import axios from "axios";
import { useQueryClient } from "react-query";

const TeamIncome = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams?.get("orderid");
  const client = useQueryClient()
  async function sendUrlCallBackToBackend(transactionId) {
    try {
      const res = await axios.get(
        `${endpoint?.payin_response_ico_token_akash}?orderid=${transactionId}`
      );
      if (res?.data?.status === "200") {
        window.location.href = `${front_end_domain}/account/Teamincome`;
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    client.removeQueries("profile");
    client.removeQueries("wallet_amount_amount");
  }

  useEffect(() => {
    if (transactionId) {
      sendUrlCallBackToBackend(transactionId);
    }
  }, []);

  return (
    <Layout>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        sx={{
          flexWrap: "wrap",
          width: "92%",
          margin: "auto",
          borderRadius: "10px",
          mt: 2,
          pb: 4,
        }}
      >
        <Box sx={style.fx}>
          <span style={{ color: 'white' }}
            className="!text-white-600 cursor-pointer"
            onClick={() => navigate("/account/income-main/my-team")}
          >
            My Team
          </span>
        </Box>
        <Box sx={style.fx}>
          <span style={{ color: 'white' }}
            className="!text-white-600 cursor-pointer"
            onClick={() => navigate("/account/income-main")}
          >
            Income
          </span>
        </Box>
        <Box sx={style.fx}>
          <span style={{ color: 'white' }}
            className="!text-white-600 cursor-pointer"
            onClick={() => navigate("/bank")}
          >
            Bank
          </span>
        </Box >
        {/* <Box sx={style.fx}>
          <span style={{
            color: 'white'
          }}
            className="!text-white-600 cursor-pointer"
            onClick={() => navigate("/ico-token")}
          >
            ICO Token
          </span>
        </Box > */}
        <Box sx={style.fx}>
          <span style={{
            color: 'white'
          }}
            className="!text-white-600 cursor-pointer"
            onClick={() => navigate("/fund-main")}
          >
            P2P Main
          </span>
        </Box >
        {/* <Box sx={style.fx}>
        <span style={{color:'white'}}
          className="!text-white-600 cursor-pointer"
          onClick={() => navigate("/view-salary-income")}
        >
          View Salary Income
        </span>
        </Box> */}
        {/* < Box sx={style.fx} >
          <span style={{ color: 'white' }}
            className="!text-white-600 cursor-pointer"
            onClick={() => navigate("/upi-deposit-token")}
          >
            UPI Deposit Token
          </span>
        </Box> */}
        <Box sx={style.fx}>
          <span style={{ color: 'white' }}
            className="!text-white-600 cursor-pointer"
            onClick={() => navigate("/password")}
          >
            Password
          </span>
        </Box >
        {/* <Box sx={style.fx}>
          <span style={{
            color: 'white'
          }}
            className="!text-white-600 cursor-pointer"
            onClick={() => navigate("/zupeeter-token")}
          >
            Zupeeter Token
          </span>
        </Box > */}
        <Box sx={style.fx}>
          <span style={{
            color: 'white'
          }}
            className="!text-white-600 cursor-pointer"
            onClick={() => logOutFunction()}
          >
            Logout
          </span>
        </Box >
      </Stack >
    </Layout >
  );
};

export default TeamIncome;
const style = {
  header: {
    padding: 1,
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
  },
  stack: {
    width: "100%",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 3,
  },
  box: {
    width: "23%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  innerBox: {
    padding: 1,
    background: "#ffffff",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderRadius: "15px",
  },
  innerBoximg: {
    width: 35,
  },
  typography: {
    fontFamily: '"PT Serif", serif !important',
    fontSize: "12px",
    color: "gray",
    marginTop: 1,
    textAlign: "center",
  },
  mainButton: {
    width: "100%",
    height: "0.93333rem",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.01333rem",
    border: "none",
    borderRadius: "20px",
    background: "#eb8a1f",
    boxShadow: "0 3px #e74141",
    padding: "20px 10px",
    marginTop: 2,
    "&:hover": {
      color: "white",
      background: "#eb8a1f",
    },
  },
  mainwallettrbutton: {
    width: "100%",
    height: "0.93333rem",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.01333rem",
    border: "none",
    borderRadius: "20px",
    background: "#eb8a1f",
    boxShadow: "0 3px #e74141",
    padding: "20px 10px",
    mt: 2,
    "&:hover": {
      color: "white",
      background: "#eb8a1f",
    },
  },
  fx: {
    width: "100%",
    height: "100px",
    background: theme.palette.primary.main,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mb: 1.5,
    padding: "10px",
  },
  fxone: {
    width: "31%",
    height: "100px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    mb: 1.5,
  },
};
