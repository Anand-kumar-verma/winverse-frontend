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
          <Typography variant="body1" color="initial" sx={{ textAlign: 'center', color: 'white', fontSize: '15px', fontWeight: 600 }} >How To Play</Typography>
        </Box>
      </Box>
      <Box sx={{ padding: '70px 10px 10px 10px', }}>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>
          "In order to protect the legitimate rights and interests of users participating in the pre-sale and maintain the normal operating order of the pre-sale,  these rules are formulated in accordance with relevant agreements and laws and regulations.<br /><br /> country Chapter 1 Definition1.1 Pre-sale definition: refers to a sales model in which a seller offers a bundle of a product or service, collects consumer orders through product tools before selling, and makes it available to customers.<br /> <br />consumers of goods and/or services by prior agreement1.2 Presale mode is "deposit" mode. <br /><br />"Consignment" refers to the pre-delivery of a fixed number of items prior to sale. <br />"Deposit" Scam Join mini games for a chance to win more deposits.<br /> Deposits can be exchanged directly for goods. Deposit is not refundable.1.3 Pre-sale product: A product that is shipped by the seller using the pre-sale product tool. Only highlight the word presale on the product name or product detail page, and products that do not use the presale product tool are not presale.<br /><br /> 1.4 Pre-sale system: refers to the system product tool that helps sellers to sell samples before selling.1.5 Product price before selling: is the selling price of the product before selling. The price of pre-sale items consists of two parts: deposit and final payment. "
        </Typography>



      </Box>

    </>
  )
}

export default Howtoplay

const style = {
  pilwal: { color: '#686868', fontSize: '12px', fontWeight: 500, fontFamily: 'sans-serif !important', lineHeight: '25px', },
}
