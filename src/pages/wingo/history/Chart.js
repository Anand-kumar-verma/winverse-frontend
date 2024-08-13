import { Box, Stack, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import theme from "../../../utils/theme";
import { BorderRight } from "@mui/icons-material";

const Chart = ({ gid }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [cor, setcor] = React.useState([]);
  const [preData, setPreData] = useState([]);
  const game_history = useSelector((state) => state.aviator.gameHistory_trx_one_min);


  useEffect(() => {
    setPreData([]);
    const array = [];
    let get0 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 0
      );
    let get1 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 1
      );
    let get2 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 2
      );
    let get3 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 3
      );
    let get4 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 4
      );
    let get5 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 5
      );
    let get6 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 6
      );
    let get7 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 7
      );
    let get8 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 8
      );
    let get9 =
      game_history?.findIndex(
        (element) => element.tr41_slot_id - 1 === 9
      );
    array.push(
      get0 < 0 ? 100 : get0,
      get1 < 0 ? 100 : get1,
      get2 < 0 ? 100 : get2,
      get3 < 0 ? 100 : get3,
      get4 < 0 ? 100 : get4,
      get5 < 0 ? 100 : get5,
      get6 < 0 ? 100 : get6,
      get7 < 0 ? 100 : get7,
      get8 < 0 ? 100 : get8,
      get9 < 0 ? 100 : get9
    );
    setPreData(array);
  }, [game_history]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      game_history?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, game_history]
  );
  React.useEffect(() => {
    if (visibleRows) {
      const parent = document.getElementById("parent");
      const parentRect = parent.getBoundingClientRect();
      const newCor = visibleRows?.map((element, index) => {
        const childId =
          (element.tr41_slot_id - 1)?.toString() === "0"
            ? `zero${index}`
            : (element.tr41_slot_id - 1)?.toString() === "1"
              ? `one${index}`
              : (element.tr41_slot_id - 1)?.toString() === "2"
                ? `two${index}`
                : (element.tr41_slot_id - 1)?.toString() === "3"
                  ? `three${index}`
                  : (element.tr41_slot_id - 1)?.toString() === "4"
                    ? `four${index}`
                    : (element.tr41_slot_id - 1)?.toString() === "5"
                      ? `five${index}`
                      : (element.tr41_slot_id - 1)?.toString() === "6"
                        ? `six${index}`
                        : (element.tr41_slot_id - 1)?.toString() === "7"
                          ? `seven${index}`
                          : (element.tr41_slot_id - 1)?.toString() === "8"
                            ? `eight${index}`
                            : `nine${index}`;
        const childRect = document
          .getElementById(childId)
          .getBoundingClientRect();
        const centerX = childRect.left + childRect.width / 2 - parentRect.left;
        const centerY = childRect.top + childRect.height / 2 - parentRect.top;

        return { x: centerX, y: centerY };
      });
      setcor(newCor);
    }
  }, [visibleRows]);

  return (
    <Box className="chartTable" sx={{ background: theme.palette.secondary.main, padding: '5px', my: 5, borderRadius: '5px' }}>
      <Stack direction="row" className="onegotextbox">
        <Typography variant="body1" color="initial" className=" !py-2" sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
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
        <div className="flex justify-between">
          <span className="!text-sm" style={{ color: 'white' }}>Winning Number</span>
          <Box className="flex items-center justify-between !w-[80%]  lg:!w-[70%]">
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
        <div className="flex justify-between">
          <span className="!text-sm" style={{ color: 'white' }}>Missing Number</span>
          <Box className="flex items-center justify-between !w-[80%]  lg:!w-[70%]">
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
      <div className="relative !h-[65vh] overflow-auto !w-[100%] no-scrollbar !overflow-x-hidden">
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
                <div className="flex justify-between">
                  <span
                    className={` text-[14px]
                 !bg-gradient-to-t from-[#FE63FF] to-[#007AFF]
                  transparentColor font-bold  pr-5
                 `}
                  >
                    {i?.tr_transaction_id}
                  </span>
                  {/* // main box of chart form 0 to 9 */}
                  <Box className="flex items-center justify-between !w-[80%]   lg:!w-[70%]">
                    {/* /// 0   //// */}
                    <div
                      id={`zero${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "0"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography sx={{ fontsize: "5px" }}
                        className={`circleNumberbody   ${(i?.tr41_slot_id - 1)?.toString() === "0"
                          ? "!bg-gradient-to-b from-[#e85053] to-[#8c06f2] !text-white !mr-1 !font-bold circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px]  !border-black   circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        0
                      </Typography>
                    </div>
                    {/* /// 1   //// */}
                    <div
                      id={`one${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "1"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography
                        className={`circleNumberbody  ${(i?.tr41_slot_id - 1)?.toString() === "1"
                          ? "!bg-[#4bef98] !text-white !mr-1 !font-bold circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        1
                      </Typography>
                    </div>
                    {/* /// 2   //// */}
                    <div
                      id={`two${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "2"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography
                        className={`circleNumberbody   ${(i?.tr41_slot_id - 1)?.toString() === "2"
                          ? "!bg-[#f1494c] !text-white !font-bold !mr-1 circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        2
                      </Typography>
                    </div>
                    {/* /// 3   //// */}
                    <div
                      id={`three${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "3"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography
                        className={`circleNumberbody  ${(i?.tr41_slot_id - 1)?.toString() === "3"
                          ? "!bg-[#46eb93] !text-white !font-bold !mr-1 circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        3
                      </Typography>
                    </div>
                    {/* /// 4   //// */}
                    <div
                      id={`four${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "4"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography
                        className={`circleNumberbody ${(i?.tr41_slot_id - 1)?.toString() === "4"
                          ? "!bg-[#ed4b4e] !text-white !font-bold !mr-1 circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        4
                      </Typography>
                    </div>
                    {/* /// 5   //// */}
                    <div
                      id={`five${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "5"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography
                        className={`circleNumberbody ${(i?.tr41_slot_id - 1)?.toString() === "5"
                          ? "!bg-gradient-to-b from-[#55f8a1] to-[#8c06f2] !text-white !mr-1 !font-bold circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px]  !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        5
                      </Typography>
                    </div>
                    {/* /// 6   //// */}
                    <div
                      id={`six${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "6"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography
                        className={`circleNumberbody ${(i?.tr41_slot_id - 1)?.toString() === "6"
                          ? "!bg-[#f54b4e] !text-white !font-bold !mr-1 circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        6
                      </Typography>
                    </div>
                    {/* /// 7   //// */}
                    <div
                      id={`seven${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "7"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography
                        className={`circleNumberbody ${(i?.tr41_slot_id - 1)?.toString() === "7"
                          ? "!bg-[#4af499] !text-white !font-bold !mr-1 circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        7
                      </Typography>
                    </div>
                    {/* /// 8   //// */}
                    <div
                      id={`eight${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "8"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography
                        className={`circleNumberbody  ${(i?.tr41_slot_id - 1)?.toString() === "8"
                          ? "!bg-[#eb494c] !text-white !font-bold !mr-1 circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        8
                      </Typography>
                    </div>
                    {/* /// 9   //// */}
                    <div
                      id={`nine${indexi}`}
                      className={`${(i?.tr41_slot_id - 1)?.toString() === "9"
                        ? "!z-20"
                        : "!z-[-10px]"
                        }`}
                    >
                      <Typography
                        className={`circleNumberbody  ${(i?.tr41_slot_id - 1)?.toString() === "9"
                          ? "!bg-[#4cf199] !text-white !font-bold !mr-1 circleNumberbody-number"
                          : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                          }`}
                      >
                        {" "}
                        9
                      </Typography>
                    </div>
                    <Typography
                      className={`circleNumberbody ${(i?.tr41_slot_id - 1)?.toString() <= 4
                        ? "!bg-[#468ce8] "
                        : "!bg-[#df4be1]"
                        }  !h-[20px] !w-[20px] !rounded-full !text-center circleNumberbody-number !mr-1 !text-[5px] !text-white `}
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
      <Box sx={{ background: "white", }}>
        <Stack spacing={2}>
          <TablePagination
            sx={{ background: theme.palette.secondary.main, color: "white", }}
            rowsPerPageOptions={[10]}
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
      {/* <CustomCircularProgress isLoading={isLoading} /> */}
    </Box>
  );
};

export default Chart;
