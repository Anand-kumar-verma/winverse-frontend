import React from "react";
import Layout from "../../component/layout/Layout";
import { Box, Container, Drawer, Typography } from "@mui/material";
import theme from "../../utils/theme";
import { ArrowDownward, ExpandMore } from "@mui/icons-material";
import serv from "../../assets/images/server.png"
import agn from "../../assets/images/agent.png"
import backbtn from "../../assets/images/backBtn.png";
import { NavLink } from "react-router-dom";


const Server = () => {

    return <>

        <Layout header={false}>
            <Container
                sx={{
                    width: "100%",
                    height: "100vh",
                    overflow: "auto",

                }}
            >
                <Box sx={style.header} className="bg-[#63BA0E]">
                    <NavLink to="/promotion">
                        <Box component="img" src={backbtn} width={25}></Box>
                    </NavLink>
                    <Typography variant="body1" color="initial" className="!text-white !-mt-6 pb-5">
                        Agent Line Customer Server
                    </Typography>
                    <img src={serv} alt="" className="rounded-br-2xl" />
                    <Box >

                    </Box>
                </Box>

                <Box >  <NavLink to="/CustomerService">
                    <img src={agn} className="relative left-72 top-28 " alt="" />
                </NavLink>
                </Box>
            </Container>
        </Layout>

    </>
}
export default Server;
const style = {
    header: {
        padding: 1,
        background: theme.palette.primary.main,

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