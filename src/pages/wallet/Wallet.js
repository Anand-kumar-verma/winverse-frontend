import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import depositeimg from "../../assets/images/deposite.png";
import dhistory from "../../assets/images/dhistory.png";
import whistory from "../../assets/images/whistory.png";
import withdraw from "../../assets/images/withdraw.png";
import Layout from "../../component/layout/Layout";
import {
  ProfileDataFunction,
  checkTokenValidity,
  depositHistoryFunction,
  getBalanceFunction,

} from "../../services/apiCallings";
import { rupees } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";

function Wallet() {
  const [balance, setBalance] = useState("");
  const { isLoading, data: wallet_amount } = useQuery(
    ["wallet_amount_amount"],
    () => getBalanceFunction(setBalance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const navigate = useNavigate();
  const wallet_amount_data = wallet_amount?.data?.earning || 0;

  const {  data: user } = useQuery(
    ["profile"],
    () => ProfileDataFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const profile = user?.data?.earning || [];

  const { isLoading: total_deposit, data } = useQuery(
    ["deposit_history"],
    () => depositHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const res = data?.data?.earning?.recharge || [];
  const total_deposit_amount = useMemo(() => {
    return res
      ?.filter((i) => i?.m_top_status === "Success")
      ?.reduce((a, b) => a + Number(b?.tr09_req_amount || 0), 0);
  }, [data]);


  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; 
    }
  }, []);


  return (
    <Layout header={false}
    > <Container
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        background: theme.palette.secondary.main,
      }}>
        <Box sx={style.header}>
          <Typography variant="body1" color="initial"></Typography>
          <Typography variant="body1" color="initial">

          </Typography>
          <Box component={NavLink} to="/promotion/Subordinate/"></Box>
        </Box>
        <Box
          sx={{
            padding: "15px 15px 5px 15px",
            background: theme.palette.primary.main,
          }}
        >
          <div className="!flex  justify-center">
            <img src={profile?.rec?.User_image} alt="" className="!w-24 !-mt-5 rounded-full" />
          </div>
          <p className="!text-center !text-white !font-bold">
            {profile?.rec?.Associate_Name} </p>
            <p className="!text-center !text-white !font-bold">
            {profile?.rec?.Login_Id}  </p>
              
        </Box>
        <CustomCircularProgress isLoading={isLoading || total_deposit} />
        <Box sx={{ background: theme.palette.primary.main, pb: 2 }} className="!pt-2">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "20px", fontWeight: "500", color: "white" }}
              >
               ₹ {wallet_amount_data?.wallet || 0}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "14px", fontWeight: "400", color: "white" }}
              >
                Total Amount
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "20px", fontWeight: "500", color: "white" }}
              >
                
                ₹  {wallet_amount_data?.p2pwallet || 0}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "14px", fontWeight: "400", color: "white" }}
              >
                P2P Wallet
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "92%",
            margin: "auto",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "10px",

          }}
        >
          <Box
            sx={{
              width: "100%",
              background: "#ffffff",
              padding: 1,
              borderRadius: "10px",
              mt: -1,
            }}
          >
            <Stack

              direction="row"
              sx={{
                my: 2,
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                
              }}
            >
              <Box sx={{ width: "50%", position: "relative" }}>
                   <Box
                  sx={{
                    textAlign: "center",
                    "&>p": { color: "black", fontSize: "13px", fontWeight: 500 },
                  }}
                >
                  <Typography variant="body1" color="initial" className="!font-bold">
                  ₹ {wallet_amount_data?.withdrawal || 0}
                  </Typography>
                  <Typography variant="body1" color="initial">
                  Total Withdrawal
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "50%", position: "relative" }}>

                <Box
                  sx={{
                    textAlign: "center",
                    "&>p": { color: "black", fontSize: "13px", fontWeight: 500 },
                  }}
                >
                  <Typography variant="body1" color="initial" className="!font-bold">
               {rupees} {total_deposit_amount || 0}
                  </Typography>
                  <Typography variant="body1" color="initial">
                  Total Deposit
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Button sx={style.mainwallettrbutton}>Main wallet transfer</Button>

            <Stack direction="row" sx={style.stack}
            >
              <Box className="!cursor-pointer" sx={style.box}
                onClick={() =>

                  navigate('/deposit')

                }>
                <Box sx={style.innerBox}>
                  <Box
                    component="img"
                    src={depositeimg}
                    sx={style.innerBoximg}
                  ></Box>
                </Box>
                <Typography variant="body1" color="initial" sx={style.typography}>
                  Deposit
                </Typography>
              </Box>

              <Box className="!cursor-pointer" sx={style.box}
                onClick={() =>
                  navigate('/withdraw')
                }>
                <Box sx={style.innerBox}>
                  <Box
                    component="img"
                    src={withdraw}
                    sx={{ ...style.innerBoximg, filter: 'hue-rotate(231deg)', }}
                  ></Box>
                </Box>
                <Typography variant="body1" color="initial" sx={style.typography}>
                  Withdraw
                </Typography>
              </Box>
              <Box className="!cursor-pointer" sx={style.box}
                onClick={() =>

                  navigate('/depositehistory')

                }>
                <Box sx={style.innerBox}>
                  <Box
                    component="img"
                    src={dhistory}
                    sx={style.innerBoximg}
                  ></Box>
                </Box>
                <Typography variant="body1" color="initial" sx={style.typography}>
                  Deposit history
                </Typography>
              </Box>
              <Box className="!cursor-pointer" sx={style.box}
                onClick={() =>
                  navigate('/withdrawlhistory')

                }>
                <Box  sx={style.innerBox}>
                  <Box
                    component="img"
                    src={whistory}
                    sx={style.innerBoximg}
                  ></Box>
                </Box>
                <Typography variant="body1" color="initial" sx={style.typography}>
                  Withdrawal history
                </Typography>
              </Box>
              <Box className="!cursor-pointer" sx={style.box}
                onClick={() =>
                  navigate('/p2p')

                }>
                <Box sx={style.innerBox}>
                  <Box
                    component="img"
                    src={withdraw}
                    sx={{ ...style.innerBoximg, filter: 'hue-rotate(231deg)', }}
                  ></Box>
                </Box>
                <Typography variant="body1" color="initial" sx={style.typography}>
                P2P 
                </Typography>
              </Box>
            </Stack>
          
          </Box>
        </Box>
      </Container>


    </Layout>
  );
}

export default Wallet;

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
    filter: 'hue-rotate(45deg)',
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
    background: "#63BA0E",
    boxShadow: "0 3px #e74141",
    padding: "20px 10px",
    marginTop: 2,
    "&:hover": {
      color: "white",
      background: "#63BA0E",
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
    background: "#63BA0E",
    boxShadow: "0 3px #0D0335",
    padding: "20px 10px",
    mt: 2,
    "&:hover": {
      color: "white",
      background: "#63BA0E",
    },
  },
  fx: {
    width: "31%",
    height: "100px",
    background: theme.palette.primary.main,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mb: 1.5,
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
