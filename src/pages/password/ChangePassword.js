import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Box, Container } from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../component/layout/Layout";

function ChangePassword() {
  const data_array = [
    {
      to: "/password/account",
      name: "Account Pasword",
      logo: (
        <CurrencyExchangeIcon
          className="!w-[40px] !h-[40px] !text-[#63BA0E]"
          color="#8f5206"
        />
      ),
    },
    // {
    //   to: "/password/transction",
    //   name: "Transaction Password",
    //   logo: (
    //     <RedeemIcon
    //       className="!w-[40px] !h-[40px] !text-[#63BA0E]"
    //       color="#8f5206"
    //     />
    //   ),
    // },
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

export default ChangePassword;
