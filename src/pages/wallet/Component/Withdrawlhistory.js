import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import allinactive from "../../../assets/images/allactive.png";
import allactive from "../../../assets/images/allinactive.png";
import backbtn from "../../../assets/images/backBtn.png";
import bankcardactive from "../../../assets/images/bankcardactive.png";
import bankcardinactive from "../../../assets/images/bankcardinactive.png";
import { withdrawlHistoryFunction } from "../../../services/apiCallings";
import CustomCircularProgress from "../../../shared/loder/CustomCircularProgress";
import theme from "../../../utils/theme";
import upi from  "../../../assets/images/upi (2).png"

function Withdrawlhistory() {
  const [isAllValue, setIsAllValue] = useState(false);
  const [visibleData, setVisibleData] = useState([]);
  const [value, setValue] = useState(1); 

  const { isLoading, data } = useQuery(
    ["withdrawl_history"],
    () => withdrawlHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const res = data?.data?.earning?.withdrawal || [];

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let filteredData = [];

    if (value === 1) {
      filteredData = res;
    } else if (value === 2) {
      filteredData = res?.filter(i => i.m_w_type === 'Bank');
    } else if (value === 3) {
      filteredData = res?.filter(i => i.m_w_type === 'UPI');
    }

    setVisibleData(isAllValue ? filteredData : filteredData.slice(0, 3));
  }, [isAllValue, value, res]);

  return (
    <Container sx={{ background: theme.palette.secondary.main }}>
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
              Withdrawal History
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ padding: 1 }}>
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button
            className={value === 1 ? " gametableactive gametable" : " gametable"}
            onClick={() => handleChange(1)}
          >
            {value === 1 ? (
              <Box component="img" src={allactive} width={20} mr={1}></Box>
            ) : (
              <Box component="img" src={allinactive} width={20} mr={1}></Box>
            )}
            All
          </Button>
          <Button
            className={value === 2 ? " gametableactive gametable" : " gametable"}
            onClick={() => handleChange(2)}
          >
            {value === 2 ? (
              <Box component="img" src={bankcardactive} width={20} mr={1}></Box>
            ) : (
              <Box component="img" src={bankcardinactive} width={20} mr={1}></Box>
            )}
            BANK CARD
          </Button>
          <Button
            className={value === 3 ? " gametableactive gametable" : " gametable"}
            onClick={() => handleChange(3)} >
              {value === 3 ? (
              <Box component="img" src={upi} width={20} mr={1}></Box>
            ) : (
              <Box component="img" src={upi} width={20} mr={1}></Box>
            )}
           
            UPI
          </Button>
        </Stack>
      </Box>
      <CustomCircularProgress isLoading={isLoading} />
      {visibleData?.map((i, index) => (
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
                Withdrawl
              </Typography>
            </Box>
            <Box
              sx={{
                color: "#888",
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: "600",
              }}
              className={`${i?.m_w_status === "Success"
                ? "!text-green-500"
                : "!text-red-500"
                }`}
            >
              {i?.m_w_status}
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
                color: theme.palette.primary.main,
                fontSize: "13px",
                fontWeight: "600",
                py: 1,
              },
            }}
          >
            <Typography variant="body1" color="initial">
              Balance
            </Typography>
            <Typography variant="body1">₹ {i?.m_w_amount}</Typography>
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
              Type
            </Typography>
            <Typography variant="body1" color="initial">
              {i?.m_w_type}
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
                {moment(i?.m_w_reqdate)?.format("DD-MM-YYYY HH:mm:ss")}
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
              Order number
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
                {i?.m_w_trans_id}
              </Typography>
              <IconButton sx={{ padding: 0 }}>
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

export default Withdrawlhistory;


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
