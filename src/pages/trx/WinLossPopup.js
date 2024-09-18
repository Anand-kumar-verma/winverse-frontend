// import { Box, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import Loss from "../../assets/images/loss.png";
// import zero from "../../assets/images/n0-30bd92d1.png";
// import one from "../../assets/images/n1-dfccbff5.png";
// import two from "../../assets/images/n2-c2913607.png";
// import three from "../../assets/images/n3-f92c313f.png";
// import four from "../../assets/images/n4-cb84933b.png";
// import five from "../../assets/images/n5-49d0e9c5.png";
// import six from "../../assets/images/n6-a56e0b9a.png";
// import seven from "../../assets/images/n7-5961a17f.png";
// import eight from "../../assets/images/n8-d4d951a4.png";
// import nine from "../../assets/images/n9-a20f6f42 (1).png";
// import win from "../../assets/images/winnner.png";
// import { returnWinningAmount } from "../../services/apiCallings";
// import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
// const WinLossPopup = ({ gid, setOpenDialogBox }) => {

//   let array = [zero, one, two, three, four, five, six, seven, eight, nine];
//   const result = localStorage.getItem("anand_re");

//   console.log(localStorage.getItem("betApplied"));
//   const [loding, setloding] = useState(false);
//   const [status, setstatus] = useState("");
//   const [newstatus, setstatusNew] = useState("");
//   const next_step = useSelector((state) => state.aviator.next_step);
//   const MyHistoryFn = async () => {
//     setloding(true);
//     try {
//       let winAmnt = 0;
//       let totalBet_amount = 0;
//       const total_bet = localStorage.getItem("total_bet");
//       const arrayLength =
//         total_bet !== "undefined" && total_bet && JSON.parse(total_bet);
//       arrayLength?.forEach((i) => {
//         let win = returnWinningAmount(
//           Number(i?.data?.split("_")?.[2]),
//           Number(i?.data?.split("_")?.[3]),
//           Number(result) - 1
//         );
//         totalBet_amount += Number(i?.data?.split("_")?.[3]) * ((100 - 3) / 100);
//         if (win) winAmnt += Number(win);
//       });

//       if (winAmnt) {
//         setstatus({
//           status: "1",
//           amount: winAmnt,
//         });
//       } else {
//         setstatus({
//           status: "2",
//           amount: totalBet_amount,
//         });
//       }
//       setTimeout(() => {
//         setOpenDialogBox(false);
//         localStorage.setItem("betApplied", false);
//         localStorage.removeItem("total_bet");
//         localStorage.removeItem("anand_re");
//       }, 5000);
//     } catch (e) {
//       toast(e?.message);
//       console.log(e);
//     }
//     setloding(false);
//   };

//   useEffect(() => {
//     MyHistoryFn();
//   }, []);

//   useEffect(() => {
//     setstatusNew(status);
//   }, [status]);

//   if (loding) return <CustomCircularProgress isLoading={loding} />;
//   return (
//     <Box
//       sx={{
//         width: "300px",
//         height: "400px",
//         margin: "auto",
//         backgroundImage: `url(${
//           (status?.status === "1" && Loss) || (status?.status === "2" && win)
//         })`,
//         // backgroundImage: `url(${win})`,
//         backgroundSize: "100% 100%",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         position: "relative",
//       }}
//     >
//       {!loding && newstatus && (
//         <>
//           <Typography
//             variant="body1"
//             color="initial"
//             className="crlg !text-center"
//           >
//             {(status?.status === "1" && "Congratulations") ||
//               (status?.status === "2" && "Loss")}
//           </Typography>

