import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { endpoint } from "../../services/urls";
const Login = () => {
  const logindata = localStorage.getItem("aviator_data");
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const initialValue = {
    mob: "",
    email: "",
    account: "",
    pass: "",
    countryNo: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      const reqbody = {
        email: fk.values.email,
        password: fk.values.pass,
      };
      value === 1 && loginFunction(reqbody);
    },
  });

  const loginFunction = async (reqbody) => {
    try {
      const response = await axios.post(`${endpoint.aviator_login}`, reqbody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      toast.success(response?.data?.message);

      if (response?.data?.success === "200") {
        localStorage.setItem(
          "aviator_data",
          JSON.stringify(response?.data?.data)
        );
        navigate("/playgame");
      }
    } catch (e) {
      toast.error(e?.message);
      console.error(e);
    }
  };

  const handleClose = (no) => {
    fk.setFieldValue("countryNo", no);
    setAnchorEl(null);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    logindata && navigate("/playgame");
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example "
          className="!flex !flex-col"
        >
          <Tab className="!text-white" label="Phone" {...a11yProps(0)} />
          <Tab className="!text-white" label="Email" {...a11yProps(1)} />
          <Tab className="!text-white" label="Account" {...a11yProps(2)} />
        </Tabs>
      </div>
      <form className="pt-5">
        <p className="text-[10px] text-white">
          {(value === 0 && " Mobile No") ||
            (value === 1 && " Email") ||
            (value === 2 && " Account")}
        </p>
        {value === 0 && (
          <div className="flex items-center  !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white rounded-md">
            <p
              onClick={(e) => handleClick(e)}
              className="flex items-center gap-2"
            >
              <Avatar sx={{ size: "small" }} />
              <p className="text-[10px]">+{fk.values.countryNo}</p>
              <MdOutlineKeyboardArrowDown className="!w-10" />
            </p>

            <TextField
              id="mob"
              name="mob"
              type="number"
              size="small"
              value={fk.values.mob}
              onChange={fk.handleChange}
              className="w-[100%]  !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
              placeholder="000-000-0000"
            />
          </div>
        )}
        {value === 1 && (
          <TextField
            id="email"
            name="email"
            type="email"
            size="small"
            value={fk.values.email}
            onChange={fk.handleChange}
            className="w-[100%]   !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
            placeholder="Enter Email"
          />
        )}
        {value === 2 && (
          <TextField
            id="account"
            name="account"
            size="small"
            value={fk.values.account}
            onChange={fk.handleChange}
            className="w-[100%]   !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
            placeholder="Enter account"
          />
        )}

        <p className="!mt-4 text-[10px] text-white">Password</p>
        <TextField
          id="pass"
          name="pass"
          type="password"
          size="small"
          value={fk.values.pass}
          onChange={fk.handleChange}
          className="w-[100%]   !outline-none placeholder:!text-gray-100 !capitalize !backdrop-blur-mk !bg-white !bg-opacity-20 !border-opacity-30 !border !border-white"
          placeholder="Enter Password"
        />
        <p className="mt-3 cursor-pointer t-2 text-[10px] text-white">
          Forgotten password?
        </p>

        <Button
          onClick={() => fk.handleSubmit()}
          className="!w-full !mt-4"
          variant="contained"
          disableElevation
        >
          Login
        </Button>

        <p className="text-white text-[12px] cursor-pointer text-center mt-[5%]">
          Don't have an account?{" "}
          <span className="text-yellow-400 cursor-pointer">Register</span>
        </p>
      </form>

      <Menu
        id="countryNo"
        name="countryNo"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleClose(91)} value="91">
          India +91
        </MenuItem>
        <MenuItem onClick={() => handleClose(880)} value="880">
          Bangladesh +880
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Login;
