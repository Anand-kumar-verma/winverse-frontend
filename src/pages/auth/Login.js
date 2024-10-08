import { Visibility, VisibilityOff } from "@mui/icons-material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {
  Box,
  Container,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import custom from "../../assets/images/custom.png";
import email from '../../assets/images/email (1).png';
import inputfield from "../../assets/images/inputfield.png";
import logbg from '../../assets/images/logbg.jpg';
import logo from '../../assets/images/logo.png';
import password from "../../assets/images/password.png";
import phoneaa from "../../assets/images/phoneaa.png";
import { storeCookies } from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import { loginSchema } from "../../services/validation";
import { deCryptData, enCryptData } from "../../shared/secret";
function Login() {
  const [value, setValue] = useState("one");
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
    validationSchema :loginSchema,
    onSubmit: () => {
      const reqBody = {
        email: value === "one" ? String(fk.values.mobile) : fk.values.email,
        password: fk.values.password,
      };
      if (!reqBody.password || !reqBody.email)
        return toast("Plese enter all fields", {id:1});
      loginSubmit(reqBody);
    },
  });

  async function loginSubmit(reqBody) {
    try {
      const res = await axios.post(endpoint.newlogin, reqBody);
      if (res?.data?.success === "200") {
        storeCookies();
        toast(res?.data?.message ,{id:1});
        localStorage.setItem("user_id", enCryptData(res?.data?.data?.or_user_id || null));
        localStorage.setItem("or_m_user_type", enCryptData(res?.data?.data?.or_m_user_type));
        window.location.reload();
        navigate("/before-login");
      } else {
        toast(res?.data?.msg ,{id:1});
      }
    } catch (e) {
      toast(e?.response?.data?.message ,{id:1});
    }
  }

  useEffect(() => {
    user_id &&
      navigate("/before-login");
  }, [user_id]);

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === "Enter") {
        fk.handleSubmit();
      }
    };
    window.addEventListener("keydown", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, [fk]);
  return (
    <Container sx={{
      background: '#0D0335', minHeight: '100vh',
      backgroundImage: `url(${logbg})`, backgroundSize: '100% 100%',
    }}>
      <Box
        sx={{
          padding: 1,
          px: 2,
          "&>p": { color: "white" },
        }}
      >
        <Box
          component="img"
          src={logo}
          sx={{
            margin: "auto",
            width: "120px",
            mt: "30px !important",
          }}
        ></Box>
      </Box>
      <Box sx={{ width: "92%", margin: "auto", mt: 2 }}>
       
          
      </Box>
      <Box sx={{ width: "92%", margin: "auto", mt: 3 }}>
      
          <Box component="form" onSubmit={fk.handleSubmit}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box sx={{ width: "100%" }}>
                <FormControl fullWidth sx={{ ...style.inputfield2 }}>
                  <Box
                    component="img"
                    src={phoneaa}
                    sx={style.inputimg2}
                  ></Box>
                  <TextField
                    id="mobile"
                    name="mobile"
                    onChange={fk.handleChange}
                    value={fk.values.mobile}
                    label=""
                    placeholder=" Enter number"
                    fullWidth
                    type="number"
                  />
                </FormControl>
                {fk.touched.mobile && fk.errors.mobile && (
                <div className="error">{fk.errors.mobile}</div>
              )}
              </Box>
            </Stack>
            <Box mt={2}>
              <FormControl sx={style.passwordfield2}>
                <Box
                  component="img"
                  src={password}
                  sx={style.inputimg2}
                ></Box>
                <FilledInput
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  onChange={fk.handleChange}
                  value={fk.values.password}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"

                      >
                        {showPassword ? <VisibilityOff sx={{ color: '#fff2f2' }} /> : <Visibility sx={{ color: '#fff2f2' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
    
      
        <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>

          <button class="cssbuttons-io-button" onClick={() => fk.handleSubmit()}>
            Login
            <div class="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
          <NavLink to="/register">
            <a class="playstore-button" href="#">
              <HowToRegIcon />
              <span class="texts">
                <span class="text-1">Register ON</span>
                <span class="text-2">Winverse</span>
              </span>
            </a>
          </NavLink>

        </Box>
        <Box sx={{ mt: 3 }}></Box>
        <Box
          sx={{ width: "80%", margin: "auto" }}
          component={NavLink}
          to="/CustomerService"
        >
          <Box
            component="img"
            src={custom}
            sx={{ width: "50px", margin: "auto", filter: 'hue-rotate(60deg)', }}
          ></Box>
          <Typography
            variant="body1"
            color="white"
            sx={{ textAlign: "center" }}
          >
            Customer Service
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;


const style = {

  passwordfield2: {
    width: '100%', position: 'relative', mb: '10px', filter: 'hue-rotate(100deg)',
    backgroundImage: `url(${inputfield})`,
    backgroundSize: '100% 100%',
    '&>div': { padding: '20px' },
    '&>div>input': { background: '', color: 'white', padding: '20px', paddingLeft: '72px' },
    '&>div>div>button>svg': { mr: '20px' },
  },
  inputfield2: {
    width: '100%', position: 'relative', mb: '10px', filter: 'hue-rotate(100deg)',
    backgroundImage: `url(${inputfield})`,
    backgroundSize: '100% 100%',
    '&>div': { padding: '20px', border: 'none' },
    '&>div>div>input': { background: '', color: 'white', padding: '20px', paddingLeft: '72px', },
    '&>div>div>input::placeholder': { color: 'white' },
    '&>div>div>fieldset': { border: 'none' },
    '&>div>div>button>svg': { mr: '20px' },
  },
  inputimg2: {
    position: 'absolute',
    zIndex: 10,
    width: '30px',
    top: '30%',
    left: '7%',
  }
};
