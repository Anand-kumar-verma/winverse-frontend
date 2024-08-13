import { Button, Container, TextField } from "@mui/material";
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

const FundTransfer = () => {
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
    <Layout>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <div className="grid grid-cols-2 gap-1 items-center w-[400px] p-5">
          <span className="col-span-2 justify-end">
            <div className="flex justify-between">
              <span className="font-bold">Fund Transfer</span>
            </div>
          </span>
          <span>Wallet*</span>
          <TextField
            id="wallet"
            name="wallet"
            value={fk.values.wallet}
            placeholder="Select Bank"
            className="!w-[100%]"
          ></TextField>

          <span>Transfer Id*</span>
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
              className="!w-[100%]"
            />
            {username && username !== "false" && (
              <p className="!text-[10px] !text-red-500 pl-2">{username}</p>
            )}
          </div>

          <span>Tranfer Amount*</span>
          <TextField
            id="transfer_amount"
            name="transfer_amount"
            placeholder="Enter Amount"
            value={fk.values.transfer_amount}
            onChange={fk.handleChange}
            className="!w-[100%]"
          />
          <span>Transaction Password*</span>
          <TextField
            type="password"
            id="transaction_password"
            name="transaction_password"
            placeholder="Enter password"
            value={fk.values.transaction_password}
            onChange={fk.handleChange}
            className="!w-[100%]"
          />
          <span>Fees*</span>
          <TextField
            id="transaction_password"
            name="transaction_password"
            value={fees}
            // onChange={fk.handleChange}
            className="!w-[100%]"
          />
          <span>Payable Amount*</span>
          <TextField
            id="payable_amount"
            name="payable_amount"
            value={payableAmount}
            // onChange={fk.handleChange}
            className="!w-[100%]"
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
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default FundTransfer;
