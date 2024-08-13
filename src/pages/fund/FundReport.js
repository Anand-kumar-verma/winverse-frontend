import {
  Box,
  Button,
  Container,
  Stack,
  TablePagination
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import * as XLSX from "xlsx";
import Layout from "../../component/layout/Layout";
import {
  FundTransferHistoryFn
} from "../../services/apiCallings";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
export default function FundReport() {

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const tableRef = React.useRef(null);
  const { isLoading, data: game_history } = useQuery(
    ["fund_transfer_history_details"],
    () => FundTransferHistoryFn(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

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
            <input
              type="text"
              className="!bg-gray-600 !text-white !rounded-md px-2 py-1"
              placeholder="Search.."
            />
          </div>
        </div>
        <Box>
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
                  <TableCell className="!text-sm !text-center !pl-[2px] !pr-0 border-2 border-r border-white">
                    S.No.
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Transaction Id
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Transfer Id
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Date
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Transfer Amount
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Receive Amount
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Fees
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
                        {i?.tr11_fund_transaid}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.or_m_user_id ? i?.or_m_user_id : "----"}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {moment(i?.tr11_fund_date)?.format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {Number(
                          Number(i?.tr11_fund_amt || 0) +
                          (Number(i?.tr11_fund_amt || 0) * 3 / 100)
                        )?.toFixed(2)}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {Number(i?.tr11_fund_amt || 0)?.toFixed()}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {(Number(i?.tr11_fund_amt || 0) * 3 / 100)?.toFixed(2)}
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

      </Container>
    </Layout>
  );
}
