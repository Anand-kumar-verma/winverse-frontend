import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import atm from "../../../assets/images/atm.png";
import wallet from "../../../assets/images/atmw.png";
import backbtn from "../../../assets/images/backBtn.png";
import cip from "../../../assets/images/cip.png";
import user from "../../../assets/images/instruction.png";
import payment from "../../../assets/images/payment.png";
import refresh from "../../../assets/images/refwhite.png";
import trx from "../../../assets/images/trx.png";
import upiimg from "../../../assets/images/upiimg.png";
import withdravalhistory from "../../../assets/images/withdrawalhistory.png";
import theme from "../../../utils/theme";
import {
  depositHistoryFunction,
  getBalanceFunction,
} from "../../../services/apiCallings";
import { useQuery } from "react-query";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import audiovoice from "../../../assets/images/bankvoice.mp3";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";

import { endpoint, usdt_base_url } from "../../../services/urls";
import QRScreen from "./QRScreen";
function Deposite() {
  const user_id = localStorage.getItem("user_id");
  const [isAllValue, setIsAllValue] = useState(false);
  const [visibleData, setvisibleData] = useState([]);
  const [balance, setBalance] = useState("");
  const audioRefMusic = React.useRef(null);
  const [loding, setloding] = useState(false);
  const [show_time, set_show_time] = React.useState("0_0");
  const [deposit_req_data, setDeposit_req_data] = React.useState();
  const { isLoading: history, data } = useQuery(
    ["deposit_history"],
    () => depositHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const res = data?.data?.earning?.rid || [];
  useEffect(() => {
    isAllValue ? setvisibleData(res) : setvisibleData(res?.slice(0, 3));
  }, [isAllValue, res]);

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
  const wallet_amount_data = wallet_amount?.data?.earning || 0;

  const initialValue = {
    amount: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (Number(fk.values.amount) <= 100)
        return toast("Amount must be grater than 100");
      const reqBody = {
        userid: user_id,
        txtamount: fk.values.amount,
      };
      if (!reqBody.txtamount) return toast("Plese enter all data");

      // WalletDipositFun(reqBody);
      getStatusOfApi(reqBody);
    },
  });

  async function getStatusOfApi(reqBody) {
    try {
      const res = await axios.get(endpoint?.payin_status);
      console.log(res);

      const result = res?.data?.earning?.api_type;

      if (result === "SWNL") WalletDipositFunSWNL(reqBody);
      else if (result === "Indian Pay") WalletDipositFun(reqBody);
    } catch (e) {
      console.log(e);
    }
  }

  async function WalletDipositFun(reqBody) {
    setloding(true);
    try {
      const res = await axios.post(endpoint?.wallet_deposit, reqBody);
      toast(res?.data?.message);
      if (res?.data?.status === true) {
        window.location.href = res?.data?.earning?.msg;
        // window.open(res?.data?.earning?.msg, '_blank');
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
    // client.refetchQueries("bank_details");
  }
  async function WalletDipositFunSWNL(reqBody) {
    setloding(true);
    try {
      const res = await axios.post(endpoint?.swnl_pay_in_api, reqBody);
      console.log(res);
      const qr = res?.data?.earning?.msg;
      qr && setDeposit_req_data(qr);
    } catch (e) {
      console.log(e);
    }
    setloding(false);
    // client.refetchQueries("bank_details");
  }

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    handlePlaySound();
  }, []);

  React.useEffect(() => {
    if (deposit_req_data) {
      let min = 0;
      let sec = 59;
      const interval = setInterval(() => {
        set_show_time(`${min}_${sec}`);

        sec--;

        if (sec < 0) {
          sec = 59;
          min--;

          if (min < 0) {
            sec = 59;
            min = 0;
            clearInterval(interval);
            setDeposit_req_data();
            set_show_time("0_0");
            setloding(false);
          }
        }
      }, 1000);
    }
  }, [deposit_req_data]);

  const handlePlaySound = async () => {
    try {
      if (audioRefMusic?.current?.pause) {
        await audioRefMusic?.current?.play();
      } else {
        await audioRefMusic?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  const audio = React.useMemo(() => {
    return (
      <audio ref={audioRefMusic} hidden>
        <source src={`${audiovoice}`} type="audio/mp3" />
      </audio>
    );
  }, []);

  if (deposit_req_data) {
    return (
      <QRScreen deposit_req_data={deposit_req_data} show_time={show_time} />
    );
  }

  return (
    <Container sx={{ background: theme.palette.secondary.main, }}>
      {audio}
      <CustomCircularProgress isLoading={isLoading || loding || history} />
      <Box
        sx={{
          background: theme.palette.primary.main,
          padding: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "end",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <NavLink onClick={goBack}>
            <Box component="img" src={backbtn} width={25}></Box>
          </NavLink>
          <Box sx={{ position: "absolute", left: "40%", top: "10%" }}>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "16px", fontWeight: "600" }}
            >
              Deposite
            </Typography>
          </Box>
          <NavLink to="/depositehistory">
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "11px", color: "white" }}
            >
              Deposite history
            </Typography>
          </NavLink>
        </Stack>
      </Box>

      <Box sx={{ mt: 2, px: 2 }}>
        <Box
          sx={{
            backgroundImage: `url(${atm})`,
            backgroundSize: "100% 100%",
            padding: "20px 16px",
            filter: 'hue-rotate(45deg)',
          }}
        >
          <Stack direction="row">
            <Box component="img" src={wallet} width={20} sx={{ mr: 2, filter: 'hue-rotate(176deg)' }}></Box>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "14px", fontWeight: "500" }}
            >
              Available balance
            </Typography>
          </Stack>
          <Stack direction="row" alignItems={"center"} mt={1}>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "24px", fontWeight: "500" }}
            >
              ₹ {wallet_amount_data || 0}
            </Typography>
            <Box
              component="img"
              src={refresh}
              width={20}
              height={16}
              sx={{ ml: 2 }}
            ></Box>
          </Stack>
          <Stack direction="row" alignItems={"center"} mt={3}>
            <Box component="img" src={cip} width={40} height={25} sx={{ filter: 'hue-rotate(171deg)' }}></Box>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ mt: 2, px: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Stack
            sx={{
              background:
                theme.palette.secondary.light,
              padding: "16px 0px",
              borderRadius: 2,
              width: "32%",
            }}
            className="!cursor-pointer"
          >
            <Box
              component="img"
              src={upiimg}
              width={40}
              sx={{ margin: "0px auto", borderRadius: '5px' }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontSize: "11px",
                fontWeight: "500",
                textAlign: "center",
                mt: 1,
              }}
            >
              UPI x QR
            </Typography>
          </Stack>
          <Stack
            sx={{
              width: "32%",

              padding: "16px 0px",
              borderRadius: 2,
              background:
                theme.palette.secondary.light,
            }}
            className="!cursor-pointer"
          >
            <Box
              component="img"
              src={upiimg}
              width={40}
              sx={{ margin: "0px auto", borderRadius: '5px' }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontSize: "11px",
                fontWeight: "500",
                textAlign: "center",
                mt: 1,
              }}
            >
              UPI x PAYTM
            </Typography>
          </Stack>
          <Stack
            onClick={() =>
              (document.location.href = `${usdt_base_url}/?user_id=${user_id}`)
            }
            sx={{
              width: "32%",
              background: "#FFFFFF",
              padding: "16px 0px",
              borderRadius: 2,
              background:
                theme.palette.secondary.light,
            }}
            className="!cursor-pointer"
          >
            <Box
              component="img"
              src={trx}
              width={40}
              sx={{ margin: "0px auto", borderRadius: '5px' }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontSize: "11px",
                fontWeight: "500",
                textAlign: "center",
                mt: 1,
              }}
            >
              USDT
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          width: "92%",
          margin: "auto",
          background: theme.palette.primary.dark,
          mt: 2,
          borderRadius: "10px",
          padding: 1,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
        className="!cursor-pointer"
      >
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
          <Box component="img" src={payment} width={30} sx={{ filter: 'hue-rotate(45deg)' }}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "20px ",
              color: "white",
              ml: "10px",
              fontWeight: "600",
            }}
          >
            Deposit amount
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: "10px",
          }}
        >
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 500)}
          >
            ₹ 500
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 1000)}
          >
            ₹ 1K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 5000)}
          >
            ₹ 5K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 10000)}
          >
            ₹ 10K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 15000)}
          >
            ₹ 15K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => fk.setFieldValue("amount", 20000)}
          >
            ₹ 20K
          </Button>
        </Stack>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            background: "#F2F2F2",
            borderRadius: "20px",
            border: "none",
            boxShadow: "none",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <CurrencyRupeeIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <InputBase
            name="amount"
            id="amount"
            onChange={fk.handleChange}
            value={fk.values.amount}
            sx={{ px: 1, flex: 1, borderLeft: "1px solid #888" }}
            placeholder="Please enter the amount"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        <Button
          sx={style.wdbtn}
          onClick={fk.handleSubmit}
          className={`${fk.values.amount ? "!bg-[#63BA0E]" : "!bg-[#0D0335]"}`}
        >
          Deposite
        </Button>
      </Box>

      <Box
        sx={{
          width: "92%",
          margin: "auto",
          background: "#ffffff",
          mt: 2,
          borderRadius: "10px",
          padding: 1,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
          <Box component="img" src={user} width={30} sx={{ filter: 'hue-rotate(45deg)' }}></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px ", color: "black", ml: "10px" }}
          >
            Recharge instructions
          </Typography>
        </Stack>
        <Box
          sx={{ border: "1px solid #d2d2d2", padding: 2, borderRadius: "10px" }}
        >
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box sx={{ width: "5%" }}>
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: theme.palette.primary.main,
                  transform: "rotate(45deg)",
                  mr: 1,
                }}
              ></Box>
            </Box>
            <Typography variant="body1" color="initial">
              If the transfer time is up, please fill out the deposit form
              again.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box sx={{ width: "5%" }}>
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: theme.palette.primary.main,
                  transform: "rotate(45deg)",
                  mr: 1,
                }}
              ></Box>
            </Box>
            <Typography variant="body1" color="initial">
              The transfer amount must match the order you created, otherwise
              the money cannot be credited successfully.
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box sx={{ width: "5%" }}>
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: theme.palette.primary.main,
                  transform: "rotate(45deg)",
                  mr: 1,
                }}
              ></Box>
            </Box>
            <Typography variant="body1" color="initial">
              If you transfer the wrong amount, our company will not be
              responsible for the lost amount!
            </Typography>
          </Stack>
          <Stack direction="row" sx={style.rechargeinstext}>
            <Box sx={{ width: "5%" }}>
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: theme.palette.primary.main,
                  transform: "rotate(45deg)",
                  mr: 1,
                }}
              ></Box>
            </Box>
            <Typography variant="body1" color="initial">
              Note: do not cancel the deposit order after the money has been
              transferred.
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Stack direction="row" sx={{ alignItems: "center", margin: "20px" }}>
        <Box component="img" src={withdravalhistory} width={30} sx={{ filter: 'hue-rotate(45deg)' }}></Box>
        <Typography
          variant="body1"
          color="initial"
          sx={{
            fontSize: "15px ",
            color: "#888",
            ml: "10px",
            fontWeight: "600",
          }}
        >
          Deposite history
        </Typography>
      </Stack>

      {visibleData?.map((i, index) => {
        return (
          <Box
            key={index}
            sx={{
              mb: 2,
              padding: "10px",
              borderRadius: "10px",
              background: "#fff",
              width: "92%",
              margin: "auto",
              mt: 2,
            }}
          >
            <Stack
              direction="row"
              sx={{
                paddingBottom: "10px",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #efefef",
              }}
            >
              <Box>
                <Typography className=" !text-white rounded px-2 py-1 !flex justify-center" sx={{ background: '#63BA0E' }}>
                  Deposit
                </Typography>
              </Box>
              <Box
                sx={{
                  color: "#888",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {i?.tr15_status}
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p:nth-child(1)": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
                "&>p:nth-child(2)": {
                  color: theme.palette.primary.main,
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Balance
              </Typography>
              <Typography variant="body1">₹ {i?.tr15_amt}</Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Type
              </Typography>
              <Typography variant="body1" color="initial">
                {i?.tr15_type}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Time
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                className="!text-green-500"
              >
                {moment(i?.tr15_date)?.format("DD-MM-YYYY HH:mm:ss")}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Order number
              </Typography>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&>p:nth-child(1)": {
                    color: "#888",
                    fontSize: "13px",
                    fontWeight: "600",
                    py: 1,
                  },
                  "&>p:nth-child(2)": {
                    color: theme.palette.primary.main,
                    fontSize: "13px",
                    fontWeight: "600",
                  },
                }}
              >
                <Typography variant="body1" color="initial">
                  {i?.tr15_trans}
                </Typography>
                <IconButton sx={{ padding: 0 }}>
                  <ContentCopyIcon
                    sx={{ color: "#888", width: "15px", ml: 1 }}
                  />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        );
      })}

      <Button
        sx={style.paytmbtntwo}
        variant="outlined"
        onClick={() => setIsAllValue(!isAllValue)}
      >
        {isAllValue ? "Show Less" : " All history"}
      </Button>
    </Container>
  );
}
export default Deposite;

const style = {
  paytmbtntwo: {
    borderRadius: "20px",
    textTransform: "capitalize",
    mb: 2,
    width: "92%",
    mt: 2,
    mx: 2,
    padding: "10px",
    "&:hover": { border: "1px solid transparent" },
  },
  wdbtn: {
    width: "95% !important",
    boxShadow: "0 0.05333rem #b6bad0",
    borderRadius: "20px",
    border: "none",
    color: "#fff",
    letterSpacing: "0.13333rem",
    fontWeight: "700",
    fontSize: "15px",
    height: "0.93333rem",
    width: "100%",
    background: theme.palette.primary.light,
    backgroundSize: "100% 100%, 100% 100%",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
    textShadow: "0 0.02667rem 0.01333rem #afb0be",
    padding: "20px",
    mt: 3,
  },
  paytmbtn: {
    mb: 2,
    color: 'white',
    width: "31%",
    border: `1px solid  #eaeaea`,
    padding: "10px",
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { color: "#939393 !important", fontSize: "13px" },
  },
};
