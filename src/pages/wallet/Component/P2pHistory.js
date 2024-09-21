import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import copy from "clipboard-copy";
import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import backbtn from "../../../assets/images/backBtn.png";
import { P2pHistoryFunction, P2pTopupHistoryFunction } from "../../../services/apiCallings";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";

function P2pHistory() 

{
  const [isAllValue, setIsAllValue] = useState(false);

  const { isLoading, data } = useQuery(
    ["p2p_history"],
    () => P2pTopupHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const res = data?.data?.rid || [];
  console.log(res)

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
                {i?.m_bal_type}
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
            {i?.m_ledger_type=== "Dr" ?
             <Typography>Debit </Typography>
           :
           <Typography>Credit </Typography>
            }
            </Typography>
            <Typography variant="body1" 
            className={`${
              i?.m_ledger_type=== "Dr" ?
              " text-red-600"
              :
               " text-green-600"
               
            }`}>
            
            {i?.m_ledger_type=== "Dr" ?
             <Typography> - {i?.m_dramount} </Typography>
           :
           <Typography> + {i?.m_cramount} </Typography>
            }

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
            <Typography variant="body1" color="initial" className="!text-red-400">
             {i?.m_status}
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
                {moment(i?.m_transdate)?.format("DD-MM-YYYY HH:mm:ss")}
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
                {i?.m_trans_id}
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

      <Button
        sx={{ marginTop: 2, margin:5, borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
        variant="outlined"
        onClick={() => setIsAllValue(!isAllValue)}
      >
        {isAllValue ? "Show Less" : "Show All"}
      </Button>
    </Container>
  );
}

export default P2pHistory;


const style = {
  paytmbtntwo: {
    borderRadius: "20px",
    textTransform: "capitalize",
    mb: 2,
    width: "92%",
    mt: 2,
    mx: 2,
    padding: "10px",
    "&:hover": { border: "1px solid transparent" },
  },
  wdbtn: {
    width: "95% !important",
    boxShadow: "0 0.05333rem #b6bad0",
    borderRadius: "20px",
    border: "none",
    color: "#fff",
    letterSpacing: "0.13333rem",
    fontWeight: "700",
    fontSize: "15px",
    height: "0.93333rem",
    width: "100%",
    background:
      "linear-gradient(180deg, #cfd1de 0%, #c7c9d9 100%), linear-gradient(180deg, #cfd1de 0%, #c7c9d9 100%)",
    backgroundSize: "100% 100%, 100% 100%",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
    textShadow: "0 0.02667rem 0.01333rem #afb0be",
    padding: "20px",
    mt: 3,
  },
};
