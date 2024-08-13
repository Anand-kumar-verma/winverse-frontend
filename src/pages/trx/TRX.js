import VolumeUpIcon from "@mui/icons-material/VolumeUpOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Box,
  Button,
  Container,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import asistant from "../../assets/images/asistant.png";
import backbtn from "../../assets/images/backBtn.png";
import balance from "../../assets/images/balance.png";
import music from "../../assets/images/music.png";
import musicoff from "../../assets/images/musicoff.png";
import refresh from "../../assets/images/refresh.png";
import time from "../../assets/images/time.png";
import { getBalanceFunction } from "../../services/apiCallings";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import WinLossPopup from "./WinLossPopup";
import Wingo10Min from "./component/Wingo10Min";
import Wingo1Min from "./component/Wingo1Min";
import Wingo3Min from "./component/Wingo3Min";
import Wingo5Min from "./component/Wingo5Min";
import { wallet_real_balanceFn } from "../../redux/slices/counterSlice";

function TRX() {
  const [musicicon, setmusicicon] = useState(true);
  const [value, setValue] = useState(1);
  const [getBalance, setBalance] = useState(0);
  const dispatch = useDispatch();
  const [opendialogbox, setOpenDialogBox] = useState(false);
  const isAppliedbet = localStorage.getItem("betApplied");
  const dummycounter = useSelector((state) => state.aviator.dummycounter);
  const client = useQueryClient();
  const wallet_amount_data = useSelector(
    (state) => state.aviator.wallet_real_balance
  );
  const navigate = useNavigate();
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("hidden");
      } else {
        setOpenDialogBox(false);
        localStorage.setItem("betApplied", false);
        localStorage.removeItem("total_bet");
        localStorage.removeItem("anand_re");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    setOpenDialogBox(false);
    localStorage.setItem("betApplied", false);
    localStorage.removeItem("total_bet");
    localStorage.removeItem("anand_re");
  }, []);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     if (isAppliedbet?.split("_")?.[1] === String(true)) {
  //      setOpenDialogBox(true);
  //       // setTimeout(() => {
  //       //   setOpenDialogBox(false);
  //       //   localStorage.setItem("betApplied", false);
  //       // }, 5000);
  //     }
  //   }, 1000);
  // }, [dummycounter]);
  React.useEffect(() => {
    if (isAppliedbet?.split("_")?.[1] === String(true)) {
      setOpenDialogBox(true);
    }
  }, [dummycounter]);
  const { isLoading, data: wallet_amount } = useQuery(
    ["wallet_amount"],
    () => getBalanceFunction(setBalance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  React.useEffect(() => {
    dispatch(wallet_real_balanceFn(wallet_amount?.data?.earning || 0));
  }, [wallet_amount?.data?.earning]);

  function refreshFunctionForRotation() {
    client.refetchQueries("wallet_amount");
    const item = document.getElementsByClassName("rotate_refresh_image")?.[0];

    const element = document.getElementById("refresh_button");
    if (!item) {
      element.classList.add("rotate_refresh_image");
    }
    setTimeout(() => {
      element.classList.remove("rotate_refresh_image");
    }, 2000);
  }
  useEffect(() => {
    const element = document.getElementById("refresh_button");
    const item = document.getElementsByClassName("rotate_refresh_image")?.[0];
    if (item) {
      element.classList.remove("rotate_refresh_image");
    }
  }, []);

  return (
    <Container>
      <Box
        sx={{
          padding: 1,
          background:
            "linear-gradient(90deg, rgb(255, 153, 1) 0%, rgb(230, 115, 1) 100%)",
          px: 2,
        }}
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <NavLink to="/dashboard">
            <Box component="img" src={backbtn} width={25}></Box>
          </NavLink>
          <Stack direction="row">
            <NavLink to={"/CustomerService"}>
              <Box
                component="img"
                src={asistant}
                width={25}
                sx={{ mr: 2 }}
              ></Box>
            </NavLink>
            <NavLink onClick={() => setmusicicon(!musicicon)}>
              {musicicon === true ? (
                <Box component="img" src={music} width={25}></Box>
              ) : (
                <Box component="img" src={musicoff} width={25}></Box>
              )}
            </NavLink>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          padding: 1,
          background:
            "linear-gradient(90deg, rgb(255, 153, 1) 0%, rgb(230, 115, 1) 100%)",
          px: 2,
        }}
      >
        <Box
          sx={{
            background: "white",
            padding: 2,
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography
              variant="body1"
              color="initial"
              fontSize="18px"
              fontWeight={700}
            >
              ₹ {wallet_amount_data}{" "}
            </Typography>
            <div className="mx-1 rotate_refresh_image" id="refresh_button">
              <img
                src={refresh}
                width={25}
                ml={2}
                onClick={() => {
                  refreshFunctionForRotation();
                }}
              />
            </div>{" "}
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Box component="img" src={balance} width={25} mr={2}></Box>
            <Typography
              variant="body1"
              color="initial"
              fontSize="13px"
              fontWeight={400}
            >
              Wallet balance{" "}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            {/* <Button
              onClick={() => navigate("/withdraw")}
              sx={style.withdrawalbtn}
            >
              Withdraw
            </Button>
            <Button onClick={() => navigate("/deposit")} sx={style.depositebtn}>
              Deposit
            </Button> */}
          </Stack>
        </Box>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
            py: 1,
            background: "#FFFBE8",
            borderRadius: "10PX",
            mt: 2,
            mb: 2,
          }}
        >
          <VolumeUpIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontWeight: 500,
              fontSize: "10px",
              mr: 1,
              textAlign: "center",
              color: theme.palette.primary.main,
            }}
          >
            1.All recharge methods only available in RECHARGE menu on OFFICIAL
          </Typography>
          <Typography className="!bg-orange-400 !text-white !text-xs !pt-1 rounded-2xl px-2 py-1 !flex justify-center">
            <WhatshotIcon fontSize="small" /> Details
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "95%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "auto",
          background: "#ededed",
          borderRadius: "10PX",
          mt: 2,
        }}
      >
        <Box sx={{ width: "30%" }}>
          <NavLink
            className={value === 1 ? " wingonavactive wingonav" : " wingonav"}
            onClick={() => handleChange(1)}
          >
            <Box component="img" src={time} width={40}></Box>
            <Typography variant="body1" color="initial">
              TRX Win Go
            </Typography>
            <Typography variant="body1" color="initial">
              1 Min
            </Typography>
          </NavLink>
        </Box>
        <Box sx={{ width: "30%" }}>
          <NavLink
            className={value === 2 ? " wingonavactive wingonav" : " wingonav"}
            onClick={() =>
              // handleChange(2)
              toast(
                "The system is currently under maintenance. Please try again later."
              )
            }
          >
            <Box component="img" src={time} width={40}></Box>
            <Typography variant="body1" color="initial">
              TRX Win Go
            </Typography>
            <Typography variant="body1" color="initial">
              3 Min
            </Typography>
          </NavLink>
        </Box>
        <Box sx={{ width: "30%" }}>
          <NavLink
            className={value === 3 ? " wingonavactive wingonav" : " wingonav"}
            onClick={
              () =>
                toast(
                  "The system is currently under maintenance. Please try again later."
                )
              // handleChange(3)
            }
          >
            <Box component="img" src={time} width={40}></Box>
            <Typography variant="body1" color="initial">
              TRX Win Go
            </Typography>
            <Typography variant="body1" color="initial">
              5 Min
            </Typography>
          </NavLink>
        </Box>
      </Box>
      {value === 1 && <Wingo1Min />}
      {value === 2 && <Wingo3Min />}
      {value === 3 && <Wingo5Min />}
      {value === 4 && <Wingo10Min />}
      {/* opendialogbox */}
      {opendialogbox && (
        <Dialog
          open={opendialogbox}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <WinLossPopup
            gid={isAppliedbet?.split("_")?.[0]}
            setOpenDialogBox={setOpenDialogBox}
          />
        </Dialog>
      )}
    </Container>
  );
}

export default TRX;

const style = {
  withdrawalbtn: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "20px",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: "600",
    padding: "5px 25px",
  },
  depositebtn: {
    background: theme.palette.primary.main,
    borderRadius: "20px",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: "600",
    padding: "5px 25px",
    color: "white",
  },
};
