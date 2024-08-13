import React from "react";
import Layout from "../../component/layout/Layout";
import { Box, Container, Drawer, Typography } from "@mui/material";
import theme from "../../utils/theme";
import {  ExpandMore } from "@mui/icons-material";
import backbtn from "../../assets/images/backBtn.png";
import { NavLink } from "react-router-dom";



const MyCommission = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
        <Box role="presentation" onClick={toggleDrawer(false)} className="mb-20 flex flex-col justify-between mx-5 !h-[80%]">
           <Box className="flex justify-between m-3 !h-[80%]">
           <Typography className="text-gray-300">Cancel</Typography>
            <Typography className="font-bold ">Choose a date
            </Typography>
            <Typography className="text-orange-400">Confirm</Typography>
           </Box>
           <Box className="flex justify-between m-3 !h-[80%]">
           <Typography className="text-gray-300">2022</Typography>
            <Typography className="font-bold text-gray-300 ">03
            </Typography>
            <Typography className="text-gray-300">06</Typography>
           </Box>
           <Box className="flex justify-between m-3 !h-[80%]">
           <Typography className="text-gray-300">2023</Typography>
            <Typography className="font-bold text-gray-300">03
            </Typography>
            <Typography className="text-gray-300">08</Typography>
           </Box>
           <Box className="flex justify-between m-3 !h-[80%]">
           <Typography >2024</Typography>
            <Typography className="font-bold ">04
            </Typography>
            <Typography >07</Typography>
           </Box>
        </Box>
    );
    return <>

        <Layout header={false}>
            <Container
                sx={{
                    width: "100%",
                    height: "100vh",
                    overflow: "auto",

                }}
            >
                <Box sx={style.header}>
                    <Typography variant="body1" color="initial">
                    <NavLink to="/promotion">
          <Box component="img" src={backbtn} width={25}></Box>
        </NavLink>
                    </Typography>
                    <Typography variant="body1" color="initial" className="!text-white">
                        Commission Details
                    </Typography>
                    <Box >

                    </Box>
                </Box>
                <Box onClick={toggleDrawer(true)} className="!flex !p-2 !justify-between !items-center !rounded-lg !py-4 !bg-white !shadow-xl  !mx-5 !mt-5">
                    <Typography
                        className="  !text-gray-500 !border-none"

                    >Data
                    </Typography>
                    <Typography>
                        <ExpandMore  className="  !text-gray-500" />
                    </Typography>



                </Box>

            </Container>
        </Layout>
        <Drawer open={open}    anchor={"bottom"} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    </>
}
export default MyCommission;
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
}