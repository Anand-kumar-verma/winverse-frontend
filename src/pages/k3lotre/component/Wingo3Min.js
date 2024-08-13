import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import { Box, Button, Dialog, DialogActions, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import countdownfirst from "../../../assets/images/countdownfirst.mp3";
import countdownlast from "../../../assets/images/countdownlast.mp3";
import { dummycounterFun } from "../../../redux/slices/counterSlice";
import { useSocket } from "../../../shared/socket/SocketContext";
import Chart from "../history/Chart";
import GameHistory from "../history/GameHistory";
import MyHistory from "../history/MyHistory";
import ShowImages from "./ShowImages";
import BetNumber from "../BetNumber";
import { NavLink } from "react-router-dom";
import timerbg1 from "../../../assets/images/timerbg.png";
import timerbg2 from "../../../assets/images/timerbg2.png";
// import Howtoplay from "./Howtoplay";
import Same2 from "./Same2";
import Same3 from "./Same3";
import Different from "./Different";
import Howtoplay from "./Howtoplay";


function Wingo3Min() {
  const [open, setOpen] = useState(false);
  const socket = useSocket();
  const client = useQueryClient();
  const [three_min_time, setThree_min_time] = useState("0_0");
  const [value, setValue] = useState(1);
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const next_step = useSelector((state) => state.aviator.next_step);
  const dispatch = useDispatch();
  const [bettype, setbettype] = useState(1);

  const handleChangebet = (newValue) => {
    setbettype(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const show_this_three_min_time_sec = React.useMemo(
    () => String(three_min_time?.split("_")?.[1]).padStart(2, "0"),
    [three_min_time]
  );

  const show_this_three_min_time_min = React.useMemo(
    () => String(three_min_time?.split("_")?.[0]).padStart(2, "0"),
    [three_min_time]
  );

  const initialValue = {
    openTimerDialog: false,
  };
  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => { },
  });

  React.useEffect(() => {
    const handleThreeMin = (threemin) => {
      setThree_min_time(threemin);
      if (
        threemin?.split("_")?.[1] === "1" &&
        threemin?.split("_")?.[0] === "0"
      )
        handlePlaySoundLast();
      if (
        Number(threemin?.split("_")?.[1]) <= 10 &&
        Number(threemin?.split("_")?.[1]) > 1 && // 1 index means second
        threemin?.split("_")?.[0] === "0" // 0 index means min
      ) {
        handlePlaySound();
      }

      if (
        Number(threemin?.split("_")?.[1]) <= 10 && // 1 index means second
        threemin?.split("_")?.[0] === "0" // 0 index means min
      ) {
        fk.setFieldValue("openTimerDialog", true);
      }
      if (threemin?.split("_")?.[1] === "59") {
        fk.setFieldValue("openTimerDialog", false);
      }
      if (
        threemin?.split("_")?.[1] === "25" &&
        threemin?.split("_")?.[0] === "0"
      ) {
        // oneMinCheckResult();
        // oneMinColorWinning();
      }
      if (
        threemin?.split("_")?.[1] === "59" &&
        threemin?.split("_")?.[0] === "3"
      ) {
        fk.setFieldValue("openTimerDialog", false);
      }
      if (
        threemin?.split("_")?.[1] === "56" &&
        threemin?.split("_")?.[0] === "3"
      ) {
        client.refetchQueries("myAll_trx_history");
        client.refetchQueries("trx_gamehistory");
        client.refetchQueries("wallet_amount");
        dispatch(dummycounterFun());
      }
    };

    socket.on("threemintrx", handleThreeMin);

    return () => {
      socket.off("threemintrx", handleThreeMin);
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
      <Box sx={{ px: 1, mt: 3 }}>
        <Box
          className="countdownbgtrx"

        >
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
                        className="!border  !px-5 !ml-5 !text-sm text-[#63BA0E] !border-[#63BA0E] !rounded-xl"
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
            <Box>
              <Typography className="text-gray-500" > Time remaining </Typography>
              {React.useMemo(() => {
                return (
                  <Stack direction="row" mt={1.5}>
                    <Box className="timer !text-[#00b977] !bg-gray-200" sx={{ backgroundImage: `url(${timerbg1})`, backgroundSize: '100%', backgroundPosition: 'center' }}>
                      {show_this_three_min_time_min?.substring(0, 1)}
                    </Box>
                    <Box className="timer1 !text-[#00b977] !bg-gray-200">
                      {" "}
                      {show_this_three_min_time_min?.substring(1, 2)}
                    </Box>
                    <Box className={"timer1 !text-[#00b977] !bg-gray-200"}>:</Box>
                    <Box className="timer1 !text-[#00b977] !bg-gray-200">
                      {show_this_three_min_time_sec?.substring(0, 1)}
                    </Box>
                    <Box className="timer2 !text-[#00b977] !bg-gray-200" sx={{ backgroundImage: `url(${timerbg2})`, backgroundSize: '100%', backgroundPosition: 'center' }}>
                      {show_this_three_min_time_sec?.substring(1, 2)}
                    </Box>
                  </Stack>
                );
              }, [show_this_three_min_time_sec])}
            </Box>
          </Box>
          {React.useMemo(() => {
            return <ShowImages />;
          }, [])}
        </Box>
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button
            className={bettype === 1 ? " k3active k3" : " k3"}
            onClick={() => handleChangebet(1)}
          >Total </Button>

          <Button
            className={bettype === 2 ? " k3active k3" : " k3"}
            onClick={() => handleChangebet(2)}
          >2same </Button>

          <Button
            className={bettype === 3 ? " k3active k3" : " k3"}
            onClick={() => handleChangebet(3)}
          >  3same </Button>

          <Button
            className={bettype === 4 ? " k3active k3" : " k3"}
            onClick={() => handleChangebet(4)}
          >Differents</Button>
        </Stack>

        <div className="relative">
          {bettype === 1 && <BetNumber gid={"1"} />}
          {bettype === 2 && <Same2 gid={"1"} />}
          {bettype === 3 && <Same3 gid={"1"} />}
          {bettype === 4 && <Different gid={"1"} />}
          {fk.values.openTimerDialog && (
            <div className="ti !w-full !z-50 top-0 !absolute rounded p-5 flex justify-center items-center">
              <div
                className="flex gap-2 justify-cente !bg-opacity-5"
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
                  className="!bg-[#63BA0E]  !text-white"
                >
                  {show_this_three_min_time_sec?.substring(0, 1)}
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
                  className="!bg-[#63BA0E]  !text-white"
                >
                  {show_this_three_min_time_sec?.substring(1, 2)}
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
        {value === 1 && <GameHistory gid="2" />}
        {value === 2 && <Chart gid="2" />}
        {value === 3 && <MyHistory gid="2" />}
      </Box>
      <Dialog sx={{ maxWidth: '400px !important', minWidth: '400px !important', margin: 'auto', minHeight: '70%', maxHeight: '80%', }} open={open} >
        <Howtoplay />
        <DialogActions sx={{ margin: 'auto', width: '100%' }}>
          <Button disableElevation onClick={handleClose} autoFocus variant="contained" sx={{ color: 'white', borderRadius: '20px', width: '60%', margin: 'auto' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Wingo3Min;

