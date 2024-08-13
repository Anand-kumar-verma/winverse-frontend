import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import CStype from '../../../assets/images/CStype.png'
import backbtn from '../../../assets/images/backBtn.png'
import customerBg from '../../../assets/images/customerBg.png'
import theme from '../../../utils/theme'



function ServiceCollections() {
  const navigatea = useNavigate();
  const goBack = () => {
    navigatea(-1);
  };
  return (
    <Container sx={{ height: '100vh', background: theme.palette.secondary.main, }}>
      <Box sx={{ padding: 1, background: theme.palette.primary.main, px: 2, }}>
        <Stack direction='row' sx={{ alignItems: 'end', justifyContent: 'space-between' }}>
          <NavLink onClick={() => goBack()}>
            <Box component='img' src={backbtn} width={25}></Box>
          </NavLink>
          <NavLink>
            <Typography variant="body1" color="initial" sx={{ color: 'white', fontSize: '20px', fontWeight: '400' }}>Customer Service</Typography>
          </NavLink>
          <NavLink>
          </NavLink>
        </Stack>
      </Box>
      <NavLink to='/supportPage' target='_blank'>
        <Box sx={{
          background: theme.palette.secondary.main, borderRadius: '20px 20px 0px 0px', padding: 2
        }}>
          <Stack direction='row' sx={{ background: '#f4f4f4', borderRadius: 1, padding: 2, textAlign: 'center', alignItems: 'center', justifyContent: 'space-between', }}>
            <Stack direction='row' alignItems={'center'}>
              <Box component='img' src={CStype} width={30}></Box>
              <Typography variant="body1" color="initial" ml={2}>Zupeeter Self-service Center</Typography>
            </Stack>

            <KeyboardArrowRightIcon sx={{ color: 'gray' }} />
          </Stack>
        </Box>
      </NavLink>
    </Container >
  )
}

export default ServiceCollections

const style = {
  withdrawalbtn: {
    border: `1px solid ${theme.palette.primary.main}`, borderRadius: '20px', textTransform: 'capitalize',
    fontSize: '14px', fontWeight: '600', padding: '5px 25px'
  },
  depositebtn: {
    background: theme.palette.primary.main, borderRadius: '20px', textTransform: 'capitalize',
    fontSize: '14px', fontWeight: '600', padding: '5px 25px', color: 'white'
  },
};
