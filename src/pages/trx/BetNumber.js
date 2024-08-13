import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Drawer,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import zero from "../../assets/images/n0-30bd92d1.png";
import one from "../../assets/images/n1-dfccbff5.png";
import two from "../../assets/images/n2-c2913607.png";
import three from "../../assets/images/n3-f92c313f.png";
import four from "../../assets/images/n4-cb84933b.png";
import five from "../../assets/images/n5-49d0e9c5.png";
import six from "../../assets/images/n6-a56e0b9a.png";
import seven from "../../assets/images/n7-5961a17f.png";
import eight from "../../assets/images/n8-d4d951a4.png";
import nine from "../../assets/images/n9-a20f6f42 (1).png";
import { endpoint } from "../../services/urls";
import FalseCheck from "../../shared/check/FalseCheck";
import SuccessCheck from "../../shared/check/SuccessCheck";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";

const BetNumber = ({ timing, gid }) => {
  // const next_step = useSelector((state) => state.aviator.next_step);
  const user_id = localStorage.getItem("user_id");
  const [open, setOpen] = useState(false);
  const [selectNumber, setSelectNumber] = useState("");
  const [random, setRandomNumber] = useState(null);
  const [loding, setLoding] = useState(false);
  const client = useQueryClient();
  const wallet_amount_data = useSelector(
    (state) => state.aviator.wallet_real_balance
  );

  const initialValue = {
    balance: "1",
    qnt: "1",
  };
  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    isSuccessPlaceBet: true,
    onSubmit: () => {
      if (
        Number(wallet_amount_data || 0) <
        Number(fk.values.balance || 1) * Number(fk.values.qnt || 1)
      )
        return toast("Your bid amount is more than wallet amount");
      betFunctionStart();
    },
  });

  useEffect(() => {
    if (gid === "1") {
      if (Number(timing) <= 10) {
        setOpen(false);
        fk.handleReset();
      }
    } else if (gid === "2") {
      if (Number(String(timing)?.split("_")?.[0]) === 0) {
        if (Number(String(timing)?.split("_")?.[1]) <= 10) {
          setOpen(false);
          fk.handleReset();
        }
      }
    } else {
      if (Number(String(timing)?.split("_")?.[0]) === 0) {
        if (Number(String(timing)?.split("_")?.[1]) <= 10) {
          setOpen(false);
          fk.handleReset();
        }
      }
    }
  }, [timing]);

  async function betFunctionStart() {
    setLoding(true);
    if (Number(user_id) <= 0) {
      setLoding(false);
      return toast("Please Refresh your page.");
    }
    const reqBody = {
      user_id: String(user_id),
      amount: (
        Number(fk.values.balance || 1) * Number(fk.values.qnt || 1) || 0
      )?.toString(),
      bet_number: `${
        (selectNumber === "green" && 11) ||
        (selectNumber === "voilet" && 12) ||
        (selectNumber === "red" && 13) ||
        (selectNumber === "Big" && 15) || // this is big
        (selectNumber === "Small" && 14) || // this is small
        Number(selectNumber) + 1
      }`,
      type: `${Number(gid)}`,
      round_no: 123456,
      description: `${
        selectNumber === "Small"
          ? "Small"
          : `${
              Number(selectNumber + 1) >= 1 && Number(selectNumber) <= 4
                ? "Small"
                : "Big"
            }`
      }`,
    };

    try {
      const total_bet = localStorage.getItem("total_bet");
      const arrayLength =
        total_bet !== "undefined" && total_bet && JSON.parse(total_bet);
      // if (
      //   arrayLength &&
      //   [11, 12, 13]?.includes(
      //     Number(reqBody.bet_number) <= 10
      //       ? Number(reqBody.bet_number) - 1
      //       : Number(reqBody.bet_number)
      //   ) &&
      //   arrayLength?.filter(
      //     (i) =>
      //       Number(i?.data?.split("_")?.[2]) > 10 &&
      //       Number(i?.data?.split("_")?.[2]) <= 13
      //   )?.length
      // ) {
      //   setLoding(false);
      //   return toast(
      //     <FalseCheck
      //       message={
      //         <span className="!text-sm">
      //           You have already applied bet on color
      //         </span>
      //       }
      //     />
      //   );
      // } else if (
      //   arrayLength &&
      //   [14, 15]?.includes(
      //     Number(reqBody.bet_number) <= 10
      //       ? Number(reqBody.bet_number) - 1
      //       : Number(reqBody.bet_number)
      //   ) &&
      //   arrayLength?.filter(
      //     (i) =>
      //       Number(i?.data?.split("_")?.[2]) >= 14 &&
      //       Number(i?.data?.split("_")?.[2]) <= 15
      //   )?.length
      // ) {
      //   setLoding(false);
      //   return toast(
      //     <FalseCheck
      //       message={
      //         <span className="!text-sm">
      //           You have already applied bet on big/small
      //         </span>
      //       }
      //     />
      //   );
      // } else if (
      //   arrayLength &&
      //   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.includes(
      //     Number(reqBody.bet_number) <= 10
      //       ? Number(reqBody.bet_number) - 1
      //       : Number(reqBody.bet_number)
      //   ) &&
      //   arrayLength?.filter((i) => Number(i?.data?.split("_")?.[2]) <= 9)
      //     ?.length > 2
      // ) {
      //   setLoding(false);
      //   return toast(
      //     <FalseCheck
      //       message={
      //         <span className="!text-sm">You can't apply more than 3 bet.</span>
      //       }
      //     />
      //   );
      // } else {
      const response = await axios.post(
        `${endpoint.trx_bet_placed_node}`,
        reqBody
      );
      if (response?.data?.msg === "Bid placed Successfully") {
        const toastID = toast(
          <SuccessCheck
            message={<span className="!text-sm">{response?.data?.msg}</span>}
          />
        );
        setTimeout(() => {
          toast.dismiss(toastID);
        }, 1000);
        localStorage.setItem(
          "total_bet",
          JSON.stringify(
            total_bet !== "undefined" && total_bet
              ? [
                  ...arrayLength,
                  {
                    data: `${gid}_true_${
                      Number(reqBody?.bet_number) <= 10
                        ? Number(reqBody?.bet_number) - 1
                        : reqBody?.bet_number
                    }_${reqBody?.amount}`,
                  },
                ]
              : [
                  {
                    data: `${gid}_true_${
                      Number(reqBody?.bet_number) <= 10
                        ? Number(reqBody?.bet_number) - 1
                        : reqBody?.bet_number
                    }_${reqBody?.amount}`,
                  },
                ]
          )
        );
        fk.setFieldValue("isSuccessPlaceBet", true);
        localStorage.setItem(
          "betApplied",
          `${gid}_true_${
            Number(reqBody.bet_number) <= 10
              ? Number(reqBody.bet_number) - 1
              : reqBody.bet_number
          }_${reqBody.amount}_${reqBody.round_no}`
        );
        setOpen(false);
      } else {
        setOpen(false);
        setLoding(false);
        // toast(response?.data?.msg);
        // return
        const toastID = toast(
          <FalseCheck
            message={<span className="!text-sm">{response?.data?.msg}</span>}
          />
        );
        setTimeout(() => {
          toast.dismiss(toastID);
        }, 1000);
      }
      setLoding(false);
      // }
    } catch (e) {
      setOpen(false);
      setLoding(false);
      // toast(e?.message);
      <FalseCheck message={<span className="!text-sm">{e?.message}</span>} />;
    }
    // client.refetchQueries("walletamount");
    client.refetchQueries("wallet_amount");
    client.refetchQueries("myAll_trx_history_new");
    // client.refetchQueries("myAll_trx_history");
    fk.setFieldValue("balance", "1");
    setRandomNumber(null);
    fk.setFieldValue("qnt", "1");
    setLoding(false);
  }
  if (loding) return <CustomCircularProgress isLoading={loding} />;

  const generatenumber = () => {
    const randomBitNumber = Math.floor(Math.random() * 9) + 1;
    setLoding(true);
    setTimeout(() => {
      setLoding(false);
      setRandomNumber(randomBitNumber);
      setSelectNumber(`${randomBitNumber}`);
      setOpen(true);
    }, 1000);
  };

  return (
    <Box
      sx={{
        padding: 1,
        background: "#FFFFFF",
        mt: 2,
        borderRadius: "10px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      }}
    >
      <div>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            onClick={() => {
              setOpen(true);
              setSelectNumber("green");
            }}
            className="greenbtn"
          >
            Green
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
              setSelectNumber("voilet");
            }}
            className="violetbtn"
          >
            Violet
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
              setSelectNumber("red");
            }}
            className="redbtn"
          >
            Red
          </Button>
        </Stack>
        <Box
          sx={{
            background: "#EEEEEE",
            padding: "8px 8px 0px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            borderRadius: "10px",
            mt: 2,
          }}
        >
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={zero}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("0");
            // }}
            className="!cursor-pointer"
          ></Box>
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={one}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("1");
            // }}
            className="!cursor-pointer"
          ></Box>
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={two}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("2");
            // }}
            className="!cursor-pointer"
          ></Box>
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={three}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("3");
            // }}
            className="!cursor-pointer"
          ></Box>
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={four}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("4");
            // }}
            className="!cursor-pointer"
          ></Box>
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={five}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("5");
            // }}
            className="!cursor-pointer"
          ></Box>
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={six}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("6");
            // }}
            className="!cursor-pointer"
          ></Box>
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={seven}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("7");
            // }}
            className="!cursor-pointer"
          ></Box>
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={eight}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("8");
            // }}
            className="!cursor-pointer"
          ></Box>
          <Box
            sx={{ width: "17%", mb: 1 }}
            component="img"
            src={nine}
            // onClick={() => {
            //   setOpen(true);
            //   setSelectNumber("9");
            // }}
            className="!cursor-pointer"
          ></Box>
        </Box>
        <Stack
          direction="row"
          my={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            variant="outlined"
            // onClick={generatenumber}
          >
            Random
          </Button>
          {[1, 5, 10, 20, 50, 100]?.map((i) => {
            return (
              <Box
                // onClick={() => fk.setFieldValue("qnt", i)}
                sx={style.bacancebtn3}
                className={`${
                  fk.values.qnt === i ? "!bg-green-600" : "!bg-gray-400"
                }  cursor-pointer`}
              >
                X{i}
              </Box>
            );
          })}
        </Stack>
        <ButtonGroup
          disableElevation
          variant="contained"
          sx={{ width: "100%" }}
        >
          <Button
            sx={style.bigbtn}
            onClick={() => {
              setOpen(true);
              setSelectNumber("Small");
            }}
          >
            Small
          </Button>
          <Button
            sx={style.smlbtn}
            onClick={() => {
              setOpen(true);
              setSelectNumber("Big");
            }}
          >
            Big
          </Button>
        </ButtonGroup>
      </div>

      <Drawer
        // open={Number(timing)>10 &&  open}
        open={open}
        anchor={"bottom"}
        sx={{
          maxWidth: "400px !important",
          width: "100%",
          margin: "auto",
          padding: "10px 0px 0px 0px",
        }}
        // onClickCapture={handleClose}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
              width: "120%",
              height: "110px",
              top: "-16px",
              left: "-11%",
              zIndex: "-1",
            }}
            className={
              selectNumber === "green" ||
              selectNumber === "1" ||
              selectNumber === "3" ||
              selectNumber === "7" ||
              selectNumber === "9"
                ? "!bg-[#40AD72]"
                : selectNumber === "voilet"
                ? "!bg-[#B659FE]"
                : selectNumber === "red" ||
                  selectNumber === "2" ||
                  selectNumber === "4" ||
                  selectNumber === "6" ||
                  selectNumber === "8"
                ? "!bg-[#FD565C]"
                : selectNumber === "Small"
                ? "!bg-[#F48901]"
                : selectNumber === "Big"
                ? "!bg-[#6DA7F4]"
                : selectNumber === "0"
                ? "!bg-[#BF6DFE]"
                : selectNumber === "5" && "!bg-[#BF6DFE]"
            }
          >
            {" "}
          </Box>
          <Box px={1}>
            <Typography
              variant="body1"
              color="initial"
              sx={{ textAlign: "center", color: "white", fontWeight: "700 " }}
            >
              TRX {gid == 3 ? 5 : gid == 2 ? 3 : gid} Min
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                textAlign: "center",
                color: "black",
                fontWeight: "400 ",
                background: "#ffffff",
                mt: 1,
                borderRadius: "5px",
              }}
            >
              Select{" "}
              {random
                ? Number(random) <= 4
                  ? `:  ${selectNumber} Small`
                  : ` : ${selectNumber} Big`
                : isNaN(Number(selectNumber))
                ? selectNumber?.toString()?.toLocaleUpperCase()
                : Number(selectNumber) <= 4
                ? `: ${selectNumber} Small`
                : ` : ${selectNumber} Big`}
            </Typography>
          </Box>
          <Box mt={5} px={2}>
            <Grid container mt={10}>
              <Grid item xs={4}>
                <Typography variant="body1" color="initial">
                  Balance{" "}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  {[1, 10, 100, 1000]?.map((i) => {
                    return (
                      <Box
                        onClick={() => fk.setFieldValue("balance", i)}
                        sx={style.bacancebtn}
                        className={` !cursor-pointer !text-black bg-gray-200 
                          ${
                            (selectNumber === "green" ||
                              selectNumber === "1" ||
                              selectNumber === "3" ||
                              selectNumber === "7" ||
                              selectNumber === "9") &&
                            String(fk?.values?.balance) === String(i)
                              ? "!bg-[#40AD72]"
                              : selectNumber === "voilet" &&
                                String(fk?.values?.balance) === String(i)
                              ? "!bg-[#B659FE]"
                              : (selectNumber === "red" ||
                                  selectNumber === "2" ||
                                  selectNumber === "4" ||
                                  selectNumber === "6" ||
                                  selectNumber === "8") &&
                                String(fk?.values?.balance) === String(i)
                              ? "!bg-[#FD565C]"
                              : selectNumber === "Small" &&
                                String(fk?.values?.balance) === String(i)
                              ? "!bg-[#F48901]"
                              : selectNumber === "Big" &&
                                String(fk?.values?.balance) === String(i)
                              ? "!bg-[#6DA7F4]"
                              : selectNumber === "0" &&
                                String(fk?.values?.balance) === String(i)
                              ? "!bg-[#BF6DFE]"
                              : selectNumber === "5" &&
                                String(fk?.values?.balance) === String(i) &&
                                "!bg-[#BF6DFE]"
                          }
                       `}
                      >
                        {i}
                      </Box>
                    );
                  })}
                </Stack>
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid item xs={4}>
                <Typography variant="body1" color="initial">
                  Quantity{" "}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box
                    className={` !cursor-pointer 
                      ${
                        selectNumber === "green" ||
                        selectNumber === "1" ||
                        selectNumber === "3" ||
                        selectNumber === "7" ||
                        selectNumber === "9"
                          ? "!bg-[#40AD72]"
                          : selectNumber === "voilet"
                          ? "!bg-[#B659FE]"
                          : selectNumber === "red" ||
                            selectNumber === "2" ||
                            selectNumber === "4" ||
                            selectNumber === "6" ||
                            selectNumber === "8"
                          ? "!bg-[#FD565C]"
                          : selectNumber === "Small"
                          ? "!bg-[#F48901]"
                          : selectNumber === "Big"
                          ? "!bg-[#6DA7F4]"
                          : selectNumber === "0"
                          ? "!bg-[#BF6DFE]"
                          : selectNumber === "5" && "!bg-[#BF6DFE]"
                      }
                    `}
                    sx={style.addsumbtn}
                    onClick={() =>
                      fk.setFieldValue(
                        "qnt",
                        Number(fk.values.qnt) - 1 < 1
                          ? 1
                          : Number(fk.values.qnt) - 1
                      )
                    }
                  >
                    -
                  </Box>
                  <TextField
                    id="qnt"
                    name="qnt"
                    value={fk.values.qnt}
                    onChange={fk.handleChange}
                    className="inputamt"
                  />
                  <Box
                    className={` !cursor-pointer
                     ${
                       selectNumber === "green" ||
                       selectNumber === "1" ||
                       selectNumber === "3" ||
                       selectNumber === "7" ||
                       selectNumber === "9"
                         ? "!bg-[#40AD72]"
                         : selectNumber === "voilet"
                         ? "!bg-[#B659FE]"
                         : selectNumber === "red" ||
                           selectNumber === "2" ||
                           selectNumber === "4" ||
                           selectNumber === "6" ||
                           selectNumber === "8"
                         ? "!bg-[#FD565C]"
                         : selectNumber === "Small"
                         ? "!bg-[#F48901]"
                         : selectNumber === "Big"
                         ? "!bg-[#6DA7F4]"
                         : selectNumber === "0"
                         ? "!bg-[#BF6DFE]"
                         : selectNumber === "5" && "!bg-[#BF6DFE]"
                     }
                    `}
                    sx={style.addsumbtn}
                    onClick={() =>
                      fk.setFieldValue("qnt", Number(fk.values.qnt) + 1)
                    }
                  >
                    +
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid item xs={1}></Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"end"}
                >
                  {[1, 5, 10, 20, 50, 100]?.map((i) => {
                    return (
                      <Box
                        onClick={() => fk.setFieldValue("qnt", i)}
                        sx={style.bacancebtn2}
                        className={` !cursor-pointer bg-gray-500
                          ${
                            (selectNumber === "green" ||
                              selectNumber === "1" ||
                              selectNumber === "3" ||
                              selectNumber === "7" ||
                              selectNumber === "9") &&
                            String(fk.values.qnt) === String(i)
                              ? "!bg-[#40AD72]"
                              : selectNumber === "voilet" &&
                                String(fk.values.qnt) === String(i)
                              ? "!bg-[#B659FE]"
                              : (selectNumber === "red" ||
                                  selectNumber === "2" ||
                                  selectNumber === "4" ||
                                  selectNumber === "6" ||
                                  selectNumber === "8") &&
                                String(fk.values.qnt) === String(i)
                              ? "!bg-[#FD565C]"
                              : selectNumber === "Small" &&
                                String(fk.values.qnt) === String(i)
                              ? "!bg-[#F48901]"
                              : selectNumber === "Big" &&
                                String(fk.values.qnt) === String(i)
                              ? "!bg-[#6DA7F4]"
                              : selectNumber === "0" &&
                                String(fk.values.qnt) === String(i)
                              ? "!bg-[#BF6DFE]"
                              : selectNumber === "5" &&
                                String(fk.values.qnt) === String(i) &&
                                "!bg-[#BF6DFE]"
                          }`}
                      >
                        X{i}
                      </Box>
                    );
                  })}
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Grid container mt={2}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center">
                <Checkbox checked />{" "}
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "gray", fontSize: "14px" }}
                >
                  I agree
                </Typography>
                <Typography
                  component="a"
                  sx={{
                    color: `${theme.palette.primary.main} !important`,
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  《Pre-sale rules》
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={style.cancelbtn}
                onClick={() => {
                  setRandomNumber(null);
                  fk.setFieldValue("balance", "1");
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                className={`
                  ${
                    selectNumber === "green" ||
                    selectNumber === "1" ||
                    selectNumber === "3" ||
                    selectNumber === "7" ||
                    selectNumber === "9"
                      ? "!bg-[#40AD72]"
                      : selectNumber === "voilet"
                      ? "!bg-[#B659FE]"
                      : selectNumber === "red" ||
                        selectNumber === "2" ||
                        selectNumber === "4" ||
                        selectNumber === "6" ||
                        selectNumber === "8"
                      ? "!bg-[#FD565C]"
                      : selectNumber === "Small"
                      ? "!bg-[#F48901]"
                      : selectNumber === "Big"
                      ? "!bg-[#6DA7F4]"
                      : selectNumber === "0"
                      ? "!bg-[#BF6DFE]"
                      : selectNumber === "5" && "!bg-[#BF6DFE]"
                  } !cursor-pointer !font-extrabold`}
                variant="contained"
                sx={style.submitbtn}
                onClick={() => {
                  fk.handleSubmit();
                }}
              >
                Total amount ₹{" "}
                {Number(fk.values.balance || 1) * Number(fk.values.qnt || 1)}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Box>
  );
};

export default BetNumber;

const style = {
  bacancebtn: {
    padding: "4px 13px",
    borderRadius: "20px",
    color: "white",
    fontSize: "17px",
    fontWeight: "500",
    marginLeft: "5px",
  },
  bacancebtn2: {
    padding: "4px 13px",
    borderRadius: "1px",
    color: "white",
    fontSize: "17px",
    fontWeight: "500",
    marginLeft: "5px",
  },
  bacancebtn3: {
    backgroundColor: "#40AD72",
    padding: "1px 5px",
    borderRadius: "6px",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    marginLeft: "5px",
    display: "flex",
    alignItems: "center",
    height: "30px",
    // ["@media (max-width:340px)"]: { fontSize: "13px" },
    cursor: "pointer",
  },
  addsumbtn: {
    padding: "4px 13px",
    color: "white",
    fontSize: "17px",
    fontWeight: "500",
    margin: "0px 5px",
  },
  cancelbtn: {
    width: "100%",
    borderRadius: "0px",
    color: "white",
    backgroundColor: "#25253C",
    padding: 1,
  },
  submitbtn: {
    width: "100%",
    borderRadius: "0px",
    color: "white",
    padding: 1,
  },
  bigbtn: {
    width: "50%",
    borderRadius: "20px 0px 0px 20px",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
  },
  smlbtn: {
    width: "50%",
    borderRadius: "0px 20px 20px 0px",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    background: "#6DA7F4",
  },
  linetable: {
    "&>p": {
      fontSize: "12px",
      color: "gray",
      border: "1px solid gray",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      textAlign: "center",
      padding: "2px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    alignItems: "center",
    justifyContent: "space-between",
    "&>p:nth-last-child(1)": {
      width: "20px !important",
      height: "20px !important",
    },
  },
};
