import {
  Box,
  Container,
  Typography
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import backbtn from "../../assets/images/backBtn.png";
import logemailactive from "../../assets/images/logemailactive.png";
import logemaildeactive from "../../assets/images/logemaildeactive.png";
import logphoneactive from "../../assets/images/logphoneactive.png";
import logphonedeactive from "../../assets/images/logphonedeactive.png";
import { signupSchemaValidataon } from "../../services/validation";
import RegistrationByEmail from "./RegistrationByEmail";
import RegistrationByMobile from "./RegistrationByMobile";
import theme from "../../utils/theme";
import logo from '../../assets/images/logo.png'
import logbg from '../../assets/images/output-onlinepngtools.png';


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
        <Tabs value={value} onChange={handleChange}>
          <Tab
            sx={{ width: "50%" }}
            value="one"
            label={
              <Box>
                {value === "one" ? (
                  // <Box
                  //   component="img"
                  //   src={logphoneactive}
                  //   sx={{
                  //     margin: "auto",
                  //     width: "25px",
                  //     mb: "10px !important",
                  //     filter: 'hue-rotate(60deg)',
                  //   }}
                  // ></Box>
                  <></>
                ) : (
                  // <Box
                  //   component="img"
                  //   src={logphonedeactive}
                  //   sx={{
                  //     margin: "auto",
                  //     width: "25px",
                  //     mb: "10px !important",
                  //     filter: 'brightness(2)',
                  //   }}
                  // ></Box>
                  <></>
                )}
                {value === "one" ? <p>Register your phone</p> : <p style={{ color: 'white' }}>Register your phone</p>}

              </Box>
            }
          />
          <Tab
            sx={{ width: "50%" }}
            value="two"
            label={
              <Box>
                {value === "two" ? (
                  // <Box
                  //   component="img"
                  //   src={logemaildeactive}
                  //   sx={{

                  //     margin: "auto",
                  //     width: "25px",
                  //     mb: "10px !important",
                  //     filter: 'hue-rotate(60deg)',
                  //   }}
                  // ></Box>
                  <></>
                ) : (
                  // <Box
                  //   component="img"
                  //   src={logemailactive}
                  //   sx={{
                  //     margin: "auto",
                  //     width: "25px",
                  //     mb: "10px !important",
                  //     filter: 'brightness(2)',
                  //   }}
                  // ></Box>
                  <></>
                )}
                {value === "two" ? <p>      email registration</p> : <p style={{ color: 'white' }}>      email registration</p>}
              </Box>
            }
          />
        </Tabs>
      </Box>
      <Box sx={{ width: "92%", margin: "auto", mt: 3 }}>
        {value === "one" && <RegistrationByMobile />}
        {value === "two" && <RegistrationByEmail />}
      </Box>
    </Container>
  );
}

export default Login;
