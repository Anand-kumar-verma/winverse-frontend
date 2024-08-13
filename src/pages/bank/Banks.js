import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  MenuItem,
  Stack,
  TablePagination,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFormik } from "formik";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as React from "react";
import { useQuery, useQueryClient } from "react-query";
import * as XLSX from "xlsx";
import Layout from "../../component/layout/Layout";
import {
  BankDetailsFUnction,
  bankListFuncton,
} from "../../services/apiCallings";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import axios from "axios";
import { endpoint } from "../../services/urls";
import toast from "react-hot-toast";

export default function Banks() {
  const user_id = localStorage.getItem("user_id");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const tableRef = React.useRef(null);
  const client = useQueryClient()
  const [openDialogBox, setOpenDialogBox] = React.useState(false);

  const { isLoading, data: game_history } = useQuery(
    ["bank_details"],
    () => BankDetailsFUnction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const { isLoading: bank_list, data: bankList } = useQuery(
    ["bank_list"],
    () => bankListFuncton(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const banks = bankList?.data?.earning?.bank || [];
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

  console.log(visibleRows);



  const initialValue = {
    bank_name: openDialogBox,
    holder:
      visibleRows?.find((i) => i?.regid === openDialogBox)?.Associate_Name ||
      "",
    ifsc:
      visibleRows?.find((i) => i?.regid === openDialogBox)?.ifsc_code || "",
    account:
      visibleRows?.find((i) => i?.regid === openDialogBox)?.account_number ||
      "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const capitalizedIFSC = fk.values.ifsc.toUpperCase();
      const reqBody = {
        user_id: user_id,
        txtbank: fk.values.bank_name,
        txtholdername: fk.values.holder,
        txtifscnew: capitalizedIFSC,
        txtacno: fk.values.account,
      };

      if (
        !reqBody.user_id ||
        !reqBody.txtacno ||
        !reqBody.txtholdername ||
        !reqBody.txtifscnew ||
        !reqBody.txtbank
      )
        return toast("Plese enter all data");
      updateBankDetails(reqBody);
    },
  });

  async function updateBankDetails(reqBody) {
    try {
      const res = await axios.post(endpoint?.update_bank_details, reqBody);
      toast(res?.data?.earning?.msg);
      if (res?.data?.status) {
        setOpenDialogBox(false);
      }
    } catch (e) {
      console.log(e);
    }
    client.refetchQueries("bank_details")
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
        <Box className="!m-2">
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
                  <TableCell className="!text-sm !text-center !pl-[2px] !pr-0 border-2 border-r  border-white">
                    S.No.
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Action
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Bank
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Holder
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    IFSC
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Acc Number
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
                          onClick={() => {
                            Number(i?.bank_update) === 0
                              ? setOpenDialogBox(i?.regid)
                              : toast("You have already changed your bank account")
                          }}
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.Bankname}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.Associate_Name}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.ifsc_code}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.account_number}
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
          <div className="grid grid-cols-2 gap-1 items-center w-[400px] p-5">
            <span className="col-span-2 justify-end">
              <div className="flex justify-between">
                <span className="font-bold">Update Bank Details</span>
                <CloseIcon
                  className="cursor-pointer"
                  onClick={() => setOpenDialogBox(false)}
                />
              </div>
              <Divider />
            </span>
            <span>Bank Name*</span>
            <TextField
              id="bank_name"
              name="bank_name"
              value={fk.values.bank_name}
              onChange={fk.handleChange}
              select
              placeholder="Select Bank"
              size="small"
              className="!w-[100%] !py-0"
            >
              {banks?.map((i) => {
                return (
                  <MenuItem value={i?.m_bank_id}>
                    {i?.m_bank_status && i?.m_bank_name}
                  </MenuItem>
                );
              })}
            </TextField>
            <span>Holder Name*</span>
            <TextField
              id="holder"
              name="holder"
              value={fk.values.holder}
              onChange={fk.handleChange}
              className="!w-[100%]"
            />
            <span>IFSC Code*</span>
            <TextField
              id="ifsc"
              name="ifsc"
              value={fk.values.ifsc}
              onChange={fk.handleChange}
              className="!w-[100%]"
            />
            <span>Account No*</span>
            <TextField
              id="account"
              name="account"
              value={fk.values.account}
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
