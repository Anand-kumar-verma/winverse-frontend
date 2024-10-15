import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import loderImage from "../assets/loderimage.png";
import plane1 from "../assets/plan1.svg";
import plane2 from "../assets/plan2.svg";
import {
  byTimeIsEnableMusic,
  byTimeIsEnableSound,
} from "../redux/slices/counterSlice";
import {
  demomobile,
  demomobilesec,
  demomolap,
  demomolaponesec,
} from "./AnimationAirPlan";
import {
  ButtomDottedPoint,
  ButtomDottedPointMoveable,
  LeftDottedPoint,
  LeftDottedPointMoveable,
} from "./DottedPoint";
import SpentBetLeft from "./SpentBetLeft";
import SpentBetRight from "./SpentBetRight";
import betmusic from "../assets/place_your_bet.mp3";
import { useSocket } from "../shared/socket/SocketContext";

const AirPlane = ({ formik, fk }) => {
  const socket = useSocket();
  let timerInterval;
  const dispatch = useDispatch();
  const backgroundImage_url = useSelector(
    (state) => state.aviator.backgroundImage_url
  );
  const [waiting_for_next_round, set_waiting_for_next_round] = useState(true);
  const waiting_aviator = useSelector((state) => state.aviator.waiting_aviator);
  const isMediumScreen = useMediaQuery({ minWidth: 800 });
  const [bottomLeftCoordinate, setBottomLeftCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [crash, setcrashed] = useState(false);
  const [combineTime, setcombineTime] = useState("0_0");
  const [initialCordinate, setInitialCordinate] = useState({ x: 0, y: 0 });
  let milliseconds = combineTime?.split("_")?.[0].substring(0, 2);
  let seconds = Number(combineTime?.split("_")?.[1]);
  const client = useQueryClient();
  let bool = true;
  const audioRefMusic = useRef(null);

  useEffect(()=>{
    startFly(900)
    // fk.setFieldValue("closeButtomDot", true);
  },[])

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      startFly(newMessage);
      fk.setFieldValue("closeButtomDot", true);
    };

    const handleSeconds = (seconds) => {
      setcombineTime(seconds);
    };

    const handleSetColorOfDigit = (color_value) => {
      fk.setFieldValue("setcolorofdigit", color_value);
    };

    const handleSetLoader = (setloder) => {
      setloder && handlePlayMusic();
      fk.setFieldValue("setloder", setloder);
      setcombineTime("0_0");
    };

    const handleIsFlying = (isFlying) => {
      fk.setFieldValue("isFlying", isFlying);
    };

    const handlecrash = (isFlying) => {
      setcrashed(isFlying);
      setTimeout(() => {
        client.refetchQueries("allresult");
      }, 2000);
    };
    socket.on("message", handleNewMessage);
    socket.on("seconds", handleSeconds);
    socket.on("setcolorofdigit", handleSetColorOfDigit);
    socket.on("setloder", handleSetLoader);
    socket.on("isFlying", handleIsFlying);
    socket.on("crash", handlecrash);
    return () => {
      socket.off("message", handleNewMessage);
      socket.off("seconds", handleSeconds);
      socket.off("setcolorofdigit", handleSetColorOfDigit);
      socket.off("setloder", handleSetLoader);
      socket.off("isFlying", handleIsFlying);
      socket.off("crash", handlecrash);
    };
  }, []);

  function hii(randomFlyingTime) {
    const mainDiv = document.getElementsByClassName("maindiv")[0];
    const style = document.createElement("style");
    if (randomFlyingTime < 10) {
      if (!isMediumScreen) style.innerHTML = demomobilesec;
      else style.innerHTML = demomolaponesec;
    } else {
      if (!isMediumScreen) style.innerHTML = demomobile;
      else style.innerHTML = demomolap;
    }
    document.head.appendChild(style);

    mainDiv.style.animation = "";
    mainDiv.style.animation = "slidein 5s linear forwards running";

    mainDiv.addEventListener("animationend", () => {
      if (mainDiv.style.animationName === "slidein") {
        // After slidein animation ends, start slideafter animation
        mainDiv.style.animation = "slideafter 5s linear forwards running 50";
      } else if (mainDiv.style.animationName === "slideafter") {
        // If needed, you can add more conditions for other animations
      }
    });
  }

  useEffect(() => {
    const mainDiv = document.getElementsByClassName("maindiv")[0];
    if (crash === true) {
      fk.setFieldValue("isShadowPath", false);
      clearInterval(timerInterval);
      dispatch(byTimeIsEnableSound(true));
      // Remove any current animation and apply thirdAnimation
      mainDiv.style.animation = "";
      mainDiv.style.animation = "thirdAnimation .5s linear forwards running";

      setTimeout(() => {
        dispatch(byTimeIsEnableSound(false));
      }, 4000);
      client.refetchQueries("historydata");
      dispatch(byTimeIsEnableMusic(false));
      fk.setFieldValue("isShadowPath", false);
      localStorage.removeItem("spent_amount1");
      fk.setFieldValue("waitingForNextTime1", false);
      fk.setFieldValue("waitingForNextTime2", false);
      formik.setFieldValue("refetch", Number(formik.values.refetch) + 1);
      fk.setFieldValue("isShadowPath", false);
      setTimeout(()=>{
        fk.setFieldValue("isShadowPath", false);
      },1000)
    }
  }, [crash]);

  function startFly(randomFlyingTime) {
    bool = true;

    dispatch(byTimeIsEnableMusic(true));

    fk.setFieldValue("closeButtomDot", true);
    fk.setFieldValue("isEnablingWinner", true);
    const mainDiv = document.getElementsByClassName("maindiv")[0];
    hii(randomFlyingTime);

    timerInterval = setInterval(() => {
      const airplainimage = document.getElementsByClassName("maindiv")[0];
      const parentDiv = document.getElementsByClassName("parentdiv")[0]; // Assuming "maindiv" is the parent element
      const airplainRect = airplainimage?.getBoundingClientRect();
      const parentRect = parentDiv?.getBoundingClientRect();
      const newBottomLeftCoordinates = {
        x: airplainRect?.x - parentRect?.x,
        y: airplainRect?.y - parentRect?.y,
      };

      if (bool) {
        setInitialCordinate(newBottomLeftCoordinates);
        bool = false;
      }
      setBottomLeftCoordinates(newBottomLeftCoordinates);
    }, 10);

    return () => clearInterval(timerInterval);
  }


  useEffect(() => {
    Number(milliseconds) >= 3 && fk.setFieldValue("isShadowPath", true);
  }, [milliseconds]);

  useEffect(() => {
    fk.values.setloder === true && set_waiting_for_next_round(false);
  }, [fk.values.setloder]);

  // setTimeout(() => {
  //   fk.setFieldValue("closeButtomDot", false);
  // }, 10000);

  const handlePlayMusic = async () => {
    try {
      if (audioRefMusic && audioRefMusic.current) {
        await audioRefMusic.current.play();
        console.log("Audio played successfully");
      } else {
        console.error(
          "audioRefMusic or audioRefMusic.current is null or undefined"
        );
      }
    } catch (error) {
      console.error("Error during play:", error);
    }
  };

  // if (waiting_for_next_round)
  //   return useMemo(() => {
  //     return <div>HIii</div>;
  //   }, []);
  let move_to_buttom_mobile = 36;
  let move_to_buttom_desktop = 32;
  return (
    <>
      <div
        className={`${
          !waiting_aviator && "lg:py-8 py-9"
        } moved parentdiv relative lg:h-[60vh]  h-[35vh] w-[99.8%] overflow-hidden  rounded-3xl mt-1 border-[1px] border-white border-opacity-10`}
      >
        <audio ref={audioRefMusic} hidden>
          <source src={betmusic} type="audio/mp3" />
        </audio>

        <>
          {useMemo(() => {
            return (
              <img
                src={backgroundImage_url}
                className={`${
                  backgroundImage_url ===
                  "https://res.cloudinary.com/do7kimovl/image/upload/v1709114502/circle_dafpdo.svg"
                    ? "absolute  -bottom-[400%] left-0 rotate_background_image !z-0 bg-gradient-to-l from-[#000000] via-[#5a125a] to-[#0a070e] bg-opacity-5 w-[900%] h-[900%]"
                    : "bgimagedynamic !z-0 absolute  top-0 left-0 h-full w-[99.8%]"
                }  object-cover `}
              />
            );
          })}
          {fk.values.isShadowPath &&
            (isMediumScreen ? (
              // Change this value to shift the SVG paths

              <svg
                width="100%"
                height="60vh"
                xmlns="http://www.w3.org/2000/svg"
                className="z-10 absolute"
              >
                <path
                  d={`M -10 ${
                    initialCordinate.y + 24 + move_to_buttom_desktop
                  } C ${
                    bottomLeftCoordinate.x < 300
                      ? bottomLeftCoordinate.x - 40
                      : 300
                  } ${initialCordinate.y + 20 + move_to_buttom_desktop}, ${
                    bottomLeftCoordinate.x < 500
                      ? bottomLeftCoordinate.x - 20
                      : 500
                  } ${initialCordinate.y + 20 + move_to_buttom_desktop}, ${
                    bottomLeftCoordinate.x + 17
                  } ${bottomLeftCoordinate.y + 22 + move_to_buttom_desktop} L ${
                    bottomLeftCoordinate.x + 10
                  } ${initialCordinate.y + 30 + move_to_buttom_desktop} L 10 ${
                    initialCordinate.y + 30 + move_to_buttom_desktop
                  } Z`}
                  fill="rgba(112,9,25, 0.6)"
                  stroke-width="3"
                  stroke-dasharray="1000 0"
                  stroke-linejoin="round"
                />
                <path
                  d={`M -10 ${
                    initialCordinate.y + 25 + move_to_buttom_desktop
                  } C ${
                    bottomLeftCoordinate.x < 300
                      ? bottomLeftCoordinate.x - 40
                      : 300
                  } ${initialCordinate.y + 23 + move_to_buttom_desktop}, ${
                    bottomLeftCoordinate.x < 500
                      ? bottomLeftCoordinate.x - 20
                      : 500
                  } ${initialCordinate.y + 23 + move_to_buttom_desktop}, ${
                    bottomLeftCoordinate.x + 17
                  } ${bottomLeftCoordinate.y + 21 + move_to_buttom_desktop}`}
                  stroke="#a10019"
                  stroke-width="4"
                  fill="none"
                />
              </svg>
            ) : (
              <svg
                width="100%"
                height="35vh"
                xmlns="http://www.w3.org/2000/svg"
                className="z-10 absolute"
              >
                <path
                  className="!absolute !bottom-0 !left-0"
                  d={`M -10 ${initialCordinate.y + move_to_buttom_mobile} C ${
                    bottomLeftCoordinate.x < 80
                      ? bottomLeftCoordinate.x - 10
                      : 80
                  } ${initialCordinate.y + move_to_buttom_mobile}, ${
                    bottomLeftCoordinate.x < 120
                      ? bottomLeftCoordinate.x - 5
                      : 120
                  } ${initialCordinate.y + move_to_buttom_mobile},${
                    bottomLeftCoordinate.x + 12
                  } ${bottomLeftCoordinate.y - 1 + move_to_buttom_mobile} L ${
                    bottomLeftCoordinate.x + 15
                  } ${initialCordinate.y + 3 + move_to_buttom_mobile} L ${
                    bottomLeftCoordinate.y + move_to_buttom_mobile
                  } ${initialCordinate.y + 3 + move_to_buttom_mobile} Z`}
                  fill="rgba(112,9,25, 0.6)"
                  stroke-width="3"
                  stroke-dasharray="1000 0"
                  stroke-linejoin="round"
                />
                <path
                  className="!absolute !bottom-0 !left-0"
                  d={`M -10 ${initialCordinate.y + move_to_buttom_mobile} C ${
                    bottomLeftCoordinate.x < 80
                      ? bottomLeftCoordinate.x - 10
                      : 80
                  } ${initialCordinate.y + move_to_buttom_mobile}, ${
                    bottomLeftCoordinate.x < 120
                      ? bottomLeftCoordinate.x - 5
                      : 120
                  } ${initialCordinate.y + move_to_buttom_mobile},${
                    bottomLeftCoordinate.x + 12
                  } ${bottomLeftCoordinate.y - 1 + move_to_buttom_mobile} `}
                  stroke="#a10019"
                  stroke-width="3"
                  fill="none"
                />
              </svg>
            ))}
          <div className="maindiv absolute bottom-[20px] left-[20px]  animate-slidein infinite ">
            {/* {useMemo(() => {
              return (
                fk.values.isEnablingWinner && (
                  <p className="winslider z-20 rounded-full px-4 py-1">

                  </p>
                )
              );
            }, [fk.values.isEnablingWinner])} */}

            {useMemo(() => {
              return (
                <div className="relative lg:w-[120px] w-[80px] lg:h-[60px] !z-50 ">
                  <img
                    src={Number(milliseconds || 0) % 3 === 0 ? plane1 : plane2}
                    className="airplain  lg:w-[120px] w-[80px] lg:h-[60px]  h-[40px] text-[#a10019] "
                  />
                </div>
              );
            }, [milliseconds])}
          </div>
          {/* fk.values.isFlying */}
          {useMemo(() => {
            return (
             true && (
                <>
                  {/* !fk.values.closeButtomDot */}
                  {true ? (
                    <>
                      <LeftDottedPointMoveable />
                      <ButtomDottedPointMoveable />
                      {/* <TopDottedPointMoveable />
                  <RightDottedPointMoveable /> */}
                    </>
                  ) : (
                    <>
                      <LeftDottedPoint />
                      <ButtomDottedPoint />
                      {/* <TopDottedPoint />
                  <RightDottedPoint /> */}
                    </>
                  )}
                </>
              )
            );
          }, [])}
          {/* fk.values.isFlying, fk.values.closeButtomDot */}
          <div className="absolute w-[100%] bottom-0 left-0"></div>
          {/* fk.values.setloder */}
          {fk.values.setloder ? (
            <div
              className={`
        absolute text-6xl lg:text-7xl   left-[13%] top-[25%] lg:left-[37%] lg:top-[20%] font-bold  text-white
        flex flex-col justify-center items-center
        `}
            >
              <div className="flex justify-center flex-col items-center gap-1 lg:gap-3">
                <img
                  src={
                    loderImage ||
                    "https://res.cloudinary.com/do7kimovl/image/upload/v1708426809/loderimage_pc4eyd.png"
                  }
                  className="lg:w-[46%] lg:h-[46%] w-[33%] h-[33%] rotate-animation"
                />
                {/* <img src="https://res.cloudinary.com/do7kimovl/image/upload/v1708426809/loderimage_pc4eyd.png" className="w-[46%] h-[46%] rotate-animation" /> */}
                <p className="lg:text-lg !text-2xl font-thin">
                  <span className="lg:!text-2xl text-[20px] !font-bold whitespace-nowrap">
                    WAITING FOR NEXT ROUND
                  </span>
                </p>
                <div className="lg:h-[5px] h-[4px] w-[110px] lg:w-[155px] rounded-r-full rounded-l-full relative  bg-[#BC0319] ">
                  <div className="loder-waiting-for-next-round !rounded-full"></div>
                </div>
              </div>
            </div>
          ) : (
            <p
              className={`
        absolute text-6xl lg:text-7xl   left-[30%] top-[35%] lg:left-[42%] lg:top-[38%]   text-white
        ${fk.values.setcolorofdigit  && "!text-[#BC0319]"}
        flex flex-col
        `}
            >
              {fk.values.setcolorofdigit && (
                <p className="!text-2xl lg:pr-5 text-white text-center !font-bold w-full">
                  FLEW AWAY!
                </p>
              )}
              {/*
              {waiting_for_next_round ? (
                <Dialog open={true} className=" lg:!ml-80 ">
                  <div>
                    <div className="lg:pt-1 text-center p-2  lg:text-lg  font-bold">
                      Let's complete previous round
                    </div>
                    <div className="!font-semibold grid grid-cols-3  justify-center lg:w-80 !ml-2 w-[190px] h-16 lg:h-40">
                      <div className="flex justify-center text-center lg:text-9xl text-5xl lg:px-36  px-28">{`${seconds}.${String(
                        milliseconds
                      ).padStart(2, "0")}`}</div>
                    </div>
                  </div>
                </Dialog>
              ) : (
                <div className="!font-semibold grid grid-cols-3 lg:w-[225px] w-[190px]">
                  <span className="col-span-2">{`${seconds}.${String(
                    milliseconds
                  ).padStart(2, "0")}`}</span>
                  <span style={{ marginLeft: "4px" }}>x</span>
                </div>
              )} 
               */}
               <div className="!font-semibold grid grid-cols-3 lg:w-[225px] w-[190px]">
                  <span className="col-span-2">{`${seconds}.${String(
                    milliseconds
                  ).padStart(2, "0")}`}</span>
                  <span style={{ marginLeft: "4px" }}>x</span>
                </div>
            </p>
          )}
        </>

        {/* <p className="absolute lg:text-8xl text-4xl left-[37%] top-[40%] font-bold text-purple-500">{`${seconds}.${milliseconds} x `}</p> */}
      </div>
      <div className="flex w-[100%] lg:gap-3 gap-0 flex-col lg:flex-row lg:mt-0 md:mt-[20%] sm:mt-[20%]">
        <SpentBetLeft
          milliseconds={milliseconds}
          seconds={seconds} // phle yha par seconds+1 thA
          fk={fk}
          startFly={startFly}
          formik={formik}
        />
        {/* <SpentBetRight
          milliseconds={milliseconds}
          seconds={seconds} // phle yha par seconds+1 thA
          fk={fk}
          startFly={startFly}
        /> */}
      </div>
    </>
  );
};

export default AirPlane;
