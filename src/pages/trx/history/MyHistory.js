import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Stack, TablePagination } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import moment from "moment";
import * as React from "react";
import { useSelector } from "react-redux";
import { rupees, zubgback } from "../../../services/urls";

const MyHistory = ({ gid}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const my_history = useSelector((state) => state.aviator.myHistory_trx_one_min);


  const visibleRows = React.useMemo(() => {
    const overAllArray = my_history?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    return overAllArray;
  }, [
    page,
    rowsPerPage,
    my_history
    ]);
  // console.log(visibleRows);
   
  return (
    <Box mt={2}>
      <Stack direction="row" className="onegotextbox"></Stack>
      <div className="flex flex-col gap-[2px]">
        {visibleRows?.map((i) => {
          return (
            <div style={{ mb: 2 }}>
              <Accordion className="!rounded-lg">
                <AccordionSummary
                  expandIcon={
                    <ArrowDownwardIcon
                      sx={{ color: "black", fontSize: "15px" }}
                    />
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{ color: "white" }}
                >
                  <div className="!w-full !flex !justify-between">
                    <p className="!text-black ">{i?.tr_transid}</p>
                    <p
                      className={`${
                        i?.tr_status === "Loss"
                          ? "!text-red-600"
                          : i?.tr_status === "Win"
                          ? "!text-green-600"
                          : "!text-red-600"
                      } !font-bold`}
                    >
                      {i?.tr_status}
                    </p>
                    <span
                      style={{ mr: 1 }}
                      className={`${
                        i?.tr_status === "Loss"
                          ? "!text-red-600"
                          : i?.tr_status === "Win"
                          ? "!text-green-600"
                          : "!text-red-600"
                      }`}
                    >
                      {" "}
                      {rupees}{" "}
                      {i?.tr_status === "Win" ? i?.tr_income : i?.tr_pv}
                    </span>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <p className={`!text-green-400 !font-semibold !text-lg`}>
                    Period Detail
                  </p>
                  <div className="!w-full !grid !grid-cols-2 !gap-y-1 ">
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Period
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {i?.tr_transid}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Contract Money
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {Number(i?.tr_final_amt || 0).toFixed(2)}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Contract Count
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      0
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Delivery
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {Number(i?.tr_pv || 0).toFixed(2)}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Fee
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {(
                        Number(i?.tr_final_amt || 0) - Number(i?.tr_pv || 0)
                      ).toFixed(2)}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Open Price
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      {i?.tr_transid}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2 ">
                      Result
                    </span>

                    {i?.tr_status !== "Pending" ? (
                      <div className="flex gap-2 items-center bg-white !bg-opacity-10 py-1 px-2">
                        <span>{`${i?.tr_win_slot - 1}`}</span>
                        <span
                          className={`
  ${
    ((i?.tr_win_slot - 1)?.toString() === "0" &&
      "bg-gradient-to-t from-red-400 to-violet-400") ||
    ((i?.tr_win_slot - 1)?.toString() === "5" &&
      "bg-gradient-to-t from-violet-400 to-green-400") ||
    (((i?.tr_win_slot - 1)?.toString() === "1" ||
      (i?.tr_win_slot - 1)?.toString() === "3" ||
      (i?.tr_win_slot - 1)?.toString() === "7" ||
      (i?.tr_win_slot - 1)?.toString() === "9" ||
      (i?.tr_win_slot - 1)?.toString() === "11") &&
      "bg-gradient-to-t from-green-400 to-green-900") ||
    (((i?.tr_win_slot - 1)?.toString() === "2" ||
      (i?.tr_win_slot - 1)?.toString() === "4" ||
      (i?.tr_win_slot - 1)?.toString() === "6" ||
      (i?.tr_win_slot - 1)?.toString() === "8" ||
      (i?.tr_win_slot - 1)?.toString() === "13") &&
      "bg-gradient-to-tl from-red-400 to-red-900") ||
    ((i?.tr_win_slot - 1)?.toString() === "15" && "bg-[#6DA7F4]") ||
    ((i?.tr_win_slot - 1)?.toString() === "14" && "bg-[#F48901]") ||
    ((i?.tr_win_slot - 1)?.toString() === "12" && "bg-[#eb2feb]")
  }
  transparentColor font-bold text-xl
`}
                        >
                          {((i?.tr_win_slot - 1)?.toString() === "0" &&
                            "Red Voilet") ||
                            ((i?.tr_win_slot - 1)?.toString() === "5" &&
                              "Green Voilet") ||
                            (((i?.tr_win_slot - 1)?.toString() === "1" ||
                              (i?.tr_win_slot - 1)?.toString() === "3" ||
                              (i?.tr_win_slot - 1)?.toString() === "7" ||
                              (i?.tr_win_slot - 1)?.toString() === "9" ||
                              i?.tr_win_slot?.toString() === "11") &&
                              "Green") ||
                            (((i?.tr_win_slot - 1)?.toString() === "2" ||
                              (i?.tr_win_slot - 1)?.toString() === "4" ||
                              (i?.tr_win_slot - 1)?.toString() === "6" ||
                              (i?.tr_win_slot - 1)?.toString() === "8" ||
                              i?.tr_win_slot?.toString() === "13") &&
                              "Red") ||
                            (i?.tr_win_slot?.toString() === "12" && "Red")}
                        </span>
                        <span>{i?.tr_win_slot - 1 <= 4 ? "Small" : "Big"}</span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Select
                    </span>
                    <div className="!bg-white !bg-opacity-10 py-1 px-2">
                      <span
                        className={`
                  ${
                    ((i?.tr_package - 1)?.toString() === "0" &&
                      "!bg-gradient-to-t from-red-400 to-violet-400") ||
                    ((i?.tr_package - 1)?.toString() === "5" &&
                      "!bg-gradient-to-t from-violet-400 to-green-400") ||
                    (((i?.tr_package - 1)?.toString() === "1" ||
                      (i?.tr_package - 1)?.toString() === "3" ||
                      (i?.tr_package - 1)?.toString() === "7" ||
                      (i?.tr_package - 1)?.toString() === "9" ||
                      i?.tr_package?.toString() === "11") &&
                      "bg-gradient-to-t from-green-400 to-green-900") ||
                    (((i?.tr_package - 1)?.toString() === "2" ||
                      (i?.tr_package - 1)?.toString() === "4" ||
                      (i?.tr_package - 1)?.toString() === "6" ||
                      (i?.tr_package - 1)?.toString() === "8" ||
                      i?.tr_package?.toString() === "13") &&
                      "bg-gradient-to-tl from-red-400 to-red-900") ||
                    (i?.tr_package?.toString() === "15" && "bg-[#6DA7F4]") ||
                    (i?.tr_package?.toString() === "14" && "bg-[#F48901]") ||
                    (i?.tr_package?.toString() === "12" && "bg-[#eb2feb]")
                  }
                  transparentColor font-bold text-xl 

                  `}
                      >
                        {i?.tr_package?.toString() === "11"
                          ? "Green"
                          : i?.tr_package?.toString() === "14"
                          ? "Small"
                          : i?.tr_package?.toString() === "15"
                          ? "Big"
                          : i?.tr_package?.toString() === "13"
                          ? "Red"
                          : i?.tr_package?.toString() === "12"
                          ? "Voilet"
                          : i?.tr_package - 1}
                      </span>
                    </div>
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Status
                    </span>
                    <span
                      className={`${
                        i?.tr_status === "Loss"
                          ? "!text-red-400"
                          : i?.tr_status === "Win"
                          ? "!text-green-400"
                          : "!text-red-400"
                      } bg-white !bg-opacity-10 py-1 px-2`}
                    >
                      {i?.tr_status}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Amount
                    </span>
                    <span
                      className={`!text-green-400 bg-white !bg-opacity-10 py-1 px-2`}
                    >
                      {" "}
                      {rupees} {i?.tr_income || 0}
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      Create Time
                    </span>
                    <span className="bg-white !bg-opacity-10 py-1 px-2">
                      {moment(i?.tr_date)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.tr_date)?.format("HH:mm:ss")}
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>

      <Box className="paginationTable">
        <TablePagination
          sx={{
            background: zubgback,
            color: "white",
            borderRadius: "10px",
            marginTop: "10px",
          }}
          rowsPerPageOptions={[2, 5, 10, 15]}
          component="div"
          count={my_history?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      {/* <CustomCircularProgress isLoading={myhistory_loding_all} /> */}
    </Box>
  );
};

export default MyHistory;
