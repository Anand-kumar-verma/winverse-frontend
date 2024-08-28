import { Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import {
  ProfileDataFunction,
  getBalanceFunction,
} from "../../../services/apiCallings";
import { endpoint } from "../../../services/urls";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";
import Layout from "../../../component/layout/Layout";
import { NavLink } from "react-router-dom";
import { ArrowBackIos, BackHandSharp } from "@mui/icons-material";

const P2PTransfer = () => {
  const [username, setusername] = useState("");
  const [balance, setsetBalance] = useState("");
  const client = useQueryClient();

  const { data } = useQuery(
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
  const profile = data?.data?.earning || [];

  const initialValue = {
    wallet: balance || "",
    userid: "",
    transferid: "",
    transfer_amount: "",
    transaction_password: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        userid: profile?.rec?.Login_Id,
        txtpassword: fk.values.transaction_password,
        txtamount: fk.values.transfer_amount,
        txtuserid: fk.values.userid,
        txtwallet: fk.values.wallet,
      }; 
      if (reqBody.userid === reqBody.txtuserid) {
        return toast("Can not send fund to yourself");
      }
      if (
        !reqBody.userid ||
        !reqBody.txtpassword ||
        !reqBody.txtamount ||
        !reqBody.txtuserid ||
        !reqBody.txtwallet
      )
        return toast("Plese enter all data");
      insertFundFn(reqBody);
    },
  });

  const fees = Number(fk.values.transfer_amount || 0) * 0.03;
  const payableAmount = fees + Number(fk.values.transfer_amount || 0);

  async function insertFundFn(reqBody) {
    try {
      const res = await axios.post(endpoint?.insert_fund_transfer, reqBody);
      toast(res?.data?.message);
      fk.handleReset();
      client.refetchQueries("fund_transfer_history_details");
      client.refetchQueries("fund_recive_details");
    } catch (e) {
      console.log(e);
    }
    // client.refetchQueries("bank_details");
  }
  async function getIntroFn() {
    console.log("Function is hit now");
    const reqBody = {
      userid: fk.values.userid,
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
  }, [fk.values.userid]);
  useEffect(() => {
    getBalanceFunction(setsetBalance);
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
    <Box sx={style.header} >
     
      <Box component={NavLink} to="/fund-main"><ArrowBackIos className="!text-white"/></Box>
      <Typography variant="" color="initial"  className="!text-white !font-bold !py-2">
     P2P TopUp
      </Typography>
      <Box></Box>
    </Box>
    <div className=" items-center !text-white !font-bold p-5 mt-5 ">
    <span>User Id*</span>
          <div>
            <TextField
              id="userid"
              name="userid"
              value={fk.values.userid}
              onChange={(e) => {
                fk.handleChange(e);
                if (e.target.value === profile?.rec?.Login_Id) {
                 return toast("Can not send fund to yourself ");
                } 
              }}
              className="!w-[100%] !bg-white !my-2 !rounded "
            />
            {username && username !== "false" && (
              <p className="!text-[10px] !text-red-500 pl-2">{username}</p>
            )}
          </div>
          <span>P2P Wallet Available Balance*</span>
          <TextField
            id="wallet"
            name="wallet"
            value={fk.values.wallet}
            placeholder="Select Bank"
            className="!w-[100%] !bg-white !my-2 !rounded "
          ></TextField>

          

          <span>Transfer Amount*</span>
          <TextField
            id="transfer_amount"
            name="transfer_amount"
            placeholder="Enter Amount"
            value={fk.values.transfer_amount}
            onChange={fk.handleChange}
            className="!w-[100%] !bg-white !my-2 !rounded "
          />
           <span>TopUp Amount*</span>
          <TextField
            id="transfer_amount"
            name="transfer_amount"
            placeholder="Enter Amount"
            value={fk.values.transfer_amount}
            onChange={fk.handleChange}
            className="!w-[100%] !bg-white !my-2 !rounded "
          />
            <span>P2P Wallet*</span>
          <TextField
            id="transfer_amount"
            name="transfer_amount"
            placeholder="Enter Amount"
            value={fk.values.transfer_amount}
            onChange={fk.handleChange}
            className="!w-[100%] !bg-white !my-2 !rounded "
          />
          <span>Request Amount*</span>
          <TextField
            type="password"
            id="transaction_password"
            name="transaction_password"
            placeholder="Enter password"
            value={fk.values.transaction_password}
            onChange={fk.handleChange}
            className="!w-[100%] !bg-white !my-2 !rounded "
          />
                 <span className="!text-white !text-sm">Select Deposit Type *</span>
                    <TextField
                        id="w_type"
                        name="w_type"
                        value={fk.values.w_type}
                        onChange={fk.handleChange}
                        className="!w-[100%] !bg-white !mt-5"
                        select
                        size="small"
                    >
                        <MenuItem value={"Select Type"}>Select Type</MenuItem>
                        <MenuItem value={"Bank"}>Bank Type</MenuItem>
                        <MenuItem value={"UPI"}>UPI Type</MenuItem>
                    </TextField>
                   
          <div className="col-span-2 flex gap-2 mt-4">
            <Button
              className="!bg-[#FD565C] !text-white"
              onClick={() => fk.handleReset()}
            >
              Cancel
            </Button>
            <Button
              className="!bg-[#BF6DFE] !text-white"
              onClick={() => fk.handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
  
 
  </Container>


</Layout>
  );
};

export default P2PTransfer;
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