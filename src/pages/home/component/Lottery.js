import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import avaitorcategory3 from "../../../assets/images/image-removebg-preview.png";
import lotteryimg from "../../../assets/images/lottery.png";
import lotterycategory1 from "../../../assets/images/lotterycategory1.png";
import win from "../../../assets/images/win.png";
import win3 from "../../../assets/images/win3.png";
import win4 from "../../../assets/images/win4.png";
import lotterycategory4 from "../../../assets/images/game1.png";
import { endpoint } from "../../../services/urls";

function Lottery() {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const getStatus = async () => {
    try {
      const res = await axios.get(endpoint.withdrawl_status);
      setStatus(res?.data?.earning);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <Box sx={{ padding: "15px" }}>
      <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
        <Box
          component="img"
          src={lotteryimg}
          width={25}
          sx={{ filter: "hue-rotate(71deg)" }}
        ></Box>
        <Typography
          variant="body1"
          sx={{ ml: 1, fontSize: "15px", fontWeight: 600, color: "white" }}
        >
          Lottery
        </Typography>
      </Stack>

      <Box
        sx={style.winbox}
        className={"!cursor-pointer"}
        onClick={() => {
          status?.wingo_status !== "0" && navigate("/wingo");
        }}
      >
        <Box
          component="img"
          src={win}
          sx={{ width: "100%", height: "70%", filter: "hue-rotate(250deg)" }}
        ></Box>
        <Box
          sx={style.positiongame}
          // component={NavLink}
          // to={status?.wingo_status !== "0" && "/wingo"}
        >
          <Typography variant="body1" sx={style.gameheading}>
            Win Go{" "}
          </Typography>
          <Box sx={{ mt: "15px" }}>
            <Typography variant="body1" color="initial">
              Guess Number
            </Typography>
            <Typography variant="body1" color="initial ">
              Green/Red/Purple to win
            </Typography>
          </Box>
        </Box>
        <Box sx={{ position: "absolute", top: "-20px", right: "5px" }}>
          <Box
            component="img"
            src={lotterycategory1}
            sx={{ width: "100px" }}
          ></Box>
        </Box>
      </Box>

      <Box sx={style.winbox} onClick={() => navigate("/comingsoonavaitor")}>
        <Box
          component="img"
          src={win3}
          sx={{ width: "100%", height: "70%", filter: "hue-rotate(105deg)" }}
        ></Box>
        <Box sx={style.positiongame}>
          <Typography variant="body1" color="initial" sx={style.gameheading}>
            Aviator{" "}
          </Typography>
          <Box sx={{ mt: "15px" }}>
            <Typography variant="body1" color="initial">
              {/* Guess Number */}
              Coming Soon
            </Typography>
            <Typography variant="body1" color="initial ">
              {/* Big/Small/Odd/Even */}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ position: "absolute", top: "-20px", right: "5px" }}>
          <Box
            component="img"
            className=" !rounded-full"
            src={avaitorcategory3}
            sx={{ width: "125px", marginTop: "-16px" }}
          ></Box>
        </Box>
      </Box>

      <div
        onClick={() => {
          status?.trx_status !== "0" && navigate("/trx");
        }}
      >
        <Box sx={style.winbox}>
          <Box
            component="img"
            src={win4}
            sx={{ width: "100%", height: "70%" }}
          ></Box>
          <Box sx={style.positiongame}>
            <Typography variant="body1" sx={style.gameheading}>
              Trx Win{" "}
            </Typography>
            <Box sx={{ mt: "15px" }}>
              <Typography variant="body1" color="initial">
                Guess Number
              </Typography>
              <Typography variant="body1" color="initial ">
                Green/Red/Purple to win
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: "absolute", top: "-20px", right: "5px" }}>
            <Box
              component="img"
              src={lotterycategory4}
              sx={{ width: "100px" }}
            ></Box>
          </Box>
        </Box>
      </div>
      {/* <NavLink to='/k3'> */}
      {/* <NavLink to="/comingsoon">
        <Box sx={style.winbox}>
          <Box
            component="img"
            src={win2}
            sx={{ width: "100%", height: "70%" }}
          ></Box>
          <Box sx={style.positiongame}>
            <Typography variant="body1" color="initial" sx={style.gameheading}>
              K3 Lotre{" "}
            </Typography>
            <Box sx={{ mt: "15px" }}>
              <Typography variant="body1" color="initial">
                Guess Number
              </Typography>
              <Typography variant="body1" color="initial ">
                Big/Small/Odd/Even
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: "absolute", top: "-20px", right: "5px" }}>
            <Box
              component="img"
              src={lotterycategory2}
              sx={{ width: "100px" }}
            ></Box>
          </Box>
        </Box>
      </NavLink>
      <NavLink to="/comingsoon">
        <Box sx={style.winbox}>
          <Box
            component="img"
            src={win3}
            sx={{ width: "100%", height: "70%" }}
          ></Box>
          <Box sx={style.positiongame}>
            <Typography variant="body1" color="initial" sx={style.gameheading}>
              5D Lotre{" "}
            </Typography>
            <Box sx={{ mt: "15px" }}>
              <Typography variant="body1" color="initial">
                Guess Number
              </Typography>
              <Typography variant="body1" color="initial ">
                Big/Small/Odd/Even
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: "absolute", top: "-20px", right: "5px" }}>
            <Box
              component="img"
              src={lotterycategory3}
              sx={{ width: "100px" }}
            ></Box>
          </Box>
        </Box>
      </NavLink>
  */}
    </Box>
  );
}

export default Lottery;

const style = {
  winbox: {
    background: "#e9e9e9",
    borderRadius: "20px",
    height: "160px",
    marginBottom: "30px",
    position: "relative",
    boxShadow: "0 0.05333rem 0.10667rem #c5c5da42",
  },
  positiongame: {
    position: "absolute",
    top: "10px",
    left: "20px",
    "&>div>p": { fontSize: "12px", fontWeight: 400, color: "white" },
  },
  gameheading: { fontSize: "20px", fontWeight: 700, color: "white" },
};
