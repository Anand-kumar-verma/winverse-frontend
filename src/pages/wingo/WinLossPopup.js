import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import Loss from "../../assets/images/losse.png";
import win from "../../assets/images/winnerr.png";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { deCryptData } from "../../shared/secret";
const WinLossPopup = ({ gid }) => {
  //   const login_data = localStorage.getItem("logindataen") && CryptoJS.AES.decrypt(localStorage.getItem("logindataen"), "anand")?.toString(CryptoJS.enc.Utf8) || null;
  //   const user_id = login_data && JSON.parse(login_data).UserID;
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const [loding, setloding] = useState(false);
  const [status, setstatus] = useState("");
  const [newstatus, setstatusNew] = useState("");
  const next_step = useSelector((state) => state.aviator.next_step);
  const my_history_data = useSelector(
    (state) => state.aviator.trx_my_history_data
  );
  console.log(my_history_data);
  const MyHistoryFn = async () => {
    setloding(true);
    try {
      const reqBody = {
        id: user_id,
        gameid: gid,
      };
      const response = {
        data: {
          earning: my_history_data,
        },
      };
      //  await axios.post(`${endpoint.my_history}`, reqBody);

      const firstId = response?.data?.earning?.[0]?.tr_transid;
      const winAmnt =
        response?.data?.earning
          ?.filter((i) => i?.tr_transid === firstId)
          ?.reduce((a, b) => a + Number(b?.tr_income || 0), 0) || 0;
      const amntAmnt =
        response?.data?.earning
          ?.filter((i) => i?.tr_transid === firstId)
          ?.reduce((a, b) => a + Number(b?.tr_final_amt || 0), 0) || 0;
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
          (status?.status === "1" && win) || (status?.status === "2" && Loss)
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
            {(status?.status === "1" && "Congrats") ||
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
            }`}
          >
            {(status?.status === "1" && "Bonus") ||
              (status?.status === "2" && "Loss Amount")}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonusamt  ${
              status?.status === "1" ? "!text-blue-500" : "!text-white"
            }`}
          >
            ₹ {Number(status?.amount || 0)?.toFixed(2) || 0}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonuspr  !text-[12px] ${
              status?.status === "1" ? "!text-pink-500" : "!text-black"
            }`}
          >
            Period{" "}
            {(gid === "1" && "One") ||
              (gid === "2" && "Three") ||
              (gid === "3" && "Five")}{" "}
            Minute {Number(next_step) - 1}
          </Typography>
          <Typography variant="body1" color="initial" className="bonuscl">
            Auto Close in 5 sec{" "}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default WinLossPopup;
