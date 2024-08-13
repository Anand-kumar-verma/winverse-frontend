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
import ShowImages from "./ShowImages";
import Same2 from "./Same2";
import Same3 from "./Same3";
import Different from "./Different";
import Howtoplay from "./Howtoplay";
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

  return (
    <Box
    >
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
      <Box sx={{ px: 1, mt: 3 }}
      >
        <Box
          className="countdownbgtrx !shadow-2xl !bg-white"

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
                    <Stack direction="row" alignItems="center" >
                      <Typography className="text-gray-500" > Period </Typography>
                      <Typography
                        onClick={handleClickOpen}
                        variant="text"
                        className="!border !cursor-pointer !px-5 !ml-5 !text-sm text-[#63BA0E] !border-[#63BA0E] !rounded-xl"
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
            <Box className="!text-[#00b977]  ">
              <Typography className="text-gray-500" > Time remaining </Typography>
              {React.useMemo(() => {
                return (
                  <Stack direction="row" mt={1.5}>
                    <Box
                      className="timer !text-[#00b977] !bg-gray-200 "
                      sx={{
                        backgroundImage: `url(${timerbg1})`,
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                      }}
                    >
                      0
                    </Box>
                    <Box className="timer1 !text-[#00b977] !bg-gray-200 ">0</Box>
                    <Box className={"timer1 !text-[#00b977] !bg-gray-200"} >:</Box>
                    <Box className="timer1 !text-[#00b977] !bg-gray-200">
                      {show_this_one_min_time?.substring(0, 1)}
                    </Box>
                    <Box
                      className="timer2 !text-[#00b977] !bg-gray-200"
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
          {React.useMemo(() => {
            return <ShowImages />;
          }, [])}
        </Box>
        <div>

          <Box className="!flex !justify-center !mx-2 !-mb-2 !mt-5" >
            <Button
              className={bettype === 1 ? " k3active k3" : " k3 "}
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
          </Box>

        </div>
        <div className="relative mx-2 ">
          {bettype === 1 && <BetNumber timing={show_this_one_min_time} gid={"1"} />}
          {bettype === 2 && <Same2 timing={show_this_one_min_time} gid={"1"} />}
          {bettype === 3 && <Same3 timing={show_this_one_min_time} gid={"1"} />}
          {bettype === 4 && <Different timing={show_this_one_min_time} gid={"1"} />}
          {fk.values.openTimerDialog && (
            <div className="ti !w-full !z-50 top-0 !absolute rounded p-5 flex justify-center items-center">
              <div
                className="flex gap-2 justify-cente !bg-opacity-5 !py-5 "
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
                  className="!bg-[#63BA0E]  !text-white !h-56 !pb-5"
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
                  className="!bg-[#63BA0E]  !text-white !h-56 !pb-5"
                >
                  {show_this_one_min_time?.substring(1, 2)}
                </div>
              </div>
            </div>
          )}
        </div>
        <Stack direction="row" justifyContent="space-between" >
          <Button
            className={
              value === 1 ? " gametableactive gametable" : " gametable !bg-gray-200 !rounded"
            }
            onClick={() => handleChange(1)}
          >
            Game history
          </Button>
          <Button
            className={
              value === 2 ? " gametableactive gametable" : " gametable !bg-gray-200 !rounded"
            }
            onClick={() => handleChange(2)}
          >
            Chart
          </Button>
          <Button
            className={
              value === 3 ? " gametableactive gametable" : " gametable !bg-gray-200 !rounded"
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
