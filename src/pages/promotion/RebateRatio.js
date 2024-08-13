import { Box, Container, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import React from "react";
import { NavLink } from "react-router-dom";
import backbtn from "../../assets/images/backBtn.png";
import Casino from "../../assets/images/casino.png";
import load from "../../assets/images/loader.png";
import point from "../../assets/images/point.png";
import sport from "../../assets/images/sport.png";
import Layout from "../../component/layout/Layout";
import theme from "../../utils/theme";

const RebateRatio = () => {
    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 2 }} >
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };


    const [value, setValue] = React.useState(0);

    return <>
        <Layout header={false}>
            <Container >
                <Box sx={style.header}>
                    <Typography variant="body1" color="initial">
                        <NavLink to="/promotion">
                            <Box component="img" src={backbtn} width={25}></Box>
                        </NavLink>
                    </Typography>
                    <Typography variant="body1" color="initial" className="!text-white">
                        Rebate ratio
                    </Typography>
                    <Box >

                    </Box>
                </Box>

                <Box className="flex justify-center gap-5 mx-3 mt-2 mb-1">
                    <Typography className="bg-[#63BA0E] !p-5 !px-8 grey-300 shadow-xl  rounded-lg">
                        <img src={load} alt="" className="bg-[#63BA0E] rounded-xl  w-10" />
                        Lottery
                    </Typography>
                    <Typography className="!p-5  !px-8 grey-300 shadow-xl bg-white rounded-lg">
                        <img src={Casino} alt="" className="bg-gray-500 rounded-xl w-10" />
                        Casino
                    </Typography>
                    <Typography className="!p-5 !px-8 grey-300 shadow-xl bg-white rounded-lg">
                        <img src={sport} alt="" className="bg-gray-500 rounded-xl w-10" />
                        Sports
                    </Typography>


                </Box>
                <Box sx={{ width: '100%' }} >
                    {/* <Box  >
                        <Tabs value={value} onChange={handleChange} className=" !bg-[#63BA0E] !p-5 !px-8 !grey-300 !shadow-xl  !rounded-lg" aria-label="basic tabs example" className=" !p-4 !shadow-xl bg-white " >
                            <Tab label="Lottery" {...a11yProps(0)} className="!mx-4" ></Tab>
                            <Tab label="Casino" {...a11yProps(1)} className="!mx-4" />
                            <Tab label="Sports" {...a11yProps(2)} className="!mx-4" />
                        </Tabs>
                    </Box> */}
                    <CustomTabPanel value={value} index={0}>
                        <Box className="!my-1 shadow-xl rounded-lg !py-3 bg-white">
                            <Typography className="!m-2 !text-xl ">Rebate Level <span className="!italic font-bold text-orange-500 ml-1">L0</span></Typography>
                            <Box className="flex flex-col gap-2 justify-between">
                                <Box className="flex justify-center gap-2  mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        1 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        2 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        3 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        4 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        5 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        6 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="!my-5 shadow-xl rounded-lg !py-3 bg-white">
                            <Typography className="!m-2 !text-xl ">Rebate Level <span className="!italic font-bold text-orange-500 ml-1">L1</span></Typography>
                            <Box className="flex flex-col gap-2 justify-between">
                                <Box className="flex justify-center gap-2 mx-2" >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        1 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        2 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        3 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        4 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        5 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        6 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="!my-5 shadow-xl rounded-lg !py-3 bg-white">
                            <Typography className="!m-2 !text-xl ">Rebate Level <span className="!italic font-bold text-orange-500 ml-1">L2</span></Typography>
                            <Box className="flex flex-col gap-2 justify-between">
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        1 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        2 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        3 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        4 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        5 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.5%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-center gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        6 level lower level commission rebate
                                    </Typography>
                                    <Typography className="!ml-12">
                                        0.6%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box className="!my-5 shadow-xl rounded-lg !py-3 bg-white">
                            <Typography className="!m-2 !text-xl ">Rebate Level <span className="!italic font-bold text-orange-500 ml-1">L1</span></Typography>
                            <Box className="flex flex-col gap-2 justify-between">
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        1 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        2 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        3 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        4 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        5 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        6 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="!my-5 shadow-xl rounded-lg !py-3 bg-white">
                            <Typography className="!m-2 !text-xl ">Rebate Level <span className="!italic font-bold text-orange-500 ml-1">L1</span></Typography>
                            <Box className="flex flex-col gap-2 justify-between">
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        1 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        2 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        3 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        4 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        5 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        6 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Box className="!my-5 shadow-xl rounded-lg !py-3 bg-white">
                            <Typography className="!m-2 !text-xl ">Rebate Level <span className="!italic font-bold text-orange-500 ml-1">L2</span></Typography>
                            <Box className="flex flex-col gap-2 justify-between">
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        1 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        2 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        3 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        4 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        5 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400 !text-sm">
                                        6 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="!my-5 shadow-xl rounded-lg !py-3 bg-white">
                            <Typography className="!m-2 !text-xl ">Rebate Level <span className="!italic font-bold text-orange-500 ml-1">L1</span></Typography>
                            <Box className="flex flex-col gap-2 justify-between">
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        1 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        2 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        3 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        4 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        5 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        6 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box className="!my-5 shadow-xl rounded-lg !py-3 bg-white">
                            <Typography className="!m-2 !text-xl ">Rebate Level <span className="!italic font-bold text-orange-500 ml-1">L0</span></Typography>
                            <Box className="flex flex-col gap-2 justify-between">
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        1 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        2 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        3 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        4 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        5 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        6 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="!my-5 shadow-xl rounded-lg !py-3 bg-white">
                            <Typography className="!m-2 !text-xl ">Rebate Level <span className="!italic font-bold text-orange-500 ml-1">L1</span></Typography>
                            <Box className="flex flex-col gap-2 justify-between">
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        1 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        2 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        3 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        4 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        5 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                                <Box className="flex justify-between gap-2 mx-2 " >
                                    <Typography><img src={point} alt="" className=" !h-4 !mt-1" /></Typography>
                                    <Typography className="text-gray-400">
                                        6 level lower level commission rebate
                                    </Typography>
                                    <Typography className="">
                                        0.6%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>


                    </CustomTabPanel>
                </Box>

            </Container>
        </Layout>

    </>
}
export default RebateRatio;
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