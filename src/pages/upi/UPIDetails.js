import { ArrowBackIos, Edit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  IconButton,
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
import upi from "../../assets/images/upi (2).png";
import Layout from "../../component/layout/Layout";
import {
  UPIDetailsFUnction
} from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { deCryptData } from "../../shared/secret";
import theme from "../../utils/theme";
export default function UPIDetails() {
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
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
            <ArrowBackIos className="!text-white !cursor-pointer"  onClick={()=>navigate('/bank')}/>
          </Box>
          <Typography variant="body1" sx={{ color: 'white' }} >
             UPI Details
          </Typography>
          <Box></Box>
        </Box>
        {/* <div className="flex justify-between w-full px-1 pt-2 pb-1">
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
                    <img src={upi} className="!text-white w-8" alt=""/>
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
                    UPI Holder Name
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }} >
                    {i?.or_m_name}
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
                    UPI ID
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }} >
                    {i?.Branch}
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
                    UPI Type
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }} >
                    {i?.Ifsc}
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
                    UPI No
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }} >
                    {i?.Upi_number}
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