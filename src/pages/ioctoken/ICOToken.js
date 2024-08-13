import { Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "../../component/layout/Layout";
import { TokenLaunch } from "../../services/apiCallings";
import { rupees } from "../../services/urls";

const ICOToken = () => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const { isLoading, data } = useQuery(
    ["token_zupeeter"],
    () => TokenLaunch(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const res = data?.data?.earning;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const targetDate = new Date("August 26, 2024").getTime();
  const difference = targetDate - currentTime;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
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
        <div className={"!flex !flex-col !justify-between mx-1 !gap-2 mt-2"}>
          <div className="flex justify-between w-full items-center bg-[#63BA0E] px-2 py-1 rounded-lg">
            <span className="text-white">
              ICO Price: {rupees}{" "}
              <span className="!text-green-600 font-bold">
                {Number(res?.ico_rate || 0).toFixed(5)}
              </span>
            </span>
            <img
              className="h-20"
              src="https://zupeeter.com/application/libraries/token.png"
            />
          </div>
          <div className="bg-[#63BA0E] px-2 py-1 rounded-lg">
            <p className="!text-center !font-bold !text-white">Deposit</p>
            <div className="grid grid-cols-2 gap-1 items-center  p-5">
              <span className="!text-sm">My First Deposit Amount</span>
              <TextField
                id="bank_name"
                name="bank_name"
                value={rupees + res?.first_recharge?.toString() || ""}
                className="!w-[100%] !py-0 !text-green-600"
              />
              <span className="!text-sm">Received ICO Token</span>
              <TextField
                id="holder"
                name="holder"
                value={res?.total_ico || "dsfas"}
                //   onChange={fk.handleChange}
                className="!w-[100%] !border-2  !text-green-600"
              />
            </div>
          </div>
          <div className="bg-[#63BA0E] px-2 py-1 rounded-lg">
            <p className="!text-center !font-bold !text-white">Launching</p>
            <div className="flex justify-between items-center">
              <div className="!text-sm">
                <p>
                  ICO Launching Date:{" "}
                  <span className="!text-green-600 font-bold">26 Aug 2024</span>
                </p>
                <p>
                  Remaining Time:{" "}
                  {Number(days) !== 0 ? (
                    <span className="!text-green-600 font-bold">
                      {days} <sapn className={"!text-white"}>D</sapn> {hours}{" "}
                      <span className={"!text-white"}>H</span> {minutes}{" "}
                      <span className={"!text-white"}>M</span> {seconds}{" "}
                      <span className={"!text-white"}>S</span>
                    </span>
                  ) : (
                    <span className="!text-red-600">Expired</span>
                  )}
                </p>
              </div>
              <img
                className="h-20"
                src="https://zupeeter.com/application/libraries/token.png"
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ICOToken;
