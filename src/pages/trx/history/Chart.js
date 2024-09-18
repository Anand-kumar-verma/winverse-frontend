import { Box, Stack, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Chart = ({ gid }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [cor, setcor] = React.useState([]);
  const [preData, setPreData] = useState([]);
  const [visibleRows, setVisibleRows] = React.useState([]);
  const game_history = useSelector((state) => state.aviator.gameHistory_trx_one_min);
  const isLoading = false;
  useEffect(() => {
    setPreData([]);
    const array = [];
    for (let i = 0; i <= 9; i++) {
      let res = game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === i
      );
      array.push(res < 0 ? 100 : res);
    }
    setPreData(array);
  }, [game_history]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const game_history_data = React.useMemo(
    () => game_history,
    [game_history]
  );

  React.useEffect(() => {
    setVisibleRows(
      game_history_data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
  }, [page, rowsPerPage, game_history]);

  React.useEffect(() => {
    if (visibleRows && !isLoading) {
      const parent = document.getElementById("parent");
      const parentRect = parent.getBoundingClientRect();
      const newCor =
        visibleRows?.length > 0 &&
        visibleRows?.map((element, index) => {
          const childId =
            String(Number(element?.tr41_slot_id - 1)) === "0"
              ? `zero${index}`
              : String(Number(element?.tr41_slot_id - 1)) === "1"
              ? `one${index}`
              : String(Number(element?.tr41_slot_id - 1)) === "2"
              ? `two${index}`
              : String(Number(element?.tr41_slot_id - 1)) === "3"
              ? `three${index}`
              : String(Number(element?.tr41_slot_id - 1)) === "4"
              ? `four${index}`
              : String(Number(element?.tr41_slot_id - 1)) === "5"
              ? `five${index}`
              : String(Number(element?.tr41_slot_id - 1)) === "6"
              ? `six${index}`
              : String(Number(element?.tr41_slot_id - 1)) === "7"
              ? `seven${index}`
              : String(Number(element?.tr41_slot_id - 1)) === "8"
              ? `eight${index}`
              : `nine${index}`;
          const childRect = document
            .getElementById(childId)
            .getBoundingClientRect();
          const centerX =
            childRect.left + childRect.width / 2 - parentRect.left;
          const centerY = childRect.top + childRect.height / 2 - parentRect.top;

          return { x: centerX, y: centerY };
        });
      setcor(newCor || []);
    }
  }, [visibleRows]);

  return (
    <Box className="chartTable" mt={2}>
      <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" color="initial" className="!text-[#F48901]">
          {/* <Box
            component="img"
            src={history}
            width={25}
            sx={{ marginRight: "10px" }}
          ></Box>{" "} */}
          Statistic(last 100 Periods)
        </Typography>
      </Stack>
      <Box
        sx={{
          borderBottom: "1px solid white",
        }}
      >
        <div className="flex  !w-[98%]  !ml-3">
          <span className="!text-sm">Winning Number</span>
          <Box className=" !ml-3 flex items-center justify-between  !w-[60%]  lg:!w-[60%]">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((i) => {
              return (
                <div
                  className={`circleNumberbody !bg-white !text-black !border-[1px] !border-black `}
                >
                  {i}
                </div>
              );
            })}
          </Box>
        </div>
      </Box>
      <Box
        sx={{
          borderBottom: "1px solid white",
          paddingTop: "5px",
        }}
      >
        <div className="flex  !w-[98%]  !ml-3">
          <span className="!text-sm">Missing Number</span>
          <Box className="  !ml-3 flex items-center justify-between  !w-[60%]  lg:!w-[60%]">
            {preData?.map((i) => {
              return (
                <div
                  className={`circleNumberbody-number !bg-white !text-red-600 !border-[1px] !border-red-600 !text-[5px] `}
                >
                  {i + 1}
                </div>
              );
            })}
          </Box>
        </div>
      </Box>
      <div className="relative !h-[65vh] overflow-auto !w-[98%]  !ml-3 no-scrollbar !overflow-x-hidden">
        <div className="absolute !w-[100%]">
          {visibleRows?.map((i, indexi) => {
            return (
              <Box
                sx={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid white",
                }}
              >
                <div className="flex ">
                  <span className={` pr-1`}>{i?.tr_transaction_id}</span>
                  {/* // main box of chart form 0 to 9 */}
                  <Box className=" !ml-2 flex items-center justify-between gap-1 ">
                    {/* /// 0   //// */}
                    <div
                      id={`zero${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "0"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number   ${
                          (i?.tr41_slot_id - 1)?.toString() === "0"
                            ? "!bg-gradient-to-b from-[#e85053] to-[#8c06f2] !text-white !font-bold !text-[5px] "
                            : "!bg-white !text-black !border-[1px] !border-black  !text-[5px]  !opacity-20"
                        }`}
                      >
                        {" "}
                        0
                      </Typography>
                    </div>
                    {/* /// 1   //// */}
                    <div
                      id={`one${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "1"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number  ${
                          (i?.tr41_slot_id - 1)?.toString() === "1"
                            ? "!bg-[#4bef98] !text-white  !font-bold"
                            : "!bg-white !text-black !border-[1px] !border-black !opacity-20"
                        }`}
                      >
                        {" "}
                        1
                      </Typography>
                    </div>
                    {/* /// 2   //// */}
                    <div
                      id={`two${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "2"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number   ${
                          (i?.tr41_slot_id - 1)?.toString() === "2"
                            ? "!bg-[#f1494c] !text-white !font-bold "
                            : "!bg-white !text-black !border-[1px] !border-black !opacity-20"
                        }`}
                      >
                        {" "}
                        2
                      </Typography>
                    </div>
                    {/* /// 3   //// */}
                    <div
                      id={`three${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "3"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number  ${
                          (i?.tr41_slot_id - 1)?.toString() === "3"
                            ? "!bg-[#46eb93] !text-white !font-bold"
                            : "!bg-white !text-black !border-[1px] !border-black !opacity-20"
                        }`}
                      >
                        {" "}
                        3
                      </Typography>
                    </div>
                    {/* /// 4   //// */}
                    <div
                      id={`four${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "4"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number ${
                          (i?.tr41_slot_id - 1)?.toString() === "4"
                            ? "!bg-[#ed4b4e] !text-white !font-bold"
                            : "!bg-white !text-black !border-[1px] !border-black !opacity-20"
                        }`}
                      >
                        {" "}
                        4
                      </Typography>
                    </div>
                    {/* /// 5   //// */}
                    <div
                      id={`five${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "5"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number ${
                          (i?.tr41_slot_id - 1)?.toString() === "5"
                            ? "!bg-gradient-to-b from-[#55f8a1] to-[#8c06f2] !text-white  !font-bold"
                            : "!bg-white !text-black !border-[1px] !border-black !opacity-20"
                        }`}
                      >
                        {" "}
                        5
                      </Typography>
                    </div>
                    <div
                      id={`six${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "6"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number ${
                          (i?.tr41_slot_id - 1)?.toString() === "6"
                            ? "!bg-[#f54b4e] !text-white !font-bold"
                            : "!bg-white !text-black !border-[1px] !border-black !opacity-20"
                        }`}
                      >
                        {" "}
                        6
                      </Typography>
                    </div>
                    <div
                      id={`seven${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "7"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number ${
                          (i?.tr41_slot_id - 1)?.toString() === "7"
                            ? "!bg-[#4af499] !text-white !font-bold"
                            : "!bg-white !text-black !border-[1px] !border-black !opacity-20"
                        }`}
                      >
                        {" "}
                        7
                      </Typography>
                    </div>
                    {/* /// 8   //// */}
                    <div
                      id={`eight${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "8"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number  ${
                          (i?.tr41_slot_id - 1)?.toString() === "8"
                            ? "!bg-[#eb494c] !text-white !font-bold"
                            : "!bg-white !text-black !border-[1px] !border-black !opacity-20"
                        }`}
                      >
                        {" "}
                        8
                      </Typography>
                    </div>
                    {/* /// 9   //// */}
                    <div
                      id={`nine${indexi}`}
                      className={`${
                        (i?.tr41_slot_id - 1)?.toString() === "9"
                          ? "!z-20"
                          : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody-number  ${
                          (i?.tr41_slot_id - 1)?.toString() === "9"
                            ? "!bg-[#4cf199] !text-white !font-bold"
                            : "!bg-white !text-black !border-[1px] !border-black !opacity-20"
                        }`}
                      >
                        {" "}
                        9
                      </Typography>
                    </div>
                    <Typography
                      className={`circleNumberbody-number ${
                        (i?.tr41_slot_id - 1)?.toString() <= 4
                          ? "!bg-[#F39E2A]"
                          : "!bg-[#6DA7F4]"
                      }  !h-[20px] !w-[20px] !rounded-full !text-center !text-white `}
                    >
                      {(i?.tr41_slot_id - 1)?.toString() <= 4 ? "S" : "B"}
                    </Typography>
                  </Box>
                </div>
              </Box>
            );
          })}
        </div>
        <div className=" h-[100%] w-[100%] absolute flex justify-end">
          <div className="!w-[80%] lg:!w-[70%]" id="parent">
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              className="z-10 absolute"
            >
              {cor?.map((i, index) => {
                return (
                  index > 0 && (
                    <line
                      x1={cor?.[index]?.x}
                      y1={cor?.[index]?.y}
                      x2={cor?.[index - 1]?.x}
                      y2={cor?.[index - 1]?.y}
                      stroke="#FBAC3D"
                      stroke-width="2"
                      fill="none"
                    />
                  )
                );
              })}
            </svg>
          </div>
        </div>
      </div>
      <Box sx={{ background: "white", mt: 3 }}>
        <Stack spacing={2}>
          <TablePagination
            sx={{ background: "#FBA343", color: "white" }}
            rowsPerPageOptions={[10]}
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
      {/* <CustomCircularProgress isLoading={isLoading} /> */}
    </Box>
  );
};

export default Chart;
