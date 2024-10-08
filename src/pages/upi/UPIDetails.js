import { ArrowBackIos, ContentPaste, Edit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
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

  const navigate = useNavigate()

  const handlePasteClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      fk.setFieldValue('upi_no', clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard content:', err);
    }
  };
  const handlePasteClick1 = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      fk.setFieldValue('upi_id', clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard content:', err);
    }
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
        <Box sx={style.header}>
          <Box >
            <ArrowBackIos className="!text-white !cursor-pointer"  onClick={()=>navigate('/withdraw')}/>
          </Box>
          <Typography variant="body1" sx={{ color: 'white' }} >
             UPI Details
          </Typography>
          <Box></Box>
        </Box>
       
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
            <span>UPI Id*</span>
            <TextField
              id="upi_id"
              name="upi_id"
              value={fk.values.upi_id}
              onChange={fk.handleChange}
              className="!w-[100%]"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ContentPaste 
                      onClick={handlePasteClick1} 
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