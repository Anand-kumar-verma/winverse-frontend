import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import countdownfirst from "../../../assets/images/countdownfirst.mp3";
import countdownlast from "../../../assets/images/countdownlast.mp3";
import timerbg1 from "../../../assets/images/timerbg.png";
import timerbg2 from "../../../assets/images/timerbg2.png";
import {
  dummycounterFun,
  trx_game_image_index_function,
  updateNextCounter,
} from "../../../redux/slices/counterSlice";
import { endpoint } from "../../../services/urls";
import { useSocket } from "../../../shared/socket/SocketContext";
import BetNumber from "../BetNumber";
import Chart from "../history/Chart";
import GameHistory from "../history/GameHistory";
import MyHistory from "../history/MyHistory";
import Howtoplay from "./Howtoplay";
import ShowImages from "./ShowImages";

function Wingo5Min() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const socket = useSocket();
  const client = useQueryClient();
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [one_min_time, setOne_min_time] = useState("0_0");
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const next_step = useSelector((state) => state.aviator.next_step);

  const show_this_three_min_time_sec = React.useMemo(
    () => String(one_min_time?.split("_")?.[1]).padStart(2, "0"),
    [one_min_time]
  );
  const show_this_three_min_time_min = React.useMemo(
    () => String(one_min_time?.split("_")?.[0]).padStart(2, "0"),
    [one_min_time]
  );

  const initialValue = {
    openTimerDialog: false,
  };
  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {},
  });


  React.useEffect(() => {
    const handleFiveMin = (fivemin) => {
      setOne_min_time(fivemin);

      if (fivemin?.split("_")?.[1] === "1" && fivemin?.split("_")?.[0] === "0")
        handlePlaySoundLast();

      if (
        Number(fivemin?.split("_")?.[1]) <= 30 &&
        Number(fivemin?.split("_")?.[1]) > 1 && // this is for sec
        fivemin?.split("_")?.[0] === "0" // this is for minut
      ) {
        handlePlaySound();
      }

      if (
        Number(fivemin?.split("_")?.[1]) <= 30 && // this is for sec
        fivemin?.split("_")?.[0] === "0" // this is for minut
      ) {
        fk.setFieldValue("openTimerDialog", true);
      }

      if (
        fivemin?.split("_")?.[1] === "40" && // this is for sec
        fivemin?.split("_")?.[0] === "0" // this is for minut
      ) {
        // oneMinCheckResult();
        // oneMinColorWinning();
      }
      if (
        fivemin?.split("_")?.[1] === "59" &&
        fivemin?.split("_")?.[0] === "4"
      ) {
        fk.setFieldValue("openTimerDialog", false);
      }
      if (
        fivemin?.split("_")?.[1] === "56" &&
        fivemin?.split("_")?.[0] === "4"
      ) {
        dispatch(dummycounterFun());
        client.refetchQueries("wallet_amount");
        client.refetchQueries("trx_gamehistory_chart");
        client.refetchQueries("myAll_trx_history");
        client.refetchQueries("trx_gamehistory");
        client.refetchQueries("trx_gamehistory_5");
      }
    };

    socket.on("fivemintrx", handleFiveMin);

    return () => {
      socket.off("fivemintrx", handleFiveMin);
    };
  }, []);

  const { isLoading, data: game_history } = useQuery(
    ["trx_gamehistory_5"],
    () => GameHistoryFn("3"),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const GameHistoryFn = async (gid) => {
    try {
      const reqBody = {
        gameid: gid,
        limit: 100,
      };
      const response = await axios.post(
        `${endpoint.trx_game_history}`,
        reqBody
      );
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  React.useEffect(() => {
    console.log(
      game_history?.data?.data
        ? Number(game_history?.data?.data?.[0]?.tr_transaction_id) + 1
        : 1
    );
    dispatch(
      updateNextCounter(
        game_history?.data?.data
          ? Number(game_history?.data?.data?.[0]?.tr_transaction_id) + 1
          : 1
      )
    );
    const tr_digit =
      game_history?.data?.data && game_history?.data?.data?.[0]?.tr_digits;
    let array = [];
    for (let i = 0; i < tr_digit?.length; i++) {
      if (/[a-zA-Z]/.test(tr_digit[i])) {
        array.push(tr_digit[i].toUpperCase());
      } else {
        array.push(tr_digit[i]);
      }
    }
    dispatch(trx_game_image_index_function(array));
  }, [game_history?.data?.data]);

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
          sx={{
            backgroundImage: `url(https://www.tcvvip11.com/assets/png/trxbg-21e5d811.png)`,
          }}
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
                      <Typography className="border border-white text-white px-1 !text-sm rounded">
                        Period
                      </Typography>
                      <Button
                        variant="text"
                        color="primary"
                        className="htpbutton2"
                        onClick={handleClickOpen}
                      >
                        {" "}
                        How To Play
                      </Button>
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{ mt: 1.5, justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          fontSize: "18px",
                          fontWeight: "500",
                        }}
                      >
                        {next_step}{" "}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        Draw Time
                      </Typography>
                    </Stack>
                  </>
                );
              }, [next_step])}
            </Box>
            <Box>
              <NavLink to="/trx/tron-scan">
                <Button variant="text" color="primary" className="htpbutton3">
                  Public Chain Query
                </Button>
              </NavLink>
              {React.useMemo(() => {
                return (
                  <Stack direction="row" mt={1.5}>
                    <Box
                      className="timer "
                      sx={{
                        backgroundImage: `url(${timerbg1})`,
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                      }}
                    >
                      {show_this_three_min_time_min?.substring(0, 1)}
                    </Box>
                    <Box className="timer1 ">
                      {" "}
                      {show_this_three_min_time_min?.substring(1, 2)}
                    </Box>
                    <Box className={"timer1 "}>:</Box>
                    <Box className="timer1 ">
                      {show_this_three_min_time_sec?.substring(0, 1)}
                    </Box>
                    <Box
                      className="timer2 "
                      sx={{
                        backgroundImage: `url(${timerbg2})`,
                        backgroundSize: "100%",
                        backgroundPosition: "center",
                      }}
                    >
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
        <div className="relative">
          <BetNumber timing={`${show_this_three_min_time_min}_${show_this_three_min_time_sec}`} gid={"3"} />
          {fk.values.openTimerDialog && (
            <div className="ti !w-full !z-50 top-0 !absolute rounded p-5 flex justify-center items-center">
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
                  className="!bg-[#F48901]  !text-white !h-56 !pb-5"
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
                  className="!bg-[#F48901]  !text-white !h-56 !pb-5"
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
        {value === 1 && <GameHistory gid="3" />}
        {value === 2 && <Chart gid="3" />}
        {value === 3 && <MyHistory gid="3" />}
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

export default Wingo5Min;
