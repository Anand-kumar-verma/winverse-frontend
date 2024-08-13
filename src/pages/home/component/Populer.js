
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from 'react';
import { NavLink } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Slot from '../../../assets/images/fire.png';
import win from '../../../assets/images/win.png';
import vendorlogo54 from '../../../assets/images/vendorlogo54.png';
import vendorlogo55 from '../../../assets/images/vendorlogo55.png';
import vendorlogo56 from '../../../assets/images/vendorlogo56.png';
import vendorlogo57 from '../../../assets/images/vendorlogo57.png';
import vendorlogo58 from '../../../assets/images/vendorlogo58.png';
import vendorlogo59 from '../../../assets/images/vendorlogo59.png';
import vendorlogo60 from '../../../assets/images/vendorlogo60.png';
import vendorlogo61 from '../../../assets/images/vendorlogo61.png';
import vendorlogo62 from '../../../assets/images/vendorlogo62.png';
import vendorlogo63 from '../../../assets/images/vendorlogo63.png';
import vendorlogo64 from '../../../assets/images/vendorlogo64.png';
import vendorlogo65 from '../../../assets/images/vendorlogo65.png';
import vendorlogo66 from '../../../assets/images/vendorlogo66.png';
import vendorlogo67 from '../../../assets/images/vendorlogo67.png';
import vendorlogo68 from '../../../assets/images/vendorlogo68.png';
import vendorlogo69 from '../../../assets/images/vendorlogo69.png';
import vendorlogo70 from '../../../assets/images/vendorlogo70.png';
import vendorlogo71 from '../../../assets/images/vendorlogo71.png';

function Populer() {

    const style = {
        winbox: { background: 'linear-gradient(157deg, #FF9902 0%, #FFD058 100%)', borderRadius: '20px', height: '100px', marginBottom: '0px', },
        positiongame: {
            position: 'absolute', top: '10px', left: '20px',
            '&>div>p': { fontSize: '12px', fontWeight: 400, color: 'white' }
        },
        gameheading: { fontSize: '20px', fontWeight: 700, color: 'white' },
        levalouter: { width: '100%', height: '20px', background: '#E6E6E7', mt: 1, borderRadius: '5px', position: 'relative' },
        levalinner: { width: '90%', height: '20px', background: 'linear-gradient(90deg, rgba(255,141,54,1) 23%, rgba(240,17,17,1) 60%)', borderRadius: '5px 0px 0px 5px' },
        prbox: { position: 'absolute', top: 0, left: 0, alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%', px: 1, '&>div>p': { fontSize: '9px', fontWeight: 600, color: 'white' } },
    }

    return (
        <Box sx={{ padding: '15px' }}>
            <Stack direction='row' sx={{ alignItems: 'center', mb: 2 }}>
                <Box component='img' src={Slot} width={25} ></Box>
                <Typography variant="body1" color="initial" sx={{ ml: 1, fontSize: '15px', fontWeight: 600 }}>
                    Populer                </Typography>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo54} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo55} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">90.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo56} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo57} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo58} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo59} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo60} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo61} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo62} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo63} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo64} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo65} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo66} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo67} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo68} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo69} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo70} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <NavLink to='/comingsoon'>
                        <Box sx={style.winbox}>
                            <Box component='img' src={vendorlogo71} sx={{ width: '100%', height: '100%', borderRadius: '20px', }}></Box>
                        </Box>
                    </NavLink>
                    <Box sx={style.levalouter}>
                        <Box sx={style.levalinner}></Box>
                        <Stack direction='row' sx={style.prbox}>
                            <Box>
                                <Typography variant="body1">odds of</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">82.08%</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>

        </Box >
    )
}

export default Populer
