import { Box, Grid, Stack, Typography } from "@mui/material";
import React from 'react';
import { NavLink } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Slot from '../../../assets/images/fishing.png';
import vendorlogo17 from '../../../assets/images/vendorlogo17.png';
import vendorlogo18 from '../../../assets/images/vendorlogo18.png';
import vendorlogo19 from '../../../assets/images/vendorlogo19.png';
import vendorlogo20 from '../../../assets/images/vendorlogo20.png';
import vendorlogo21 from '../../../assets/images/vendorlogo21.png';
import vendorlogo22 from '../../../assets/images/vendorlogo22.png';
import vendorlogo23 from '../../../assets/images/vendorlogo23.png';
import vendorlogo24 from '../../../assets/images/vendorlogo24.png';
import vendorlogo25 from '../../../assets/images/vendorlogo25.png';
import vendorlogo26 from '../../../assets/images/vendorlogo26.png';
import vendorlogo27 from '../../../assets/images/vendorlogo27.png';
import vendorlogo28 from '../../../assets/images/vendorlogo28.png';
import vendorlogo29 from '../../../assets/images/vendorlogo29.png';

function Fishing() {

    const style = {
        winbox: { background: 'linear-gradient(157deg, #FF9902 0%, #FFD058 100%)', borderRadius: '20px', height: '120px', marginBottom: '0px', },
        positiongame: {
            position: 'absolute', top: '10px', left: '20px',
            '&>div>p': { fontSize: '12px', fontWeight: 400, color: 'white' }
        },
        gameheading: { fontSize: '20px', fontWeight: 700, color: 'white' },
    }

    return (
        <Box sx={{ padding: '15px' }}>
            <Stack direction='row' sx={{ alignItems: 'center', mb: 2 }}>
                <Box component='img' src={Slot} width={25} ></Box>
                <Typography variant="body1" color="initial" sx={{ ml: 1, fontSize: '15px', fontWeight: 600 }}>
                    Fishing                </Typography>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo17} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo18} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo19} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo20} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo21} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo22} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo23} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo24} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo25} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo26} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo27} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo28} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo29} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
            </Grid>

        </Box >
    )
}

export default Fishing

