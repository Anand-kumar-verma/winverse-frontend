import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import countdownfirst from "../../../assets/images/countdownfirst.mp3";
import countdownlast from "../../../assets/images/countdownlast.mp3";
import htp from "../../../assets/images/htp.png";
import zero from "../../../assets/images/n0-30bd92d1.png";
import one from "../../../assets/images/n1-dfccbff5.png";
import two from "../../../assets/images/n2-c2913607.png";
import three from "../../../assets/images/n3-f92c313f.png";
import four from "../../../assets/images/n4-cb84933b.png";
import five from "../../../assets/images/n5-49d0e9c5.png";
import six from "../../../assets/images/n6-a56e0b9a.png";
import seven from "../../../assets/images/n7-5961a17f.png";
import eight from "../../../assets/images/n8-d4d951a4.png";
import nine from "../../../assets/images/n9-a20f6f42 (1).png";
import timerbg1 from "../../../assets/images/timerbg.png";
import timerbg2 from "../../../assets/images/timerbg2.png";
import backbanner from "../../../assets/images/winbackbanner.png";
import {
  gameHistory_trx_one_minFn,
  updateNextCounter,
} from "../../../redux/slices/counterSlice";
import { endpoint } from "../../../services/urls";
import { changeImages } from "../../../shared/nodeSchedular";
import { useSocket } from "../../../shared/socket/SocketContext";
import theme from "../../../utils/theme";
import BetNumber from "../BetNumber";
import Chart from "../history/Chart";
import GameHistory from "../history/GameHistory";
import MyHistory from "../history/MyHistory";
import WinLossPopup from "../WinLossPopup";
import Howtoplay from "./Howtoplay";

