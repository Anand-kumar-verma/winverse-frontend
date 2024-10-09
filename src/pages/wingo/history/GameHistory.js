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
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import theme from "../../../utils/theme";

const GameHistory = ({ gid }) => {
  const isLoading = false;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const game_history_data = useSelector(
    (state) => state.aviator.gameHistory_trx_one_min
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      game_history_data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, game_history_data]
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
              <TableCell align="center">Period</TableCell>
              <TableCell align="center">Number</TableCell>
              <TableCell align="center">Big Small</TableCell>
              <TableCell align="center">Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              background: theme.palette.secondary.main,
              "&>tr>td": { padding: "10px 5px", border: "none" },
              "&>tr": { borderBottom: "1px solid #ced4d7" },
            }}
          >
            {visibleRows?.map((i, index) => {
              return (
                <TableRow>
                  <TableCell align="center" sx={{ color: "white" }}>
                    {i?.tr_transaction_id}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", fontWeight: 900 }}
                    className={`
                        ${(() => {
                          const slotId = i?.tr41_slot_id - 1;

                          if (slotId === 0) {
                            return "bg-gradient-to-t from-violet-400 to-red-600";
                          }
                          if (slotId === 5) {
                            return "bg-gradient-to-t from-violet-400 to-green-600";
                          }
                          if ([1, 3, 7, 9].includes(slotId)) {
                            return "bg-green-600";
                          }
                          if ([2, 4, 6, 8].includes(slotId)) {
                            return "bg-red-600";
                          }

                          return "";
                        })()}
               transparentColor font-bold
  `}
                  >
                    {i?.tr41_slot_id - 1 > 10 ? " " : i?.tr41_slot_id - 1}
                  </TableCell>

                  <TableCell align="center " sx={{ color: "white" }}>
                    {i?.tr41_slot_id - 1 > 4 && i?.tr41_slot_id - 1 !== 13
                      ? "Big"
                      : "Small"}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {[1, 3, 7, 9, 13].includes(i?.tr41_slot_id - 1) ? (
                      <Typography
                        sx={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          mt: "10px",
                          mx: "4px",
                          background: "green",
                        }}
                      ></Typography>
                    ) : [2, 4, 6, 8, 14].includes(i?.tr41_slot_id - 1) ? (
                      <Typography
                        sx={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          mt: "10px",
                          mx: "4px",
                          background: "red",
                        }}
                      ></Typography>
                    ) : i?.tr41_slot_id - 1 == 0 ? (
                      <div className="flex">
                        <Typography
                          sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            mt: "10px",
                            mx: "4px",
                            background: "red",
                          }}
                        ></Typography>
                        <Typography
                          sx={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            mt: "10px",
                            mx: "4px",
                            background: "#BF6DFE",
                          }}
                        ></Typography>
                      </div>
                    ) : (
                      i?.tr41_slot_id - 1 == 5 && (
                        <div className="flex ">
                          <Typography
                            sx={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              mt: "10px",
                              mx: "4px",
                              background: "green",
                            }}
                          ></Typography>
                          <Typography
                            sx={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              mt: "10px",
                              mx: "4px",
                              background: "#BF6DFE",
                            }}
                          ></Typography>
                        </div>
                      )
                    )}
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
            sx={{ background: theme.palette.secondary.main, color: "white" }}
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={game_history_data?.length}
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