//           {/* <Box className="winerpoint">
//         <Typography variant="body1" color="initial">
//           Game Results{" "}
//         </Typography>
//         <Typography variant="body1" color="initial">
//           green
//         </Typography>
//         <Box component="img" src={pr0} width={30} sx={{ mr: "5px" }}></Box>
//         <Typography variant="body1" color="initial">
//           small
//         </Typography>
//       </Box> */}
//           <Typography
//             variant="body1"
//             color="initial"
//             className={`bonustext ${
//               status?.status === "1" ? "!text-white" : "!text-white"
//             }
//             !mr-0
//             `}
//           >
//             {(status?.status === "1" && (
//               <>
//                 <div className="!text-sm !ml-7 !flex !items-center !gap-2">
//                   <span>Game Results: </span>
//                   <span
//                     className={`${
//                       [1, 3, 7, 9]?.includes(Number(result) - 1)
//                         ? "!bg-green-500"
//                         : "!bg-red-500"
//                     }
//                   ${
//                     String(Number(result) - 1) === String(0) &&
//                     "!bg-gradient-to-r from-red-500 to-purple-500"
//                   }
//                   ${
//                     String(Number(result) - 1) === String(5) &&
//                     "!bg-gradient-to-r from-green-500 to-purple-500"
//                   }
//                   !text-center !p-2 !rounded-md
//                   `}
//                   >
//                     {(String(Number(result) - 1) === String(0) &&
//                       "Red Purple") ||
//                     (String(Number(result) - 1) === String(5) &&
//                       "Green Purple") ||
//                     [1, 3, 7, 9]?.includes(Number(result) - 1)
//                       ? "Green"
//                       : "Red"}
//                   </span>
//                   <img
//                     className="!h-[10%] !w-[10%]"
//                     src={array[Number(result) - 1]}
//                   />
//                   <span
//                     className={`${
//                       [1, 3, 7, 9]?.includes(Number(result) - 1)
//                         ? "!bg-green-500"
//                         : "!bg-red-500"
//                     }
//                   ${
//                     String(Number(result) - 1) === String(0) &&
//                     "!bg-gradient-to-r from-red-500 to-purple-500"
//                   }
//                   ${
//                     String(Number(result) - 1) === String(5) &&
//                     "!bg-gradient-to-r from-green-500 to-purple-500"
//                   }
//                   !text-center !p-2 !rounded-md
//                   `}
//                   >
//                     {Number(result) - 1 <= 4 ? "Small" : "Big"}
//                   </span>
//                 </div>
//                 <div className="!text-[20px] !mt-4">Bonus</div>
//               </>
//             )) ||
//               (status?.status === "2" && "Loss Amount")}
//           </Typography>
//           <Typography
//             variant="body1"
//             color="initial"
//             className={`bonusamt  ${
//               status?.status === "1" ? "!text-green-500" : "!text-red-300"
//             }`}
//           >
//             ₹ {Number(status?.amount || 0)?.toFixed(2) || 0}
//           </Typography>
//           <Typography
//             variant="body1"
//             color="initial"
//             className={`bonuspr ${
//               status?.status === "1" ? "!text-pink-500" : "!text-red-300"
//             } !text-sm`}
//           >
//             Period Minute: {Number(next_step) }
//           </Typography>
//           <Typography variant="body1" color="initial" className="bonuscl">
//             Auto Close in 3 sec{" "}
//           </Typography>
//         </>
//       )}
//     </Box>
//   );
// };

// export default WinLossPopup;

/////////////////////// copy

