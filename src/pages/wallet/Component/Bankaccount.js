import { Box, Checkbox, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import addbank from '../../../assets/images/addbank.png';
import backbtn from '../../../assets/images/backBtn.png';


function Bankaccount() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container sx={{ background: '#F7F8FF', height: '100vh' }}>
      <Box sx={{ background: 'linear-gradient(90deg, rgb(255, 153, 1) 0%, rgb(230, 115, 1) 100%)', padding: 1 }}>
        <Stack direction='row' sx={{ alignItems: 'end', justifyContent: 'space-between', position: 'relative' }}>
          <NavLink onClick={goBack}>
            <Box component='img' src={backbtn} width={25}>
            </Box>
          </NavLink>
          <Box sx={{ position: 'absolute', left: '35%', top: '10%' }}>
            <Typography variant="body1" sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>Bank account</Typography>
          </Box>
          <NavLink >
          </NavLink>
        </Stack>
      </Box>
      <Box sx={{ width: '92%', margin: "auto", mb: 2, }}>
        <Box sx={{ width: '100%', background: 'linear-gradient(90deg,#ff9902 0%,#ffbc58 100%)', padding: '18px', borderRadius: '5px 5px 0px 0px', mt: 1 }}></Box>
        <Box sx={{ background: '#fffff', padding: '5px 10px', boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px;' }}>
          <Stack direction='row' sx={{
            alignItems: 'center', justifyContent: 'space-between', background: "#eaeaea", padding: '5px', borderRadius: '2px', mb: '5px',
            '&>div>p': { fontSize: '13px', fontWeight: '600', color: '#656565' }
          }}>
            <Box sx={{ width: '50%' }}>
              <Typography variant="body1" color="initial">Bank name</Typography>
            </Box>
            <Box sx={{ width: '50%' }}>
              <Typography variant="body1" color="initial">BANK OF BARODA</Typography>
            </Box>
          </Stack>
          <Stack direction='row' sx={{
            alignItems: 'center', justifyContent: 'space-between', background: "#eaeaea", padding: '5px', borderRadius: '2px', mb: '5px',
            '&>div>p': { fontSize: '13px', fontWeight: '600', color: '#656565' }
          }}>
            <Box sx={{ width: '50%' }}>
              <Typography variant="body1" color="initial">Bank account number</Typography>
            </Box>
            <Box sx={{ width: '50%' }}>
              <Typography variant="body1" color="initial">433801****728</Typography>
            </Box>
          </Stack>
          <Stack direction='row' sx={{
            alignItems: 'center', justifyContent: 'space-between', background: "#eaeaea", padding: '5px', borderRadius: '2px', mb: '5px',
            '&>div>p': { fontSize: '13px', fontWeight: '600', color: '#656565' }
          }}>
            <Box sx={{ width: '50%' }}>
              <Typography variant="body1" color="initial">Phone number</Typography>
            </Box>
            <Box sx={{ width: '50%' }}>
              <Typography variant="body1" color="initial">91738****</Typography>
            </Box>
          </Stack>
          <Stack direction='row' alignItems='center' mt={2} >
            <Checkbox defaultChecked sx={{ padding: 0, }} />
            <Typography variant="body1" color="initial" sx={{ ml: 1, fontSize: '13px', fontWeight: '600', color: 'orange' }}>Select</Typography>
          </Stack>
        </Box>
      </Box>
      <Box component={NavLink} to='/addbankaccount' sx={{ mt: 2, width: '92%', margin: "auto", padding: 2, background: '#ffffff', borderRadius: '7px', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: '5px 5px 0px 0px', }}>
        <Box component='img' src={addbank} width={50}></Box>
        <Typography variant="body1" color="initial" sx={{ mt: 2, fontSize: '14px', fontWeight: '600', color: '#d2d2d2' }}>Add a bank account number</Typography>
      </Box>
    </Container>);
}
export default Bankaccount;


const style = {
  paytmbtntwo: {
    borderRadius: "20px", textTransform: "capitalize", mb: 2,
    width: "92%", mt: 2, mx: 2, padding: "10px",
    "&:hover": { border: "1px solid transparent" },
  },
};
