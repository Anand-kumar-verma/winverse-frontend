import {
  Box,
  Button,
  Container,
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
import axios from "axios";
import copy from "clipboard-copy";
import { useFormik } from "formik";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as React from "react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { useQuery, useQueryClient } from "react-query";
import * as XLSX from "xlsx";
import Layout from "../../component/layout/Layout";
import {
  TokenLaunch,
  getBalanceFunction,
  zupeeterTOkenHistory,
} from "../../services/apiCallings";
import { endpoint, rupees } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import moment from "moment/moment";
export default function ZupeeterTokenReport() {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [balance, setBalance] = React.useState("");
  const tableRef = React.useRef(null);
  const [receipt, setReceipt] = React.useState();
  const [amount, setAmount] = React.useState("");
  const user_id = localStorage.getItem("user_id");
  const [loading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(false);

  const getStatus = async () => {
    try {
      const res = await axios.get(endpoint.withdrawl_status);
      setStatus(res?.data?.earning);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getStatus();
  }, []);

  const client = useQueryClient();
  const { isLoading: token_launch_rate, data } = useQuery(
    ["token_zupeeter"],
    () => TokenLaunch(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const res = data?.data?.earning;

  const { isLoading, data: game_history } = useQuery(
    ["zupeeter_token_details"],
    () => zupeeterTOkenHistory(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  ); //wallet
  const { data: wallet_amount } = useQuery(
    ["wallet_amount_amount"],
    () => getBalanceFunction(setBalance),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const wallet_amount_data = wallet_amount?.data?.earning || 0;
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

  const initialValue = {
    payment_method: "Select Method",
    token_address: "",
    token_qnt: "",
    price: "",
    transaction_id: "",
    hash_number: "",
  };

  {
    /* ₹{Number(wallet_amount_data || 0)?.toFixed(2)} */
  }
  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const fd = new FormData();
      // condition for checking  receipt in case of usdt and upi
      if (fk.values.payment_method !== "Wallet") {
        if (!receipt) {
          toast("Please Select a Receipt Before Submitting.");
          return;
        }
      }
      if (fk.values.payment_method === "Wallet") {
        if (Number(wallet_amount_data || 0) < Number(amount || 0)) {
          toast("Insufficient balance");
          return;
        }
      }
      // akash sir ne ye conditon comment kraya hai....

      // if (fk.values.payment_method === 'USDT') {
      //   if (Number(wallet_amount_data || 0) < Number(Number(amount || 0) * Number(status?.doller || 0))) {
      //     toast("Insufficient balance")
      //     return
      //   }
      // }

      // else {
      //   if (Number(wallet_amount_data || 0) < Number(amount || 0)) {
      //     toast("Insufficient balance")
      //     return
      //   }
      // }
      fd.append("userid", user_id); // userid
      fd.append(
        "txtmethod",
        fk.values.payment_method === "Wallet"
          ? "1"
          : fk.values.payment_method === "UPI"
            ? "2"
            : fk.values.payment_method === "USDT" && "3"
      ); // 1 -- Wallet, 2: upi 3 usdt
      fd.append("txtprice", amount); // price
      fd.append("txtbatchid", fk.values.hash_number); // hash no
      fd.append("txttreid", fk.values.transaction_id); // transation id
      fd.append("txttoken", fk.values.token_qnt); // token no of token
      fd.append("txtwa", fk.values.token_address); // token address
      fd.append("txtfd", receipt); // receipt
      // setIsLoading(true)
      insertFundFn(fd);
    },
  });
  async function insertFundFn(fd) {
    try {
      const res = await axios.post(endpoint?.insert_ico_purchase, fd);
      toast(res?.data?.earning?.msg);
      setIsLoading(false);
      if ("ICO purchase recorded successfully." === res?.data?.earning?.msg)
        fk.handleReset();
    } catch (e) {
      console.log(e);
    }
    client.refetchQueries("token_zupeeter");
    client.refetchQueries("wallet_amount_amount");
  }

  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };

  async function gettokenAmountFn() {
    const reqBody =
      fk.values.payment_method === "USDT"
        ? {
          token_price: fk.values.token_qnt,
        }
        : {
          token: fk.values.token_qnt,
        };
    try {
      const url =
        fk.values.payment_method === "USDT"
          ? endpoint?.get_token_price_in_dooler
          : endpoint?.get_token_price;
      const res = await axios.post(url, reqBody);
      setAmount(res?.data?.earning?.bal);
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    gettokenAmountFn();
  }, [fk.values.token_qnt, fk.values.payment_method]);
  if (loading) return <CustomCircularProgress isLoading={loading} />;

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
        <div className="flex  flex-col  w-full items-center bg-[#63BA0E] px-2 py-1 rounded-lg mt-3">
          <div className="flex  justify-start w-full items-center -mb-6 mt-3">
            <span className="text-white">Your Wallet Amount : {rupees}</span>
            <span className="!text-[#0D0335]-600 font-bold px-1">
              {Number(wallet_amount_data || 0)}
            </span>
          </div>
          <div className="flex  justify-between w-full items-center">
            <span className="text-white">
              ICO Price: {rupees}
              <span className="!text-[#0D0335]-600 font-bold px-1" style={{ color: '#0D0335' }}>
                {Number(res?.ico_rate || 0).toFixed(5)}
              </span>
            </span>
            <img
              className="h-20"
              src="https://zupeeter.com/application/libraries/token.png"
            />
          </div>
        </div>

        <div className="flex justify-between w-full items-center bg-[#63BA0E] px-2 py-6 rounded-lg mt-3 ">
          <span className="!text-white">Received ICO Token</span>
          <TextField
            className="!text-white !bg-[#0D0335]"

            value={` ${game_history?.data?.earning?.total_ico}`}
          />
        </div>
        <div className="flex justify-between w-full items-center bg-[#63BA0E] px-2 py-6 rounded-lg mt-3 ">
          <div className="grid grid-cols-2 gap-1 items-center w-[400px] p-5">
            <span className="col-span-2 justify-end">
              <div className="flex justify-between">
                <span className="font-bold">Purchase Zupeeter Token</span>
              </div>
            </span>
            <span className="!text-white !text-sm">Payment Method*</span>
            <TextField
              id="payment_method"
              name="payment_method"
              value={fk.values.payment_method}
              onChange={fk.handleChange}
              className="!w-[100%] !bg-[#63BA0E]"
              select
              size="small"
            >
              <MenuItem value={"Select Method"}>Select Method</MenuItem>
              <MenuItem value={"Wallet"}>Wallet</MenuItem>
              <MenuItem value={"UPI"}>UPI</MenuItem>
              <MenuItem value={"USDT"}>USDT</MenuItem>
            </TextField>
            <span className="!text-white !text-sm">
              Zupeeter Token Address*
            </span>
            <div>
              <TextField
                id="token_address"
                name="token_address"
                placeholder="Token Address"
                value={fk.values.token_address}
                onChange={fk.handleChange}
                className="!w-[100%] !bg-[#63BA0E]"
              />
            </div>
            <span className="!text-white !text-sm">No. of Token*</span>
            <TextField
              id="token_qnt"
              name="token_qnt"
              placeholder="Enter Quantity"
              value={fk.values.token_qnt}
              onChange={fk.handleChange}
              className="!w-[100%] !bg-[#63BA0E]"
            />
            <span className="!text-white !text-sm">
              Price{fk.values.payment_method === "USDT" && " ( $ )"}*
            </span>
            <TextField
              id="price"
              name="price"
              placeholder="Price"
              value={amount || 0}
              // onChange={fk.handleChange}
              className="!w-[100%] !bg-[#63BA0E]"
            />
            {fk.values.payment_method === "USDT" && (
              <>
                <span className="!text-white !text-sm">Hash Number* *</span>
                <TextField
                  id="hash_number"
                  name="hash_number"
                  placeholder="Enter Hash No."
                  value={fk.values.hash_number}
                  onChange={fk.handleChange}
                  className="!w-[100%] !bg-[#63BA0E]"
                />
              </>
            )}

            {fk.values.payment_method === "UPI" && (
              <>
                <span className="!text-white !text-sm">Transaction Id*</span>
                <TextField
                  type="password"
                  id="transaction_id"
                  name="transaction_id"
                  placeholder="Enter Transaction Id"
                  value={fk.values.transaction_id}
                  onChange={fk.handleChange}
                  className="!w-[100%] !bg-[#63BA0E]"
                />
              </>
            )}
            {(fk.values.payment_method === "UPI" ||
              fk.values.payment_method === "USDT") && (
                <>
                  <span className="!text-white !text-sm">Receipt*</span>
                  <input
                    type="file"
                    id="myfile"
                    name="myfile"
                    className="!text-sm"
                    onChange={(e) => setReceipt(e.target.files[0])}
                    required
                  />
                </>
              )}
            {fk.values.payment_method === "USDT" && (
              <div className="col-span-2 !h-full !w-full flex items-center mt-10 flex-col">
                <div className=" w-1/2">
                  <QRCode
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      width: "100%",
                      background: "#FD565C",
                    }}
                    value={"0x0f392CC039C287C1ECE409A49dBB1165Bb9aE595"}
                    viewBox={`#FD565C`}
                  />
                </div>
                <div className="pt-4  gap-2">
                  <p className="!bg-[#63BA0E] !text-[#0EE6AC] !text-sm px-2">
                    0x0f392CC039C287C1ECE409A49dBB1165Bb9aE595
                  </p>
                  <div className="w-full flex justify-center mt-2">
                    <Button
                      size="small !py-1"
                      className="!bg-[#0ee6ac] !text-white place-items-center"
                      onClick={() =>
                        functionTOCopy(
                          "0x0f392CC039C287C1ECE409A49dBB1165Bb9aE595"
                        )
                      }
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="col-span-2 flex  justify-end gap-2 mt-4">
              <Button
                className="!bg-[#FD565C] !text-white"
                onClick={() => fk.handleReset()}
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
        </div>

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
              className="   !bg-[#63BA0E] !text-white !rounded-md px-2 py-1"
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
                    Payment Method
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Token
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Zupeeter Token Address
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Price
                  </TableCell>
                  <TableCell className="!text-sm !text-center !pr-0 !pl-1 border-2 border-r border-white">
                    Date
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
                        {i?.tr61_transaction_id}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.tr61_payment_method}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.tr61_token}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.tr61_wallet_Address}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {Number(i?.tr61_price || 0)?.toFixed()}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {moment(i?.tr61_date)?.format("YYYY-MM-DD")}
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
