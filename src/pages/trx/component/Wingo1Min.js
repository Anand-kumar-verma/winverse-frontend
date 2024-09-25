import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Stack
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import countdownfirst from "../../../assets/images/countdownfirst.mp3";
import countdownlast from "../../../assets/images/countdownlast.mp3";
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
import { useSocket } from "../../../shared/socket/SocketContext";
import BetNumber from "../BetNumber";
import Chart from "../history/Chart";
import GameHistory from "../history/GameHistory";
import MyHistory from "../history/MyHistory";
import Howtoplay from "./Howtoplay";
import OneMinCountDown from "./OneminCountDown";
import WinLossPopup from "../WinLossPopup";
////
function Wingo1Min() {

  const [open, setOpen] = useState(false);
  const [timing, setBetNumber] = useState(100);
  const socket = useSocket();
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [one_min_time, setOne_min_time] = useState(0);
  const show_this_one_min_time = String(one_min_time).padStart(2, "0");
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const [opendialogbox, setOpenDialogBox] = useState(false);

  const client = useQueryClient();

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

      if (onemin <= 10) {
        fk.setFieldValue("openTimerDialog", true);
      } else {
        fk.setFieldValue("openTimerDialog", false);
      }
      if (onemin === 59) {
        // dispatch(dummycounterFun());
        fk.setFieldValue("openTimerDialog", false);
      }

      if (onemin === 59) {
        client.refetchQueries("wallet_amount");
        client.refetchQueries("myAll_trx_history_new_1");
      }

      if (onemin === 0) {
        client.refetchQueries("trx_gamehistory");
        client.refetchQueries("myAll_trx_history_new_1");
        setTimeout(() => {
          if (
            localStorage.getItem("betApplied1")?.split("_")?.[1] ===
            String(true)
          ) {
            setOpenDialogBox(true);
            setTimeout(() => {
              setOpenDialogBox(false);
              localStorage.setItem("betApplied1", false);
            }, 5000);
          }
        }, 1000); }
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
      // retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  // console.log(game_history?.data?.result)
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

  // const game_history = []

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
        return <OneMinCountDown  fk={fk} setBetNumber={setBetNumber} />
      }, [])}
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
   
        <div className="relative">
          {<BetNumber timing={show_this_one_min_time} gid={"1"} />}
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
                  className="!bg-[#0D0335]  !text-white !h-56 !pb-5"
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
                  className="!bg-[#0D0335]  !text-white !h-56 !pb-5"
                >
                  {show_this_one_min_time?.substring(1, 2)}
                </div>
              </div>
            </div>
          )}
        </div>
        <Stack direction="row" justifyContent="space-between" mt={2}>
        {React.useMemo(() => {
          return (
            <>
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
             </>
            );
          }, [value])}
        </Stack>
        
        {value === 1 && <GameHistory gid="1" />}
        {value === 2 && <Chart gid="1" />}
        {value === 3 &&
          <MyHistory gid="1" show_this_one_min_time={show_this_one_min_time} />
        }
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
      {opendialogbox && (
        <Dialog
          open={opendialogbox}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
            <WinLossPopup gid={"1"} />
        </Dialog>
      )}
    </Box>
  );
}

export default Wingo1Min;

const style = {
  pilwal: {
    color: "#686868",
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "sans-serif !important",
  },
};
