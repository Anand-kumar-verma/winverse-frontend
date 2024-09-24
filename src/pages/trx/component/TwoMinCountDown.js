import { Box, Button, Stack, Typography } from "@mui/material";
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
import { dummycounterFun, gameHistory_trx_one_minFn, myHistory_trx_one_minFn, trx_game_image_index_function, updateNextCounter } from "../../../redux/slices/counterSlice";
import { My_All_TRX_HistoryFn, My_All_TRX_HistoryFn_new } from "../../../services/apiCallings";
import { endpoint } from "../../../services/urls";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import { useSocket } from "../../../shared/socket/SocketContext";
import ShowImages from "./ShowImages";


function TwoMinCountDown() {
  const [open, setOpen] = useState(false);
  const socket = useSocket();
  const client = useQueryClient();
  const [three_min_time, setThree_min_time] = useState("0_0");
  const [value, setValue] = useState(1);
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const next_step = useSelector((state) => state.aviator.next_step);
  
  const dispatch = useDispatch();
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
    const handleThreeMin = (onemin) => {
      let threemin = `${2 - (new Date()?.getMinutes() % 3)}_${onemin}`;
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
        threemin?.split("_")?.[0] === "2"
      ) {
        fk.setFieldValue("openTimerDialog", false);
      }
      if (
        threemin?.split("_")?.[1] === "56" &&
        threemin?.split("_")?.[0] === "2"
      ) {
        client.refetchQueries("wallet_amount");
        client.refetchQueries("trx_gamehistory_3");
        client.refetchQueries("myAll_trx_history_new_2");
        
        dispatch(dummycounterFun());
      }
    };

    socket.on("onemintrx", handleThreeMin);

    return () => {
      socket.off("onemintrx", handleThreeMin);
    };
  }, []);

  const { isLoading, data: game_history } = useQuery(
    ["trx_gamehistory_3"],
    () => GameHistoryFn("2"),
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
    dispatch(gameHistory_trx_one_minFn(game_history?.data?.result));
    dispatch(trx_game_image_index_function(array));
  }, [game_history?.data?.result]);
  
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

  const { data: my_history_all_new } =
  useQuery(["myAll_trx_history_new_2"],
    () => My_All_TRX_HistoryFn_new("2"), {
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
                    <Stack direction='row' alignItems='center'>
                      <Typography className="border border-white text-white px-1 !text-sm rounded" >Period</Typography>

                      <Button
                        variant="text"
                        color="primary"
                        className="htpbutton2"
                        onClick={handleClickOpen}
                      > How To Play
                      </Button>
                    </Stack>
                    <Stack direction='row' sx={{ mt: 1.5, justifyContent: 'space-between' }}>
                      <Typography
                        variant="body1"
                        sx={{ color: 'white', fontSize: '18px', fontWeight: '500' }}
                      >
                           {(Number(next_step))?.toString()?.padStart(7, "0")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: 'white', fontSize: '15px', fontWeight: '500' }}
                      >
                        Draw Time
                      </Typography>
                    </Stack>
                  </>
                );
              }, [next_step])}
            </Box>
            <Box>
              <NavLink to='/trx/tron-scan'>
                <Button
                  variant="text"
                  color="primary"
                  className="htpbutton3"
                >Public Chain Query
                </Button>
              </NavLink>
              {React.useMemo(() => {
                return (
                  <Stack direction="row" mt={1.5}>
                    <Box className="timer " sx={{ backgroundImage: `url(${timerbg1})`, backgroundSize: '100%', backgroundPosition: 'center' }}>
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
                    <Box className="timer2 " sx={{ backgroundImage: `url(${timerbg2})`, backgroundSize: '100%', backgroundPosition: 'center' }}>
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
       
      </Box>
     
    </Box>
  );
}

export default TwoMinCountDown;

