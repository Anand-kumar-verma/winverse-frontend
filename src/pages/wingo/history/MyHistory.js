import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Stack, TablePagination, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { My_All_HistoryFn } from "../../../services/apiCallings";
import { rupees } from "../../../services/urls";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";

const MyHistory = ({ gid }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { isLoading: myhistory_loding_all, data: my_history_all } = useQuery(
    ["myAllhistory", gid],
    () => My_All_HistoryFn(gid),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const my_history_data_all = my_history_all?.data?.earning || [];

  const visibleRows = React.useMemo(
    () =>
      my_history_data_all?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, my_history_all?.data?.earning]
  );

  return (
    <Box>
      <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" sx={{ color: theme.palette.primary.main, py: 1, textAlign: 'center' }}>
          {/* <Box
            component="img"
            src={history}
            width={25}
            sx={{ marginRight: "10px" }}
          ></Box> */}
          {gid === "1"
            ? " My One GO Record"
            : gid === "2"
              ? " My Three GO Record"
              : " My Five GO Record"}
        </Typography>
      </Stack>
      <div className="flex flex-col gap-[2px]">
        {/* {my_history_data?.[0]?.status === "0" &&
          my_history_data
            ?.filter((i) => i.status === "0")
            ?.map((i, index) => {
              return (
                <div key={index}>
                  <Accordion className="!rounded-lg">
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon className="!text-white" />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{ background: zubgback, color: "white" }}
                    >
                      <div className="!w-full !flex !justify-between">
                        <p className="!text-white ">{i?.gamesno}</p>
                        <p
                          className={`${
                            i?.status === "0"
                              ? "!text-red-400"
                              : i?.status === "1"
                              ? "!text-green-400"
                              : "!text-red-400"
                          }`}
                        >
                          {i?.status === "0"
                            ? "Pending"
                            : i?.status === "1"
                            ? "Win"
                            : "Loss"}
                        </p>
                        <span
                          className={`${
                            i?.status === "0"
                              ? "!text-red-400"
                              : i?.status === "1"
                              ? "!text-green-400"
                              : "!text-red-400"
                          }`}
                        >
                          {" "}
                          {rupees} {i?.status === "1" ? i?.win : i?.totalamount}
                        </span>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ background: zubgback, color: "white" }}
                    >
                      <p className={`!text-green-400 !font-semibold !text-lg`}>
                        Period Detail
                      </p>
                      <div className="!w-full !grid !grid-cols-2 !px-2">
                        <span>Period</span>
                        <span>{i?.gamesno}</span>
                        <span>Contract Money</span>
                        <span>{Number(i?.amount || 0).toFixed(2)}</span>
                        <span>Contract Count</span>
                        <span>0</span>
                        <span>Delivery</span>
                        <span>{Number(i?.totalamount || 0).toFixed(2)}</span>
                        <span>Fee</span>
                        <span>{Number(i?.commission || 0).toFixed(2)}</span>
                        <span>Open Price</span>
                        <span>{i?.gamesno}</span>
                        <span>Result</span>

                        {i?.status !== "0" ? (
                          <div className="flex gap-2 items-center">
                            <span>{`${i?.number_result}`}</span>
                            <span
                              className={`
                  ${
                    (i?.number === "0" &&
                      "!bg-gradient-to-t from-red-400 to-violet-400") ||
                    (i?.number === "5" &&
                      "!bg-gradient-to-t from-violet-400 to-green-400") ||
                    ((i?.number === "1" ||
                      i?.number === "3" ||
                      i?.number === "7" ||
                      i?.number === "9" ||
                      i?.number === "10") &&
                      "bg-gradient-to-t from-green-400 to-green-900") ||
                    ((i?.number === "2" ||
                      i?.number === "4" ||
                      i?.number === "6" ||
                      i?.number === "8" ||
                      i?.number === "30") &&
                      "bg-gradient-to-tl from-red-400 to-red-900") ||
                    (i?.number === "50" && "bg-[#3183ee]") ||
                    (i?.number === "40" && "bg-[#f1be24]") ||
                    (i?.number === "20" && "bg-[#eb2feb]")
                  }
                  transparentColor font-bold text-xl
                  `}
                            >
                              {i?.color_result}
                            </span>
                            <span>{i?.number <= 4 ? "Small" : "Big"}</span>
                          </div>
                        ) : (
                          <div></div>
                        )}

                        <span>Select</span>
                        <span
                          className={`
                  ${
                    (i?.number === "0" &&
                      "!bg-gradient-to-t from-red-400 to-violet-400") ||
                    (i?.number === "5" &&
                      "!bg-gradient-to-t from-violet-400 to-green-400") ||
                    ((i?.number === "1" ||
                      i?.number === "3" ||
                      i?.number === "7" ||
                      i?.number === "9" ||
                      i?.number === "10") &&
                      "bg-gradient-to-t from-green-400 to-green-900") ||
                    ((i?.number === "2" ||
                      i?.number === "4" ||
                      i?.number === "6" ||
                      i?.number === "8" ||
                      i?.number === "30") &&
                      "bg-gradient-to-tl from-red-400 to-red-900") ||
                    (i?.number === "50" && "bg-[#3183ee]") ||
                    (i?.number === "40" && "bg-[#f1be24]") ||
                    (i?.number === "20" && "bg-[#eb2feb]")
                  }
                  transparentColor font-bold text-xl
                  `}
                        >
                          {i?.number === "10"
                            ? "Green"
                            : i?.number === "50"
                            ? "Small"
                            : i?.number === "40"
                            ? "Big"
                            : i?.number === "30"
                            ? "Red"
                            : i?.number === "20"
                            ? "Voilet"
                            : i?.number}
                        </span>
                        <span>Status</span>
                        <span
                          className={`${
                            i?.status === "0"
                              ? "!text-red-400"
                              : i?.status === "1"
                              ? "!text-green-400"
                              : "!text-red-400"
                          }`}
                        >
                          {i?.status === "0"
                            ? "Pending"
                            : i?.status === "1"
                            ? "Win"
                            : "Loss"}
                        </span>
                        <span>Amount</span>
                        <span className={`!text-green-400`}>
                          {" "}
                          {rupees} {i?.win || 0}
                        </span>
                        <span>Create Time</span>
                        <span>
                          {moment(i?.datetime)?.format("DD-MM-YYYY")}{" "}
                          {moment(i?.datetime)?.format("HH:mm:ss")}
                        </span>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            
            })} */}
        {visibleRows?.map((i) => {
          return (
            <div>
              <Accordion className="!rounded-lg">
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon className="!text-white" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{ color: "white", background: theme.palette.secondary.main, borderRadius: '10px' }}
                  className=""
                >
                  <div className="!w-full !flex !justify-between">
                    <p className="!text-white ">{i?.tr_transid}</p>
                    <p
                      className={`${i?.tr_status === "Fail"
                        ? "!text-red-600"
                        : i?.tr_status === "Success"
                          ? "!text-green-600"
                          : "!text-red-600"
                        } !font-bold`}
                    >
                      {i?.tr_status}
                    </p>
                    <span
                      className={`${i?.tr_status === "Fail"
                        ? "!text-red-600"
                        : i?.tr_status === "Success"
                          ? "!text-green-600"
                          : "!text-red-600"
                        }`}
                    >
                      {" "}
                      {rupees}{" "}
                      {i?.tr_status === "Success" ? i?.tr_income : i?.tr_final_amt}
                    </span>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                //  sx={{ background: zubgback, color: "white" }}
                >
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
  ${((i?.tr_win_slot - 1)?.toString() === "0" &&
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
                            ((i?.tr_win_slot - 1)?.toString() === "14" && "bg-[#63BA0E]") ||
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
                              (i?.tr_win_slot)?.toString() === "11") &&
                              "Green") ||
                            (((i?.tr_win_slot - 1)?.toString() === "2" ||
                              (i?.tr_win_slot - 1)?.toString() === "4" ||
                              (i?.tr_win_slot - 1)?.toString() === "6" ||
                              (i?.tr_win_slot - 1)?.toString() === "8" ||
                              (i?.tr_win_slot)?.toString() === "13") &&
                              "Red") ||
                            ((i?.tr_win_slot)?.toString() === "12" && "Red")}
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
                  ${((i?.tr_package - 1)?.toString() === "0" &&
                            "!bg-gradient-to-t from-red-400 to-violet-400") ||
                          ((i?.tr_package - 1)?.toString() === "5" &&
                            "!bg-gradient-to-t from-violet-400 to-green-400") ||
                          (((i?.tr_package - 1)?.toString() === "1" ||
                            (i?.tr_package - 1)?.toString() === "3" ||
                            (i?.tr_package - 1)?.toString() === "7" ||
                            (i?.tr_package - 1)?.toString() === "9" ||
                            (i?.tr_package)?.toString() === "11") &&
                            "bg-gradient-to-t from-green-400 to-green-900") ||
                          (((i?.tr_package - 1)?.toString() === "2" ||
                            (i?.tr_package - 1)?.toString() === "4" ||
                            (i?.tr_package - 1)?.toString() === "6" ||
                            (i?.tr_package - 1)?.toString() === "8" ||
                            (i?.tr_package).toString() === "13") &&
                            "bg-gradient-to-tl from-red-400 to-red-900") ||
                          ((i?.tr_package)?.toString() === "15" && "bg-[#6DA7F4]") ||
                          ((i?.tr_package)?.toString() === "14" && "bg-[#63BA0E]") ||
                          ((i?.tr_package)?.toString() === "12" && "bg-[#eb2feb]")
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
                      className={`${i?.tr_status === "Fail"
                        ? "!text-red-400"
                        : i?.tr_status === "Success"
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
            background: theme.palette.secondary.main,
            color: "white",
            borderRadius: "10px",
            marginTop: "10px",
          }}
          rowsPerPageOptions={[2, 5, 10, 15]}
          component="div"
          count={my_history_data_all?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <CustomCircularProgress isLoading={myhistory_loding_all} />
    </Box>
  );
};

export default MyHistory;
