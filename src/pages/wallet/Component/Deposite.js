import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import copy from "clipboard-copy";
import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import atm from "../../../assets/images/atm.png";
import wallet from "../../../assets/images/atmw.png";
import backbtn from "../../../assets/images/backBtn.png";
import audiovoice from "../../../assets/images/bankvoice.mp3";
import cip from "../../../assets/images/cip.png";
import user from "../../../assets/images/instruction.png";
import refresh from "../../../assets/images/refwhite.png";
import withdravalhistory from "../../../assets/images/withdrawalhistory.png";
import {
  BankListDetails,
  BankUPIDetails,
  depositHistoryFunction,
  getBalanceFunction,
} from "../../../services/apiCallings";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";

import { endpoint } from "../../../services/urls";
import QRScreen from "./QRScreen";
function Deposite() {
  const [receipt, setReceipt] = React.useState();
  const user_id = localStorage.getItem("user_id");
  const [isAllValue, setIsAllValue] = useState(false);
  const [visibleData, setvisibleData] = useState([]);
  const [amount, setBalance] = useState("");
  const [loading, setIsLoading] = React.useState(false);
  const audioRefMusic = React.useRef(null);
  const [loding, setloding] = useState(false);
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
  const client = useQueryClient();

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
    deposit_type: "Select Method",
    req_amount: "",
    req_curr_type: "",
    file: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        user_id: user_id,
        deposit_type: fk.values.deposit_type === "UPI" ? "1" : "2",
        req_amount: fk.values.req_amount,
        req_curr_type: fk.values.req_curr_type,
        file: receipt, 
      };
      insertFundFn(reqBody);
    },
  });
  async function insertFundFn(reqBody) {
    try {
      const res = await axios.post(endpoint?.deposite_request, reqBody);
      toast(res?.data?.msg);
      setIsLoading(false);
      if ("Request Successfully Done" === res?.data?.msg)
        fk.handleReset();
    } catch (e) {
      console.log(e);
    }
    client.refetchQueries("wallet_amount");
  }
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    handlePlaySound();
  }, []);

  const handlePlaySound = async () => {
    try {
      if (audioRefMusic?.current?.pause) {
        await audioRefMusic?.current?.play();
      } else {
        await audioRefMusic?.current?.pause();
      }
    } catch (error) {
      console.error("Error during play:", error);
    }
  };
  const { data: bank } = useQuery(
    ["bank_list_details"],
    () => BankListDetails(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const result = bank?.data?.data;

  const { data: upi } = useQuery(
    ["bank_upi_details"],
    () => BankUPIDetails(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const upidata = upi?.data?.data;

  const selectedUPIDetails = upidata?.find(
    (item) => item?.m37_id === fk.values.req_curr_type
  );

  const audio = React.useMemo(() => {
    return (
      <audio ref={audioRefMusic} hidden>
        <source src={`${audiovoice}`} type="audio/mp3" />
      </audio>
    );
  }, []);

 
  if (loading) return <CustomCircularProgress isLoading={loading} />;
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
              Deposit
            </Typography>
          </Box>
          <NavLink to="/depositehistory">
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "11px", color: "white" }}
            >
              Deposit history
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
      <div className="grid grid-cols-2 gap-1 items-center p-5 !text-white">
        <span className="col-span-2 justify-end">
          <div className="flex justify-between">
            <span className="font-bold">Fund Transfer</span>
          </div>
        </span>
        <span className="!text-white !text-sm">Select Payment *</span>
        <TextField
       
          id="deposit_type"
          name="deposit_type"
          value={fk.values.deposit_type}
          onChange={fk.handleChange}
          className="!w-[100%] !bg-white !mt-5"
          select
          size="small"
        >
          <MenuItem value={"Select Method"}>Select Method</MenuItem>
          <MenuItem value={"Bank"}>Bank</MenuItem>
          <MenuItem value={"UPI"}>UPI</MenuItem>
        </TextField>
        {fk.values.deposit_type === "Bank" && (
          <>
            <span className="!text-white !text-sm">Select Bank *</span>
            <TextField
              id="req_curr_type"
              name="req_curr_type"
              value={fk.values.req_curr_type}
              onChange={fk.handleChange}
              placeholder="Select Bank"
              className="!w-[100%] !bg-white !mt-5"
              select
              size="small"
            >
              <MenuItem value={"Select Bank"}>Select Bank</MenuItem>
              {result?.map((i, index) => {
                return (
                  <MenuItem value={i?.id}>
                    {i?.bankname} <br /> ({i?.bankaccno})
                  </MenuItem>
                );
              })}
            </TextField>
          </>
        )}
        {fk.values.deposit_type === "UPI" && (
          <>
            <span className="!text-white !text-sm">Select UPI *</span>
            <TextField
              id="req_curr_type"
              name="req_curr_type"
              value={fk.values.req_curr_type}
              onChange={fk.handleChange}
              placeholder="Select UPI"
              className="!w-[100%] !bg-white !mt-5"
              select
              size="small"
            >
              <MenuItem value="Select UPI">Select UPI</MenuItem>
              {upidata?.map((i) => (
                <MenuItem key={i.m37_id} value={i.m37_id}>
                  {i.m37_title}
                </MenuItem>
              ))}
            </TextField>
            {selectedUPIDetails && (
              <div className="col-span-2 !h-full !w-full flex items-center mt-10 flex-col">
                <div className="w-72">
                  <img src={selectedUPIDetails.m37_profile} alt="" />
                </div>
                <div className="pt-4 gap-2">
                  <p className="!bg-white !text-xl font-bold px-8 !text-black">
                    {selectedUPIDetails.m37_value}
                  </p>
                  <div className="w-full flex justify-center mt-5">
                    <Button
                      size="small !py-1"
                      className="!bg-[#0ee6ac] !text-white place-items-center"
                      onClick={() =>
                        functionTOCopy(
                          selectedUPIDetails.m37_value
                        )
                      }>
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <span className="!text-white !text-sm ">Amount*</span>
        <TextField
          id="req_amount"
          name="req_amount"
          value={fk.values.req_amount}
          onChange={fk.handleChange}
          placeholder="amount"
          className="!w-[100%] !bg-white !mt-5"
        />

        <span className="!text-white !text-sm ">Receipt*</span>
        <input
          type="file"
          id="file"
          name="file"
          className="!text-sm !mt-5"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              try {
                const base64 = await fileToBase64(file);
                setReceipt(base64); // Store the base64 string in state
              } catch (error) {
                console.error("Error converting file to base64:", error);
              }
            }
          }}
          required
        />


        <div className="col-span-2 flex justify-end gap-2 mt-8">
          <Button
            className="!bg-[#FD565C] !text-white"
            onClick={() => fk.handleReset()}
          >
            Cancel
          </Button>
          <Button
            className="!bg-[#BF6DFE] !text-white"
            onClick={fk.handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
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
