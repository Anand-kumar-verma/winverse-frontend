import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useSocket } from "../shared/socket/SocketContext";

const AllBets = ({ formik, fk }) => {
  const [allbetsdata, setAllBetsData] = useState([]);
  const [isLoading, setisLoding] = useState(false);
  const socket = useSocket();
  // const getAllBets = async () => {
  //   try {
  //     const response = await axios.get(endpoint.node_api.get_leder_data);
  //     setAllBetsData(response?.data?.data || []);
  //   } catch (e) {
  //     toast(e?.message);
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getAllBets();
  // }, []);

  useEffect(() => {
    const handleBet = (data) => {
      setAllBetsData((prevAllBetsData) => [...prevAllBetsData, data]);
    };
    const user_bet_cashoutFn = (data) => {
      setAllBetsData((prevAllBetsData) =>
        prevAllBetsData.map((i) => {
          if (i.id == data?.id) {
            return {
              ...i, // Spread operator to copy existing properties
              amountcashed: data?.amountcashed, // Update the amountcashed property
              multiplier: data?.multiplier, // Update the multiplier property
            };
          } else {
            return i;
          }
        })
      );
    };

    const handleSetLoader = (setloder) => {
      setAllBetsData([]);
    };

    socket.on("setloder", handleSetLoader);
    socket.on("user_bet", handleBet);
    socket.on("user_bet_cashout", handleBet);
    return () => {
      socket.off("user_bet", handleBet);
      socket.off("setloder", handleSetLoader);
      socket.off("user_bet_cashout", user_bet_cashoutFn);
    };
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  return (
    <div className="max-h-[90%] overflow-auto hide flex flex-col gap-1 relative">
      <div className=" w-full !bg-black ">
        <p className="text-white text-[12px] ">
          <span>All Bets: </span>
          <span>{allbetsdata?.[0]?.local_length || 0}</span>
        </p>
        <div className="grid grid-cols-3 place-items-start !bg-black px-1 ">
          <p className="text-[10px] text-gray-500">User</p>
          <p className="text-[10px] text-gray-500">Bet INT x</p>
          <p className="text-[10px] text-gray-500">Cash out, INR</p>
        </div>
      </div>
      {allbetsdata?.map((i, index) => (
        <>
          <div
            key={index}
            className={`${
              i?.multiplier
                ? "bg-[#213519] bg-opacity-30 border-[2px] border-[#1e430ff6]"
                : "bg-black bg-opacity-30"
            } w-auto grid grid-cols-3 place-items-start !py-1  items-center rounded-md px-1`}
          >
            <div>
              <p className="flex items-center gap-3">
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 24, height: 24, fontSize: 10 }}
                />
                <span className="text-[10px] text-gray-500">
                  {(i?.email?.substring(0, 1) || "*") +
                    "**" +
                    (i?.email?.substring(1, 2) || "*")}
                </span>
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <span className={`text-[10px] text-gray-500`}>
                {Number(i?.amount || 0)?.toFixed(2)}
              </span>
              <span
                className={`bg-black rounded-full px-3 py-1 text-[10px] 
               `}
              >
                {Number(i?.multiplier || 0)?.toFixed(2)}x
              </span>
            </div>
            <div className="flex w-full justify-end">
              <div className="flex gap-2 items-center">
                <span className={`text-[10px]  text-white`}>
                  {Number(i?.amountcashed || 0)?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          {/* <Divider className="!bg-gray-500 " /> */}
        </>
      ))}
    </div>
  );
};

export default AllBets;
