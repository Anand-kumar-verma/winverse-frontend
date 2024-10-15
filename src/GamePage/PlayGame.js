import { CircularProgress, Tab, Tabs } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CgDetailsMore } from "react-icons/cg";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import aviatorimage from "../assets/aviatorimage.png";
import crashmusic from "../assets/crashmusic.mp3";
import plane1 from "../assets/front-aviator-image.svg";
import howtoplay from "../assets/howtoplay.PNG";
import { just_start_after_waitingFun } from "../redux/slices/counterSlice";
import AirPlane from "./AirPlane";
import AllBets from "./AllBets";
import AccountMenu from "./MenuItems";
import MyBets from "./MyBets";
import Top from "./Top";
import { gray } from "./color";
import { useSocket } from "../shared/socket/SocketContext";
import { dummy_aviator, rupees } from "../services/urls";
import { walletamountAviator } from "../services/apiCallings";
const PlayGame = () => {
  const client = useQueryClient();
  const dispatch = useDispatch();
  const [waiting_sec, setWaitingSec] = useState(10);
  const isMediumScreen = useMediaQuery({ minWidth: 800 });
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const socket = useSocket();

  const handleClick = (event) => {
    anchorEl === null ? setAnchorEl(event.currentTarget) : setAnchorEl(null);
  };

  // useEffect(() => {
  //   !aviator_login_data && get_user_data_fn(dispatch);
  // }, []);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { isLoading, data } = useQuery(["allresult"], () => resultFunction(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });

  const resultFunction = async () => {
    try {
      const response = await axios.get(
        `${dummy_aviator}/api/v1/get-game-history`
      );

      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const { isLoading: walletloding, data: walletdata } = useQuery(
    ["walletamount_aviator"],
    () => walletamountAviator(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );

  const result = data?.data?.data || [];
  const walletAmount = walletdata?.data?.data || 0;

  const initialValue = {
    refetch: 1,
  };
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      console.log(formik.values);
    },
  });

  ///////////////////////  for airplane data
  const initialValues = {
    country: "India",
    currency: "INR",
    mob: "",
    pass: "",
    // value for bet1 button
    isStart1: false,
    waitingForNextTime1: false,
    autocashout1: false,

    // value for bet1 button
    isStart2: false,
    waitingForNextTime2: false,
    autocashout2: false,

    // common for all
    isFlying: false,
    setcolorofdigit: false,
    setloder: false,
    closeButtomDot: true,
    isEnablingWinner: false,
    isShadowPath: false,
  };

  const fk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      console.log(fk.values);
    },
  });

  const audioRefMusic = useRef(null);
  const audioRefSound = useRef(null);
  const isEnableMusic = useSelector((state) => state.aviator.isEnableMusic);
  const isEnableSound = useSelector((state) => state.aviator.isEnableSound);
  const waiting_aviator = useSelector((state) => state.aviator.waiting_aviator);
  const just_start_after_waiting = useSelector(
    (state) => state.aviator.just_start_after_waiting
  );
  const byTimeEnablingMusic = useSelector(
    (state) => state.aviator.byTimeEnablingMusic
  );
  const byTimeEnablingSound = useSelector(
    (state) => state.aviator.byTimeEnablingSound
  );
  const backgroundMusic_url = useSelector(
    (state) => state.aviator.backgroundMusic_url
  );
  const please_reconnect_the_server = useSelector(
    (state) => state.aviator.please_reconnect_the_server
  );

  useEffect(() => {
    handlePlayMusic();
  }, [isEnableMusic, byTimeEnablingMusic]);

  useEffect(() => {
    handlePlaySound();
  }, [byTimeEnablingSound, isEnableSound]);

  // function to handle the music and sounds
  const handlePlayMusic = async () => {
    if (audioRefMusic?.current) {
      try {
        if (isEnableMusic && byTimeEnablingMusic) {
          await audioRefMusic?.current?.play();
        } else {
          await audioRefMusic?.current?.pause();
        }
      } catch (error) {
        // Handle any errors during play
        console.error("Error during play:", error);
      }
    }
  };
  const handlePlaySound = async () => {
    try {
      if (byTimeEnablingSound && isEnableSound) {
        await audioRefSound?.current?.play();
      } else {
        console.log("inside else");

        await audioRefSound?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };
  useEffect(() => {
    localStorage.removeItem("hasCodeExecuted");
  }, []);
  useEffect(() => {
    const handleSetColorOfDigit = (color_value) => {
      fk.setFieldValue("setcolorofdigit", color_value);
    };

    const handleSetLoader = (setloder) => {
      client.refetchQueries("walletamount_aviator");
      fk.setFieldValue("setloder", setloder);
    };

    const handleIsFlying = (isFlying) => {
      fk.setFieldValue("isFlying", isFlying);
    };

    socket.on("setcolorofdigit", handleSetColorOfDigit);
    socket.on("setloder", handleSetLoader);
    socket.on("isFlying", handleIsFlying);

    return () => {
      socket.off("setcolorofdigit", handleSetColorOfDigit);
      socket.off("setloder", handleSetLoader);
      socket.off("isFlying", handleIsFlying);
    };
  }, []);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloadedDashboard");

    if (!hasReloaded) {
      // Reload the page and set localStorage value
      localStorage.setItem("hasReloadedDashboard", "true");
      window.location.reload();
    } else {
      // Execute the setTimeout and dispatch logic after reload
      setTimeout(() => {
        dispatch(just_start_after_waitingFun(false));
      }, 2000);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!waiting_aviator) {
      let sec = 10;
      const interval = setInterval(() => {
        setWaitingSec(--sec);
        if (sec === 0) clearInterval(interval);
      }, 200);
    }
  }, [waiting_aviator]);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     const confirmationMessage =
  //       "You are about to leave the dashboard. Are you sure you want to do this?";
  //     event.returnValue = confirmationMessage; // Standard for most browsers
  //     return confirmationMessage; // For some older browsers
  //   };

  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       setTimeout(() => {
  //         dispatch(please_reconnect_the_serverFun(true));
  //       }, 60 * 1000);
  //     }
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);



  const airPlaneComponent = useMemo(() => {
    return <AirPlane formik={formik} fk={fk} />;
  }, [formik, fk]);

  const myBets_Top = useMemo(() => {
    return (value === 1 && <MyBets />) || (value === 2 && <Top />);
  }, [value]);

  const myall_bets = useMemo(() => {
    return value === 0 && <AllBets formik={formik} fk={fk} />;
  }, [formik, fk, value]);

  const show_result = useMemo(() => {
    return (
      <div
        className={`no-scrollbar px-1 py-1 flex gap-1 flex-wrap h-[24px] overflow-x-scroll overflow-y-hidden rounded-full`}
        style={{ flexDirection: "row" }} // Scroll from right to left
      >
        {result
          ?.slice()
          .reverse()
          .map((i, index) => {
            return (
              <p
                key={index}
                className={`
                  ${Number(i?.multiplier) <= 2
                    ? 'text-blue-500'
                    : Number(i?.multiplier) > 2 && Number(i?.multiplier) <= 10
                      ? 'text-purple-500'
                      : 'text-red-500'}
                      rounded-full px-2 text-[10px] overscroll-auto scroll-smooth `}
                    >
                {Number(i?.multiplier)?.toFixed(2)} X
              </p>

            );
          })}
      </div>
    );
  }, [result]);

  const shwoAllTabs = useMemo(() => {
    return (
      <div className="flex justify-center w-full">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="!text-sm !flex !justify-center"
          classes={{ indicator: "custom-tab-indicator" }} // Add this line to apply custom styling
        >
          {["All Bets", "My Bets", "Top"]?.map((i, index) => (
            <Tab
              label={i}
              {...a11yProps(index)}
              className="!text-sm !text-white"
            />
          ))}
        </Tabs>
      </div>
    );
  }, [value]);

  const menu_item = useMemo(() => {
    return (
      anchorEl && <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    );
  }, [anchorEl]);

  const show_top_section = useMemo(() => {
    return (
      <div className={`${gray} lg:h-[10%] flex justify-between text-white p-1`}>
        {isMediumScreen && (
          <div>
            <img src={howtoplay} className="h-16" />
          </div>
        )}
        {!isMediumScreen && (
          <span>
            <img src={aviatorimage} className="h-5 mt-1" />
          </span>
        )}
        <div className="w-full flex lg:justify-end justify-end gap-2">
          <div className="flex flex-col justify-between">
            {isMediumScreen && (
              <p className="text-[10px] bg-[#f6c74f] text-black px-4 py-1 rounded-md">
                Play for money
              </p>
            )}
            <p className="">
              {walletloding ? (
                <CircularProgress />
              ) : (
                <span className="text-green-700 !text-[15px]">
                  <span className="!font-bold">
                    {Number(
                      Number(walletAmount?.wallet || 0) +
                      Number(walletAmount?.winning || 0)
                    ).toFixed(2) || "0000"}
                  </span>{" "}
                  <span className="!text-white">{rupees}</span>
                </span>
              )}
            </p>
          </div>
          <div className="flex lg:flex-col lg:justify-between ">
            {/* <RxCross2 className="text-lg cursor-pointer" /> */}
            <CgDetailsMore
              className="text-lg cursor-pointer"
              onClick={(e) => handleClick(e)}
            />
          </div>
        </div>
      </div>
    );
  }, [isMediumScreen, walletloding, walletAmount]);

  const load_audio = useMemo(() => {
    return (
      <>
        <audio ref={audioRefMusic} hidden loop>
          <source src={`${backgroundMusic_url}`} type="audio/mp3" />
        </audio>
        <audio ref={audioRefSound} hidden>
          <source src={crashmusic} type="audio/mp3" />
        </audio>
      </>
    );
  }, [audioRefMusic, audioRefSound, backgroundMusic_url]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  // if (waiting_aviator)
  //   return (
  //     <>
  //       <LinearProgress />
  //       <div
  //         className="h-full !bg-black w-full flex flex-col justify-center items-center overflow-y-hidden no-scrollbar
  //     "
  //       >
  //         <CircularProgress />
  //         <span className="!text-white">Connecting...</span>
  //       </div>
  //     </>
  //   );

  if (just_start_after_waiting)
    return (
      <>
        <div className="h-full w-full flex flex-col justify-center items-center overflow-y-hidden no-scrollbar">
          <img src={plane1} className="lg:w-[30%] lg:h-[30%] w-[70%] h-[20%]" />
          <p className="transparentColor bg-gradient-to-l from-[#ff013c] to-[#C3384E] text-[5rem] font-semibold">
            Aviator
          </p>
          <div className="flex gap-2 items-center">
            <div className="lg:h-[20px] h-[15px] w-[150px] lg:w-[500px] rounded-r-full rounded-l-full relative  bg-gradient-to-l from-[#ff013c] to-[#C3384E] ">
              <div className="loder-waiting-for-next-round-start !rounded-full"></div>
            </div>
            <p className="!text-[#C3384E] !text-2xl">
              {String(waiting_sec) + "0"}%
            </p>
          </div>

          <p className="!text-[#C3384E] !text-2xl">
            00:{String(waiting_sec).padStart(2, "0")}
          </p>
        </div>
      </>
    );
  // if (please_reconnect_the_server)
  //   return (
  //     <>
  //       <div className="!w-[screen] !h-screen flex justify-center items-center no-scrollbar ">
  //         <Card className="!bg-white !bg-opacity-5 !rounded-lg !p-4">
  //           <p className="flex justify-end">
  //             <IconButton
  //               onClick={() => {
  //                 navigate("/dashboard");
  //               }}
  //             >
  //               <ClearIcon className="!text-white" />
  //             </IconButton>
  //           </p>
  //           <div className="!flex justify-center">
  //             <ClearIcon className="!text-[#C3384E] !text-8xl border-[1px] border-[#C3384E] rounded-full" />
  //           </div>
  //           <p className="!text-white mt-10 text-center">
  //             <span className="!font-bold text-xl">Sorry !</span> Server
  //             Reconnection Failed
  //           </p>
  //           <p className="text-center !text-white">
  //             Plese refresh the page for continue playing..
  //           </p>
  //           <div className="flex justify-center mt-5 ">
  //             <Button
  //               variant="contained"
  //               className="!bg-[#C3384E]"
  //               onClick={() => window.location.reload()}
  //             >
  //               OK
  //             </Button>
  //           </div>
  //         </Card>
  //       </div>
  //     </>
  //   );

  return (
    <div className=" h-full">
      {load_audio}
      {show_top_section}
      <div className="flex text-white   lg:flex-row-reverse flex-col">
        {/* // right section */}
        <div
          className={` w-[100%] h-auto lg:w-[75%]  bg-black p-2 pb-5 rounded-lg`}
        >
          {show_result}
          {airPlaneComponent}
        </div>
        {/* // left section */}
        <div
          className={`w-[100%] lg:w-[25%] lg:h-[88vh] h-[500px] ${gray} px-2 border-2 border-black rounded-lg`}
        >
          {shwoAllTabs}
          {myall_bets || myBets_Top}
        </div>
      </div>

      {menu_item}
      <div>adfaf</div>
    </div>
  );
};

export default PlayGame;
