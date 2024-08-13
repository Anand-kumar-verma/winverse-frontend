import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { FormControl, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import banner5 from '../../../assets/images/banner1.png';
import banner6 from '../../../assets/images/banner2.png';
import banner8 from '../../../assets/images/banner3.png';

const SupportPage = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };


  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ background: 'white', padding: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* <Box component='img' src={logo} width={70}></Box> */}
      </Box>
      <Typography variant="body1" color="initial" sx={{ color: 'black', textAlign: 'center', fontWeight: '400', fontSize: '20px' }}>Customer Service</Typography>
      <FormControl fullWidth>
        <label className="labelselect"> * Submit Issue：</label>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value selected>Deposit Not Received</MenuItem>
          <MenuItem value={10}>Withdrawal Pending</MenuItem>
          <MenuItem value={20}>Withdrawal Success But Not Received</MenuItem>
          <MenuItem value={30}>IFSC Modification</MenuItem>
          <MenuItem value={30}>Bank Name Change</MenuItem>
          <MenuItem value={30}>Finding Upline Teacher </MenuItem>
          <MenuItem value={30}>Change Login Password</MenuItem>
          <MenuItem value={30}>Change USDT Wallet Address</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ width: '100%', mt: 2 }}>Submit Issue</Button>
      <Button variant="outlined" sx={{ width: '100%', mt: 2 }}>Check Issue Progress</Button>
      <Button variant="outlined" sx={{ width: '100%', mt: 2 }}>Other Problem</Button>
      <Button variant="outlined" sx={{ width: '100%', mt: 2, mb: 5 }} component={NavLink} to='/'>Back </Button>
      <Swiper

        rewind={true}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide> <Box component='img' src={banner5}></Box></SwiperSlide>
        <SwiperSlide> <Box component='img' src={banner6}></Box></SwiperSlide>
        {/* <SwiperSlide> <Box component='img' src={banner7}></Box></SwiperSlide> */}
        <SwiperSlide> <Box component='img' src={banner8}></Box></SwiperSlide>
        {/* <SwiperSlide> <Box component='img' src={banner9}></Box></SwiperSlide> */}
        {/* <SwiperSlide> <Box component='img' src={banner10}></Box></SwiperSlide> */}
        {/* <SwiperSlide> <Box component='img' src={banner11}></Box></SwiperSlide> */}
      </Swiper>





      <Modal open={open} onClose={handleClose} sx={{ marginTop: '10%', overflow: 'scroll' }}>
        <Box
          sx={{ bgcolor: 'background.paper', border: '10px solid #a3a3a3', boxShadow: 24, p: 2, width: '95%', marginLeft: '2.5%', textAlign: 'center', '&>p': { fontSize: '18px', fontWeight: '500', } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography id="popup-on-load-description" sx={{ mb: 2 }}>
              Notice
            </Typography>
            <Button onClick={handleClose} sx={{ color: 'gray' }}>
              <CloseOutlinedIcon />
            </Button>
          </Box>
          <Typography variant="body1" color="initial">Hello dear Zupeeter Member</Typography>
          <Typography variant="body1" color="initial">Once you've submitted your concern, rest assured our support team is on it. To get started, follow these steps:</Typography>
          <Typography variant="body1" color="initial">Identify the issue from the options provided.</Typography>
          <Typography variant="body1" color="initial">Fill out the required fields with your information.</Typography>
          <Typography variant="body1" color="initial">Hit the 'Submit' button to send your request to our team.</Typography>
          <Typography variant="body1" color="initial">For updates, click the 'Status' button, enter your ID, select your query from the list, and press 'Search' to view the latest progress.</Typography>
          <Typography variant="body1" color="initial">To ensure an efficient resolution, please submit your concern just once and avoid multiple submissions. We're committed to addressing your issues promptly.</Typography>
          <Typography variant="body1" color="initial" sx={{ color: 'red' }}>कृपया अपनी पूछताछ की प्रगति को प्रभावित करने से बचने के लिए बार-बार आदेश प्रस्तुत न करें।</Typography>
          <Typography variant="body1" color="initial" sx={{ color: 'red' }}>We appreciate your patience and cooperation.</Typography>
        </Box>
      </Modal>
    </Box >
  );
};

export default SupportPage;