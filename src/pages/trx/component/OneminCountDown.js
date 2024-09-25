import {
    Box,
    Button,
    Stack,
    Typography
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
import trxbg from "../../../assets/images/trxbg.png";
import {
    dummycounterFun,
    gameHistory_trx_one_minFn,
    myHistory_trx_one_minFn,
    trx_game_image_index_function,
    updateNextCounter
} from "../../../redux/slices/counterSlice";
import {
    My_All_TRX_HistoryFn,
    My_All_TRX_HistoryFn_new,
} from "../../../services/apiCallings";
import { endpoint } from "../../../services/urls";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import { useSocket } from "../../../shared/socket/SocketContext";
import ShowImages from "./ShowImages";

  function OneMinCountDown() {
    const [open, setOpen] = useState(false);
    const socket = useSocket();
    const dispatch = useDispatch();
    const [value, setValue] = useState(1);
    const [one_min_time, setOne_min_time] = useState(0);
    const show_this_one_min_time = String(one_min_time).padStart(2, "0");
    const audioRefMusic = React.useRef(null);
    const audioRefMusiclast = React.useRef(null);
    const client = useQueryClient();
    const next_step = useSelector((state) => state.aviator.next_step);
    const byTimeEnablingSound = useSelector((state) => state.aviator.byTimeEnablingSound);
    //  console.log(typeof(byTimeEnablingSound))
  
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
        if (onemin === 1) handlePlaySoundLast();
        if ([5, 4, 3, 2].includes(onemin)) {
          handlePlaySound();
        }
  
        if (onemin <= 10) {
          fk.setFieldValue("openTimerDialog", true);
        } else {
          fk.setFieldValue("openTimerDialog", false);
        }
        if (onemin === 59) {
          fk.setFieldValue("openTimerDialog", false);
        }
  
        if (onemin === 59) {
          client.refetchQueries("wallet_amount");
          client.refetchQueries("myAll_trx_history_new_1");
        }
  
        if (onemin === 0) {
          client.refetchQueries("trx_gamehistory");
        }
      };
      const handleOneMinResult = (result) => {
        localStorage.setItem("anand_re", result);
        // dispatch(dummycounterFun());
      };
      socket.on("onemintrx", handleOneMin);
      socket.on("result", handleOneMinResult);
      return () => {
        socket.off("onemintrx", handleOneMin);
        socket.off("result", handleOneMinResult);
      };
    }, []);
  
    const { isLoading, data: game_history } = useQuery(
      ["trx_gamehistory"],
      () => GameHistoryFn("1"),
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        retryOnMount: false,
        refetchOnWindowFocus: false,
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
      dispatch(
        updateNextCounter(
          game_history?.data?.result
            ? Number(game_history?.data?.result?.[0]?.tr_transaction_id) + 1
            : 1
        )
      );
      const tr_digit =
        game_history?.data?.result && game_history?.data?.result?.[0]?.tr_digits;
      let array = [];
      for (let i = 0; i < tr_digit?.length; i++) {
        if (/[a-zA-Z]/.test(tr_digit[i])) {
          array.push(tr_digit[i].toUpperCase());
        } else {
          array.push(tr_digit[i]);
        }
      }
      dispatch(trx_game_image_index_function(array));
      dispatch(gameHistory_trx_one_minFn(game_history?.data?.result));
    }, [game_history?.data?.result]);
  
    const handlePlaySoundLast = async () => {
      try {
        if (audioRefMusiclast?.current?.pause && true) {
          await audioRefMusiclast?.current?.play();
        } else {
          await audioRefMusiclast?.current?.pause();
        }
      } catch (error) {
        // Handle any errors during play
        console.error("Error during play:", error);
      }
    };
  
    const { data: my_history_all_new } =
    useQuery(["myAll_trx_history_new_1"],
      () => My_All_TRX_HistoryFn_new("1"), {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    });

  React.useEffect(() => {
    const newEarnings = my_history_all_new?.data?.data;

    if (Array.isArray(newEarnings) && newEarnings.length > 0) {
      dispatch(myHistory_trx_one_minFn(newEarnings));
    }
  }, [my_history_all_new?.data?.data, dispatch]);
  
  
  
  
    const handlePlaySound = async () => {
      try {
        if (audioRefMusic?.current?.pause && true) {
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
              backgroundImage: `url(${trxbg})`,
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
                          onClick={handleClickOpen}
                          variant="text"
                          color="primary"
                          className="htpbutton2"
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
                      {Number(next_step)?.toString()?.padStart(7, "0")}
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
                        0
                      </Box>
                      <Box className="timer1 ">0</Box>
                      <Box className={"timer1 "}>:</Box>
                      <Box className="timer1 ">
                        {show_this_one_min_time?.substring(0, 1)}
                      </Box>
                      <Box
                        className="timer2 "
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
       </Box>  
      </Box>
    );
  }
  
  export default OneMinCountDown;
  
  const style = {
    pilwal: {
      color: "#686868",
      fontSize: "13px",
      fontWeight: 600,
      fontFamily: "sans-serif !important",
    },
  };
  