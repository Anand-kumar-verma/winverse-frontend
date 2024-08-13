import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import empty from "../../../assets/images/empty.png";
import { My_All_TRX_HistoryFn } from "../../../services/apiCallings";

const MyHistory = ({ gid }) => {

  const { isLoading: myhistory_loding_all, data: my_history_all } = useQuery(
    ["myAll_trx_history", gid],
    () => My_All_TRX_HistoryFn(gid),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );



  return (
    <Box mt={2}>
      <Typography className=" mx-10 text-center text-lg">
        <img src={empty} alt="" className="mx-10" />
        No data
      </Typography>
    </Box>
  );
};

export default MyHistory;
