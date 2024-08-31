import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { NavLink } from "react-router-dom";
import Layout from "../../component/layout/Layout";
import {
    getBalanceFunction
} from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import { deCryptData } from "../../shared/secret";

const P2Pmoney = () => {

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
            toast(res?.data?.message);
            fk.handleReset();
            setLoading(false)
            client.refetchQueries("wallet_amount");

        } catch (e) {
            console.log(e);
        }
    }
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
                     <Box component={NavLink} to="/fund-main"><ArrowBackIos className="!text-white" /></Box>
                    <Typography variant="" color="initial" className="!text-white !font-bold !py-2">
                        Add Money To P2P
                    </Typography>
                    <Box></Box>
                </Box>
                <div className=" items-center !text-white !font-bold p-5 mt-5 ">

                    <span>Wallet*</span>
                    <TextField
                        id="wallet"
                        name="wallet"
                        value={balance}
                        className="!w-[100%] !bg-white !my-2 !rounded !mb-5"
                    ></TextField>
                    <span>Transfer Amount*</span>
                    <TextField
                        id="amount"
                        name="amount"
                        placeholder="Enter Amount"
                        value={fk.values.amount}
                        onChange={fk.handleChange}
                        className="!w-[100%] !bg-white !my-2 !rounded " />

                    <div className="col-span-2 flex gap-2 mt-4">
                        <Button
                            className="!bg-[#FD565C] !text-white"
                            onClick={() => fk.handleReset()} >
                            Cancel
                        </Button>
                        <Button
                            className="!bg-[#BF6DFE] !text-white"
                            onClick={() => fk.handleSubmit()}  >
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