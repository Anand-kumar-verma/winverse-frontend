import {
  Box,
  Button,
  Container,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import copy from "clipboard-copy";
import { useFormik } from "formik";
import React, { useState } from "react";
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
import {
  BankListDetails,
  BankUPIDetails,
  getBalanceFunction,
} from "../../../services/apiCallings";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";
import { ContentPaste, CurrencyLiraRounded, History } from "@mui/icons-material";
import { endpoint } from "../../../services/urls";
import { deCryptData } from "../../../shared/secret";
import { Deposit } from "../../../services/validation";
import trx from "../../../assets/images/trx.png";
import atmchip from "../../../assets/images/atmchip.png";
import pyramid from "../../../assets/images/py.png";
import p2p from "../../../assets/images/p2.png";


function Deposite() {
  const [receipt, setReceipt] = React.useState();
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const [amount, setBalance] = useState("");
  const [Loading, setLoading] = useState(false);
  const audioRefMusic = React.useRef(null);
  const client = useQueryClient();

  const { data: wallet_amount } = useQuery(
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
    transaction_no: ""
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema:Deposit,
    enableReinitialize: true,
    onSubmit: () => {
      setLoading(true);
      const reqBody = {
        user_id: user_id,
        deposit_type: fk.values.deposit_type === "UPI" ? "1" : "2",
        req_amount: fk.values.req_amount,
        req_curr_type: fk.values.req_curr_type,
        file: receipt,
        transaction_no: fk.values.transaction_no
      };
      insertFundFn(reqBody);
    },

  });
  async function insertFundFn(reqBody) {
    try {
      const res = await axios.post(endpoint?.deposite_request, reqBody);
      toast(res?.data?.msg);
      setLoading(false);
      if ("Request Successfully Done" === res?.data?.msg) {
        fk.handleReset();
        setReceipt(null);
        
      }
    } catch (e) {
      console.log(e);
    }
    client.refetchQueries("wallet_amount");
    client.refetchQueries("withdrawl_history");
    
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceipt(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
  const handlePasteClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      fk.setFieldValue('transaction_no', clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard content:', err);
    }
  };
  
  const payment_button = React.useMemo(() => {
    return (
      <>
        <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
       
          <Typography
            variant="body1"
            sx={{ fontSize: "15px ", color: 'white !important', ml: "10px" }}
          >
          Select  Amount
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
            onClick={() => {
              fk.setFieldValue("req_amount", 500);
            }}
          >
            ₹ 500
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              fk.setFieldValue("req_amount", 1000)
            }
            }
          >
            {" "}
            ₹ 1K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              fk.setFieldValue("req_amount", 5000)
            }
            }
          >
            {" "}
            ₹ 5K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              fk.setFieldValue("req_amount", 10000)
            }
            }

          >
            {" "}
            ₹ 10K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              fk.setFieldValue("req_amount", 15000)
            }
            }
          >
            {" "}
            ₹ 15K
          </Button>
          <Button
            sx={style.paytmbtn}
            onClick={() => {
              fk.setFieldValue("req_amount", 20000)
            }
            }
          >
            {" "}
            ₹ 20K
          </Button>
        </Stack>
      </>
    );
  }, []);

  return (
    <Container sx={{ background: theme.palette.secondary.main, }}>
      {audio}
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
            <History className="!text-white"/>
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
              ₹ {wallet_amount_data?.wallet || 0}
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
        <Stack direction="row"
        justifyContent="center"
        gap="6px">
          <Stack
            sx={{
              background: theme.palette.primary.light,
              padding: 2,
              borderRadius: 2,
              width: "120px",
            }}
          >
            <Box
              component="img"
              src={atmchip}
              width={30}
              sx={{ margin: "0px auto" }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                color: "white ",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                mt: 1,
              }}
            >
              BANK / UPI
            </Typography>
          </Stack>
          <Stack
          className="!cursor-pointer"
            sx={{
              width: "120px",
              background:
              theme.palette.secondary.light,
              padding: 2,
              borderRadius: 2,
              boxShadow:
                " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                transition: 'background-color 0.3s ease', 
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                  
                },
            }}
            
             onClick={()=>navigate('/p2p')}   >
            <Box
            component="img"
            src={p2p}
              width={40}
              sx={{ margin: "0px auto" }}
            >
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                mt: 1,
              }}

            >
              P2P TopUP
            </Typography>
          </Stack>
          <Stack
          onClick={()=>(toast("comming soon",{id:-1}))}
             className="!cursor-pointer"
            sx={{
              width: "120px",
              background:
              theme.palette.secondary.light,
              padding: 2,
              borderRadius: 2,
              boxShadow:
                " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                transition: 'background-color 0.3s ease', 
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                  
                },
            }}
          >
            <Box
              component="img"
              src={trx}
              width={40}
              sx={{ margin: "0px auto" }}
            ></Box>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                mt: 1,
              }}
          >
              USDT 
            </Typography>
          </Stack>
          <Stack
          onClick={()=>(toast("comming soon",{id:-1}))}
             className="!cursor-pointer"
            sx={{
              width: "120px",
              background:
              theme.palette.secondary.light,
              padding: 2,
              borderRadius: 2,
              boxShadow:
                " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                transition: 'background-color 0.3s ease', 
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                  
                },
            }}
          >
            <Box
              component="img"
              src={pyramid}
              width={100}
              sx={{ margin: "0px auto" }}
         ></Box>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "center",
                mt: 1,
              }}
          >
              TRX 
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <div className="!m-5">
      {payment_button}
      </div>
      <div className="grid grid-cols-2 gap-1 -mt-5 items-center p-5 !text-white">
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
         
          <MenuItem value={"Bank"}>Bank</MenuItem>
          <MenuItem value={"UPI"}>UPI</MenuItem>
        </TextField>
        {fk.touched.deposit_type && fk.errors.deposit_type && (
         <div className="error">{fk.errors.deposit_type}</div>
   )}

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
          type="text"
          id="req_amount"
          name="req_amount"
          value={fk.values.req_amount}
          onChange={fk.handleChange}
          placeholder="amount"
          className="!w-[100%] !bg-white !mt-5"
        />
          {fk.touched.req_amount && fk.errors.req_amount && (
                        <div className="error">{fk.errors.req_amount}</div>
                    )}
        <span className="!text-white !text-sm ">Transaction Id*</span>
        {/* <TextField
          type="text"
          id="transaction_no"
          name="transaction_no"
          value={fk.values.transaction_no}
          onChange={fk.handleChange}
          placeholder="Transaction"
          className="!w-[100%] !bg-white !mt-5"
        /> */}
         <TextField
        type="text"
        id="transaction_no"
        name="transaction_no"
        value={fk.values.transaction_no}
        onChange={fk.handleChange}
        placeholder="Transaction"
        className="!w-[100%] !bg-white !mt-5"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ContentPaste 
                onClick={handlePasteClick} 
                style={{ cursor: 'pointer' }} 
              />
            </InputAdornment>
          ),
        }}
      />
        {fk.touched.transaction_no && fk.errors.transaction_no && (
                        <div className="error">{fk.errors.transaction_no}</div>
                    )}
        <span className="!text-white !text-sm ">Receipt*</span>
        <input
          type="file"
          id="file"
          name="file"

          className="!text-sm !mt-5"
          onChange={handleFileChange}
          required
        />
        <div className="col-span-2 flex justify-end gap-2 mt-8">
          <Button
          className="!bg-[#da1c22] !text-white"
            onClick={() => fk.handleReset()}
          >
            Cancel
          </Button>
          <Button
            className="!bg-green-800 !text-white"
            onClick={fk.handleSubmit}
          >
            Submit
          </Button>
          {Loading && (
            <CustomCircularProgress isLoading={Loading} />)}
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
