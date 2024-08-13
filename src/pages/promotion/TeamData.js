
import { Box, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import Layout from "../../component/layout/Layout";
import theme from "../../utils/theme";
import backbtn from "../../assets/images/backBtn.png";
import { TeamDatafunction, } from "../../services/apiCallings";
import { useQuery } from "react-query";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";

function TeamData() {

  const { isLoading, data } = useQuery(["get_all"], () => TeamDatafunction(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const team = data?.data?.earning || [];


  return (
    <Layout header={false}>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",

        }}> <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Typography variant="body1" color="initial">
            <NavLink to="/promotion">
              <Box component="img" src={backbtn} width={25}></Box>
            </NavLink>
          </Typography>
          <Typography variant="body1" color="initial" className="!text-white !text-center">
            Team data
          </Typography>
          <Typography variant="body1" color="initial" className="!text-white !text-center">

          </Typography> </Box>

        <Box>
          <Box className="flex justify-center gap-8 bg-[#63BA0E] text-white py-4 border-t  ">
            <Typography className="!text-xl">Levels</Typography>
            <Typography className="!text-xl">Memebers</Typography>
            <Typography className="!text-xl">Deposits</Typography>
            <Typography className="!text-xl">*</Typography>
          </Box>
          {team?.map((col) => {
            return (
              <Accordion className="!m-2">
                <AccordionSummary

                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box className="flex justify-between gap-5">
                    <Typography className="">{col?.LEVEL}</Typography>
                    <Typography className="!ml-20">{col?.total_count}</Typography>
                    <Typography className="!ml-20">{col?.amt}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className="bg-gray-300">
                  <Box className="!flex flex-col !justify-between ">
                    <Box className="!flex !justify-between !m-5 ">
                      <Typography className="">S.No</Typography>
                      <Typography className="">User Id</Typography>
                      <Typography className="">Name</Typography>
                    </Box>
                    <Typography className="border-t" />
                    <Box className="!flex !justify-between bg-white !px-5 !py-5">
                      <Typography className="">1</Typography>
                      <Typography className="!text-sm">{col?.user_id}</Typography>
                      <Typography className="!text-sm">{col?.or_m_name}</Typography>
                    </Box>
                  </Box>

                </AccordionDetails>
              </Accordion>
            )
          })}


        </Box>
      </Container>

    </Layout>
  );
}

export default TeamData;

const style = {
  header: {
    padding: 1,
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
  },

};




