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
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  trx_game_image_index_function,
  updateNextCounter,
} from "../../../redux/slices/counterSlice";
import { endpoint } from "../../../services/urls";
import theme from "../../../utils/theme";

const GameHistory = ({ gid }) => {
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  // const navigate = useNavigate();
  const { isLoading, data: game_history } = useQuery(
    ["trx_gamehistory", gid],
    () => GameHistoryFn(gid),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const GameHistoryFn = async (gid) => {
    try {
      const reqBody = {
        gameid: gid,
        limit: 100,
      };
      const response = await axios.post(
        `${endpoint.trx_game_history}`,
        reqBody
      );
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  // const game_history_data = game_history?.data?.data;
  const game_history_data = React.useMemo(
    () => game_history?.data?.data,
    [game_history?.data?.data]
  );

  React.useEffect(() => {
    console.log(
      game_history?.data?.data
        ? Number(game_history?.data?.data?.[0]?.tr_transaction_id) + 1
        : 1
    );
    dispatch(
      updateNextCounter(
        game_history?.data?.data
          ? Number(game_history?.data?.data?.[0]?.tr_transaction_id) + 1
          : 1
      )
    );
    const tr_digit =
      game_history?.data?.data && game_history?.data?.data?.[0]?.tr_digits;
    let array = [];
    for (let i = 0; i < tr_digit?.length; i++) {
      if (/[a-zA-Z]/.test(tr_digit[i])) {
        array.push(tr_digit[i].toUpperCase());
      } else {
        array.push(tr_digit[i]);
      }
    }
    dispatch(trx_game_image_index_function(array));
  }, [game_history?.data?.data]);

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
                
                Result
              </TableCell>
              <TableCell
                sx={{
                  verticalAlign: "bottom",
                  padding: "10px 0px  !important",
                  textAlign: "center",
                }}
                className="!text-sm  !pr-0 !pl-1"
              >
               Total
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
                <TableRow className="!w-[95%] ">
                  <TableCell className="!text-lg"
                    sx={{ verticalAlign: "bottom", textAlign: "center" }} >
                    <p className="my-2">{i?.tr_transaction_id}</p>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top", textAlign: "center" }}>
                    <div className="flex justify-center gap-2 mt-2">
                    <p className="border-black border !my-2  bg-gray-100 px-1 !text-[10px] rounded-full">1</p> 
                <p className="border-black border !my-2  bg-gray-100 px-1 !text-[10px] rounded-full">2</p> 
                <p className="border-black border !my-2  bg-gray-100 px-1 !text-[10px] rounded-full">3</p> 
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ verticalAlign: "bottom", textAlign: "center" }}
                  >
                    <div className="flex justify-center gap-2">
                    <p className="border-orange border my-2  bg-orange-300 px-2  rounded-full">28</p> 
                    </div>

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
