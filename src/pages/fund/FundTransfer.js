import { Box, Button, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import Layout from "../../component/layout/Layout";
import {
  P2pTransferHistoryFunction,
  ProfileDataFunction,
  getBalanceFunction,
} from "../../services/apiCallings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import moment from "moment";
import { endpoint } from "../../services/urls";
import theme from "../../utils/theme";
import { NavLink } from "react-router-dom";
import { ArrowBackIos, ContentPaste } from "@mui/icons-material";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { deCryptData } from "../../shared/secret";

const FundTransfer = () => {
  const [username, setusername] = useState("");
  const [balance, setsetBalance] = useState("");
  const [Loading, setLoading] = useState(false);
  const client = useQueryClient();
  const user_id = deCryptData(localStorage.getItem("user_id"));

  const initialValue = {
    amount: "",
    transfer_id: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        userid: user_id,
        amount: fk.values.amount,
        transfer_id: fk.values.transfer_id,
      };

      if (
        !reqBody.amount ||
        !reqBody.transfer_id
      )
        return toast("Plese enter all data");
      insertFundFn(reqBody);
    },
  });

  const handlePasteClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      fk.setFieldValue('transfer_id', clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard content:', err);
    }
  };

  async function insertFundFn(reqBody) {

    try {
      setLoading(true)
      const res = await axios.post(endpoint?.insert_fund_transfer, reqBody);
      toast(res?.data?.msg);
      fk.handleReset();
      setLoading(false)
      client.refetchQueries("wallet_amount_amount");
      client.refetchQueries("p2p_transfer_history")

    } catch (e) {
      console.log(e);
    }

  }
  async function getIntroFn() {
    console.log("Function is hit now");
    const reqBody = {
      userid: fk.values.transfer_id,
    };
    try {
      const res = await axios.post(endpoint?.get_user_intro_name, reqBody);
      setusername(res?.data?.earning?.name);
    } catch (e) {
      console.log(e);
    }
    // client.refetchQueries("bank_details");
  }

  useEffect(() => {
    getIntroFn();
  }, [fk.values.transfer_id]);

  const { data: wallet_amount } = useQuery(
    ["wallet_amount_amount"],
    () => getBalanceFunction(setsetBalance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const wallet_amount_data = wallet_amount?.data?.earning || 0;
  const [isAllValue, setIsAllValue] = useState(false);

  const { isLoading, data } = useQuery(
    ["p2p_transfer_history"],
    () => P2pTransferHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const res = data?.data?.earning?.records || [];
  
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };

  return (
    <Layout header={false}
    > <Container
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        background: theme.palette.secondary.main,
      }}>
        <Box sx={style.header} >

          <Box component={NavLink} to="/fund-main"><ArrowBackIos className="!text-white" /></Box>
          <Typography variant="" color="initial" className="!text-white !font-bold !py-2">
            P2P User Transfer
          </Typography>
          <Box></Box>
        </Box>
        <div className="text-white flex justify-between px-5 mt-10">
          <div className="!font-bold">P2P Wallet :</div>
          <div className="!font-bold">{wallet_amount_data?.p2pwallet}</div>
        </div>

        <div className=" items-center !text-white  my-5 mx-3  !font-bold p-5 mt-2 ">

          <span>Transfer To *</span>
          <div>
           
            <TextField
              id="transfer_id"
              name="transfer_id"
              value={fk.values.transfer_id}
              onChange={fk.handleChange}
              placeholder="User ID"
              className="!w-[100%] !my-2 !rounded !bg-white !text-black"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ContentPaste onClick={handlePasteClick} style={{ cursor: 'pointer' }}/>
                  </InputAdornment>
                ),
              }}
            />
             {username !== "false" ? (
              <div className="no-error !text-blue-600 !mb-2 !text-sm">{username}</div>
            ) : (
              fk.touched.transfer_id &&
              fk.errors.transfer_id && (
                <div className="error">{fk.errors.transfer_id}</div>
              )
            )} 
          </div>

          <span>Transfer Amount*</span>
          <TextField
            id="amount"
            name="amount"
            placeholder="Enter Amount"
            value={fk.values.amount}
            onChange={fk.handleChange}
            className="!w-[100%]  !my-2 !rounded !bg-white !text-black"
          />

          <div className="col-span-2 flex gap-2 mt-4">
            <Button
            className="!bg-[#da1c22] !text-white"
              onClick={() => fk.handleReset()}
            >
              Cancel
            </Button>
            <Button
             className="!bg-[#26ac1a] !text-white"
              onClick={() => fk.handleSubmit()}
            >
              Submit
            </Button>
            {Loading && (
              <CustomCircularProgress isLoading={Loading} />)}
          </div>
        </div>
        <Box >
        <Stack
          direction="row"
          sx={{ alignItems: "end", justifyContent: "space-between", position: "relative" }}
        >
        
          <Box sx={{ position: "absolute", left: "30%", top: "10%" }} >
            <Typography
              variant="body1" 
              sx={{ color: "white", fontSize: "16px", fontWeight: "600" }}
            >
              P2P User Transfer History
            </Typography>
          </Box>
        </Stack>
      </Box>
      
      <CustomCircularProgress isLoading={isLoading} />
      {res?.map((i, index) => (
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
          className="!mt-10"
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
              <Typography
                className=" !text-white rounded px-2 py-1 !flex justify-center "
                sx={{ background: theme.palette.primary.main }}
              >
                P2P Transfer
              </Typography>
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
            {i?.m_ledger_type=== "Dr" ?
             <Typography>Debit </Typography>
           :
           <Typography>Credit </Typography>
            }
            </Typography>
            <Typography variant="body1" 
            className={`${
              i?.m_ledger_type=== "Dr" ?
              " !text-red-600"
              :
               "!text-green-600"  
            }`}>
            
            {i?.m_ledger_type=== "Dr" ?
             <Typography> - {i?.m_dramount} </Typography>
           :
           <Typography> + {i?.m_cramount} </Typography>
            }

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
              Charges
            </Typography>
            <Typography variant="body1" color="initial" className="!text-red-400">
            ₹ {i?.m_admin_charges}
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
           Date/Time
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                className="!text-green-500"
              >
                {moment(i?.m_transdate)?.format("DD-MM-YYYY HH:mm:ss")}
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
              Transaction ID
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
                {i?.m_trans_id}
              </Typography>
              <IconButton sx={{ padding: 0 }}
               onClick={() =>
                functionTOCopy(
                  i?.m_trans_id
                )
              }>
                <ContentCopyIcon sx={{ color: "#888", width: "15px", ml: 1 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      ))}

      <Button
        sx={{ marginTop: 2, margin:5, borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
        variant="outlined"
        onClick={() => setIsAllValue(!isAllValue)}
      >
        {isAllValue ? "Show Less" : "Show All"}
      </Button>

      </Container>


    </Layout>
  );
};

export default FundTransfer;
const style = {
  header: {
    padding: 1,
    background: "linear-gradient(180deg, #9cec01, #028f7e)",
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