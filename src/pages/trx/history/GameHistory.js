import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import theme from "../../../utils/theme";

const GameHistory = ({ gid }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const navigate = useNavigate();
  const game_history = useSelector(
    (state) => state.aviator.gameHistory_trx_one_min
  );

  // const { isLoading, data: game_history } = useQuery(
  //   ["trx_gamehistory", gid],
  //   () => GameHistoryFn(gid),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: true,
  //   }
  // );

  // const GameHistoryFn = async (gid) => {
  //   try {
  //     const reqBody = {
  //       gameid: gid,
  //       limit: 100,
  //     };
  //     const response = await axios.post(
  //       `${endpoint.trx_game_history}`,
  //       reqBody
  //     );
  //     return response;
  //   } catch (e) {
  //     toast(e?.message);
  //     console.log(e);
  //   }
  // };
  // const game_histor y = []
  const isLoading = false;
  // const game_history_data = game_history;
  // const game_history_data = React.useMemo(
  //   () => game_history,
  //   [game_history]
  // );

  // React.useEffect(() => {
  //   dispatch(
  //     updateNextCounter(
  //       game_history
  //         ? Number(game_history?.[0]?.tr_transaction_id) + 1
  //         : 1
  //     )
  //   );
  //   const tr_digit =
  //     game_history && game_history?.[0]?.tr_digits;
  //   let array = [];
  //   for (let i = 0; i < tr_digit?.length; i++) {
  //     if (/[a-zA-Z]/.test(tr_digit[i])) {
  //       array.push(tr_digit[i].toUpperCase());
  //     } else {
  //       array.push(tr_digit[i]);
  //     }
  //   }
  //   dispatch(trx_game_image_index_function(array));
  // }, [game_history]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      game_history?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, game_history]
  );
  if (isLoading)
    return (
      <div className="!w-full flex justify-center">
        <CircularProgress />
      </div>
    );
  return (
    <Box mt={2}>
      <TableContainer>
        <Table sx={{ maxWidth: 400 }} aria-label="simple table">
          <TableHead
            sx={{
              background: theme.palette.primary.main,
              "&>tr>th": {
                padding: 1,
                fontSize: "13px",
                fontWeight: 700,
                color: "white",
              },
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  verticalAlign: "bottom",
                  padding: "10px 0px !important",
                  textAlign: "center",
                }}
                className="!text-sm  !pl-[2px] !pr-0"
              >
                Period
              </TableCell>
              <TableCell
                sx={{
                  verticalAlign: "bottom",
                  padding: "10px 0px  !important",
                  textAlign: "center",
                }}
                className="!text-sm  !pr-0 !pl-1"
              >
                Block
              </TableCell>
              <TableCell
                sx={{
                  verticalAlign: "bottom",
                  padding: "10px 0px  !important",
                  textAlign: "center",
                }}
                className="!text-sm  !pr-0 !pl-1"
              >
                Block Time
              </TableCell>
              <TableCell
                sx={{
                  verticalAlign: "bottom",
                  padding: "10px 0px  !important",
                  textAlign: "center",
                }}
                className="!text-sm  !pr-0 !pl-1"
              >
                Hash
              </TableCell>
              <TableCell
                sx={{
                  verticalAlign: "bottom",
                  padding: "10px 0px  !important",
                  textAlign: "center",
                }}
                className="!text-sm  !pr-0 !pl-1"
              >
                Result
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "&>tr>td": { padding: "10px 5px", border: "none" },
              "&>tr": { borderBottom: "1px solid #ced4d7" },
            }}
          >
            {visibleRows?.map((i) => {
              return (
                <TableRow className="!w-[95%]">
                  <TableCell
                    sx={{ verticalAlign: "bottom", textAlign: "center" }}
                  >
                    <p>{i?.tr_transaction_id}</p>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top", textAlign: "center" }}>
                    <Stack>
                      <span>
                        <LiveHelpIcon
                          sx={{ width: "20px" }}
                          className="!text-[#FBA343] cursor-pointer"
                          onClick={() =>
                            navigate("/trx/tron-scan", {
                              state: {
                                tron_id: i?.tr_number,
                              },
                            })
                          }
                        />
                      </span>
                      <span>{i?.tr_number}</span>
                    </Stack>
                  </TableCell>
                  <TableCell
                    sx={{ verticalAlign: "bottom", textAlign: "center" }}
                  >
                    <span>{i?.tr_block_time}</span>
                  </TableCell>
                  <TableCell
                    sx={{ verticalAlign: "bottom", textAlign: "center" }}
                  >
                    <span>{i?.tr_hashno}</span>
                  </TableCell>

                  <TableCell
                    sx={{ verticalAlign: "bottom", textAlign: "center" }}
                  >
                    <span
                      className={`
                ${
                  (String(Number(i?.tr41_slot_id - 1)) === "0" &&
                    "!bg-gradient-to-t from-red-400 to-violet-400") ||
                  (String(Number(i?.tr41_slot_id - 1)) === "5" &&
                    "!bg-gradient-to-t from-violet-400 to-green-400") ||
                  ((String(Number(i?.tr41_slot_id - 1)) === "1" ||
                    String(Number(i?.tr41_slot_id - 1)) === "3" ||
                    String(Number(i?.tr41_slot_id - 1)) === "7" ||
                    String(Number(i?.tr41_slot_id - 1)) === "9" ||
                    String(Number(i?.tr41_slot_id - 1)) === "10") &&
                    "bg-gradient-to-t from-green-400 to-green-900") ||
                  ((String(Number(i?.tr41_slot_id - 1)) === "2" ||
                    String(Number(i?.tr41_slot_id - 1)) === "4" ||
                    String(Number(i?.tr41_slot_id - 1)) === "6" ||
                    String(Number(i?.tr41_slot_id - 1)) === "8" ||
                    String(Number(i?.tr41_slot_id - 1)) === "30") &&
                    "bg-gradient-to-tl from-red-400 to-red-900") ||
                  (String(Number(i?.tr41_slot_id - 1)) === "50" &&
                    "bg-[#3183ee]") ||
                  (String(Number(i?.tr41_slot_id - 1)) === "40" &&
                    "bg-[#f1be24]") ||
                  (String(Number(i?.tr41_slot_id - 1)) === "20" &&
                    "bg-[#eb2feb]")
                }
                transparentColor font-bold  text-lg
                `}
                    >
                      {Number(i?.tr41_slot_id - 1)}
                    </span>
                    <span> {Number(i?.tr41_slot_id - 1) <= 4 ? "S" : "B"}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ background: "white", mt: 3 }}>
        <Stack spacing={2}>
          <TablePagination
            sx={{ background: "#FBA343", color: "white" }}
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={game_history?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows"
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default GameHistory;
