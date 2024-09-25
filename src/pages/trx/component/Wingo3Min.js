import { Box, Button, Dialog, DialogActions, Stack } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import countdownfirst from "../../../assets/images/countdownfirst.mp3";
import countdownlast from "../../../assets/images/countdownlast.mp3";
import { dummycounterFun, gameHistory_trx_one_minFn, myHistory_trx_one_minFn, trx_game_image_index_function, updateNextCounter } from "../../../redux/slices/counterSlice";
import { My_All_TRX_HistoryFn, My_All_TRX_HistoryFn_new } from "../../../services/apiCallings";
import { endpoint } from "../../../services/urls";
import { useSocket } from "../../../shared/socket/SocketContext";
import BetNumber from "../BetNumber";
import Chart from "../history/Chart";
import GameHistory from "../history/GameHistory";
import MyHistory from "../history/MyHistory";
import WinLossPopup from "../WinLossPopup";
import Howtoplay from "./Howtoplay";
import TwoMinCountDown from "./TwoMinCountDown";


function Wingo3Min() {
  const [timing, setBetNumber] = useState(100);
  const [open, setOpen] = useState(false)
  const socket = useSocket();
  const client = useQueryClient();
  const [three_min_time, setThree_min_time] = useState("0_0");
  const [value, setValue] = useState(1);
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const next_step = useSelector((state) => state.aviator.next_step);
  const [opendialogbox, setOpenDialogBox] = useState(false);
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
        Number(threemin?.split("_")?.[1]) <= 30 && // 1 index means second
        threemin?.split("_")?.[0] === "0" ||
        (Number(threemin?.split("_")?.[1]) === 0 &&
          threemin?.split("_")?.[0] === "0") // 0 index means min 
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
        client.refetchQueries("myAll_trx_history_new_2");
      }
      if (
        threemin?.split("_")?.[1] === "56" &&
        threemin?.split("_")?.[0] === "2"
      ) {
        dispatch(dummycounterFun());
        client.refetchQueries("wallet_amount");
        client.refetchQueries("trx_gamehistory_3");
        client.refetchQueries("myAll_trx_history_new_2");
        setTimeout(() => {
          if (
            localStorage.getItem("betApplied2")?.split("_")?.[1] ===
            String(true)
          ) {
            setOpenDialogBox(true);
            setTimeout(() => {
              setOpenDialogBox(false);
              localStorage.setItem("betApplied2", false);
            }, 5000);
          }
        }, 1000);
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

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      {React.useMemo(() => {
        return <TwoMinCountDown fk={fk} setBetNumber={setBetNumber} />
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
          <BetNumber timing={`${show_this_three_min_time_min}_${show_this_three_min_time_sec}`} gid={"2"} />
          {fk.values.openTimerDialog && (
            <div className="ti !w-full !z-50 top-0 !absolute rounded p-5 flex justify-center items-center">
              <div
                c className="flex gap-2 justify-cente !bg-opacity-5 !py-5"
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
                  className="!bg-[#0D0335]  !text-white !h-56 !pb-5"
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
        {value === 3 && (
          <MyHistory
            gid="2"
            time={`${show_this_three_min_time_min}_${show_this_three_min_time_sec}`}
          />
        )}

      </Box>
      <Dialog sx={{ maxWidth: '400px !important', minWidth: '400px !important', margin: 'auto', minHeight: '70%', maxHeight: '80%', }} open={open} >
        <Howtoplay />
        <DialogActions sx={{ margin: 'auto', width: '100%' }}>
          <Button disableElevation onClick={handleClose} autoFocus variant="contained" sx={{ color: 'white', borderRadius: '20px', width: '60%', margin: 'auto' }}>
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
          <WinLossPopup gid={"2"} />
        </Dialog>
      )}
    </Box>
  );
}

export default Wingo3Min;

