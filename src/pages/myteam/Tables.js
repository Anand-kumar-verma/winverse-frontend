import { Box, Button, Container, Stack, TablePagination, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import Layout from "../../component/layout/Layout";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import moment from "moment";

export default function Tables() {

  const userid = localStorage.getItem("user_id");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const tableRef = React.useRef(null);
  const location = useLocation();
  const member_id = location?.state?.member_id;

  const { isLoading, data: game_history } = useQuery(
    ["trx_team_level", member_id],
    () => TeamLevelData(member_id),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const TeamLevelData = async (member_id) => {
    try {
     
      const response = await axios.get(
        `${endpoint.my_team_level_report_indevidual}/${member_id}`
      );
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  // const game_history_data = game_history?.data?.data;
  const game_history_data = React.useMemo(
    () => game_history?.data?.earning?.rid,
    [game_history?.data?.earning?.rid]
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

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(visibleRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Function to convert s to array buffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#my-table" });
    doc.save("table.pdf");
  };

  return (
    <Layout>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <CustomCircularProgress isLoading={isLoading} />
        <div className="flex justify-between w-full px-1 pt-2 pb-1">
          <div className="flex gap-1">
            <Button
              className="!bg-[#BF6DFE] !py-0 !text-white"
              onClick={() => downloadPDF()}
            >
              PDF
            </Button>
            <Button
              className="!bg-[#FD565C] !py-0 !text-white"
              onClick={() => downloadExcel()}
            >
              Excel
            </Button>
          </div>
          <div>
            <TextField
              variant="outlined"
              placeholder="Search.."
              InputProps={{
                style: {
                  backgroundColor: '#63BA0E', // Custom background color
                  borderRadius: '8px', // Rounded corners
                  color: 'white', // Text color
                },
                classes: {
                  root: 'custom-input-root', // Optional: Custom class for further styling
                },
              }}
              InputLabelProps={{
                style: {
                  color: 'white', // Label color (for filled/outlined variants)
                },
              }}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  color: 'white', // Placeholder color
                  opacity: 0.6,   // Optional: Adjust opacity
                },
              }}
            />
          </div>
        </div>
        <Box className="!mt-5">
          <TableContainer>
            <Table
              id="my-table"
              ref={tableRef}
              sx={{ maxWidth: 400 }}
              aria-label="simple table"
            >
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
                  <TableCell className="!text-xs !text-center !pl-[2px] !pr-0 border-2 border-r !px-2 border-white">
                    S.No.
                  </TableCell>
                  <TableCell className="!text-xs !text-center  border-2 border-r !px-2 border-white">
                    User ID
                  </TableCell>
                  <TableCell className="!text-xs !text-center  border-2 border-r !px-2 border-white">
                    Name
                  </TableCell>
                  {Number(member_id) === 1 && (
                    <TableCell className="!text-xs !text-center  border-2 border-r !px-2 border-white">
                      Mobile
                    </TableCell>
                  )}
                  <TableCell className="!text-xs !text-center  border-2 border-r !px-2 border-white">
                    Total Recharge
                  </TableCell>
                  <TableCell className="!text-xs !text-center  border-2 border-r !px-2 border-white">
                    Total Bet
                  </TableCell>

                  {Number(member_id) === 1 ? (
                    <TableCell className="!text-xs !text-center  border-2 border-r !px-2 border-white">
                      Total Active Team
                    </TableCell>
                  ) : (
                    <TableCell className="!text-xs !text-center  border-2 border-r !px-2 border-white">
                      Total Deposit
                    </TableCell>
                  )}
                  <TableCell className="!text-xs !text-center  border-2 border-r !px-2 border-white">
                    Act. Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
              // sx={{
              //   "&>tr>td": { padding: "10px 5px", border: "none" },
              //   "&>tr": { borderBottom: "1px solid #ced4d7" },
              // }}
              >
                {visibleRows?.map((i, index) => {
                  return (
                    <TableRow key={index} className="!w-[95%]">
                      <TableCell className="!text-black !pl-[2px] !pr-2 !text-center !border-2 !border-r !border-[#63BA0E]">
                        {index + 1}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.or_m_user_id}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.or_m_name}
                      </TableCell>
                      {Number(member_id) === 1 && (
                        <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                          {i?.or_m_mobile_no}
                        </TableCell>
                      )}
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.recharge}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.today_bet}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {Number(member_id) === 1
                          ? i?.active_team
                          : i?.today_dep}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.activation_date ? moment(i?.activation_date)?.format("DD-MM-YYYY") : "---"}
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
                sx={{ background: "#63BA0E", color: "white" }}
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
      </Container>
    </Layout>
  );
}
