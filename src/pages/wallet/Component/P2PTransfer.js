import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import copy from "clipboard-copy";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";
import Layout from "../../../component/layout/Layout";
import {
  BankListDetails,
  BankUPIDetails,
  getBalanceFunction,
} from "../../../services/apiCallings";
import { endpoint } from "../../../services/urls";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";
import { topup } from "../../../services/validation";

const P2PTransfer = () => {
  const [receipt, setReceipt] = React.useState();
  const user_id = localStorage.getItem("user_id");
  const [Loading, setLoading] = useState(false);
  const [balance, setBalance] = useState();
  
  const client = useQueryClient()
  
  const initialValue = {
    deposit_type: "",
    txtfile: "",
    transaction_id: "",
    amount: "",
    txt_req_amt: "",
    transfer_id: "",
    txtupi: "",
    txtbank: "",
    p2pamount:""
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema:topup,
    enableReinitialize: true,
    onSubmit: () => {
    
      const reqBody = {
        userid: user_id,
        deposit_type: fk.values.deposit_type === "UPI" ? "1" : "2",
        txtfile: receipt,
        transaction_id: fk.values.transaction_id,
        amount: fk.values.amount,
        txt_req_amt: fk.values.txt_req_amt,
        transfer_id: fk.values.transfer_id,
        txtupi: fk.values.txtupi,
        txtbank: fk.values.txtbank,
        p2pamount:fk.values.p2pamount
      };
      
      // if (
      //   !reqBody.deposit_type ||
      //   !reqBody.txtfile ||
      //   !reqBody.amount ||
      //   !reqBody.txtbank ||
      //   !reqBody.transaction_id ||
      //   !reqBody.transfer_id ||
      //   !reqBody.txt_req_amt ||
      //   !reqBody.txtupi
      // )
      // return toast("Plese enter all data");
      P2PFundFn(reqBody);
    },
  });
  async function P2PFundFn(reqBody) {
    try {
      setLoading(true)
      const res = await axios.post(endpoint?.p2p_request, reqBody);
      toast(res?.data?.message);
      setLoading(false)
      fk.handleReset();
      client.refetchQueries("wallet_amount_amount");
      // client.refetchQueries("fund_recive_details");
    } catch (e) {
      console.log(e);
    }
  }

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
    (item) => item?.m37_id === fk?.values?.txtupi
  );



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
  const { data: wallet_amount } = useQuery(
    ["wallet_amount_amount"],
    () => getBalanceFunction(setBalance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const wallet_amount_data = wallet_amount?.data?.earning || 0;

  // useEffect(() => {
  //   if (wallet_amount_data?.p2pwallet && fk.values.amount) {
  //     const p2pAmount = Math.floor(fk.values.amount * 0.6);
  //     const reqAmount = Math.floor(fk.values.amount * 0.4);
  //     fk.setFieldValue("p2pamount", p2pAmount);
  //     fk.setFieldValue("txt_req_amt", reqAmount);
  //   }
  // }, [wallet_amount_data?.p2pwallet, fk.values.amount]);

  useEffect(() => {
    if (wallet_amount_data?.p2pwallet && fk.values?.amount) {
      const p2pwalletAmount = wallet_amount_data?.p2pwallet;
      const topUpAmount = fk?.values?.amount;
      
      if (p2pwalletAmount < topUpAmount) {
        const p2pAmount = p2pwalletAmount; 
        const reqAmount = Math?.floor(topUpAmount - p2pAmount); 
        fk.setFieldValue("p2pamount", p2pAmount);
        fk.setFieldValue("txt_req_amt", reqAmount);
      } else {
    //  case1
        const p2pAmount = Math?.floor(topUpAmount * 0.6); 
        const reqAmount = Math?.floor(topUpAmount * 0.4); 
        fk.setFieldValue("p2pamount", p2pAmount);
        fk.setFieldValue("txt_req_amt", reqAmount);
      }
    }
  }, [wallet_amount_data?.p2pwallet, fk.values?.amount])

 
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
            P2P TopUp
          </Typography>
          <Box></Box>
        </Box>
        <div className=" items-center !text-white !font-bold p-5 mt-2 ">
          <div className="!text-white !text-sm !mt-5">Transfer Id*</div>
          <TextField
            type="text"
            id="transfer_id"
            name="transfer_id"
            value={fk.values.transfer_id}
            onChange={fk.handleChange}
            placeholder="Transfer"
            className="!w-[100%] !bg-white "
          />
          <div className="mt-5">P2P Wallet Available Balance*</div>
          <TextField
           
            value={wallet_amount_data?.p2pwallet}
          
            className="!w-[100%] !bg-white !my-2 !rounded "
          ></TextField>
          <div className="mt-5">TopUp Amount*</div>
          <TextField
            id="amount"
            name="amount"
            placeholder="Enter Amount"
            value={fk.values.amount}
            onChange={fk.handleChange}
            className="!w-[100%] !bg-white !my-2 !rounded "
          />
             {fk.touched.amount && fk.errors.amount && (
                        <div className="error">{fk.errors.amount}</div>
                    )}

         <div className="mt-5">P2P Amount*</div>
          <TextField
            id="p2pamount"
            name="p2pamount"
            placeholder="Enter Amount"
            value={fk.values.p2pamount}
            onChange={fk.handleChange}
            className="!w-[100%] !bg-white !my-2 !rounded "
          />

          <div className="mt-5">Request Amount*</div>
          <TextField
            id="txt_req_amt"
            name="txt_req_amt"
            placeholder="Enter password"
            value={fk.values.txt_req_amt}
            onChange={fk.handleChange}
            className="!w-[100%] !bg-white !my-2 !rounded "
          />
          <div className="!text-white !text-sm !mt-5">Select Payment *</div>
          <TextField
            id="deposit_type"
            name="deposit_type"
            value={fk.values.deposit_type}
            onChange={fk.handleChange}
            className="!w-[100%] !bg-white "
            select
            size="small"
          >
            <MenuItem value={"Select Method"}>Select Method</MenuItem>
            <MenuItem value={"Bank"}>Bank</MenuItem>
            <MenuItem value={"UPI"}>UPI</MenuItem>
          </TextField>
          {fk.values.deposit_type === "Bank" && (
            <>
              <div className="!text-white !text-sm">Select Bank *</div>
              <TextField
                id="txtbank"
                name="txtbank"
                value={fk.values.txtbank}
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
              <div className="!text-white !text-sm">Select UPI *</div>
              <TextField
                id="txtupi"
                name="txtupi"
                value={fk.values.txtupi}
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
                <div className="col-div-2 !h-full !w-full flex items-center mt-10 flex-col">
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

          <div className="!text-white !text-sm !mt-5">Transaction Id*</div>
          <TextField
            type="text"
            id="transaction_id"
            name="transaction_id"
            value={fk.values.transaction_id}
            onChange={fk.handleChange}
            placeholder="Transaction"
            className="!w-[100%] !bg-white "
          />
          <div className="!text-white !text-sm !mt-5 !mr-5">Receipt*</div>
          <input
            type="file"
            id="txtfile"
            name="txtfile"
            className="!text-sm "
            onChange={handleFileChange}
            required
          />
            <div className="col-div-2 flex justify-end gap-2 my-8">
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
            {Loading && (
              <CustomCircularProgress isLoading={Loading} />)}
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