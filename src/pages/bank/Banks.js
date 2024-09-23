import { AccountBalanceOutlined, ArrowBackIos, ContentPaste, Edit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import Layout from "../../component/layout/Layout";
import {
  BankDetailsFUnction,
  bankListFuncton,
} from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { deCryptData } from "../../shared/secret";
import theme from "../../utils/theme";

export default function Banks() {
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
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

  const { data: bankList } = useQuery(
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
      visibleRows?.find((i) => i?.regid === openDialogBox)?.AcNo ||
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

  const handlePasteClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      fk.setFieldValue('ifsc', clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard content:', err);
    }
  };
  const handlePasteClick2 = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      fk.setFieldValue('account', clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard content:', err);
    }
  };

  const navigate = useNavigate()
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
  
           <Box sx={style.header}>
          <Box >
            <ArrowBackIos className="!text-white !cursor-pointer"  onClick={()=>navigate('/withdraw')}/>
          </Box>
          <Typography variant="body1" sx={{ color: 'white' }} >
             Bank Details
          </Typography>
          <Box></Box>
        </Box>
        <CustomCircularProgress isLoading={isLoading} />
        {/* <div className="flex justify-center gap-5 w-full px-1 pt-2 pb-1">
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
        </div> */}
       
         <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              mt: 2,
              borderRadius: "10px",
              mb: 5,
            }}
          >
          
            {visibleRows?.map((i, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    padding: "15px",
                    borderRadius: "10px",
                    background: theme.palette.primary.main,
                  }}
                >
                  <div className="flex !justify-between">
                    <IconButton>
                      <AccountBalanceOutlined sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton  onClick={() => {
                            setOpenDialogBox(i?.regid)
                          }}>
                      <Edit sx={{ color: 'white' }} />
                    </IconButton>
                  </div>
                  <Divider className="!bg-red-100 !text-red-100 !bg-opacity-20" />
                  <Stack
                    direction="row"
                    sx={{
                      marginTop: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: 'white' },
                    }}
                  >
                    <Typography variant="body1" sx={{ color: 'white' }} >
                      Account Holder Name
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }} >
                      {i?.Associate_Name}
                    </Typography>
                  </Stack>
                
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: 'white' },
                    }}
                  >
                    <Typography variant="body1" sx={{ color: 'white' }} >
                      Bank Name
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }} >
                      {i?.Bankname}
                    </Typography>
                  </Stack>
                 
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: 'white' },
                    }}
                  >
                    <Typography variant="body1" sx={{ color: 'white' }} >
                      IFSC Code
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }} >
                      {i?.ifsc_code}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: 'white' },
                    }}
                  >
                    <Typography variant="body1" sx={{ color: 'white' }} >
                      Account Number
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }} >
                      {i?.AcNo}
                    </Typography>
                  </Stack>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Dialog open={openDialogBox}>
          <div className="grid grid-cols-2 gap-1 items-center  p-5">
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ContentPaste 
                      onClick={handlePasteClick} 
                      style={{ cursor: 'pointer' }} 
                    />
                  </InputAdornment>
                ),
              }}
            />
            <span>Account No*</span>
            <TextField
              id="account"
              name="account"
              value={fk.values.account}
              onChange={fk.handleChange}
              className="!w-[100%]"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ContentPaste 
                      onClick={handlePasteClick2} 
                      style={{ cursor: 'pointer' }} 
                    />
                  </InputAdornment>
                ),
              }}
            />
            <div className="col-span-2 flex gap-2 mt-4">
              <Button
                className="!bg-[#da1c22] !text-white"
                onClick={() => setOpenDialogBox(false)}
              >
                Cancel
              </Button>
              <Button
                className="!bg-[#0D0335] !text-white"
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
const style = {
  header: {
    padding: "10px 8px",
    background: "#63BA0E",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: 'white',
    },
    "& > a > svg": {
      color: 'white',
      fontSize: "35px",
    },
  },
}