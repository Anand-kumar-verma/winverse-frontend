import { CircularProgress } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { BiMessageRounded } from "react-icons/bi";
import { BsSignTurnRight } from "react-icons/bs";
import { useQuery } from "react-query";
import { endpoint } from "../../services/urls";
import { deCryptData } from "../../shared/secret";

const MybetHistory = () => {
  const user_id = deCryptData(localStorage.getItem("user_id"));



  const { isLoading, data } = useQuery(
    ["historydata"],
    () => getHistory(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const getHistory = async () => {
    const reqbody = {
      user_id_node: user_id
    }
    try {
      // const response = await axios.get(
      //   `${endpoint.bet_history}?userid=${userId}&limit=${limit}`
      // )
      const response = await axios.post(endpoint.node_api.my_history, reqbody)
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const result = data?.data?.data || [];
   


  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  return (
    <div className="max-h-96 overflow-scroll hide relative">
      <div className=" grid grid-cols-3 gap-[10%] place-items-start  bg-black p-1">
        <p className="text-[10px] text-gray-500">Date</p>
        <p className="text-[10px] text-gray-500">Bet INT x</p>
        <p className="text-[10px] text-gray-500">Cash out, INR</p>
      </div>
      {result?.map((i, index) => {
        return (
          <div
            className={`${i?.amountcashed ?
                "bg-green-800 bg-opacity-30 border-[2px] border-emerald-700" :
                "bg-black"
              } rounded-md px-1 mt-1 w-full`}
          >
            <div className=" grid grid-cols-3  place-items-start">
              <div>
                <p className="flex flex-col">
                  <span className="text-[10px]">
                  { i?.createdAt  && i?.createdAt?.substring(11,16)}
                  </span>
                  <span className="text-[10px]">
                    {moment(i?.createdAt || Date.now()).format("DD-MM-YYYY")}
                  </span>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="!text-[10px]">
                  {Number(i?.amount || 0)?.toFixed(2)}
                </span>
                <span
                  className={`bg-black rounded-full px-3 py-1 !text-[10px] ${index % 2 === 0 ? "text-[#4e92ea]" : "text-red-500"
                    }`}
                >
                  {Number(i?.multiplier || 0)?.toFixed(2)}x
                </span>
              </div>
              <div className="w-full flex justify-end">
                <div className="flex gap-2 items-center !text-[10px]">
                  {i?.amountcashed && (
                    <span className="!text-[10px]">
                      {Number(i?.amountcashed)?.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[15px]">
                    <BsSignTurnRight className="!text-green-800" />
                  </span>
                  <span className="bg-black rounded-full px-3 py-1 text-blue-800 text-[15px]">
                    <BiMessageRounded />
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MybetHistory;
