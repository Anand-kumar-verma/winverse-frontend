
import {  Box, Container, Drawer, IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import cardbg from '../../assets/images/cardbg.png';
import Layout from "../../component/layout/Layout";
import theme from "../../utils/theme";
import icon from "../../assets/images/searchIcon.png"
import { CopyAll, ExpandMore } from "@mui/icons-material";
import backbtn from "../../assets/images/backBtn.png";
import { useState } from "react";
import { Promotionfunction, TeamsubFunction, } from "../../services/apiCallings";
import { useQuery } from "react-query";
import { TeamFunction } from "../../services/apiCallings";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import { useCopyToClipboard } from "usehooks-ts";
import { Check} from "@mui/icons-material";

 

function TeamReport() {

  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const { data:history } = useQuery(["get_info"], () => Promotionfunction(),   {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry:false,
      retryOnMount:false,
      refetchOnWindowFocus:false
    });
  const prim = history?.data?.earning || [];

  const { data:count } = useQuery(["team_count"], () => TeamsubFunction(),   {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry:false,
      retryOnMount:false,
      refetchOnWindowFocus:false
    });
  const Counting = count?.data?.earning || [];


  const { isLoading,data} = useQuery(["TeamReport"], () => TeamFunction(),   {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry:false,
      retryOnMount:false,
      refetchOnWindowFocus:false
    });
const team =data?.data?.earning || [];

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
  };

  const DrawerList = (
      <Box role="presentation" onClick={toggleDrawer(false)} className="mb-20 flex flex-col justify-between mx-5 !h-[80%]">
         <Box className="flex justify-between m-3 !h-[80%]">
         <Typography className="text-gray-300">Cancel</Typography>
         
          <Typography className="text-orange-400">Confirm</Typography>
         </Box>
         <Box className="flex flex-col text-center m-3 mt-10 !h-[80%]">
    <Typography className="!my-1">All</Typography>
    <Typography className="!my-1">Tier1</Typography>
    <Typography className="!my-1">Tier2</Typography>
    <Typography className="!my-1">Tier3</Typography>
    <Typography className="!mt-1 text-gray-300">Tier4 </Typography>

         </Box>
      
        
      </Box>
  );

  return (
    <Layout header={false}>
      <Container 
       sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",

    }}>
       <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Typography variant="body1" color="initial">
          <NavLink to="/promotion">
          <Box component="img" src={backbtn} width={25}></Box>
        </NavLink>
          </Typography>
          <Typography variant="body1" color="initial" className="!text-white">
            Subordinate data
          </Typography>
          <Box>

          </Box>

        </Box>
        <Box className={"!grid !grid-cols-3 !w-[90%]  !ml-5 !place-items-center !bg-white m-2  !border-white  !rounded-md px-2  shadow-lg "}>
          <Typography

            className="!col-span-2  !text-gray-500 !border-none"

          >Search Subordinate UID
          </Typography>
          <img src={icon} className=" !w-20 !col-span-1" />

        </Box>

        <Box className="flex justify-between mx-5">
          <Box  onClick={toggleDrawer(true)} className="shadow-xl w-full  p-2 bg-white rounded-lg text-gray-500 flex justify-between "
          >
            <Typography> All Data </Typography>
            <Typography>
                        <ExpandMore  className="  !text-gray-500" />
                    </Typography>
          </Box>
         

        </Box>
        <Box sx={style.commitionboxOuter}>

          <Box sx={style.subcordinateBox}>

            <Box sx={style.boxStyles} className="!mt-6">
              <Box sx={style.innerBoxStyles}>

                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-red-500"
                  >
                   {prim?.direct}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-white"
                  >
                    {" "}
                    Direct
                  </Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-black"
                  >
                   {prim?.number_of_register}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-white"
                  >
                    {" "}
                    Number of Registers
                  </Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-green-600"
                  >
                   {prim?.total_amt}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-white"
                  >
                    {" "}
                    Total Amount
                  </Typography>
                </Box>

              </Box>

              <Box sx={style.innerBoxStylestwo}>

              <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-red-500"
                  >
                   {Counting?.direct}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-white"
                  >
                    {" "}
                    Direct
                  </Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-black"
                  >
                   {Counting?.number_of_register}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-white"
                  >
                    {" "}
                    Number of Registers
                  </Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-green-600"
                  >
                   {Counting?.total_amt}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-white"
                  >
                    {" "}
                    Total Amount
                  </Typography>
                </Box>
              </Box>
            </Box>

          </Box>
          <Box sx={style.invitebutton} className="invitebutton">
            {team?.map((report)=>{
              return(
              <Box sx={style.invitbox} className="!my-2  !shadow-lg !rounded-lg">
               <Box >
                <Typography className="!text-lg !text-gray-600 my-2"
                >UID:{report?.or_m_user_id}  <IconButton onMouseLeave={() => setCopied(false)}
                onClick={() => {
                  copy(report?.or_m_user_id);
                  setCopied(true);
                }}>
                   {copied ? (
                  <Check className="h-5 w-5 text-blue-600" />
                ) : (
                  <CopyAll className="h-5 w-5 text-black" />
                )} 
                </IconButton></Typography>
              
              </Box>
              <Box className="!border-b !border-gray-400" />
              <Box className="flex justify-between">
                <Box className="text-gray-500">
                 
                  <Typography>
                  Name
                  </Typography>
                  <Typography>
                    Mobile No 
                  </Typography>
                
                </Box>
                <Box className="text-red-500">
                 
                  <Typography>
                 {report?.or_m_name}
                  </Typography>
                  <Typography>
                   {report?.or_m_mobile_no}
                  </Typography>
                 
                </Box>
              
              </Box>
              
              </Box>
            )
            })}
      </Box>
        </Box>

      </Container>
      <Drawer open={open} anchor={"bottom"} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
      
    </Layout>
  );
}

