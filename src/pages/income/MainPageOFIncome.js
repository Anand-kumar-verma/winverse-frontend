import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import RedeemIcon from "@mui/icons-material/Redeem";
import StoreIcon from "@mui/icons-material/Store";
import { Box, Container } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../component/layout/Layout";
const zubgback = "#63BA0E";
const zubgmid = "#63BA0E";

function MainPageOFIncome() {


  const data_array = [
  
    {
      to: "/account/income-main/direct-income",
      name: "Direct Income",
      logo: (
        <RedeemIcon
          className="!w-[40px] !h-[40px] !text-[#63BA0E]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/level-income",
      name: "LeveL Income",
      logo: (
        <LocalConvenienceStoreIcon
          className="!w-[40px] !h-[40px] !text-[#63BA0E]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/level-bonus",
      name: "Daily Cashback Bonus",
      logo: (
        <CardGiftcardIcon
          className="!w-[40px] !h-[40px] !text-[#63BA0E]"
          color="#8f5206"
        />
      ),
    },
    {
      to: "/account/income-main/fund-level",
      name: "Fund Level Commission",
      logo: (
        <StoreIcon
          className="!w-[40px] !h-[40px] !text-[#63BA0E]"
          color="#8f5206"
        />
      ),
    },
    
   
    
  
    
  ];
  return (
    <Layout>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
      >
        <Box
          sx={{
            width: "95%",
            marginLeft: "2.5%",
            borderRadius: "10px",
            padding: "10px",
            mt: "20px",
            "&>:nth-child(1)": {
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              mb: "25px",
            },
          }}
        >
          <div className="!w-full !grid !grid-cols-3 !place-items-center">
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
                      fontSize: "14px",
                      fontWeight: "500",
                      mt: "5px",
                    },
                  }}
                >
                  <p>{i?.logo}</p>
                  <p className="lg:!whitespace-nowrap !text-center !text-black !text-[10px]">
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
