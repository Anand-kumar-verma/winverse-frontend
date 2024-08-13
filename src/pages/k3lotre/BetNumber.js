import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
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
import zero from "../../assets/images/n0-30bd92d1.png";
import three from "../../assets/images/a3.png";
import four from "../../assets/images/a4.png";
import five from "../../assets/images/a5.png";
import six from "../../assets/images/a6.png";
import seven from "../../assets/images/a7.png";
import eight from "../../assets/images/a8.png";
import nine from "../../assets/images/a9.png";
import ten from "../../assets/images/a10.png";
import eleven from "../../assets/images/a11.png";
import twelve from "../../assets/images/a12.png";
import thirteen from "../../assets/images/a13.png";
import fourteen from "../../assets/images/a14.png";
import fifteen from "../../assets/images/a15.png";
import sixteen from "../../assets/images/a16.png";
import seventeen from "../../assets/images/a17.png";
import eighteen from "../../assets/images/a18.png";
import { getBalanceFunction } from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import SuccessCheck from "../../shared/check/SuccessCheck";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import { NavLink } from "react-router-dom";
import Howtoplay from "./component/Howtoplay";
// import Howtoplay from "../5DLotre/component/Howtoplay";
const BetNumber = ({ timing, gid }) => {
  const user_id = localStorage.getItem("user_id");
  const [open, setOpen] = useState(false);
  const [selectNumber, setSelectNumber] = useState("");
  const [getBalance, setBalance] = useState(0);
  const [loding, setLoding] = useState(false);
  const [opend, setOpend] = useState(false);
  const client = useQueryClient();
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const handleNumberClick = (number) => {
    setSelectedNumbers((prevSelectedNumbers) => {
      if (prevSelectedNumbers.includes(number)) {
        return prevSelectedNumbers.filter((n) => n !== number);
      } else {
        return [...prevSelectedNumbers, number];
      }
    });
    handleClickOpen();
  };

  useEffect(() => {
    if (selectedNumbers.length === 0) {
      setOpen(false);
    }
  }, [selectedNumbers]);


  useEffect(() => {
    if (gid === "1") {
      if (Number(timing) <= 5) {
        setOpen(false)
        fk.handleReset()
      };
    } else if (gid === "2") {
      if (Number(String(timing)?.split("_")?.[0]) === 0) {
        if (Number(String(timing)?.split("_")?.[1]) <= 5) {
          setOpen(false)
          fk.handleReset()
        };
      }
    } else {
      if (Number(String(timing)?.split("_")?.[0]) === 0) {
        if (Number(String(timing)?.split("_")?.[1]) <= 5) {
          setOpen(false)
          fk.handleReset()
        };
      }
    }
  }, [timing]);

  const initialValue = {
    balance: "1",
    qnt: "1",
  };

  useEffect(() => {
    getBalanceFunction(setBalance);
  }, []);

  const fk = useFormik({
    initialValues: initialValue,
    isSuccessPlaceBet: true,
    onSubmit: () => {
      if (
        Number(getBalance || 0) <
        Number(fk.values.balance || 1) * Number(fk.values.qnt || 1)
      )
        return toast("Your bid amount is more than wallet amount");
      betFunctionStart();
    },
  });

  async function betFunctionStart() {
    setLoding(true);
    const reqBody = {
      userid: user_id?.toString(),
      amount: (
        Number(fk.values.balance || 1) * Number(fk.values.qnt || 1) || 0
      )?.toString(),
      number: `${(selectNumber === "green" && 11) ||
        (selectNumber === "voilet" && 12) ||
        (selectNumber === "red" && 13) ||
        (selectNumber === "two" && 15) || // this is big
        (selectNumber === "one" && 14) || // this is small
        (selectNumber === "even" && 16) || // this is small
        (selectNumber === "odd" && 17) || // this is small
        Number(selectNumber) + 1
        }`,
      gameid: `${Number(gid)}`,
    };

    try {
      const response = await axios.post(`${endpoint.trx_bet_placed}`, reqBody);
      if (response?.data?.error === "200") {
        toast(
          <SuccessCheck
            message={
              <span className="!text-sm">Bid Placed Successfully !</span>
            }
          />
        );
        fk.setFieldValue("isSuccessPlaceBet", true);
        setOpen(false);
        localStorage.setItem("betApplied", `${gid}_true`);
        console.log(response, "This is response");
      } else {
        toast(response?.data?.msg);
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    // client.refetchQueries("walletamount");
    client.refetchQueries("wallet_amount");
    client.refetchQueries("myAll_trx_history");
    setLoding(false);
  }
  if (loding) return <CustomCircularProgress isLoading={loding} />;

  const handleClickOpend = () => {
    setOpend(true);
  };

  const handleClosed = () => {
    setOpend(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedNumbers([]);
    setOpen(false);

  };
  return (
    <Box
      sx={{
        padding: 1,
        background: "#FFFFFF",
        mt: 2,
        borderRadius: "10px",

      }}
    >

      <div>
        <Box
          sx={{
            background: "#",
            padding: "0px 0px 0px 0px",
            alignItems: "center",
            borderRadius: "10px",
            mt: 1,
          }}
          className="grid grid-cols-4 gap-4 justify-center !ml-4 !cursor-pointer"
        >
          <div className="flex flex-col justify-center  ">
            <Box
              component="img"
              src={three}
              onClick={() => handleNumberClick("3")}
              className="!items-center !w-14 "
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={four}
              onClick={() => handleNumberClick("4")}
              className="!items-center !w-12"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={five}
              onClick={() => handleNumberClick("5")}
              className="!items-center !w-14"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center">
            <Box
              component="img"
              src={six}
              onClick={() => handleNumberClick("6")}
              className="!items-center !w-14"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={seven}
              onClick={() => handleNumberClick("7")}
              className="!items-center !w-12 ml-1"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={eight}
              onClick={() => handleNumberClick("8")}
              className="!items-center !w-16"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={nine}
              onClick={() => handleNumberClick("9")}
              className="!items-center !w-14"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={ten}
              onClick={() => handleNumberClick("10")}
              className="!items-center !w-16"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={eleven}
              onClick={() => handleNumberClick("11")}
              className="!items-center !w-16"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={twelve}
              onClick={() => handleNumberClick("12")}
              className="!items-center !w-14"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={thirteen}
              onClick={() => handleNumberClick("13")}
              className="!items-center !w-14"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={fourteen}
              onClick={() => handleNumberClick("14")}
              className="!items-center !w-14"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={fifteen}
              onClick={() => handleNumberClick("15")}
              className="!items-center !w-16"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={sixteen}
              onClick={() => handleNumberClick("16")}
              className="!items-center !w-14"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={seventeen}
              onClick={() => handleNumberClick("17")}
              className="!items-center !w-14"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
          <div className="flex flex-col justify-center ">
            <Box
              component="img"
              src={eighteen}
              onClick={() => handleNumberClick("18")}
              className="!items-center !w-14"
            >
            </Box>
            <Box className="!text-xs !text-gray-500 font-bold mx-3 ">65.2X</Box>
          </div>
        </Box>
        <ButtonGroup
          disableElevation
          variant="contained"
          sx={{ width: "100%" }}
          className=" !my-4"
        >
          <Button
            className="!bg-[#63BA0E] !text-white !rounded !h-10  !text-sm !mx-1"
            onClick={() => handleNumberClick("Big")}
          >
            Big 1.92x
          </Button>
          <Button
            className="!bg-[#6da7f4] !text-white !rounded !h-10 !text-sm !mx-1"
            onClick={() => handleNumberClick("Small")}
          >
            Small 1.92X
          </Button>
          <Button
            className="!bg-[#fa574a] !text-white !rounded !h-10 !text-sm !mx-1"
            onClick={() => handleNumberClick("Odd")}
          >
            Odd 1.92X
          </Button>
          <Button
            className="!bg-[#40ad72] !text-white !rounded !text-sm !h-10 !mx-1"
            onClick={() => handleNumberClick("Even")}
          >
            Even 1.92X
          </Button>
        </ButtonGroup>

      </div>

      {open && (
        <div className={`drawer`} >
          <Box>
            <Box

            >
              {" "}
            </Box>
            <Box px={1}
              className="!flex justify-start gap-2">
              <Typography className="!mt-4">Total</Typography>
              {selectedNumbers.map((number) => (
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "400 ",
                    background: "#ffffff",
                    mt: 2,

                  }}
                  className={` !cursor-pointer !px-2 !w-fit !rounded-full
                 ${number === "green" ||
                      number === "4" ||
                      number === "8" ||
                      number === "12" ||
                      number === "6" ||
                      number === "10" ||
                      number === "14" ||
                      number === "18" ||
                      number === "16"
                      ? "!bg-[#40AD72]"
                      : number === "voilet"
                        ? "!bg-[#B659FE]"
                        : number === "red" ||
                          number === "3" ||
                          number === "7" ||
                          number === "11" ||
                          number === "15" ||
                          number === "5" ||
                          number === "9" ||
                          number === "13" ||
                          number === "17" ||
                          number === "8"
                          ? "!bg-[#FD565C]"
                          : number === "Big"
                            ? "!bg-[#63BA0E]"
                            : number === "Small"
                              ? "!bg-[#6da7f4]"
                              : number === "Odd"
                                ? "!bg-[#fa574a]"
                                : number === "Even"
                                  ? "!bg-[#40ad72]"
                                  : number === "0"
                                    ? "!bg-[#BF6DFE]"
                                    : number === "5" && "!bg-[#BF6DFE]"
                    }
    `}
                >
                  {isNaN(Number(number)) ? number?.toString()?.toLocaleUpperCase() : number}
                </Typography>
              ))}
            </Box>
            <Box mt={3} px={2}>
              <Grid container >
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
                          className={`${fk.values.balance === i ? "!bg-[#63BA0E]" : "!bg-gray-400"}  cursor-pointer`}

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
                      sx={style.addsumbtn}
                      onClick={() =>
                        fk.setFieldValue(
                          "qnt",
                          Number(fk.values.qnt) - 1 < 1
                            ? 1
                            : Number(fk.values.qnt) - 1
                        )
                      }
                      className={`!bg-[#63BA0E]  cursor-pointer `}

                    >
                      -
                    </Box>
                    <TextField value={fk.values.qnt} className="inputamt" />
                    <Box
                      sx={style.addsumbtn}
                      onClick={() =>
                        fk.setFieldValue("qnt", Number(fk.values.qnt) + 1)
                      }
                      className={`!bg-[#63BA0E]  cursor-pointer px-2 text-white`}

                    >
                      +
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container mt={2} mx={1.5}>
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
                          className={`${fk.values.qnt === i ? "!bg-[#63BA0E]" : "!bg-gray-400"}  cursor-pointer`}
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
                  <NavLink onClick={handleClickOpend}>
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
                  </NavLink>
                </Stack>
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  sx={style.cancelbtn}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button
                  className={`!bg-[#63BA0E]
           !cursor-pointer`}
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
        </div>

      )}

      <Dialog
        sx={{
          maxWidth: "400px !important",
          minWidth: "400px !important",
          margin: "auto",
          minHeight: "70%",
          maxHeight: "80%",
        }}
        open={opend}
      >
        <Howtoplay />
        <DialogActions sx={{ margin: "auto", width: "100%" }}>
          <Button
            disableElevation
            onClick={handleClosed}
            autoFocus
            variant="contained"
            sx={{
              color: "white",
              borderRadius: "20px",
              width: "60%",
              margin: "auto",
            }}
          >
            I Know
          </Button>
        </DialogActions>
      </Dialog>
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
    ["@media (max-width:340px)"]: { fontSize: "13px" },
    cursor: 'pointer',

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
    background: "#6da7f4",
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
