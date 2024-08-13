import { Box, Grid, Stack, Typography } from "@mui/material";
import React from 'react';
import { NavLink } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Slot from '../../../assets/images/slot.png';
import win from '../../../assets/images/win.png';
import vendorlogo1 from '../../../assets/images/vendorlogo1.png';
import vendorlogo2 from '../../../assets/images/vendorlogo2.png';
import vendorlogo3 from '../../../assets/images/vendorlogo3.png';
import vendorlogo4 from '../../../assets/images/vendorlogo4.png';
import vendorlogo5 from '../../../assets/images/vendorlogo5.png';
import vendorlogo6 from '../../../assets/images/vendorlogo6.png';
import vendorlogo7 from '../../../assets/images/vendorlogo7.png';


function Slots() {

    const style = {
        winbox: { background: 'linear-gradient(157deg, #FF9902 0%, #FFD058 100%)', borderRadius: '20px', height: '150px', marginBottom: '20px', },
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
                    Slots                </Typography>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo1} sx={{ width: '100%', height: '100%' }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={6}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo2} sx={{ width: '100%', height: '100%' }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={6}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo3} sx={{ width: '100%', height: '100%' }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={6}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo4} sx={{ width: '100%', height: '100%' }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={6}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo5} sx={{ width: '100%', height: '100%' }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={6}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo6} sx={{ width: '100%', height: '100%' }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
                <Grid item xs={6}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo7} sx={{ width: '100%', height: '100%' }}></Box>
                        </Box>
                    </NavLink>
                </Grid>
            </Grid>

        </Box >
    )
}

export default Slots
