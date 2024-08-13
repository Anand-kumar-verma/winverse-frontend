import { Box, Container, Typography } from "@mui/material";
import React from "react"
import Layout from "../../component/layout/Layout";
import theme from "../../utils/theme";
import log from "../../assets/images/log.png"
import { NavLink } from "react-router-dom";
import backbtn from "../../assets/images/backBtn.png";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const PromotionRule = () => {

    return <>
        <Layout header={false}>
            <Container

            >
                <Box sx={style.header}>
                    <Typography variant="body1" color="initial">
                        <NavLink to="/promotion">
                            <Box component="img" src={backbtn} width={25}></Box>
                        </NavLink>
                    </Typography>
                    <Typography variant="body1" color="initial" className="!text-white">
                        Rule
                    </Typography>
                    <Box>

                    </Box>
                </Box>
                <Box >
                    <Typography className="!text-[#ffa43f] !text-center !font-bold !text-lg !my-2">【Promotion partner】program</Typography>
                    <Typography className="text-center">This activity is valid for a long time</Typography>
                </Box>
                <Box className="border border-orange-400 !rounded-tl-lg !rounded-tr-lg my-6 m-2">
                    <Typography sx={style.design} className="!text-orange-400 !relative  !bottom-3  border-orange-400  flex justify-center"> <ArrowBackIos className="  " /><span className="bg-orange-400 text-white w-10 text-center">01</span> <ArrowForwardIos className="" />  </Typography>

                    <Typography className="!m-2 !text-sm text-gray-500">
                        There are 6 subordinate levels in inviting friends, if A invites B, then B is a level 1 subordinate of A. If B invites C, then C is a level 1 subordinate of B and also a level 2 subordinate of A. If C invites D, then D is a level 1 subordinate of C, at the same time a level 2 subordinate of B and also a level 3 subordinate of A.
                    </Typography>
                </Box>
                <Box className="border border-orange-400 !rounded-tl-lg !rounded-tr-lg my-6 m-2">
                    <Typography className="!text-orange-400 !relative  !bottom-3  border-orange-400  flex justify-center"> <ArrowBackIos className="  " /><span className="bg-orange-400 text-white w-10 text-center">02</span> <ArrowForwardIos className="" />  </Typography>

                    <Typography className="!m-2 !text-sm text-gray-500">
                        When inviting friends to register, you must send the invitation link provided or enter the invitation code manually so that your friends become your level 1 subordinates. </Typography>
                </Box>
                <Box className="border border-orange-400 !rounded-tl-lg !rounded-tr-lg my-6 m-2">
                    <Typography className="!text-orange-400 !relative  !bottom-3  border-orange-400  flex justify-center"> <ArrowBackIos className="  " /><span className="bg-orange-400 text-white w-10 text-center">03</span> <ArrowForwardIos className="" />  </Typography>

                    <Typography className="!m-2 !text-sm text-gray-500">
                        The invitee registers via the inviter's invitation code and completes the deposit, shortly after that the commission will be received immediately </Typography>
                </Box>
                <Box className="border border-orange-400 !rounded-tl-lg !rounded-tr-lg mt-6 m-2">
                    <Typography className="!text-orange-400 !relative  !bottom-3  border-orange-400  flex justify-center"> <ArrowBackIos className="  " /><span className="bg-orange-400 text-white w-10 text-center">04</span> <ArrowForwardIos className="" />  </Typography>

                    <Typography className="!m-2 !text-sm text-gray-500">
                        The calculation of yesterday's commission starts every morning at 01:00. After the commission calculation is completed, the commission is rewarded to the wallet and can be viewed through the commission collection record. </Typography>
                </Box>
                <Box className="flex flex-col justify-between gap-2 p-1">
                    <Box className="flex justify-between gap-2 p-2  text-white bg-orange-400">
                        <Typography className="!text-xs">Rebate level</Typography>
                        <Typography className="!text-xs">Team Number</Typography>
                        <Typography className="!text-xs">Team Betting</Typography>
                        <Typography className="!text-xs">Team Deposit </Typography>
                    </Box>
                    <Box className="flex justify-between gap-2 mx-2 mt-2 text-gray-600">
                        <Typography className="!w-10  h-8"><img src={log} alt="" className="" /><span className="!italic font-bold text-orange-500 relative left-5 bottom-5">L1</span></Typography>
                        <Typography className="!text-xl">0</Typography>
                        <Typography className="!text-xl">0</Typography>
                        <Typography className="!text-xl">0 </Typography>
                    </Box>
                    <Box className="border border-b border-orange-300"></Box>
                    <Box className="flex justify-between gap-2 mx-2 text-gray-600">
                        <Typography className="!w-10  h-8"><img src={log} alt="" className="" /><span className="!italic font-bold text-orange-500 relative left-5 bottom-5">L2</span></Typography>
                        <Typography className="!text-xl">452</Typography>
                        <Typography className="!text-xl">0145</Typography>
                        <Typography className="!text-xl">014 </Typography>
                    </Box>
                    <Box className="border border-b border-orange-300"></Box>
                    <Box className="flex justify-between gap-2 mx-2 text-gray-600 ">
                        <Typography className="!w-10  h-8"><img src={log} alt="" className="" /><span className="!italic font-bold text-orange-500 relative left-5 bottom-5">L3</span></Typography>
                        <Typography className="!text-xl">472</Typography>
                        <Typography className="!text-xl">1455</Typography>
                        <Typography className="!text-xl">244k </Typography>
                    </Box>
                    <Box className="border border-b border-orange-300"></Box>
                    <Box className="flex justify-between gap-2 mx-2 text-gray-600">
                        <Typography className="!w-10  h-8"><img src={log} alt="" className="" /><span className="!italic font-bold text-orange-500 relative left-5 bottom-5">L4</span></Typography>
                        <Typography className="!text-xl">1</Typography>
                        <Typography className="!text-xl">22</Typography>
                        <Typography className="!text-xl">63 </Typography>
                    </Box>
                    <Box className="border border-b border-orange-300 "></Box>
                    <Box className="flex justify-between gap-2 mx-2 text-gray-600">
                        <Typography className="!w-10  h-8"><img src={log} alt="" className="" /><span className="!italic font-bold text-orange-500 relative left-5 bottom-5">L5</span></Typography>
                        <Typography className="!text-xl">54</Typography>
                        <Typography className="!text-xl">21</Typography>
                        <Typography className="!text-xl">88 </Typography>
                    </Box>
                    <Box className="border border-b border-orange-300"></Box>
                    <Box className="flex justify-between gap-2 mx-2 text-gray-600 ">
                        <Typography className="!w-10  h-8"><img src={log} alt="" className="" /><span className="!italic font-bold text-orange-500 relative left-5 bottom-5">L6</span></Typography>
                        <Typography className="!text-xl">4</Typography>
                        <Typography className="!text-xl">40</Typography>
                        <Typography className="!text-xl">05 </Typography>
                    </Box>
                    <Box className="border border-b border-orange-300"></Box>
                </Box>
                <Box className="border border-orange-400 !rounded-tl-lg !rounded-tr-lg my-6 m-2">
                    <Typography className="!text-orange-400 !relative  !bottom-3  border-orange-400  flex justify-center"> <ArrowBackIos className="  " /><span className="bg-orange-400 text-white w-10 text-center">06</span> <ArrowForwardIos className="" />  </Typography>

                    <Typography className="!m-2 !text-sm text-gray-500">
                        The invitee registers via the inviter's invitation code and completes the deposit, shortly after that the commission will be received immediately </Typography>
                </Box>
                <Box className="border border-orange-400 !rounded-tl-lg !rounded-tr-lg my-6 m-2">
                    <Typography className="!text-orange-400 !relative  !bottom-3  border-orange-400  flex justify-center"> <ArrowBackIos className="  " /><span className="bg-orange-400 text-white w-10 text-center">07</span> <ArrowForwardIos className="" />  </Typography>

                    <Typography className="!m-2 !text-sm text-gray-500">
                        The invitee registers via the inviter's invitation code and completes the deposit, shortly after that the commission will be received immediately </Typography>
                </Box>
            </Container>
        </Layout>

    </>
}
export default PromotionRule;
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
    design: {
        // webkitclippath:" polygon(7% 0%, 93% 0%, 100% 50%, 93% 100%, 7% 100%, 0% 50%)",
        clippath: "polygon(7% 0%, 93% 0%, 100% 50%, 93% 100%, 7% 100%, 0% 50%)",
    }
}