import { Recommend, RepeatOn, ReportGmailerrorredTwoTone, ReportSharp } from "@mui/icons-material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import RedeemIcon from "@mui/icons-material/Redeem";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../component/layout/Layout";
import theme from "../../utils/theme";
const zubgback = "#9cec01";
const zubgmid = "#9cec01";

function MainPageOFIncome() {


  const data_array = [
  
    {
      to: "/account/income-main/direct-income",
      name: "Direct Refer Bonus",
      logo: (
        <RedeemIcon
          className="!w-[50px] !h-[50px] !text-[#9cec01]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/level-income",
      name: "Team Trading Bonus",
      logo: (
        <LocalConvenienceStoreIcon
          className="!w-[50px] !h-[50px] !text-[#9cec01]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/sponsor",
      name: "Direct ReTopup Bonus",
      logo: (
        <ReportGmailerrorredTwoTone
          className="!w-[50px] !h-[50px] !text-[#9cec01]"
          color="#8f5206"
        />
      ),
    },
    
    {
      to: "/account/income-main/joining",
      name: "Welcome Bonus" ,
      logo: (
        <Recommend
          className="!w-[50px] !h-[50px] !text-[#9cec01]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/level-bonus",
      name: "Daily Cashback Bonus",
      logo: (
        <CardGiftcardIcon
          className="!w-[50px] !h-[50px] !text-[#9cec01]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/fund-level",
      name: "Team Level Bonus",
      logo: (
        <StoreIcon
          className="!w-[50px] !h-[50px] !text-[#9cec01]"
          color="#8f5206"
        />
      ),
    },
    
  ];
  return (
    <Layout header={false}>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
          background:"#0D0335"
        }}
      >
        <Box sx={style.root}>
        <Typography variant="body1" color="initial" className="!pb-3">
          Income
        </Typography>
      </Box>
        <Box
          sx={{
            // width: "95%",
            // marginLeft: "2.5%",
            borderRadius: "10px",
            padding: "10px",
            mt: "20px",
            "&>:nth-child(1)": {
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              // mb: "25px",
            },
          }}
        >
          <div className="!w-full gap-2 !grid py-5 px-2 !grid-cols-2 !place-items-center ">
            {data_array?.map((i) => {
              return (
                <Box
                  component={NavLink}
                  to={i.to}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: "10px",
                    "&>p": {
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "500",
                      mt: "5px",
                    },
                  }}
                >
                  <p className="">{i?.logo}</p>
                  <p className="lg:!whitespace-nowrap !text-center !text-white !text-[12px]">
                    {i.name}
                  </p>
                </Box>
              );
            })}
          </div>
        </Box>
      </Container>
    </Layout>
  );
}

export default MainPageOFIncome;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
  root: {
    background: "linear-gradient(180deg, #9cec01, #028f7e)",
    pt: 2,
    px: 1,
    "&>p": { color: "white" },
    "&>p:nth-child(1)": { fontSize: "17px", fontWeight: 600 },
    "&>p:nth-child(2)": { fontSize: "12px", fontWeight: 400, mt: 1 },
    "&>p:nth-child(3)": { fontSize: "12px", fontWeight: 400, pb: 1 },
  },
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
  paymentlink: {
    width: "32%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    "&>p": {
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    width: "95%",
    margin: "auto",
    my: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { border: "1px solid transparent" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,

    color: "white !important",
    width: "100%",
    mt: 2,
    border: "1px solid white",
    padding: "10px",
    "&:hover": { border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
