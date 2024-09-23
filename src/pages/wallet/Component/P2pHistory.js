import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import copy from "clipboard-copy";
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import backbtn from "../../../assets/images/backBtn.png";
import { P2pTopupHistoryFunction } from "../../../services/apiCallings";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";

function P2pHistory() 

{

  const { isLoading, data } = useQuery(
    ["p2p_history"],
    () => P2pTopupHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const res = data?.data?.rid || [];
 

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };

  return (
    <Container  sx={{ background: theme.palette.secondary.main }}>
      <Box sx={{ background: theme.palette.primary.main, padding: 1 }}>
        <Stack
          direction="row"
          sx={{ alignItems: "end", justifyContent: "space-between", position: "relative" }}
        >
          <NavLink onClick={goBack}>
            <Box component="img" src={backbtn} width={25}></Box>
          </NavLink>
          <Box sx={{ position: "absolute", left: "30%", top: "10%" }}>
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "16px", fontWeight: "600" }}
            >
              P2P TopUp History
            </Typography>
          </Box>
        </Stack>
      </Box>
      
      <CustomCircularProgress isLoading={isLoading} />
      {res?.map((i, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            padding: "10px",
            borderRadius: "10px",
            background: "#fff",
            width: "92%",
            margin: "auto",
            mt: 2,
          }}
        >
          <Stack
            direction="row"
            sx={{
              paddingBottom: "10px",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #efefef",
            }}
          >
            <Box>
              <Typography
                className=" !text-white rounded px-2 py-1 !flex justify-center "
                sx={{ background: theme.palette.primary.main }}
              >
                P2P TopUp
              </Typography>
            </Box>
            <Box>
            <Typography variant="body1" color="initial" className={`
            ${i?.STATUS === "Approve" 
              ?"!text-green-600"
              :"!text-red-600"  
            } !font-bold` }>
             {i?.STATUS=== "Approve"
             ?"Approved"
            :i?.STATUS}
            </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              "&>p:nth-child(1)": {
                color: "#888",
                fontSize: "13px",
                fontWeight: "600",
                py: 1,
              },
              "&>p:nth-child(2)": {
                // color: theme.palette.primary.main,
                fontSize: "13px",
                fontWeight: "600",
                py: 1,
              },
            }}
          >
            <Typography variant="body1" color="initial">
            Balance
            </Typography>
            <Typography variant="body1" 
            className="!text-green-800">
            {i?.amt}
        
            </Typography>
          </Stack>
          <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
                Status
              </Typography>
              <Typography variant="body1" color="initial" >
              {i?.STATUS=== "Approve"
             ?"Approved"
            :i?.STATUS}
            </Typography>
            </Stack>
        
          <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
              }}
            >
              <Typography variant="body1" color="initial">
           Date/Time
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                className="!text-green-500"
              >
                {moment(i?.act_date)?.format("DD-MM-YYYY HH:mm:ss")}
              </Typography>
            </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              "&>p": {
                color: "#888",
                fontSize: "13px",
                fontWeight: "600",
                py: 1,
              },
            }}
          >
            <Typography variant="body1" color="initial">
              Transaction ID
            </Typography>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                "&>p:nth-child(1)": {
                  color: "#888",
                  fontSize: "13px",
                  fontWeight: "600",
                  py: 1,
                },
                "&>p:nth-child(2)": {
                  color: theme.palette.primary.main,
                  fontSize: "13px",
                  fontWeight: "600",
                },
              }}
            >
              <Typography variant="body1" color="initial">
                {i?.tr_id}
              </Typography>
              <IconButton sx={{ padding: 0 }}
               onClick={() =>
                functionTOCopy(
                  i?.m_trans_id
                )
              }>
                <ContentCopyIcon sx={{ color: "#888", width: "15px", ml: 1 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      ))}

    </Container>
  );
}

export default P2pHistory;


