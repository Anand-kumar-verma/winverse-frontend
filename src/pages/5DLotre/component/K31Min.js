import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Stack,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import countdownfirst from "../../../assets/images/countdownfirst.mp3";
import countdownlast from "../../../assets/images/countdownlast.mp3";
import timerbg1 from "../../../assets/images/timerbg.png";
import timerbg2 from "../../../assets/images/timerbg2.png";
import { dummycounterFun } from "../../../redux/slices/counterSlice";
import { useSocket } from "../../../shared/socket/SocketContext";
import BetNumber from "../BetNumber";
import Chart from "../history/Chart";
import GameHistory from "../history/GameHistory";
import MyHistory from "../history/MyHistory";
import Howtoplay from "./Howtoplay";
import Same2 from "../Same2";
import Same3 from "../Same3";
import Different from "../Different";
import Sum from "../Sum";


////
function K31Min() {
  const [open, setOpen] = useState(false);
  const socket = useSocket();
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [bettype, setbettype] = useState(1);
  const [one_min_time, setOne_min_time] = useState(0);
  const show_this_one_min_time = String(one_min_time).padStart(2, "0");
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const client = useQueryClient();
  const next_step = useSelector((state) => state.aviator.next_step);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValue = {
    openTimerDialog: false,
  };
  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => { },
  });

  React.useEffect(() => {
    const handleOneMin = (onemin) => {
      setOne_min_time(onemin);
      // fk.setFieldValue("show_this_one_min_time", onemin);
      if (onemin === 1) handlePlaySoundLast();
      if ([5, 4, 3, 2].includes(onemin)) {
        handlePlaySound();
      }

      if (onemin <= 5) {
        fk.setFieldValue("openTimerDialog", true);
      }
      if (onemin === 59) {
        fk.setFieldValue("openTimerDialog", false);
      }
      if (onemin === 56) {
        client.refetchQueries("myAll_trx_history");
        client.refetchQueries("wallet_amount");
        client.refetchQueries("trx_gamehistory");
        dispatch(dummycounterFun());
      }
    };
    socket.on("onemintrx", handleOneMin);
    return () => {
      socket.off("onemintrx", handleOneMin);
    };
  }, []);

  const handlePlaySoundLast = async () => {
    try {
      if (audioRefMusiclast?.current?.pause) {
        await audioRefMusiclast?.current?.play();
      } else {
        await audioRefMusiclast?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };
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

  const handleChange = (newValue) => {
    setValue(newValue);
  };


  const handleChangebet = (newValue) => {
    setbettype(newValue);
  };
  const [index, setIndex] = useState(0);
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ]; // The number sequence as a string
  React.useEffect(() => {
    const handleThreeMin = (threemin) => {
      if (threemin === 0) Time()
    };

    socket.on("onemintrx", handleThreeMin);

    return () => {
      socket.off("onemintrx", handleThreeMin);
    };
  }, []);
  const Time = () => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % numbers.length);
    }, 100);
    const randomStopTime = Math.floor(Math.random() * 5000) + 1000; // Stop between 1 and 6 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, randomStopTime);
  }
  const num = [
    7, 5, 2, 4, 1, 8, 6, 9, 0
  ]; // The number sequence as a string
  React.useEffect(() => {
    const handleThreeMin = (threemin) => {
      if (threemin === 0) Timers()
    };

    socket.on("onemintrx", handleThreeMin);

    return () => {
      socket.off("onemintrx", handleThreeMin);
    };
  }, []);
  const Timers = () => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % num.length);
    }, 100);
    const randomStopTime = Math.floor(Math.random() * 5000) + 1000; // Stop between 1 and 6 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, randomStopTime);
  }
  const number = [
    5, 7, 3, 9, 6, 8, 4, 1, 2
  ]; // The number sequence as a string
  React.useEffect(() => {
    const handleThreeMin = (threemin) => {
      if (threemin === 0) Timer()
    };

    socket.on("onemintrx", handleThreeMin);

    return () => {
      socket.off("onemintrx", handleThreeMin);
    };
  }, []);
  const Timer = () => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % number.length);
    }, 100);
    const randomStopTime = Math.floor(Math.random() * 5000) + 1000; // Stop between 1 and 6 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, randomStopTime);
  }
  const numb = [
    10, 6, 7, 4, 2, 5, 1, 0, 8, 9
  ]; // The number sequence as a string

  React.useEffect(() => {
    const handleThreeMin = (threemin) => {
      if (threemin === 0) Timer1()
    };

    socket.on("onemintrx", handleThreeMin);

    return () => {
      socket.off("onemintrx", handleThreeMin);
    };
  }, []);
  const Timer1 = () => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % numb.length);
    }, 100);
    const randomStopTime = Math.floor(Math.random() * 5000) + 1000; // Stop between 1 and 6 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, randomStopTime);
  }
  const no = [
    6, 4, 2, 1, 5, 7, 9, 8, 3,
  ];
  React.useEffect(() => {
    const handleThreeMin = (threemin) => {
      if (threemin === 0) Timer2()
    };

    socket.on("onemintrx", handleThreeMin);

    return () => {
      socket.off("onemintrx", handleThreeMin);
    };
  }, []);
  const Timer2 = () => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % no.length);
    }, 100);
    const randomStopTime = Math.floor(Math.random() * 5000) + 1000; // Stop between 1 and 6 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, randomStopTime);
  }
  return (
    <Box>
      {React.useMemo(() => {
        return (
          <>
            <audio ref={audioRefMusic} hidden>
              <source src={`${countdownfirst}`} type="audio/mp3" />
            </audio>
            <audio ref={audioRefMusiclast} hidden>
              <source src={`${countdownlast}`} type="audio/mp3" />
            </audio>
          </>
        );
      }, [audioRefMusic, audioRefMusiclast])}
      <Box
        className="flex flex-col justify-center bg-white shadow-2xl m-4 rounded-lg "
      >
        <Box className="flex justify-center gap-2 w-full  my-4">
          <Box className="flex flex-col justify-center  my-2 text-gray-500">
            <p className="px-2">Lottery</p>
            <p className="px-2">result</p>
          </Box>
          <Box className="flex flex-col justify-center  my-2">
            <p className="border-black border   bg-gray-100 px-3 py-1 rounded-full ">{numbers[index] ||5}</p>
            <p className="px-2 text-gray-400 ">A</p>
          </Box>
          <Box className="flex flex-col justify-center  my-2">
            <p className="border-black border  bg-gray-100 px-3 py-1 rounded-full">{num[index] ||7}</p>
            <p className="px-2 text-gray-400">B</p>
          </Box>
          <Box className="flex flex-col justify-center  my-2">
            <p className="border-black border  bg-gray-100 px-3 py-1 rounded-full">{number[index] ||1}</p>
            <p className="px-2 text-gray-400">C</p>
          </Box>
          <Box className="flex flex-col justify-center  my-2">
            <p className="border-black border  bg-gray-100 px-3 py-1 rounded-full">{numb[index] ||5}</p>
            <p className="px-2 text-gray-400">D</p>
          </Box>
          <Box className="flex flex-col justify-center  my-2">
            <p className="border-black border  bg-gray-100 px-3 py-1 rounded-full">{no[index] ||3}</p>
            <p className="px-2 text-gray-400">E</p>
          </Box>
          <Box className="flex flex-col justify-center  mb-7">
            <p className="">=</p>
          </Box>
          <Box className="flex flex-col justify-center  mb-7">
            <p className="border-orange-300 border my-2  bg-orange-300 px-2 py-1 text-white rounded-full ">{no[index] + number[index] + numb[index] + numbers[index] + num[index] ||21}</p>
          </Box>

        </Box>
      </Box>

      <Box sx={{ px: 1, mt: 3 }}>

        <Box
          className="countdownbgtrx bg-white shadow-2xl rounded-lg p-2">
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "60%",
              }}
              className="win-banner"
            >
              {React.useMemo(() => {
                return (
                  <>
                    <Stack direction="row" alignItems="center">
                      <Typography className="text-gray-500" > Period </Typography>
                      <Typography
                        onClick={handleClickOpen}
                        variant="text"
                        className="!border !cursor-pointer !px-5 !ml-5 !text-sm text-[#F48901] !border-[#F48901] !rounded-xl"
                      >
                        {" "}
                        How To Play
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{ mt: 1.5, justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "black",
                          fontSize: "25px",
                          fontWeight: "500",
                        }}
                      >
                        {next_step}{" "}
                      </Typography>

                    </Stack>
                  </>
                );
              }, [next_step])}
            </Box>
            <Box className="!text-[#00b977] ">
              <Typography className="text-gray-500" > Time remaining </Typography>
              {React.useMemo(() => {
                return (
                  <Stack direction="row" mt={1.5}>
                    <Box
                      className="timer !text-[#00b977] !bg-gray-200"
                      sx={{
                        backgroundImage: `url(${timerbg1})`,
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                      }}
                    >
                      0
                    </Box>
                    <Box className="timer1 !text-[#00b977]  !bg-gray-200 ">0</Box>
                    <Box className={"timer1 !text-[#00b977] "} >:</Box>
                    <Box className="timer1 !text-[#00b977] !bg-gray-200 ">
                      {show_this_one_min_time?.substring(0, 1)}
                    </Box>
                    <Box
                      className="timer2 !text-[#00b977] !bg-gray-200 "
                      sx={{
                        backgroundImage: `url(${timerbg2})`,
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                      }}
                    >
                      {show_this_one_min_time?.substring(1, 2)}
                    </Box>
                  </Stack>
                );
              }, [show_this_one_min_time])}
            </Box>
        </Box> 
          <div className="border-8 border-[#00b977] !h-28 my-4  p-1 rounded-lg !overflow-hidden bg-[#00b977] " >
            <div className="grid grid-cols-5 " >
             
              <div className="flex flex-col bg-black  gap-1  justify-start" >
                <Box className="  !bg-[#00e065] !text-white !text-2xl !font-extrabold m-1  py-4
                  p-2 rounded-full text-center">{numbers[index]  || 5}</Box>
                <Box className=" !bg-[#00e065]  mx-1  py-4 p-2 rounded-full" >{numbers[index]}</Box>
                <Box>{numbers[index]}</Box>
                <Box>{numbers[index]}</Box>
                <Box >{numbers[index]}</Box>
              </div>
              <div className="flex flex-col bg-black gap-1  justify-start" >
                <Box className=" bg-gray-200 m-1 !text-2xl !text-gray-400  !font-extrabold py-4
             p-2 rounded-full text-center"   >{num[index]  || 7}</Box>
                <Box className="  bg-gray-300  mx-1  py-4 p-2 rounded-full " >{num[index]}</Box>
                <Box>{num[index]}</Box>
                <Box >{num[index]}</Box>
                <Box >{num[index]}</Box>
              </div>
              <div className="flex flex-col bg-black gap-1  justify-start" >
                <Box className=" bg-gray-200 m-1  py-4 !text-2xl !text-gray-400  !font-extrabold
             p-2 rounded-full text-center"  >{number[index] ||1}</Box>
                <Box className=" bg-gray-300  mx-1  py-4 p-2 rounded-full" >{number[index]}</Box>
                <Box >{number[index]}</Box>
                <Box>{number[index]}</Box>
                <Box >{number[index]}</Box>
              </div>
              <div className="flex flex-col bg-black gap-1  justify-start" >
                <Box className=" bg-gray-200 m-1  py-4 !text-2xl !text-gray-400  !font-extrabold
             p-2 rounded-full text-center">{numb[index] ||5}</Box>
                <Box className=" bg-gray-300  mx-1  py-4  p-2 rounded-full text-center"
                >{numb[index]}</Box>
                <Box>{numb[index]}</Box>
                <Box>{numb[index]}</Box>
                <Box>{numb[index]}</Box>
              </div>
              <div className="flex flex-col bg-black gap-1  justify-start" >
                <Box
                  className=" bg-gray-200 m-1  py-4
             p-2 rounded-full text-center !text-2xl !text-gray-400  !font-extrabold"   >{no[index]||3}</Box>
                <Box
                  className=" bg-gray-300  mx-1  py-4
             p-2 rounded-full text-center"  >{no[index] }</Box>
                <Box >{no[index]}</Box>
                <Box  >{no[index]}</Box>
                <Box >{no[index]}</Box>
              </div>
            </div>
          </div>

        </Box>
        <div>

          <Stack direction="row" justifyContent="space-evenly" mt={2}>
            <Button
              className={bettype === 1 ? " D5active D5" : " D5 "}
              onClick={() => handleChangebet(1)}
            >A </Button>

            <Button
              className={bettype === 2 ? " D5active D5" : " D5"}
              onClick={() => handleChangebet(2)}
            >B </Button>

            <Button
              className={bettype === 3 ? " D5active D5" : " D5"}
              onClick={() => handleChangebet(3)}
            >  C </Button>

            <Button
              className={bettype === 4 ? " D5active D5" : " D5"}
              onClick={() => handleChangebet(4)}
            >D</Button>
            <Button
              className={bettype === 5 ? " D5active D5" : " D5"}
              onClick={() => handleChangebet(5)}
            >SUM</Button>
          </Stack>

        </div>
        <div className="relative">
          {bettype === 1 && <BetNumber gid={"1"} />}
          {bettype === 2 && <Same2 gid={"1"} />}
          {bettype === 3 && <Same3 gid={"1"} />}
          {bettype === 4 && <Different gid={"1"} />}
          {bettype === 5 && <Sum gid={"1"} />}
          {fk.values.openTimerDialog && (
        <div className="ti !w-full !z-50 top-0 !absolute rounded p-5 flex justify-center items-center ">
              <div
                className="flex gap-2 justify-cente !bg-opacity-5 !py-5"
                sx={{ width: "100%" }}
              >
                <div
                  style={{
                    fontSize: 200,
                    borderRadius: 20,
                    // background: "rgb(73, 57, 193)",
                    fontWeight: 700,
                    width: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // color: "white",
                  }}
                className="!bg-[#F48901]  !text-white !h-56 "
                >
                  {show_this_one_min_time?.substring(0, 1)}
                </div>
                <div
                  style={{
                    fontSize: 200,
                    borderRadius: 20,
                    // background: "rgb(73, 57, 193)",
                    fontWeight: 700,
                    width: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // color: "white",
                  }}
                className="!bg-[#F48901]  !text-white !h-56 "
                >
                  {show_this_one_min_time?.substring(1, 2)}
                </div>
              </div>
            </div>
          )}
        </div>
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button
            className={
              value === 1 ? " gametableactive gametable" : " gametable"
            }
            onClick={() => handleChange(1)}
          >
            Game history
          </Button>
          <Button
            className={
              value === 2 ? " gametableactive gametable" : " gametable"
            }
            onClick={() => handleChange(2)}
          >
            Chart
          </Button>
          <Button
            className={
              value === 3 ? " gametableactive gametable" : " gametable"
            }
            onClick={() => handleChange(3)}
          >
            My history
          </Button>
        </Stack>
        {value === 1 && <GameHistory gid="1" />}
        {value === 2 && <Chart gid="1" />}
        {value === 3 && <MyHistory gid="1" />}
      </Box>

      <Dialog
        sx={{
          maxWidth: "400px !important",
          minWidth: "400px !important",
          margin: "auto",
          minHeight: "70%",
          maxHeight: "80%",
        }}
        open={open}
      >
        <Howtoplay />
        <DialogActions sx={{ margin: "auto", width: "100%" }}>
          <Button
            disableElevation
            onClick={handleClose}
            autoFocus
            variant="contained"
            sx={{
              color: "white",
              borderRadius: "20px",
              width: "60%",
              margin: "auto",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default K31Min;

const style = {
  pilwal: {
    color: "#686868",
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "sans-serif !important",
  },
};
