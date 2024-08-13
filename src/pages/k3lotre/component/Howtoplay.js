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
            width: '336px', padding: '12px', position: 'fixed',
          }}>
          <Typography variant="body1" color="initial" sx={{ textAlign: 'center', color: 'white', fontSize: '15px', fontWeight: 600 }} >How To Play</Typography>
        </Box>
      </Box>
      <Box sx={{ padding: '70px 10px 10px 10px', }}>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>What is a hash value?</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 2 }}>Anyone who knows the basics of Bitcoin will be exposed to a concept, a hash value. Bitcoin's block header has a hash of the previous block in it, which is used to point to the previous block.</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>Hash is the transliteration of English hash, we can also translate it into hash, so hash value is also called hash value. A hash value is a value calculated with a hash function (or hash function/hash algorithm). To understand hash values, one must understand the nature of hash functions. A hash function can computationally transform an input of arbitrary length into an output of fixed length. </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> Every hash function has the property that if the input value is the same, the output hash value is the same. If the input values ​​​​​​​​​​​​are different, the output hashes are usually different, but there is a very small chance of a hash collision . If a hash collision is ruled out with a slight change in the input value, a completely unrelated hash value is output. Since the hash function is irreversible and easy to verify, it is almost impossible to reverse the input value through the output hash value. If there is an input value, the corresponding hash value can be verified immediately.</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> Therefore, the hash value of each block is unique, random, unbreakable, unforgeable, the block hash value is automatically identified, and the record cannot be tampered with.</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> How many types of USDT are there?</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> 1. Omni-USDT based on the Bitcoin network, the deposit address is the BTC address, and the deposit and withdrawal go through the BTC network;</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> 2. ERC20-USDT based on the Ethereum ERC20 protocol, the deposit address is the ETH address, and the deposit and withdrawal go through the ETH network;</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>3. TRC20-USDT based on TRON TRC20 protocol and TRX (TRON) network, the deposit address is the TRON address, and the deposit and withdrawal go through the TRON network. </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>TrxHash is the TRC20-USDT Block hash based on the TRON TRC20 protocol and TRX (TRON) network. The last number is used as the result of the lottery to determine whether you have won the lottery (click Block Height to go to the public chain to query the unique Block hash) </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>The rules of play are as follows: </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> 1. 1 lottery draw for 1 minute, purchase within 45 seconds, and the result cannot be purchased within 15 seconds before opening.</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>2. Purchase All Day Unlock. The total number of purchases in one day is 1440. </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> 3. 3 points 1 time, 5 points 1 time, 10 points 1 time, the rules are the same as 1 point 1 time except the draw time is different.</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> 4. The last digit of the Block hash is used as the lottery result:</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> Eg:</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>If the hash value is **b569, the lottery result is 9 </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> Hash value **d14c, the lottery result is 4</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> Hash value **d14c, the lottery result is 4</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>  if you spend 100 to trade, after deducting service fee 2%, contract amount : 98</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> l Choose green: if the result shows 1,3,7,9, you will get     ; if the result shows 5, you will get  (98 * 2) = 196</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>l choose red: if the result shows 2,4,6,8, you will get ; if the result shows 0, you will get (98 * 2) = 196 </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> l choose purple: if the result shows 0 or 5, you will get   (98 * 2) = 196</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> l Select the number: If the result of opening is the same as the one you selected, you will get   (98 * 9) = 882</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> l Choose Big: if the result shows 5,6,7,8,9 you will get   (98 * 2) = 196</Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}>l Select Small: if the result shows 0,1,2,3,4 you will get   (98 * 2) = 196 </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> </Typography>
        <Typography variant="body1" color="initial" sx={{ ...style.pilwal, mb: 1 }}> </Typography>


      </Box>

    </>
  )
}

export default Howtoplay

const style = {
  pilwal: { color: '#686868', fontSize: '13px', fontWeight: 600, fontFamily: 'sans-serif !important' },
}
