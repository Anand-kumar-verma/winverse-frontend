import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loss from "../../assets/images/loss.png";
import win from "../../assets/images/winnner.png";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
const WinLossPopup = ({ gid }) => {
  //   const login_data = localStorage.getItem("logindataen") && CryptoJS.AES.decrypt(localStorage.getItem("logindataen"), "anand")?.toString(CryptoJS.enc.Utf8) || null;
  //   const user_id = login_data && JSON.parse(login_data).UserID;
  const user_id = localStorage.getItem("user_id");
  const [loding, setloding] = useState(false);
  const [status, setstatus] = useState("");
  const [newstatus, setstatusNew] = useState("");
  const next_step = useSelector((state) => state.aviator.next_step);

  const MyHistoryFn = async () => {
    setloding(true);
    try {
      const reqBody = {
        id: user_id,
        gameid: gid,
      };
      const response = await axios.post(`${endpoint.my_history}`, reqBody);
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
      console.log(response, firstId, winAmnt, amntAmnt);
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
            {(status?.status === "1" && "Win") ||
              (status?.status === "2" && "Loss")}
          </Typography>
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
              status?.status === "1" ? "!text-white" : "!text-white"
            }`}
          >
            ₹ {Number(status?.amount || 0)?.toFixed(2) || 0}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonuspr ${
              status?.status === "1" ? "!text-pink-500" : "!text-white"
            }`}
          >
            Period{" "}
            {(status?.gameid === "1" && "One") ||
              (status?.gameid === "3" && "Three") ||
              (status?.gameid === "5" && "Five")}{" "}
            minute
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
