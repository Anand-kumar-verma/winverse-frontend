import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import phoneaa from "../../assets/images/phoneaa.png";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import invite from "../../assets/images/invite.png";
import logemaildeactive from "../../assets/images/logemaildeactive.png";
import password from "../../assets/images/password.png";
import { storeCookies } from "../../services/apiCallings";
import { endpoint } from "../../services/urls";
import { signupSchemaValidataonEmail } from "../../services/validation";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
const RegistrationByEmail = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setusername] = useState("");
  const [isLoading, setisLoding] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const inviteid = params.get("inviteid");
  const initialValue = {
    email: "",
    password: "",
    confirmed_password: "",
    invite_code: inviteid || "",
    name: "",
    mobile:"",
  };
  const fk = useFormik({
    initialValues: initialValue,
    validationSchema: signupSchemaValidataonEmail,
    onSubmit: () => {
      const reqBody = {
        txtregid: "1",
        txtname: fk.values.name,
        txtintroducer_id: fk.values.invite_code,
        txtintroducer_name: username,
        txtemail: fk.values.email,
        txtmobile: fk.values.mobile,
        txtpassword: fk.values.password,
      };
      if (fk.values.password !== fk.values.confirmed_password)
        return toast("Password and confirm password should be same");
      signupSubmit(reqBody);
    },
  });

  async function signupSubmit(reqBody) {
    setisLoding(true);
    try {
      const res = await axios.post(endpoint.register_candidate_email, reqBody);
      if (res?.data?.status === true) {
        storeCookies();
        toast(res?.data?.msg);
        localStorage.setItem("user_id", res?.data?.userid);
        navigate("/dashboard");
      } else {
        toast(res?.data?.msg);
      }
    } catch (e) {
      console.log(e);
    }
    setisLoding(false);
  }
  async function getIntroFn() {
    const reqBody = {
      userid: fk.values.invite_code,
    };
    try {
      const res = await axios.post(endpoint?.get_user_intro_name, reqBody);
      setusername(res?.data?.earning?.name);
    } catch (e) {
      console.log(e);
    }
    // client.refetchQueries("bank_details");
  }

  useEffect(() => {
    getIntroFn();
  }, [fk.values.invite_code]);

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
    <>
      <Box component="form" onSubmit={fk.handleSubmit}>
        <CustomCircularProgress isLoading={isLoading} />
        <Box mt={2}>
          <Stack direction="row" alignItems="center">
            <Box
              component="img"
              src={logemaildeactive}
              sx={{ width: "25px", mr: 1, filter: 'hue-rotate(60deg)', }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "15px", fontWeight: "500", color: "white" }}
            >
              Mail
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ ...style.inputfield }}>
            <TextField
              id="email"
              name="email"
              onChange={fk.handleChange}
              value={fk.values.email}
              label=""
              placeholder="please input your mail"
              fullWidth
              type="text"
            />
            {fk.touched.email && fk.errors.email && (
              <div className="error">{fk.errors.email}</div>
            )}
          </FormControl>
        </Box>
        <Stack direction="row" alignItems="center" className="!mt-2">
          <Box
            component="img"
            src={phoneaa}
            sx={{ width: "25px", mr: 1, filter: 'hue-rotate(60deg)', }}
          ></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "15px", fontWeight: "500", color: "white" }}
          >
            Phone number
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth sx={{ ...style.inputfield }}>
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
              {fk.touched.mobile && fk.errors.mobile && (
                <div className="error">{fk.errors.mobile}</div>
              )}
            </FormControl>
          </Box>
        </Stack>
        <Box mt={2}>
          <Stack direction="row" alignItems="center">
            <HowToRegIcon sx={{ width: "25px", mr: 1, }} />
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "15px", fontWeight: "500", color: "white" }}
            >
              Name
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ ...style.inputfield }}>
            <TextField
              id="name"
              name="name"
              onChange={fk.handleChange}
              value={fk.values.name}
              label=""
              placeholder="please input your name"
              fullWidth
              type="text"
            />
            {fk.touched.name && fk.errors.name && (
              <div className="error">{fk.errors.name}</div>
            )}
          </FormControl>
        </Box>

        <Box mt={2}>
          <Stack direction="row" alignItems="center">
            <Box
              component="img"
              src={password}
              sx={{ width: "25px", mr: 1, filter: 'hue-rotate(60deg)', }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "15px", fontWeight: "500", color: "white" }}
            >
              Set password
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ ...style.passwordfield }}>
            <FilledInput
              placeholder="Set password"
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {fk.touched.password && fk.errors.password && (
              <div className="error">{fk.errors.password}</div>
            )}
          </FormControl>
        </Box>
        <Box mt={2}>
          <Stack direction="row" alignItems="center">
            <Box
              component="img"
              src={password}
              sx={{ width: "25px", mr: 1, filter: 'hue-rotate(60deg)', }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "15px", fontWeight: "500", color: "white" }}
            >
              Confirm password
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ ...style.passwordfield }}>
            <FilledInput
              placeholder="Confirm password"
              id="confirmed_password"
              name="confirmed_password"
              onChange={fk.handleChange}
              value={fk.values.confirmed_password}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {fk.touched.confirmed_password && fk.errors.confirmed_password && (
              <div className="error">{fk.errors.confirmed_password}</div>
            )}
          </FormControl>
        </Box>
        <Box mt={2}>
          <Stack direction="row" alignItems="center">
            <Box
              component="img"
              src={invite}
              sx={{ width: "25px", mr: 1, filter: 'hue-rotate(60deg)', }}
            ></Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: "15px", fontWeight: "500", color: "white" }}
            >
              Invite code
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ ...style.inputfield }}>
            <TextField
              id="invite_code"
              name="invite_code"
              onChange={fk.handleChange}
              value={fk.values.invite_code}
              label=""
              placeholder="please input Invite code"
              fullWidth
              type="text"
            />
            {username !== "false" ? (
              <div className="no-error">{username}</div>
            ) : (
              fk.touched.invite_code &&
              fk.errors.invite_code && (
                <div className="error">{fk.errors.invite_code}</div>
              )
            )}
          </FormControl>
        </Box>
      </Box>
      <Box mt={3}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={
              <Stack direction="row">
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ fontSize: "13px", color: 'white' }}
                >
                  I have read and agree{" "}
                </Typography>
                <NavLink to="/RiskDisclosureAgreement">
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontSize: "14px", color: theme.palette.primary.main }}
                  >
                    【Privacy Agreement】
                  </Typography>
                </NavLink>
              </Stack>
            }
          />
        </FormGroup>
      </Box>
      <Box sx={{ width: "80%", margin: "auto", mt: 3 }}>
        <button class="cssbuttons-io-button" onClick={() => fk.handleSubmit()}>
          Register
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
        <NavLink to="/">
          <a class="playstore-button" href="#">
            <HowToRegIcon />
            <span class="texts">
              <span class="text-1"> I have an account</span>
              <span class="text-2">Login Winverse</span>
            </span>
          </a>
        </NavLink>
      </Box>
    </>
  );
};

export default RegistrationByEmail;

const style = {
  inputfield: {
    mt: 2,
    "&>div>div>input": {
      background: "white !important",
      padding: 3,
      borderRadius: "10px",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
    },
    "&>div>div>fieldset ": { border: "none !important" },
    "&>div>div>input:focus": { outline: "1px solid #F18401" },
  },
  passwordfield: {
    "&>div>input": { padding: 3 },
    "&>div": {
      mt: 2,
      background: "white !important",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "10px",
    },
    "&>div::before": { border: "none !important" },
    "&>div::after:focus": {
      border: "none !important",
      border: "1px solid #F18401  !important",
    },
  },
  selectfield: {
    "&>div>div": {
      background: "white !important",
      borderRadius: "10px",
      padding: "11px 3px",
      borderRadius: "10px",
    },
    "&>div>fieldset": {
      border: "1px solid white",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      borderRadius: "10px",
    },
    "&>div": { mt: 2 },
  },
};
