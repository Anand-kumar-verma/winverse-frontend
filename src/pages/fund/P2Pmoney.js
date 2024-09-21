import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";
import Layout from "../../component/layout/Layout";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import moment from "moment";
import {
    getBalanceFunction,
    P2pHistoryFunction
} from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import { deCryptData } from "../../shared/secret";

const P2Pmoney = () => {
    const [isAllValue, setIsAllValue] = useState(false);

    const { isLoading, data } = useQuery(
      ["p2p_history"],
      () => P2pHistoryFunction(),
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


    const [balance, setsetBalance] = useState("");
    const [Loading, setLoading] = useState(false);
    const client = useQueryClient();
    const user_id = deCryptData(localStorage.getItem("user_id"));
    const initialValue = {
        amount: "",
    };

    const fk = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        onSubmit: () => {
            const reqBody = {
                userid: user_id,
                amount: fk.values.amount,
            };
            if (!reqBody.amount)
                return toast("Plese enter all data");
            insertFundFn(reqBody);
        },
    });

    async function insertFundFn(reqBody) {
        setLoading(true)
        try {
            const res = await axios.post(endpoint?.p2padd_money, reqBody);
            toast(res?.data?.msg);
            fk.handleReset();
            setLoading(false)
            client.refetchQueries("wallet_amount_amount");

        } catch (e) {
            console.log(e);
        }
    }
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
                        Add Money To P2P
                    </Typography>
                    <Box></Box>
                </Box>
                <div className="text-white flex justify-between px-5 mt-10">
                    <div className="font-bold">Main Wallet :</div>
                    <div className="!font-bold">{wallet_amount_data?.wallet}</div>
                </div>

                <div className="shadow-xl bg-white rounded-xl m-4 mt-5 items-center  !font-bold p-5 ">


                    <span>Transfer Amount*</span>
                    <TextField
                        id="amount"
                        name="amount"
                        placeholder="Enter Transfer Amount"
                        value={fk.values.amount}
                        onChange={fk.handleChange}
                        className="!w-[100%] !bg-white !my-2 !rounded " />

                    <div className="col-span-2 flex gap-2 mt-4">
                        <Button
                           className="!bg-[#da1c22] !text-white"
                            onClick={() => fk.handleReset()} >
                            Cancel
                        </Button>
                        <Button
                           className="!bg-[#0D0335] !text-white"
                            onClick={() => fk.handleSubmit()}  >
                            Submit
                        </Button>
                        {Loading && (
                            <CustomCircularProgress isLoading={Loading} />)}
                    </div>
                </div>
                <Box >
        <Stack
        className="!mb-10"
          direction="row"
          sx={{ alignItems: "end", justifyContent: "space-between", position: "relative" }}
        >
        
          <Box sx={{ position: "absolute", left: "30%", top: "10%" }}>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "16px", fontWeight: "600" }}
            >
              P2P Add Money History
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
                {i?.m_ledger_type}
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
              Balance
            </Typography>
            <Typography variant="body1">₹ {i?.m_cramount}</Typography>
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

export default P2Pmoney;
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