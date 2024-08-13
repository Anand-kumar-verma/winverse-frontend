import { Box, Typography } from "@mui/material";
import * as React from "react";
import empty from "../../../assets/images/empty.png";

const MyHistory = ({ gid }) => {
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [page, setPage] = React.useState(0);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const { isLoading: myhistory_loding_all, data: my_history_all } = useQuery(
  //   ["myAll_trx_history", gid],
  //   () => My_All_TRX_HistoryFn(gid),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: true,
  //   }
  // );

  // const my_history_data_all = my_history_all?.data?.earning || [];

  // const visibleRows = React.useMemo(
  //   () =>
  //     my_history_data_all?.slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     ),
  //   [page, rowsPerPage, my_history_all?.data?.earning]
  // );

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
