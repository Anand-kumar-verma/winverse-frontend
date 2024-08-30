import {
  Box,
  Container
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useFormik } from "formik";
import React, { useState } from "react";
import logo from '../../assets/images/logo.png';
import logbg from '../../assets/images/output-onlinepngtools.png';
import { signupSchemaValidataon } from "../../services/validation";
import RegistrationByMobile from "./RegistrationByMobile";


function Login() {
  const [value, setValue] = useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const initialValue = {
    email: "",
    password: "",
    mobile: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: signupSchemaValidataon,
    onSubmit: () => {
      console.log(fk.values);
      // loginSubmit(fk.values);
    },
  });

  return (
    <Container sx={{
      background: '#0D0335', minHeight: '100vh',
      backgroundImage: `url(${logbg})`, backgroundSize: '100% 100%',
    }}>

      <Box sx={{ width: "92%", margin: "auto", }}>
        <Box
          sx={{
            padding: 5,
            "&>p": { color: "white" },
          }}
        >
          <Box
            component="img"
            src={logo}
            sx={{
              margin: "auto",
              width: "100px",
            }}
          ></Box>
        </Box>
        <Tabs value={value} >
          <Tab
            sx={{ width: "50%" }}
            value="one"
            label={
              <Box>

               <p style={{ color: 'white' }}>Register your phone</p>

              </Box>
            }
          />
          <Tab
            sx={{ width: "50%" }}
            value=""
            label={
              <Box>
               
              </Box>
            }
          />
        </Tabs>
      </Box>
      <Box sx={{ width: "92%", margin: "auto", mt: 3 }}>
        <RegistrationByMobile />
       
      </Box>
    </Container>
  );
}

export default Login;
