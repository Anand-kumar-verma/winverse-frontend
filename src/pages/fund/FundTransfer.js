import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import Layout from "../../component/layout/Layout";
import {
  ProfileDataFunction,
  getBalanceFunction,
} from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import theme from "../../utils/theme";
import { NavLink } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";

const FundTransfer = () => {
  const [username, setusername] = useState("");
  const [balance, setsetBalance] = useState("");
  const [Loading, setLoading] = useState(false);

  const client = useQueryClient();
  const user_id = localStorage.getItem("user_id");

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
      // if (reqBody.userid === reqBody.transfer_id) {
      //   return toast("Can not send fund to yourself");
      // }
      if (
        !reqBody.amount ||
        !reqBody.transfer_id 
      )
        return toast("Plese enter all data");
      insertFundFn(reqBody);
    },
  });


  async function insertFundFn(reqBody) {
  
    try {
      setLoading(true)
      const res = await axios.post(endpoint?.insert_fund_transfer, reqBody);
      toast(res?.data?.msg);
      fk.handleReset();
      setLoading(false)
      client.refetchQueries("wallet_amount");
      
    } catch (e) {
      console.log(e);
    }
   
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
      P2P User Transfer
      </Typography>
      <Box></Box>
    </Box>
    <div className=" items-center !text-white !font-bold p-5 mt-5 ">
          
          <span>Wallet*</span>
          <TextField
            id="wallet"
            name="wallet"
            value={balance}
        
            className="!w-[100%] !bg-white !my-2 !rounded "
          ></TextField>

          <span>Transfer Id*</span>
          <div>
            <TextField
              id="transfer_id"
              name="transfer_id"
              value={fk.values.transfer_id}
               onChange={fk.handleChange}
               placeholder="Transfer ID"
              // onChange={(e) => {
              //   fk.handleChange(e);
              //   if (e.target.value === profile?.rec?.Login_Id) {
              //    return toast("Can not send fund to yourself ");
              //   } 
              // }}
              className="!w-[100%] !bg-white !my-2 !rounded "
            />
            {/* {username && username !== "false" && (
              <p className="!text-[10px] !text-red-500 pl-2">{username}</p>
            )} */}
          </div>

          <span>Transfer Amount*</span>
          <TextField
            id="amount"
            name="amount"
            placeholder="Enter Amount"
            value={fk.values.amount}
            onChange={fk.handleChange}
            className="!w-[100%] !bg-white !my-2 !rounded "
          />
        
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
            {Loading && (
                <CustomCircularProgress isLoading={Loading} />)}
          </div>
        </div>
  
 
  </Container>


</Layout>
  );
};

export default FundTransfer;
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