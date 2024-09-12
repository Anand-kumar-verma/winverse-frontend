import { Box, Typography } from '@mui/material';
import React from 'react';
import PreSaleBg from "../../../assets/images/PreSaleBg.png";

function Howtoplay() {
  return (
    <>
      <Box sx={{ width: '100%', background: 'orange' }}>
        <Box
          sx={{
            backgroundImage: `url(${PreSaleBg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
            width: '336px', padding: '12px', position: 'fixed', filter: 'hue-rotate(45deg)',
          }}>
          <Typography variant="body1" color="initial" sx={{ textAlign: 'center', color: 'white', 
            fontSize: '15px', fontWeight: 600 }} >How To Play</Typography>
        </Box>
      </Box>
      <Box sx={{ padding: '70px 10px 10px 10px', }}>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>
        3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to show the lottery result. It opens all day. The total number of trade is 480 issues.<br /><br /> 
        If you spend 100 to trade, after deducting 5 service fee, your contract amount is 95.<br /> <br />
        1. JOIN GREEN: if the result shows 1,3,7,9, you will get (95*2) 190 <br />
        If the result shows 5, you will get (95*1.5) 142.5 <br /><br />
        2. JOIN RED: if the result shows 2,4,6,8, you will get (95*2) 190; If the result shows 0, you will get (95*1.5) 142.5 <br /><br />
        3. JOIN VIOLET: if the result shows 0 or 5, you will get (95*2.5) 237.5 <br /><br />
        4. SELECT NUMBER:if the result is the same as the number you selected, you will get(95*8)760 .
 
        </Typography>



      </Box>

    </>
  )
}

export default Howtoplay

const style = {
  pilwal: { color: '#686868', fontSize: '12px', fontWeight: 500, fontFamily: 'sans-serif !important', lineHeight: '25px', },
}
