import { Box, Grid, Stack } from '@mui/material'
import React from 'react'
import downloadbtn from '../../../assets/images/downloadbtn.png'
import logo from '../../../assets/images/logo.png'
import messageicon from '../../../assets/images/messageicon.png'
import theme from '../../../utils/theme'


function Header() {
    return (
        <Box sx={{ background: theme.palette.secondary.main, py: '5px', px: 1, }} className="">
            <Grid container spacing={0} xs={12}>
                <Grid container item xs={6}>
                    <Box component='img' src={logo} sx={{ height: '40px !important' }}></Box>
                </Grid>
                <Grid container item xs={6}>
                    <Stack direction='row' sx={{ width: '100%', alignItems: 'center', justifyContent: 'end', position: 'relative' }}>
                        <Box className='redDot' />
                        <Box component='img' src={messageicon} sx={{ height: '25px', marginRight: '25px', marginTop: '5px' }}></Box>
                        <Box component='img' src={downloadbtn} sx={{ height: '25px' }}></Box>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Header