export default TeamReport;

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
  commitionboxOuter: {
    width: "100%",
    height: "auto",
    background: '#F7F8FF',
    "&>img": { width: "100%", height: "100%" },
  },
  commitionbox: {

    margin: "auto",
    width: "auto",
    textAlign: "center",
    py: 2,
    backgroundImage: `url(${cardbg})`,
    "&>p:nth-child(1)": { fontSize: "25px", fontWeight: "500" },
    "&>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: "400",
      padding: "5px 0px",
      background: '#ffa43f',
      borderRadius: "20px",
    },
    "&>p:nth-child(3)": {
      fontSize: "13px",
      fontWeight: "400",
      marginTop: "5px",
    },
  },
  subordinatesleft: {
    width: "50%",
    textAlign: "center",
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: '#F6F6F6',
    borderTopLeftRadius: "10px",
    borderRight: "2px solid #fefefe",
    "&>svg": { color: theme.palette.primary.main, fontSize: "25px", marginRight: "10px" },
    "&>p": { color: "gray", fontSize: "14px", fontWeight: "500" },


  },
  subordinatesRight: {
    width: "50%",
    textAlign: "center",
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: '#F6F6F6',
    borderTopRightRadius: "10px",
    "&>svg": { color: theme.palette.primary.main, fontSize: "25px", marginRight: "10px" },
    "&>p": { color: "gray", fontSize: "14px", fontWeight: "500" },

  },
  boxStyles: {
    background: '#ff9901',
    padding: "15px",
    display: "flex",
    borderRadius: " 10px 10px 10px 10px",
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    width: "92%",
    margin: 'auto;'
  },
  innerBoxStyles: {
    width: "50%",
    borderRight: "1px solid white",
    borderBottomLeftRadius: "10px",
    padding: "0px 0px",
  },
  innerBoxStylestwo: { width: "50%", padding: "0px 0px" },
  subcordinatelist: {
    textAlign: "center",
    "&>p": { color: "white important", fontSize: "13px" },
    mb: 1,
  },
  subcordinateBox: {
    width: "100%",

    background: '#F7F8FF',

  },
  invitebutton: {
    width: "100%",
    background: '#F7F8FF',
  },
  invitebtn: {
    mt: "20px",
    pb: 2,
    "&>a>p": {
      width: "80%",
      marginLeft: "10%",
      borderRadius: "20px",
      textAlign: "center",
      padding: "10px",
      background: 'orange',
      color: "white",
      fontSize: "17px",
      fontWeight: 600,
    },
  },
  invitbox: {
   
    background: '#ffffff',
    padding: "10px",
    mb: "20px",
    borderRadius: "10px",
    marginLeft: "2.5%",
    
    fontSize: "14px",
    marginRight: "10px",
    
  },
  promotionBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>div:nth-child(1)": { alignItems: "center" },
    "&>div:nth-child(1)>img": { width: "35px", marginRight: "10px" },
    "&>div:nth-child(1)>p": {
      fontSize: "17px",
      fontWeight: 500,
      color: "black !important",
    },
  },
  promotionBoxOuter: {
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    width: "92%",
    background: '#ffffff',
    padding: "10px",
    mt: "20px",
    borderRadius: "5px",
    marginLeft: "2.5%",
    paddingBottom: "15px",
    "&>div:nth-child(2)>div:nth-child(1)": {
      my: "10px",
      borderRight: "1px solid gray",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(2)>div:nth-child(2)": {
      my: "10px",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(2)>div>p:nth-child(1)": { color: "black !important" },
    "&>div:nth-child(2)>div>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: 500,
      color: "black !important",
    },
    "&>div:nth-child(3)>div:nth-child(1)": {
      my: "10px",
      borderRight: "1px solid gray",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(3)>div:nth-child(2)": {
      my: "10px",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(3)>div>p:nth-child(1)": { color: "black !important" },
    "&>div:nth-child(3)>div>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: 500,
      color: "black !important",
    },
  },
  promotionBoxOutertwo: {
    width: "90%",
    padding: "10px",
    borderRadius: "5px",
    marginLeft: "5%",
    paddingBottom: "70px",
  },
};
