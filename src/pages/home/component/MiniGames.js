

import { Box, Grid, Stack, Typography } from "@mui/material";
import React from 'react';
import { NavLink } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Slot from '../../../assets/images/flash.png';
import vendorlogo30 from '../../../assets/images/vendorlogo30.png';
import vendorlogo31 from '../../../assets/images/vendorlogo31.png';
import vendorlogo32 from '../../../assets/images/vendorlogo32.png';
import vendorlogo33 from '../../../assets/images/vendorlogo33.png';
import vendorlogo34 from '../../../assets/images/vendorlogo34.png';
import vendorlogo35 from '../../../assets/images/vendorlogo35.png';
import vendorlogo36 from '../../../assets/images/vendorlogo36.jpg';
import vendorlogo37 from '../../../assets/images/vendorlogo37.png';
import vendorlogo38 from '../../../assets/images/vendorlogo38.png';
import vendorlogo39 from '../../../assets/images/vendorlogo39.png';
import vendorlogo40 from '../../../assets/images/vendorlogo40.png';
import vendorlogo41 from '../../../assets/images/vendorlogo41.png';
import vendorlogo42 from '../../../assets/images/vendorlogo42.png';
import vendorlogo43 from '../../../assets/images/vendorlogo43.png';
import vendorlogo44 from '../../../assets/images/vendorlogo44.png';
import vendorlogo45 from '../../../assets/images/vendorlogo45.png';
import vendorlogo46 from '../../../assets/images/vendorlogo46.png';
import vendorlogo47 from '../../../assets/images/vendorlogo47.png';
import vendorlogo48 from '../../../assets/images/vendorlogo48.png';
import vendorlogo49 from '../../../assets/images/vendorlogo49.png';
import vendorlogo50 from '../../../assets/images/vendorlogo50.png';
import vendorlogo51 from '../../../assets/images/vendorlogo51.png';
import vendorlogo52 from '../../../assets/images/vendorlogo52.png';
import vendorlogo53 from '../../../assets/images/vendorlogo53.png';


function MiniGames() {

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
                    Mini Games                </Typography>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo30} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo31} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo32} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo33} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo34} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo35} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo36} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>

                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo37} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo38} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo39} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo40} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>

                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo41} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo42} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo53} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo43} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo44} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo45} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo46} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo47} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo48} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo49} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo50} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo51} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo52} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                </Grid>

            </Grid>
        </Box >
    )
}

export default MiniGames


