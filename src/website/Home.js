import React from 'react'
import Grid from '@mui/material/Grid'
import { Box, Button, Stack, Typography, Link, IconButton, } from '@mui/material'
import logo from './img/logo.png'
import slider from './img/slider_bg02.51564ce266f1664a9cf5.jpg'
import banner from './img/banner.png'
import title_bar02 from './img/title_bar02.png'
import just_gamer_bg from './img/just_gamer_bg.672a97f5e9d616ad1c3d.jpg'
import { NavLink } from 'react-router-dom'
import title_bar03 from './img/title_bar03.png'
import casino from './img/casino-logo-on-a-green-background-flying-gold-coins-free-vector.jpg'
import aviater from './img/41aeqyY7vML._SL500_.jpg'
import k3 from './img/DD6E84771ADB7D4058491095BA8A5229.png'
import ludo from './img/download.jpg'
import trx from './img/download.png'
import wingo from './img/wingo.jpg'

import facebookimg from './img/facebook (5).png'
import instagram from './img/instagram.png'
import telegram from './img/telegram.png'
import twitter from './img/twitter.png'


// import TelegramIcon from '@mui/icons-material/Telegram';




function Home() {

  return (
    <Box sx={{ background: 'white' }}>
      <Box sx={{ backgroundImage: `url(${slider})`, backgroundSize: '100%', }}>

        <Box sx={{ background: 'white', padding: '20px', borderRadius: '0px 0px 15px 15px' }}>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
          >
            <Grid item xs={12} sm={3} md={8}>
              <Box component='img' src={logo} sx={{ width: '120px' }}></Box>
            </Grid>
            <Grid item xs={12} sm={9} md={4} sx={{ mt: { xs: 1.2, sm: 0 } }}>
              <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                <NavLink to='https://zupeeter.com/ZUPEETER.pdf'>
                  <Button sx={{ background: '#e4a101', padding: '5px 20px', color: 'black', borderRadius: '0', transform: 'skewX(-16deg)', fontSize: '15px', fontWeight: '500' }}> Download</Button>
                </NavLink>
                <NavLink to='/login' >
                  <Button sx={{ color: 'black', borderRadius: '0', transform: 'skewX(-16deg)', fontSize: '15px', fontWeight: '500' }}> Sign in</Button>
                </NavLink>
                <NavLink to='/register'>
                  <Button sx={{ color: 'black', borderRadius: '0', transform: 'skewX(-16deg)', fontSize: '15px', fontWeight: '500' }}> Register</Button>
                </NavLink>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ maxWidth: '1300px', margin: 'auto', }}>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            wrap="wrap"
          >
            <Grid item xs={12} lg={6}>
              <Box sx={{ padding: '100px 10px' }}>
                <Typography variant="body1" sx={{ mb: 3, color: '#e4a101', fontSize: '22px', fontWeight: '700', textAlign: { lg: 'left', xs: 'center' } }}>ZUPEETER</Typography>

                <Typography variant="body1" sx={{ color: 'white', fontSize: { xs: '50px', sm: '60px', md: '70px', lg: '90px' }, fontWeight: '800', lineHeight: { xs: '50px', sm: '60px', md: '70px', lg: '90px' }, textAlign: { lg: 'left', xs: 'center' } }}>Online <span style={{ color: '#e4a101' }}>Cash</span>  Games</Typography>

                <Typography variant="body1" sx={{ mt: 3, color: '#e4a101', fontSize: '18px', fontWeight: '400', textAlign: { lg: 'left', xs: 'center' }, mb: 3, }}>50 game Coming Soon 12 Game Live 5 Game In Pipe Line</Typography>

                <Button sx={{ background: '#e4a101', padding: '5px 20px', color: 'black', borderRadius: '0', transform: 'skewX(-16deg)', fontSize: '15px', fontWeight: '500', display: 'flex', margin: { xs: 'auto', lg: 'inherit' } }}> Play Now</Button>
              </Box>
            </Grid>
            <Grid sx={{ display: { xs: 'none', lg: 'block' }, mt: '100px' }} lg={6}>
              <Box component='img' src={banner}></Box>
            </Grid>
          </Grid>
        </Box>
      </Box >
      <Box sx={{ background: 'white', }}>
        <Box sx={{ maxWidth: '1300px', margin: 'auto', }}>
          <Box sx={{ padding: '100px 20px ', }}>
            <Typography variant="body1" sx={{ color: 'black', fontSize: { xs: '22px', sm: '25px', md: '30px', lg: '40px' }, fontWeight: '800', lineHeight: { xs: '30px', sm: '40px', md: '50px', lg: '60px' }, textAlign: { xs: 'center' } }}>RELEASED  <span style={{ color: '#e4a101' }}>GAMES</span></Typography>

            <Typography variant="body1" sx={{ mt: 1, color: 'black', fontSize: '12px', fontWeight: '500', textAlign: { xs: 'center' }, mb: 1, }}>SKILL-BASED GAMES ON ZUPEETER MONEY GAME APPs</Typography>
            <Box component='img' src={title_bar02} sx={{ margin: 'auto' }}></Box>
          </Box>
        </Box>
      </Box >
      <Box sx={{ background: 'white', backgroundImage: `url(${just_gamer_bg})`, backgroundSize: '100%', padding: '50px 0px' }}>
        <Box sx={{ maxWidth: '1300px', margin: 'auto', padding: '0px 20px' }}>
          <Typography variant="body1" sx={{ color: 'white', fontSize: { xs: '22px', sm: '25px', md: '30px', lg: '40px' }, fontWeight: '800', lineHeight: { xs: '30px', sm: '40px', md: '50px', lg: '60px' }, }}>JUST FOR   <span style={{ color: '#e4a101' }}>GAMERS</span></Typography>

          <Typography variant="body1" sx={{ mt: 1, color: 'white', fontSize: '12px', fontWeight: '500', mb: 1, }}>SKILL-BASED GAMES ON ZUPEETER MONEY GAME APPs</Typography>
          <Box component='img' src={title_bar03} ></Box>

          <Stack direction='row' alignItems='center' justifyContent='space-evenly' mt={5} >
            <Box sx={{ width: '50%' }}>
              <Stack direction='row' alignItems='center' justifyContent='start'>
                <Box component='img' src={wingo} sx={{ width: { xs: '50px', sm: '60px', md: '100px' }, height: { xs: '50px', sm: '60px', md: '100px' } }}></Box>
                <Typography variant="body1" sx={{ color: 'white', ml: 1, fontSize: '17px', fontWeight: '600' }}>wingo</Typography>
              </Stack>
            </Box>
            <Box sx={{ width: '50%' }}>
              <Stack direction='row' alignItems='center' justifyContent='start'>
                <Box component='img' src={trx} sx={{ width: { xs: '50px', sm: '60px', md: '100px' }, height: { xs: '50px', sm: '60px', md: '100px' } }}></Box>
                <Typography variant="body1" sx={{ color: 'white', ml: 1, fontSize: '17px', fontWeight: '600' }}>trx</Typography>
              </Stack>
            </Box>
          </Stack>
          <Stack direction='row' alignItems='center' justifyContent='space-evenly' mt={5} >
            <Box sx={{ width: '50%' }}>
              <Stack direction='row' alignItems='center' justifyContent='start'>
                <Box component='img' src={k3} sx={{ width: { xs: '50px', sm: '60px', md: '100px' }, height: { xs: '50px', sm: '60px', md: '100px' } }}></Box>
                <Typography variant="body1" sx={{ color: 'white', ml: 1, fontSize: '17px', fontWeight: '600' }}>k3 Lottery</Typography>
              </Stack>
            </Box>
            <Box sx={{ width: '50%' }}>
              <Stack direction='row' alignItems='center' justifyContent='start'>
                <Box component='img' src={casino} sx={{ width: { xs: '50px', sm: '60px', md: '100px' }, height: { xs: '50px', sm: '60px', md: '100px' } }}></Box>
                <Typography variant="body1" sx={{ color: 'white', ml: 1, fontSize: '17px', fontWeight: '600' }}>Casino</Typography>
              </Stack>
            </Box>
          </Stack>
          <Stack direction='row' alignItems='center' justifyContent='space-evenly' mt={5} >
            <Box sx={{ width: '50%' }}>
              <Stack direction='row' alignItems='center' justifyContent='start'>
                <Box component='img' src={ludo} sx={{ width: { xs: '50px', sm: '60px', md: '100px' }, height: { xs: '50px', sm: '60px', md: '100px' } }}></Box>
                <Typography variant="body1" sx={{ color: 'white', ml: 1, fontSize: '17px', fontWeight: '600' }}>Ludo</Typography>
              </Stack>
            </Box>
            <Box sx={{ width: '50%' }}>
              <Stack direction='row' alignItems='center' justifyContent='start'>
                <Box component='img' src={aviater} sx={{ width: { xs: '50px', sm: '60px', md: '100px' }, height: { xs: '50px', sm: '60px', md: '100px' } }}></Box>
                <Typography variant="body1" sx={{ color: 'white', ml: 1, fontSize: '17px', fontWeight: '600' }}>Aviater</Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>

      </Box>
      <Box
        sx={{
          backgroundColor: '#1C171C',
          color: '#fff',
          padding: '40px 20px',
          textAlign: 'center',
          mt: '200px'
        }}
      >
        <Box sx={{ maxWidth: '1300px', margin: 'auto', padding: '0px 20px' }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box component='img' src={logo} sx={{ width: '120px', mb: 3 }}></Box>
              <Typography variant="body1" sx={{ textAlign: 'start' }}>
                We have very good strength in innovative technology and tools with over 35 years of experience. We make long-term investments goal in global companies in different sectors, mainly in Europe and other countries.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                sx={{
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}
              >
                Quick Links
              </Typography>
              <Link
                href="https://zupeeter.com/ZUPEETER.pdf"
                sx={{
                  color: '#fff',
                  display: 'block',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  '&:hover': {
                    color: '#1e90ff',
                  },
                }}
              >
                Download
              </Link>
              <Link
                href="/login"
                sx={{
                  color: '#fff',
                  display: 'block',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  '&:hover': {
                    color: '#1e90ff',
                  },
                }}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                sx={{
                  color: '#fff',
                  display: 'block',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  '&:hover': {
                    color: '#1e90ff',
                  },
                }}
              >
                Register
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                sx={{
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}
              >
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <IconButton href="https://www.facebook.com/people/Zupeeter-Token/61559027016227/?mibextid=ZbWKwL" sx={{ color: '#fff' }} target='_blank'>
                  <Box component='img' src={facebookimg} width={35}></Box>
                </IconButton>
                <IconButton href="https://x.com/i/flow/login?redirect_after_login=%2Fzupeetertoken" sx={{ color: '#fff' }} target='_blank'>
                  <Box component='img' src={twitter} width={35}></Box>
                </IconButton>
                <IconButton href="https://www.instagram.com/zupeetertoken/?igsh=NGt3MzViNnZzMXcx" sx={{ color: '#fff' }} target='_blank'>
                  <Box component='img' src={instagram} width={35}></Box>
                </IconButton>
                <IconButton href="https://t.me/zupeeter" sx={{ color: '#fff' }} target='_blank'>
                  <Box component='img' src={telegram} width={35}></Box>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: '1px solid #555',
              marginTop: '30px',
              paddingTop: '20px',
            }}
          >
            <Typography variant="body2" sx={{ color: '#bbb' }}>
              &copy; 2024 Zupeeter.com  All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home