import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  Stack,
  TablePagination,
  TextField
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useFormik } from "formik";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import * as XLSX from "xlsx";
import Layout from "../../component/layout/Layout";
import {
  UPIDetailsFUnction
} from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import { deCryptData } from "../../shared/secret";
export default function UPIDetails() {
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const tableRef = React.useRef(null);
  const client = useQueryClient();
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const { isLoading, data: game_history } = useQuery(
    ["upi_details"],
    () => UPIDetailsFUnction(),
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
    () => game_history?.data?.earning?.bank_details,
    [game_history?.data?.earning?.bank_details]
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

  const initialValue = {
    name:
      visibleRows?.find((i) => i?.regid === openDialogBox)?.or_m_name ||
      "",
    upi_type: visibleRows?.find((i) => i?.regid === openDialogBox)?.Ifsc || "",
    upi_no: visibleRows?.find((i) => i?.regid === openDialogBox)?.Upi_number || "",
    upi_id: visibleRows?.find((i) => i?.regid === openDialogBox)?.Branch || "",
  };
  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        user_id: user_id,
        txtname: fk.values.name,
        txtupitype: fk.values.upi_type,
        textupinumber: fk.values.upi_no,
        txtupiid: fk.values.upi_id,
      };
      if (
        !reqBody.user_id ||
        !reqBody.txtname ||
        !reqBody.txtupitype ||
        !reqBody.textupinumber ||
        !reqBody.txtupiid
      )
        return toast("Plese enter all data");
      updateBankDetails(reqBody);
    },
  });

  async function updateBankDetails(reqBody) {
    try {
      const res = await axios.post(endpoint?.update_upi_details, reqBody);
      toast(res?.data?.earning?.msg);
      console.log(res);
      if (res?.data?.status) {
        setOpenDialogBox(false);
      }
    } catch (e) {
      console.log(e);
    }
    client.refetchQueries("upi_details");
  }

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
                    Action
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    UPI Holder Name
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    UPI ID
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    UPI Type
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    UPI No
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
                        <Button
                          className="!bg-[#FD565C] !py-0 !text-white"
                          onClick={() => setOpenDialogBox(i?.regid)}
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.or_m_name}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.Branch}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.Ifsc}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.Upi_number}
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
        <Dialog open={openDialogBox}>
          <div className="grid grid-cols-2 gap-1 items-center  p-5">
            <span className="col-span-2 justify-end">
              <div className="flex justify-between">
                <span className="font-bold">Update UPI Details</span>
                <CloseIcon
                  className="cursor-pointer"
                  onClick={() => setOpenDialogBox(false)}
                />
              </div>
              <Divider />
            </span>
            <span>Name*</span>
            <TextField
              id="name"
              name="name"
              value={fk.values.name}
              onChange={fk.handleChange}
              placeholder="Enter Name"
              className="!w-[100%] !py-0"
            />
            <span>UPI Type*</span>
            <TextField
              id="upi_type"
              name="upi_type"
              value={fk.values.upi_type}
              onChange={fk.handleChange}
              className="!w-[100%]"
            />
            <span>UPI No*</span>
            <TextField
              id="upi_no"
              name="upi_no"
              value={fk.values.upi_no}
              onChange={fk.handleChange}
              className="!w-[100%]"
            />
            <span>UPI Id*</span>
            <TextField
              id="upi_id"
              name="upi_id"
              value={fk.values.upi_id}
              onChange={fk.handleChange}
              className="!w-[100%]"
            />
            <div className="col-span-2 flex gap-2 mt-4">
              <Button
                className="!bg-[#FD565C] !text-white"
                onClick={() => setOpenDialogBox(false)}
              >
                Cancel
              </Button>
              <Button
                className="!bg-[#BF6DFE] !text-white"
                onClick={() => fk.handleSubmit()}
              >
                Submit
              </Button>
            </div>
          </div>
        </Dialog>
      </Container>
    </Layout>
  );
}
