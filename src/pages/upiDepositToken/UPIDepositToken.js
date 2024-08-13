import { Box, Button, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../component/layout/Layout";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { upiTOkenHistory } from "../../services/apiCallings";
import { useQuery } from "react-query";
import theme from "../../utils/theme";
import moment from "moment/moment";

const UPIDepositToken = () => {
  const user_id = localStorage.getItem("user_id");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const tableRef = React.useRef(null);
  const { data: upi_history } = useQuery(
    ["upi_token_details"],
    () => upiTOkenHistory(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const upi_history_data = React.useMemo(
    () => upi_history?.data?.earning?.rid,
    [upi_history?.data?.earning?.rid]
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
      upi_history_data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, upi_history_data]
  );

  const initialValue = {
    token: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (Number(fk.values.token < 100))
        return toast("Token must be greater or equal to 100");
      const reqBody = {
        userid: user_id,
        txtamount: amount || 0,
        txttoken: fk.values.token,
      };
      setIsLoading(true);
      if (!reqBody.userid || !reqBody.txtamount || !reqBody.txttoken)
        return toast("Plese enter all data");
      purchaseToken(reqBody);
    },
  });

  async function purchaseToken(reqBody) {
    try {
      const res = await axios.post(endpoint?.indian_insert_deposite, reqBody);
      toast(res?.data?.message);
      console.log(res);
      if (res?.data?.status === true) {
        window.location.href = res?.data?.earning?.msg;
        // window.open(res?.data?.earning?.msg, '_blank');
      }
    } catch (e) {
      console.log(e);
    }
    // client.refetchQueries("bank_details");
  }
  async function gettokenAmountFn() {
    const reqBody = {
      token: fk.values.token,
    };
    try {
      const res = await axios.post(endpoint?.get_token_price, reqBody);
      setAmount(res?.data?.earning?.bal);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    gettokenAmountFn();
  }, [fk.values.token]);

  if (isLoading) return <CustomCircularProgress isLoading={isLoading} />;
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
        <div className="grid grid-cols-2 gap-1 items-center w-[400px] p-5">
          <span className="col-span-2 justify-end">
            <div className="flex justify-between">
              <span className="font-bold">ICO Token UPI Payment</span>
            </div>
          </span>
          <span>Token*</span>
          <TextField
            id="token"
            name="token"
            type="number"
            value={fk.values.token}
            onChange={fk.handleChange}
            placeholder="Enter Token"
            className="!w-[100%]"
          ></TextField>
          <span>Amount *</span>
          <TextField
            id="amount"
            name="amount"
            value={amount || 0}
            //   onChange={fk.handleChange}
            className="!w-[100%]"
          />
          <div className="col-span-2 flex gap-2 mt-4">
            <Button
              className="!bg-[#FD565C] !text-white"
              onClick={() => fk.handleReset()}
            >
              Cancel
            </Button>
            <Button
              className="!bg-[#BF6DFE] !text-white"
              onClick={() => fk.handleSubmit()}
            >Submit
            </Button>
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
                    Token
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
                        {i?.tr80_transaction_id}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {i?.tr80_token}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {Number(i?.tr80_amount || 0)?.toFixed()}
                      </TableCell>
                      <TableCell className="!text-black !pr-2 !pl-1 !text-center border-2 !border-r !border-[#63BA0E]">
                        {moment(i?.tr80_date)?.format("YYYY-MM-DD")}
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
                count={upi_history_data?.length}
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
};

export default UPIDepositToken;
