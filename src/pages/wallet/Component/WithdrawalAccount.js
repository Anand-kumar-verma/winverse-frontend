import { History } from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
    Box,
    Button,
    Container,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import atm from "../../../assets/images/atm.png";
import atmchip from "../../../assets/images/atmchip.png";
import wallet from "../../../assets/images/atmw.png";
import backbtn from "../../../assets/images/backBtn.png";
import bankicon from "../../../assets/images/bankicon.png";
import cip from "../../../assets/images/cip.png";
import refresh from "../../../assets/images/refwhite.png";
import upi from "../../../assets/images/upi (2).png";
import withdrawol_voice from "../../../assets/images/withdrawol_voice.mp3";
import {
    BankDetailsFUnction,
    getBalanceFunction,
    getBetFunction,
    UPIDetailsFUnction
} from "../../../services/apiCallings";
import { endpoint } from "../../../services/urls";
import { withdraw_amount_validation_schema } from "../../../services/validation";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";
import { deCryptData } from "../../../shared/secret";

function WithdrawalAccount() {
    const client = useQueryClient();
    const user_id = deCryptData(localStorage.getItem("user_id"));
    const audioRefMusic = React.useRef(null);
    const [balance, setBalance] = useState("");
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(false);

    const initialValue = {
        amount: "",
        type: "Bank",
    };

    const fk = useFormik({
        initialValues: initialValue,
        validationSchema: withdraw_amount_validation_schema,
        enableReinitialize: true,
        onSubmit: () => {
            
            const reqBody = {
                userid: user_id,
                amount: fk.values.amount,
                type: fk.values.type === "UPI" ? "1" : "2",
            };
            // console.log(reqBody);
            withdraolFunction(reqBody);
        },
    });

    async function withdraolFunction(reqBody) {
        setLoading(true);
        try {
            const res = await axios.post(endpoint?.wallet_withdrawl, reqBody);
            toast(res?.data?.message);
            setLoading(false);
            if ("Withdrawal Request Placed Successfully" === res?.data?.message)
                fk.handleReset();
            client.refetchQueries("wallet_amount");
            client.refetchQueries("withdrawl_history");
            client.refetchQueries("wallet_amount_amount");
            client.refetchQueries("profile");
            // navigate("/account");
            console.log(res);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const goBack = () => {
        navigate(-1);
    };

    const { data: upi_detail } = useQuery(
        ["upi_details"],
        () => UPIDetailsFUnction(),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false
        }
    );

    const upidata = React.useMemo(
        () => upi_detail?.data?.earning?.bank_details,
    );

    const { data: wallet_amount } = useQuery(
        ["wallet_amount"],
        () => getBalanceFunction(setBalance),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false
        }
    );
    const wallet_amount_data = wallet_amount?.data?.earning || 0;



    const { data: game_history } = useQuery(
        ["bank_details"],
        () => BankDetailsFUnction(),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false
        }
    );
    const bank_data = game_history?.data?.earning?.bank_details

    const game_history_data = React.useMemo(
        () => game_history?.data?.earning?.bank_details?.[0],
        [game_history?.data?.earning?.bank_details]
    );


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
            // Handle any errors during play
            console.error("Error during play:", error);
        }
    };

    const audio = React.useMemo(() => {
        return (
            <audio ref={audioRefMusic} hidden>
                <source src={`${withdrawol_voice}`} type="audio/mp3" />
            </audio>
        );
    }, []);



    return (
        <Container sx={{ background: "#0D0335" }}>
            {audio}

            <Box
                sx={{
                    background:
                        "#63BA0E",
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
                            Withdrawal
                        </Typography>
                    </Box>
                    <NavLink to="/withdrawlhistory">
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "11px", color: "white" }}
                        >
                            <History className="!text-white" />
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

            <Box sx={{ mt: 2, px: 2 }} >
                <Stack direction="row">
                    <Stack
                        sx={{
                            background:
                                theme.palette.secondary.light,
                            padding: 2,
                            borderRadius: 2,
                            mr: 2,
                            width: "120px",
                            cursor: "pointer",
                            backgroundColor: fk.values.type === "Bank" ? theme.palette.primary.light : theme.palette.secondary.light
                        }}
                     
                        onClick={() => fk.setFieldValue("type", "Bank")} >
                        <Box
                            component="img"
                            src={atmchip}
                            width={40}
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
                            BANK CARD
                        </Typography>
                    </Stack>
                    <Stack
                       sx={{
                        background:
                            theme.palette.secondary.light,
                        padding: 2,
                        borderRadius: 2,
                        mr: 2,
                        width: "120px",
                        cursor: "pointer",
                        backgroundColor: fk.values.type === "UPI" ? theme.palette.primary.light : theme.palette.secondary.light
                    }}
                        onClick={() => fk.setFieldValue("type", "UPI")} >
                        <Box
                            component="img"
                            src={upi}
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
                            UPI
                        </Typography>
                    </Stack>
                </Stack>
            </Box>

            <Box
                sx={{
                    width: "92%",
                    margin: "auto",
                    my: 2,
                    background: theme.palette.primary.light,
                    padding: "10px 0px 10px 10px",
                    borderRadius: '10px'
                }}
            >
                <Stack direction="row" component={NavLink} to="/banks-details">
                    <Box sx={{ width: "35%" }}>
                        <Box
                            component="img"
                            src={bankicon}
                            width={30}
                            sx={{ margin: "auto" }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "15px", fontWeight: "500", mt: 1, color: 'white' }}
                        >
                            {game_history_data?.Associate_Name?.substring(0, 8) + "****"}
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "60%", borderLeft: "1px solid gray", pl: "5%" }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "13px", fontWeight: "600", color: 'white' }}
                        >
                            {game_history_data?.AcNo?.substring(0, 5) + "****"}
                        </Typography>
                        <KeyboardArrowRightIcon sx={{ color: 'white' }} />
                    </Stack>
                </Stack>
            </Box>

            <Box
                sx={{
                    width: "92%",
                    margin: "auto",
                    my: 2,
                    background: theme.palette.primary.dark,
                    padding: "10px",
                    borderRadius: '10px'
                }}
            >
                <div className="grid grid-cols-2 gap-1 items-center  p-5 !text-white">
                    <span className="!text-white !text-sm ">Amount*</span>
                    <TextField
                        id="amount"
                        name="amount"
                        value={fk.values.amount}
                        onChange={fk.handleChange}
                        placeholder="Amount"
                        className="!w-[100%] !bg-white !mt-5 !rounded"
                    />
                    {fk.touched.amount && fk.errors.amount && (
                        <div className="error">{fk.errors.amount}</div>
                    )}

                    {/* <span className="!text-white !text-sm">Withdrawal Type *</span>
                    <TextField
                        id="type"
                        name="type"
                        value={fk.values.type}
                        onChange={fk.handleChange}
                        className="!w-[100%] !bg-white !mt-5"
                        select
                        size="small"
                    >
                        <MenuItem value={"Bank"}>Bank Type</MenuItem>
                        <MenuItem value={"UPI"}>UPI Type</MenuItem>
                    </TextField>
                    {fk.touched.type && fk.errors.type && (
                        <div className="error">{fk.errors.type}</div>
                    )} */}


                    {fk.values.type === "Bank" && (
                        <>
                            {bank_data?.map((item) => {
                                return <>
                                    <span className="!text-white !text-sm "> Bank Name*</span>
                                    <p>{item?.Bankname}</p>
                                    <span className="!text-white !text-sm "> Account Holder Name*</span>
                                    <p>{item?.Associate_Name}</p>
                                    <span className="!text-white !text-sm "> Account Number*</span>
                                    <p>{item?.AcNo}</p>
                                    <span className="!text-white !text-sm "> IFSC Code *</span>
                                    <p>{item?.ifsc_code || 0}</p>
                                </>
                            })}
                        </>
                    )}
                    {fk.values.type === "UPI" && (
                        <>
                            {upidata?.map((item) => {
                                return <>
                                    <span className="!text-white !text-sm ">UPI ID*</span>
                                    <p>{item?.Branch}</p>
                                    <span className="!text-white !text-sm ">UPI Number*</span>
                                    <p>{item?.Upi_number}</p>
                                    <span className="!text-white !text-sm ">UPI Type*</span>
                                    <p>{item?.Ifsc}</p>
                                </>
                            })}
                        </>
                    )}
                </div>
                <Button
                    sx={style.wdbtn}
                    className={`${fk.values.amount || fk.values.t_password
                        ? "!bg-[#63BA0E]"
                        : "!bg-[#0D0335]"
                        }`}
                    onClick={fk.handleSubmit}
                >
                    Withdrawal
                </Button>
                {Loading && (
                    <CustomCircularProgress isLoading={Loading} />)}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                >
                    <Stack direction="row">
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            Withdrawable balance{" "}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "12px",
                                color: theme.palette.secondary.main,
                                ml: 1,
                            }}
                        >
                            {/* ₹{wallet_amount_data?. || 0} */}
                        </Typography>
                    </Stack>

                    <Button
                        variant="Outlined"
                        color="primary"
                        sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                            padding: 0,
                            fontSize: "12px",
                            color: 'white',
                            borderRadius: "8px",
                        }}
                    >
                        All
                    </Button>
                </Stack>
             

                <Box mt={3}>
                    <Stack direction="row" alignItems="center" mt={1}>
                        <Box
                            sx={{
                                width: "5px",
                                height: "5px",
                                background: theme.palette.primary.main,
                                transform: "rotate(45deg)",
                                mr: 1,
                            }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            You have to withdrawal upto {" "}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "12px",
                                color: theme.palette.secondary.main,
                                mx: 0.5,
                            }}
                        >
                            {" "}
                            ₹   {((wallet_amount_data?.wallet)* 0.10 )?.toFixed(0,2)|| 0}
                        </Typography>
                     
                    </Stack>


                    <Stack direction="row" alignItems="center" mt={1}>
                        <Box
                            sx={{
                                width: "5px",
                                height: "5px",
                                background: theme.palette.primary.main,
                                transform: "rotate(45deg)",
                                mr: 1,
                            }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            Withdraw time{" "}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "12px",
                                color: theme.palette.secondary.main,
                                mx: 0.5,
                            }}
                        >
                            00:00-23:50{" "}
                        </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" mt={1}>
                        <Box
                            sx={{
                                width: "5px",
                                height: "5px",
                                background: theme.palette.primary.main,
                                transform: "rotate(45deg)",
                                mr: 1,
                            }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            Please confirm your beneficial account information before
                            withdrawing. If your information is incorrect, our company will
                            not be liable for the amount of loss{" "}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" mt={1}>
                        <Box
                            sx={{
                                width: "5px",
                                height: "5px",
                                background: theme.palette.primary.main,
                                transform: "rotate(45deg)",
                                mr: 1,
                            }}
                        ></Box>
                        <Typography
                            variant="body1"
                            sx={{ fontSize: "12px", color: 'white' }}
                        >
                            If your beneficial information is incorrect, please contact
                            customer service
                        </Typography>
                    </Stack>
                </Box>
            </Box>


        </Container >
    );
}
export default WithdrawalAccount;

const style = {
    header: {
        padding: "15px 8px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& > p": {
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
            color: "#888",
        },
        "& > a > svg": { color: "#888", fontSize: "35px" },
    },
    withdrawalbtn: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "20px",
        textTransform: "capitalize",
        fontSize: "14px",
        fontWeight: "600",
        padding: "5px 25px",
    },
    depositebtn: {
        background: theme.palette.primary.main,
        borderRadius: "20px",
        textTransform: "capitalize",
        fontSize: "14px",
        fontWeight: "600",
        padding: "5px 25px",
        color: "white",
    },
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
        // background:
        //   "linear-gradient(180deg, #cfd1de 0%, #c7c9d9 100%), linear-gradient(180deg, #cfd1de 0%, #c7c9d9 100%)",
        backgroundSize: "100% 100%, 100% 100%",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
        textShadow: "0 0.02667rem 0.01333rem #afb0be",
        padding: "20px",
        mt: 3,
    },
};
