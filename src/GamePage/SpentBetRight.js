import { CircularProgress, Switch } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useQuery, useQueryClient } from "react-query";

import { walletamountAviator } from "../services/apiCallings";
import { dummy_aviator, rupees } from "../services/urls";
import { gray } from "./color";
import { deCryptData } from "../shared/secret";

const SpentBetRight = ({ milliseconds, seconds, fk, formik }) => {
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const client = useQueryClient();
  const spent_amount2 = localStorage.getItem("spent_amount2");
  const amount_total =
    client.getQueriesData("walletamount_aviator")?.[0]?.[1]?.data?.data || 0;
  const pre_amount = Number(
    Number(amount_total?.wallet || 0) + Number(amount_total?.winning || 0)
  ).toFixed(2);

  const [loding, setloding] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Bet");
  const [betValue, setBetValue] = useState(10);

 
  const initialValues = {
    custombetValue_auto_cash_out: (0).toFixed(2) || 0,
    isbetActive: false,
  };

  const { data: walletdata } = useQuery(
    ["walletamount_aviator"],
    () => walletamountAviator(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus:false
    }
  );
  const wallet_amount = walletdata?.data?.data || 0;

  const rightbitfk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      console.log(rightbitfk.values);
    },
  });

  const spentBit = async () => {
    
    setloding(true);
    const reqbody = {
      id: user_id,
      userid: user_id,
      amount: betValue || 0,
      button_type: "b2",
    };
    if (Number(wallet_amount?.wallet) < Number(reqbody?.amount))
      toast("Your wallet amount is low");
    else {
      try {
        const response = await axios.post(
          `${dummy_aviator}/api/v1/apply-bet`,
          reqbody
        );
        if (response?.data?.msg === "Data save successfully") {
          localStorage.setItem("spent_amount2", reqbody?.amount);
          // client.refetchQueries("historydata");
          // client.refetchQueries("walletamount_aviator");
          fk.setFieldValue("isStart2", true);
          // getHistory();
        }
        toast.success(response?.data?.msg, {
          position: "top-center",
          topOffset: "20%",
        });
      } catch (e) {
        toast(e?.response?.data?.msg, {
          position: "top-center",
          topOffset: "20%",
        });
        console.log(e);
      }
      rightbitfk.setFieldValue("isbetActive", false);
    }
    setloding(false);
  };
  useEffect(() => {
    if (fk.values.isFlying && rightbitfk?.values?.isbetActive) {
      spentBit();
    } else {
      !rightbitfk?.values?.isbetActive && fk.setFieldValue("isStart2", false);
    }
  }, [fk.values.isFlying]);



  const cashOut = async (sec, mili) => {
    // const reqbody = {
    //   userid: (aviator_login_data && JSON.parse(aviator_login_data)?.id) || 2,
    //   amount:
    //     Number(betValue * Number(`${seconds}.${milliseconds}`))?.toFixed(2) ||
    //     0,
    //   gameno: gameno,
    //   multiplier: Number(`${sec}.${mili}`),
    // };
    // try {
    //   const response = await axios.get(
    //     `${endpoint.cash_out}?userid=${reqbody.userid}&amount=${reqbody.amount}&multiplier=${reqbody.multiplier}&gamesno=${reqbody?.gameno}`
    //   );

    const reqbody = {
      id: user_id,
      userid: user_id,
      amount: betValue * Number(`${seconds}.${milliseconds}`),
      multiplier: Number(`${sec}.${mili}`),
      button_type: "b2",
    };

    try {
      const response = await axios.post(
        `${dummy_aviator}/api/v1/cash-out`,
        reqbody
      );

      // toast(response?.data?.message);
      toast.success(
        <div className=" flex lg:gap-10 gap-5">
          <p className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400">
              You have cashed out
            </span>
            <span className="">{`${sec || 0}.${mili || 0} x`}</span>
          </p>
          <p className="flex flex-col bg-white bg-opacity-50 items-center rounded-full px-4 py-1">
            <span className="text-[12px]">Win, INR</span>
            <span className="">
              {`${
                betValue * seconds +
                  Number(milliseconds?.toString()?.substring(0, 1)) || 0
              }.${
                Number(milliseconds?.toString()?.substring(1, 2) || 1) * 10
              } x`}
            </span>
          </p>
        </div>
      );
    } catch (e) {
      toast(e?.response?.data?.message);
      console.log(e);
    }
    client.refetchQueries("walletamount_aviator");
    localStorage.removeItem("spent_amount2");
  };
  useEffect(() => {
    if (
      fk.values.isStart2 &&
      fk.values.isFlying &&
      pre_amount &&
      fk.values.autocashout2 &&
      Number(rightbitfk.values.custombetValue_auto_cash_out) ===
        Number(`${seconds}.${milliseconds}`)
    ) {
      fk.setFieldValue("isStart2", false);
        cashOut(seconds, milliseconds);
    }
  }, [milliseconds]);

  //  console.log(typeof(Number(`${seconds}.${milliseconds}`)),"aaa")
  return (
    <div
      className={`w-[100%]   lg:w-[50%] mt-2  flex justify-between lg:flex-row sm:flex-col md:flex-col`}
    >
      <div
        className={` h-full ${gray}  rounded-lg w-full p-2  
        ${
          fk.values.waitingForNextTime2
            ? "border-2  border-[#BC0319]"
            : fk.values.isStart2 && !fk.values.isFlying
            ? "border-2  border-[#BC0319]"
            : fk.values.isStart2 &&
              fk.values.isFlying &&
              "border-2  border-[#d47e3c]"
        }

        `}
      >
        <div className="flex justify-center">
          <div className="flex justify-center gap-3 w-[40%] lg:w-[30%] bg-black rounded-full">
            <p
              className={`text-[10px] bg-black px-10 py-1 rounded-full cursor-pointer ${
                selectedValue === "Bet" && `!bg-[#2C2D30]`
              }`}
              onClick={() => setSelectedValue("Bet")}
            >
              Bet
            </p>
            <p
              className={`text-[10px] bg-black px-10 py-1 rounded-full cursor-pointer ${
                selectedValue === "Auto" && `!bg-[#2C2D30]`
              }`}
              onClick={() => setSelectedValue("Auto")}
            >
              Auto
            </p>
          </div>
        </div>
        <div
          className={`w-full flex justify-center pt-3 gap-2 ${
            selectedValue === "Bet" && "lg:mt-5 mt:2"
          }`}
        >
          <div className=" lg:w-[20%] w-[45%]">
            <div
              className={`flex gap-2 items-center bg-black justify-evenly rounded-full  py-1  lg:py-0 lg:px-0`}
            >
              <CiCircleMinus
                className="cursor-pointer lg:text-xl text-2xl text-gray-400"
                onClick={() =>
                  setBetValue(betValue - 1 > 1 ? betValue - 1 : betValue)
                }
              />
              <p className="text-[15px] font-bold lg:py-0">
                {betValue?.toFixed(2)}
              </p>
              <CiCirclePlus
                className="cursor-pointer text-2xl text-gray-400"
                onClick={() =>
                  setBetValue(betValue + 1 > 1000 ? betValue : betValue + 1)
                }
              />
            </div>
            <div className="grid grid-cols-2 text-center text-[12px] lg:pt-2 pt-[2px]  gap-1">
              {[100, 200, 500, 1000]?.map((i) => {
                return (
                  <p
                    className={`bg-black rounded-full cursor-pointer lg:py-1 py-[4px] lg:text-[8px]`}
                    onClick={() => {
                      if (!spent_amount2) setBetValue(i);
                    }}
                  >
                    {i}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="w-[50%]">
            {fk.values.waitingForNextTime2 && (
              <p className="text-[10px] !text-[#BC0319]">
                Waiting for next round.
              </p>
            )}{" "}
            <div
              onClick={() => {
                // cancel
                if (fk.values.waitingForNextTime2) {
                  fk.setFieldValue("isStart2", false);
                  fk.setFieldValue("waitingForNextTime2", false);
                  localStorage.removeItem("spent_amount2");
                  rightbitfk.setFieldValue("isbetActive", false);
                  return;
                }
                // cancel
                if (fk.values.isStart2 && !fk.values.isFlying) {
                  fk.setFieldValue("isStart2", false);
                  localStorage.removeItem("spent_amount2");
                  rightbitfk.setFieldValue("isbetActive", false);
                  return;
                }
                // cash out
                if (fk.values.isStart2 && fk.values.isFlying) {
                  fk.setFieldValue("isStart2", false);
                  if (pre_amount && spent_amount2)
                    cashOut(seconds, milliseconds);
                }
                // spent bet
                else {
                  if (fk.values.isFlying) {
                    fk.setFieldValue("waitingForNextTime2", true);
                  }
                  if (pre_amount) {
                    rightbitfk.setFieldValue("isbetActive", true);
                    fk.setFieldValue("isStart2", true);
                  } else {
                    toast("Amount is low!");
                  }
                }
              }}
              className={`
            flex flex-col justify-center px-[20%]  rounded-2xl border-2 border-white border-opacity-30 shadow-lg z-20 cursor-pointer
            ${
              fk.values.waitingForNextTime2
                ? "bg-[#BC0319]"
                : fk.values.isStart2 && fk.values.isFlying && spent_amount2
                ? "bg-gradient-to-t from-[#d47e3c] to-[#e59c6f]"
                : fk.values.isStart2 && !fk.values.isFlying
                ? "bg-[#BC0319]"
                : "bg-[#28A909]"
            }
            `}
            >
              {loding ? (
                <div className="w-full flex justify-center py-6 lg:py-4">
                  <CircularProgress />
                </div>
              ) : !fk.values.waitingForNextTime2 ? (
                <div className="flex flex-col w-full py-3 lg:py-3 font-semibold">
                  <span
                    className={`text-lg text-center ${
                      fk.values.isStart2 && !fk.values.isFlying && "py-4"
                    }`}
                  >
                    {fk.values.isStart2 &&
                    fk.values.isFlying &&
                    pre_amount &&
                    spent_amount2
                      ? "Cash Out"
                      : fk.values.isStart2 && !fk.values.isFlying
                      ? "Cancel"
                      : "BET"}
                  </span>
                  <span
                    className={`text-lg text-center`}
                    style={{ margin: "-8px 0 0" }}
                  >
                    {fk.values.isStart2 && !fk.values.isFlying
                      ? ""
                      : fk.values.isStart2 && spent_amount2
                      ? `${Number(
                          betValue * Number(`${seconds}.${milliseconds}`)
                        )?.toFixed(2)} x`
                      : `${betValue?.toFixed(2) || 0} ${rupees}`}
                  </span>
                </div>
              ) : (
                <>
                  <p className="text-lg font-extrabold text-center py-3">
                    {"Cancel"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        {selectedValue === "Auto" && (
          <div className="w-full  flex justify-center !pl-4 items-center  gap-4 mt-2">
            <p
              // onClick={() => setOpenCustomDialogBox(true)}
              className="bg-[#1D7ACA] lg:text-[10px]  text-[8px] whitespace-nowrap  rounded-full px-3 py-1 cursor-pointer text-center"
            >
              AUTO PLAY
            </p>
            <p className="text-[10px] whitespace-nowrap">
              Auto Cash Out{" "}
              <span>
                {" "}
                <Switch
                  checked={fk.values.autocashout2}
                  color="secondary"
                  onClick={() => {
                    const customBetValue = Number(
                      rightbitfk?.values?.custombetValue_auto_cash_out || 0
                    );
                    if (customBetValue < 1.1) {
                      toast("Value should be greater than 1.1");
                    } else {
                      fk.setFieldValue("autocashout2", !fk.values.autocashout2);
                    }
                  }}
                />
              </span>
            </p>
            <p>
              <input
                readOnly={!fk.values.autocashout2 === false}
                placeholder="Enter Value"
                className={`!bg-black px-2 text-[12px] rounded-full py-1 w-[60%] outline-none ${
                  fk.values.autocashout2
                    ? "text-white"
                    : "!text-gray-400 bg-opacity-30"
                } `}
                value={rightbitfk?.values?.custombetValue_auto_cash_out}
                onChange={(e) =>
                  rightbitfk.setFieldValue(
                    "custombetValue_auto_cash_out",
                    e.target.value
                  )
                }
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpentBetRight;

// {openCustomDialogBox && (
//   <Dialog
//     open={openCustomDialogBox}
//     TransitionComponent={Transition}
//     keepMounted
//     onClose={setOpenCustomDialogBox}
//     aria-describedby="alert-dialog-slide-description"
//     PaperProps={{ className: `!max-w-[1000px] !bg-black ` }}
//   >
//     <div className="flex justify-between p-2 items-center bg-black gap-5">
//       <p className="text-white text-[12px]">Auto Play Options</p>
//       <RxCross2
//         className="!text-white cursor-pointer"
//         onClick={() => setOpenCustomDialogBox(false)}
//       />
//     </div>
//     <DialogContent className="!text-white">
//       <AutoPlayBtn1 />
//     </DialogContent>
//   </Dialog>
// )}

// import { CircularProgress, Switch } from "@mui/material";
// import axios from "axios";
// import React, { useState } from "react";
// import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
// import { gray, graymedium } from "./color";
// import toast from "react-hot-toast";

// const SpentBetRight = ({ milliseconds, seconds, fk, formik }) => {
//   const [loding, setloding] = useState(false);
//   const logindata = localStorage.getItem("aviator_data");
//   const [selectedValue, setSelectedValue] = useState("Bet");
//   const [betValue, setBetValue] = useState(10);
//   const [custombetValue, setCustomBetValue] = useState(5);
//   const [gameno, setgameno] = useState({});

//   const spentBit = async () => {
//     setloding(true);
//     const reqbody = {
//       userid: JSON.parse(logindata)?.id || 2,
//       amount:
//         selectedValue === "Bet" ? betValue : Number(custombetValue || 0) || 0,
//     };
//     console.log(reqbody);
//     try {
//       const response = await axios.get(
//         `https://gameszone.life/api/aviator/bet_now?userid=${reqbody?.userid}&amount=${reqbody?.amount}`
//       );
//       toast(response?.data?.message);
//     } catch (e) {
//       toast(e?.response?.data?.message);
//       console.log(e);
//     }
//     // startFly("right");
//     fk.setFieldValue("isStart2", true);
//     setloding(false);
//     getHistory();
//   };

//   const getHistory = async () => {
//     const userid = JSON.parse(logindata)?.id || 2;

//     try {
//       const response = await axios.get(
//         `https://gameszone.life/api/aviator/bet_histroy?userid=${userid}&limit=${1}`
//       );
//       console.log(response);
//       setgameno(response?.data?.data[0]?.gamesno);
//     } catch (e) {
//       toast(e?.message);
//       console.log(e);
//     }
//   };

//   const cashOut = async (sec, mili) => {
//     const reqbody = {
//       userid: JSON.parse(logindata)?.id || 2,
//       amount:
//         selectedValue === "Bet" ? betValue : Number(custombetValue || 0) || 0,
//       gameno: gameno,
//       multiplier: Number(`${sec}.${mili}`),
//     };
//     console.log(reqbody);
//     try {
//       const response = await axios.get(
//         `https://gameszone.life/api/aviator/cash_out?userid=${reqbody.userid}&amount=${reqbody.amount}&multiplier=1&gamesno=22273`
//       );
//       toast(response?.data?.message);
//     } catch (e) {
//       toast(e?.response?.data?.message);
//       console.log(e);
//     }
//   };

//   return (
//     <div
//       className={`w-[100%] lg:w-[50%] mt-2  flex justify-between lg:flex-row sm:flex-col md:flex-col`}
//     >
//       <div
//         className={` h-full ${gray}  rounded-lg w-full border-r-2 border-black p-2`}
//       >
//         <div className="flex justify-center">
//           <div className="flex justify-center gap-3  w-[40%] lg:w-[30%] bg-black rounded-full">
//             <p
//               className={`text-[10px] bg-black px-6 py-1 rounded-full cursor-pointer ${
//                 selectedValue === "Bet" && `!bg-[#2C2D30]`
//               }`}
//               onClick={() => setSelectedValue("Bet")}
//             >
//               Bet
//             </p>
//             <p
//               className={`text-[10px] bg-black px-6 py-1 rounded-full cursor-pointer ${
//                 selectedValue === "Auto" && `!bg-[#2C2D30]`
//               }`}
//               onClick={() => setSelectedValue("Auto")}
//             >
//               Auto
//             </p>
//           </div>
//         </div>
//         <div
//           className={`w-full flex justify-center pt-3 gap-2 ${
//             selectedValue === "Bet" && "lg:mt-5 mt:2"
//           }`}
//         >
//           <div className=" lg:w-[20%] w-[45%]">
//             <div
//               className={`flex gap-2 items-center bg-black justify-evenly rounded-full  py-1  lg:py-0 lg:px-0`}
//             >
//               <CiCircleMinus
//                 className="cursor-pointer text-2xl text-gray-400"
//                 onClick={() =>
//                   setBetValue(betValue - 0.1 > 0.1 ? betValue - 0.1 : betValue)
//                 }
//               />
//               <p className="text-[15px] font-bold  lg:py-0">{betValue?.toFixed(2)}</p>
//               <CiCirclePlus
//                 className="cursor-pointer text-2xl text-gray-400"
//                 onClick={() => setBetValue(betValue + 0.1)}
//               />
//             </div>
//             <div className="grid grid-cols-2 text-center text-[12px] pt-2 gap-1">
//               {[100, 200, 500, 10000]?.map((i) => {
//                 return (
//                   <p
//                     className={`bg-black rounded-full cursor-pointer lg:py-0 py-[4px] lg:text-[8px]`}
//                     onClick={() => setBetValue(i)}
//                   >
//                     {i}
//                   </p>
//                 );
//               })}
//             </div>
//           </div>
//           <div className="w-[50%]">
//             {fk.values.waitingForNextTime2 && (
//               <p className="text-[10px] !text-red-500">
//                 Waiting for next round.
//               </p>
//             )}{" "}
//             <div
//               onClick={() => {
//                 if (fk.values.isStart2) {
//                   fk.setFieldValue("isStart2", false);
//                   cashOut(seconds, milliseconds);
//                 } else {
//                   if (fk.values.isFlying) {
//                     fk.setFieldValue("waitingForNextTime2", true);
//                     return
//                   }
//                   spentBit();
//                 }
//               }}
//               className={`
//             flex flex-col justify-center px-[20%]  rounded-2xl border-2 border-white border-opacity-30 shadow-lg z-20 cursor-pointer
//             ${
//               fk.values.isStart2
//                 ? "bg-gradient-to-t from-[#d47e3c] to-[#e59c6f]"
//                 : "bg-[#28A909]"
//             }
//             ${
//               fk.values.waitingForNextTime2 &&
//               "bg-gradient-to-t from-[#c62424] to-[#e84e4e]"
//             }
//             `}
//             >
//               {loding ? (
//                 <div className="w-full flex justify-center py-6 lg:py-4">
//                   <CircularProgress />
//                 </div>
//               ) : !fk.values.waitingForNextTime2 ? (
//                 <div className="flex flex-col -gap-4  w-full  items-center py-4 lg:py-2  justify-center  ">
//                   <p className="text-lg  text-center ">
//                     {fk.values.isStart2 ? "Cash Out" : "BET"}
//                   </p>
//                   <p className="text-lg ext-center">
//                     {fk.values.isStart2
//                       ? `${seconds}.${milliseconds} x`
//                       : `${betValue.toFixed(2)} USD`}
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <p className="text-lg font-extrabold text-center py-5">
//                     {"Cancel"}
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         {selectedValue === "Auto" && (
//           <div className="w-full flex justify-center !pl-4 items-center  gap-4 mt-2">
//             <p className="bg-[#1D7ACA] lg:text-[10px]  text-[8px] whitespace-nowrap rounded-full px-3 py-1 cursor-pointer text-center">
//               AUTO PLAY
//             </p>
//             <p className="text-[10px] whitespace-nowrap">
//               Auto Cash Out{" "}
//               <span>
//                 {" "}
//                 <Switch defaultChecked color="secondary" />
//               </span>
//             </p>
//             <p>
//               <input
//                 placeholder="Enter Value"
//                 className={`px-2 text-[12px] rounded-full py-1 w-[60%] outline-none !bg-black `}
//                 value={custombetValue}
//                 onChange={(e) => setCustomBetValue(e.target.value)}
//               />
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpentBetRight;