function Wingo5Min() {
  let preValue = 0;
  const socket = useSocket();
  const client = useQueryClient();
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [open, setOpen] = useState(false);
  const [one_min_time, setOne_min_time] = useState("0_0");
  const audioRefMusic = React.useRef(null);
  const audioRefMusiclast = React.useRef(null);
  const next_step = useSelector((state) => state.aviator.next_step);
  const [isImageChange, setIsImageChange] = useState("1_2_3_4_5");
  const [opendialogbox, setOpenDialogBox] = useState(false);
  const img1 = Number(isImageChange?.split("_")[0]);
  const img2 = Number(isImageChange?.split("_")[1]);
  const img3 = Number(isImageChange?.split("_")[2]);
  const img4 = Number(isImageChange?.split("_")[3]);
  const img5 = Number(isImageChange?.split("_")[4]);
  const image_array = [
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
  ];
  React.useEffect(() => {
    setIsImageChange(changeImages());
  }, []);

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
  /////////////
  React.useEffect(() => {
    const handleFiveMin = (onemin) => {
      const t = Number(String(onemin)?.split("_")?.[1]);
      const min = Number(String(onemin)?.split("_")?.[0]);
      const time_to_be_intro = t > 0 ? 60 - t : t;
      let fivemin = `${
        4 - (Number(t === 0 ? preValue : min) % 5)
      }_${time_to_be_intro}`;
      preValue = min;
      setOne_min_time(fivemin);

      if (fivemin?.split("_")?.[1] === "1" && fivemin?.split("_")?.[0] === "0")
        handlePlaySoundLast();

      if (
        Number(fivemin?.split("_")?.[1]) <= 10 &&
        Number(fivemin?.split("_")?.[1]) > 1 && // this is for sec
        fivemin?.split("_")?.[0] === "0" // this is for minut
      ) {
        handlePlaySound();
      }

      if (
        Number(fivemin?.split("_")?.[1]) <= 45 &&
        fivemin?.split("_")?.[0] === "0"
      ) {
        fk.setFieldValue("openTimerDialog", true);
      } else fk.setFieldValue("openTimerDialog", false);

      if (
        fivemin?.split("_")?.[1] === "0" &&
        fivemin?.split("_")?.[0] === "0"
      ) {
        client.refetchQueries("gamehistory_3min");
        client.refetchQueries("wallet_amount");
        client.refetchQueries("myAllhistory");
        // dispatch(dummycounterFun());
        fk.setFieldValue("openTimerDialog", false);
        setTimeout(() => {
          if (
            localStorage.getItem("betApplied3")?.split("_")?.[1] ===
            String(true)
          ) {
            setOpenDialogBox(true);
            setTimeout(() => {
              setOpenDialogBox(false);
              localStorage.setItem("betApplied3", false);
            }, 5000);
          }
        }, 1000);
      }
    };
    socket.on("onemin", handleFiveMin);
    return () => {
      socket.off("onemin", handleFiveMin);
    };
  }, []);
  const { isLoading, data: game_history } = useQuery(
    ["gamehistory_3min"],
    () => GameHistoryFn("3"),
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
      const response = await axios.post(`${endpoint.game_history}`, reqBody);
      return response;
    } catch (e) {
      toast(e?.message);
    }
  };

  React.useEffect(() => {
    dispatch(
      updateNextCounter(
        game_history?.data?.data
          ? Number(game_history?.data?.data?.[0]?.tr_transaction_id) + 1
          : 1
      )
    );
    dispatch(gameHistory_trx_one_minFn(game_history?.data?.data));
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          sx={{
            backgroundImage: `url(${backbanner})`,
            backgroundSize: "100% 100%",
            padding: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="text"
                color="primary"
                className="htpbutton"
                onClick={handleClickOpen}
              >
                <Box component="img" src={htp} width={20} sx={{ mr: 1 }}></Box>{" "}
                How To Play
              </Button>
              <Typography
                variant="body1"
                color="initial"
                className="psize"
                mt={1}
              >
                Win Go 5 Min
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: "100%", padding: "8px 0px" }}
              >
                <Box
                  component="img"
                  src={image_array[Number(img1)]}
                  width={25}
                ></Box>
                <Box
                  component="img"
                  src={image_array[Number(img2)]}
                  width={25}
                ></Box>
                <Box
                  component="img"
                  src={image_array[Number(img3)]}
                  width={25}
                ></Box>
                <Box
                  component="img"
                  src={image_array[Number(img4)]}
                  width={25}
                ></Box>
                <Box
                  component="img"
                  src={image_array[Number(img5)]}
                  width={25}
                ></Box>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <Typography
                  variant="body1"
                  color="initial"
                  className="timername"
                >
                  Time remaining{" "}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Box
                    className="timer !text-red-500 !bg-white"
                    sx={{
                      backgroundImage: `url(${timerbg1})`,
                      backgroundSize: "100%",
                      backgroundPosition: "center",
                    }}
                  >
                    {show_this_three_min_time_min?.substring(0, 1)}
                  </Box>
                  <Box className="timer1 !text-red-500 !bg-white">
                    {" "}
                    {show_this_three_min_time_min?.substring(1, 2)}
                  </Box>
                  <Box className="timer1 !text-red-500 !bg-white">:</Box>
                  <Box className="timer1 !text-red-500 !bg-white">
                    {" "}
                    {show_this_three_min_time_sec?.substring(0, 1)}
                  </Box>
                  <Box
                    className="timer2 !text-red-500 !bg-white"
                    sx={{
                      backgroundImage: `url(${timerbg2})`,
                      backgroundSize: "100%",
                      backgroundPosition: "center",
                    }}
                  >
                    {show_this_three_min_time_sec?.substring(1, 2)}
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  color="initial"
                  className="idnumber"
                >
                  {next_step}{" "}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <div className="relative">
          <BetNumber
            timing={`${show_this_three_min_time_min}_${show_this_three_min_time_sec}`}
            gid={"3"}
          />
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
                    background: theme.palette.primary.main,
                    fontWeight: 700,
                    width: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // color: "white",
                  }}
                  className="  !text-white !h-56 !pb-5"
                >
                  {show_this_three_min_time_sec?.substring(0, 1)}
                </div>
                <div
                  style={{
                    fontSize: 200,
                    borderRadius: 20,
                    background: theme.palette.primary.main,
                    fontWeight: 700,
                    width: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // color: "white",
                  }}
                  className="  !text-white !h-56 !pb-5"
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
          <WinLossPopup gid={"3"} />
        </Dialog>
      )}
    </Box>
  );
}

export default Wingo5Min;