import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loss from "../../assets/images/loss.png";
import zero from "../../assets/images/n0-30bd92d1.png";
import one from "../../assets/images/n1-dfccbff5.png";
import two from "../../assets/images/n2-c2913607.png";
import three from "../../assets/images/n3-f92c313f.png";
import four from "../../assets/images/n4-cb84933b.png";
import five from "../../assets/images/n5-49d0e9c5.png";
import six from "../../assets/images/n6-a56e0b9a.png";
import seven from "../../assets/images/n7-5961a17f.png";
import eight from "../../assets/images/n8-d4d951a4.png";
import nine from "../../assets/images/n9-a20f6f42 (1).png";
import win from "../../assets/images/winnner.png";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { deCryptData } from "../../shared/secret";
const WinLossPopup = ({ gid, setOpenDialogBox }) => {
  //   const login_data = localStorage.getItem("logindataen") && CryptoJS.AES.decrypt(localStorage.getItem("logindataen"), "anand")?.toString(CryptoJS.enc.Utf8) || null;
  //   const user_id = login_data && JSON.parse(login_data).UserID;
  let array = [zero, one, two, three, four, five, six, seven, eight, nine];
  // const my_history = useSelector((state) => state.aviator.myHistory_trx_one_min);
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const [loding, setloding] = useState(false);
  const [status, setstatus] = useState("");
  const [newstatus, setstatusNew] = useState("");
  const [all_result, setall_result] = useState();
  const MyHistoryFn = async () => {
    setloding(true);
    try {
      const reqBody = {
        userid: user_id,
        gameid: gid,
      };
      const response = await axios.post(
        `${endpoint.trx_my_history_new}`,
        reqBody
      );
      // const firstId = localStorage.getItem("betApplied")?.split("_")?.[4];
      const firstId = response?.data?.earning?.[0]?.tr_transid;
      const total_data = response?.data?.earning;
      console.log(total_data, "hii anand");
      const winAmnt =
        total_data
          ?.filter((i) => i?.tr_transid === firstId)
          ?.reduce((a, b) => a + Number(b?.tr_income || 0), 0) || 0;
      const amntAmnt =
        total_data
          ?.filter((i) => i?.tr_transid === firstId)
          ?.reduce((a, b) => a + Number(b?.tr_final_amt || 0), 0) || 0;
      setall_result(total_data?.[0]);
      // const winAmnt = response?.data?.earning?.[0]?.tr_income || 0;
      // const amntAmnt = response?.data?.earning?.[0]?.tr_final_amt || 0;
      // setstatus({
      //   status: "2",
      //   amount: 100,
      // });
      if (winAmnt) {
        setstatus({
          status: "1",
          amount: winAmnt,
        });
      } else {
        setstatus({
          status: "2",
          amount: amntAmnt,
        });
      }
      setTimeout(() => {
        setOpenDialogBox(false);
        localStorage.setItem("betApplied", false);
      }, 3000);
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    MyHistoryFn();
  }, []);

  useEffect(() => {
    setstatusNew(status);
  }, [status]);

  if (loding) return <CustomCircularProgress isLoading={loding} />;
  return (
    <Box
      sx={{
        width: "300px",
        height: "400px",
        margin: "auto",
        backgroundImage: `url(${
          (status?.status === "1" && Loss) || (status?.status === "2" && win)
        })`,
        // backgroundImage: `url(${win})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {!loding && newstatus && (
        <>
          <Typography
            variant="body1"
            color="initial"
            className="crlg !text-center"
          >
            {(status?.status === "1" && "Congratulations") ||
              (status?.status === "2" && "Loss")}
          </Typography>

          {/* <Box className="winerpoint">
        <Typography variant="body1" color="initial">
          Game Results{" "}
        </Typography>
        <Typography variant="body1" color="initial">
          green
        </Typography>
        <Box component="img" src={pr0} width={30} sx={{ mr: "5px" }}></Box>
        <Typography variant="body1" color="initial">
          small
        </Typography>
      </Box> */}
          <Typography
            variant="body1"
            color="initial"
            className={`bonustext ${
              status?.status === "1" ? "!text-white" : "!text-white"
            }
            !mr-0
            `}
          >
            {(status?.status === "1" && (
              <>
                <div className="!text-sm !ml-7 !flex !items-center !gap-2">
                  <span>Game Results: </span>
                  <span
                    className={`${
                      [1, 3, 7, 9]?.includes(all_result?.tr_win_slot - 1)
                        ? "!bg-green-500"
                        : "!bg-red-500"
                    }
                  ${
                    String(all_result?.tr_win_slot - 1) === String(0) &&
                    "!bg-gradient-to-r from-red-500 to-purple-500"
                  }
                  ${
                    String(all_result?.tr_win_slot - 1) === String(5) &&
                    "!bg-gradient-to-r from-green-500 to-purple-500"
                  }
                  !text-center !p-2 !rounded-md
                  `}
                  >
                    {(String(all_result?.tr_win_slot - 1) === String(0) &&
                      "Red Purple") ||
                    (String(all_result?.tr_win_slot - 1) === String(5) &&
                      "Green Purple") ||
                    [1, 3, 7, 9]?.includes(all_result?.tr_win_slot - 1)
                      ? "Green"
                      : "Red"}
                  </span>
                  <img
                    className="!h-[10%] !w-[10%]"
                    src={array[all_result?.tr_win_slot - 1]}
                  />
                  <span
                    className={`${
                      [1, 3, 7, 9]?.includes(all_result?.tr_win_slot - 1)
                        ? "!bg-green-500"
                        : "!bg-red-500"
                    }
                  ${
                    String(all_result?.tr_win_slot - 1) === String(0) &&
                    "!bg-gradient-to-r from-red-500 to-purple-500"
                  }
                  ${
                    String(all_result?.tr_win_slot - 1) === String(5) &&
                    "!bg-gradient-to-r from-green-500 to-purple-500"
                  }
                  !text-center !p-2 !rounded-md
                  `}
                  >
                    {all_result?.tr_win_slot - 1 <= 4 ? "Small" : "Big"}
                  </span>
                </div>
                <div className="!text-[20px] !mt-4">Bonus</div>
              </>
            )) ||
              (status?.status === "2" && "Loss Amount")}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonusamt  ${
              status?.status === "1" ? "!text-green-500" : "!text-red-300"
            }`}
          >
            ₹ {Number(status?.amount || 0)?.toFixed(2) || 0}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonuspr ${
              status?.status === "1" ? "!text-pink-500" : "!text-red-300"
            } !text-sm`}
          >
            Period Minute {all_result?.tr_transid}
          </Typography>
          <Typography variant="body1" color="initial" className="bonuscl">
            Auto Close in 3 sec{" "}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default WinLossPopup;
