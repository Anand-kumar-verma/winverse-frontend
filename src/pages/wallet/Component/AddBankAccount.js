import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import backbtn from '../../../assets/images/backBtn.png';
import bank from '../../../assets/images/bank.png';


function AddBankAccount() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <Container sx={{ background: '#F7F8FF', height: '100vh' }}>
      <Box sx={{ background: 'linear-gradient(90deg, rgb(255, 153, 1) 0%, rgb(230, 115, 1) 100%)', padding: 1 }}>
        <Stack direction='row' sx={{ alignItems: 'end', justifyContent: 'space-between', position: 'relative' }}>
          <NavLink onClick={goBack}>
            <Box component='img' src={backbtn} width={25}>
            </Box>
          </NavLink>
          <Box sx={{ position: 'absolute', left: '22%', top: '10%' }}>
            <Typography variant="body1" sx={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>Add a bank account number</Typography>
          </Box>
          <NavLink >
          </NavLink>
        </Stack>
      </Box>
      <Box sx={{ width: '92%', margin: "auto", mb: 2, }}>
        <Stack direction='row' sx={{
          mt: 1,
          background: '#ffffff', boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px;', padding: '5px', borderRadius: '25px', alignItems: 'center',
          '&>p': { color: 'red', fontSize: '13px', ml: 1 }, '&>svg': { color: 'red' }
        }}>
          <InfoOutlinedIcon />
          <Typography variant="body1" color="initial">To ensure the safety of your funds, please bind your bank account</Typography>
        </Stack>

        <Box>
          <Stack direction='row' my={2} sx={{ alignItems: 'center', '&>p': { fontSize: '13px', fontWeight: '600', ml: 1, } }}>
            <Box component='img' src={bank} width={25}></Box>
            <Typography variant="body1" color="initial"> Choose a bank</Typography>
          </Stack>
          <Select options={options} placeholder='Please select a bank ' sx={{ background: 'red !important' }} />
        </Box>
      </Box>
    </Container >);
}
export default AddBankAccount;


const style = {
  paytmbtntwo: {
    borderRadius: "20px", textTransform: "capitalize", mb: 2,
    width: "92%", mt: 2, mx: 2, padding: "10px",
    "&:hover": { border: "1px solid transparent" },
  },
};

