import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../component/layout/Layout";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import { deCryptData } from "../../shared/secret";
import { Navigate, useNavigate } from "react-router-dom";

const AccountPassword = () => {

  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false);
  const user_id = deCryptData(localStorage.getItem("user_id"));
  const initialValue = {
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        userid: user_id,
        newpassword: fk.values.newpassword,
        confirmpassword: fk.values.confirmpassword,
        oldpassword: fk.values.oldpassword,
      };
      if (
        !reqBody.newpassword ||
        !reqBody.confirmpassword ||
        !reqBody.oldpassword
      )
        return toast("Plese enter all data");
      if (!reqBody.confirmpassword !== !reqBody.newpassword)
        return toast("New password and Confirm Password should be same");
      changePasswordFn(reqBody);
    },
  });

  async function changePasswordFn(reqBody) {
    try {
      setLoading(true)
      const res = await axios.post(endpoint?.update_password, reqBody);
      toast(res?.data?.msg);
      if ("Password Changed Successfully" === res?.data?.msg)
        fk.handleReset();
      navigate("/dashboard")
      setLoading(false)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Layout header={false}>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
          background: "#0d0335",
        }}
        className="no-scrollbar"
      >
         <Box sx={style.root}>
         
        <Typography variant="body1" color="initial" className="!pb-3 !text-center">
          Change Password
        </Typography>
      </Box>
      
        <div className="!mx-2 my-5  !text-white  bg-[#22025f] p-5 py-10 !shadow-xl !rounded">
          <span>Old Password </span>
            <TextField
              id="oldpassword"
              name="oldpassword"
              value={fk.values.oldpassword}
              onChange={fk.handleChange}
              placeholder="Enter Old Password"
              className="!w-[100%] !bg-white !mb-5 !rounded"
            ></TextField>
            <span className="!my-2">New Password</span>
            <TextField
              id="newpassword"
              name="newpassword"
              value={fk.values.newpassword}
              placeholder="Enter New Password"
              onChange={fk.handleChange}
              className="!w-[100%] !bg-white !mb-5 !rounded" 
            />
            <span className="!my-2">Confirm Password</span>
            <TextField
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Enter Confirm Password"
              value={fk.values.confirmpassword}
              onChange={fk.handleChange}
              className="!w-[100%] !bg-white !rounded"
            />
             <div className="col-span-2 flex gap-2 mt-4">
              <Button
              className="!bg-[#f03239] !text-white"
                onClick={() => fk.handleReset()}
              >
                Cancel
              </Button>
              <Button
              className="!bg-[#28d630] !text-white"
                onClick={() => fk.handleSubmit()}
              >
                Submit
              </Button>
              {Loading && (
                <CustomCircularProgress isLoading={Loading} />)}
            </div>
          </div>

      </Container>
    </Layout>
  );
};

export default AccountPassword;

const style = {
  root: {
    background: "linear-gradient(180deg, #9cec01, #028f7e)",
    pt: 2,
    px: 1,
    "&>p": { color: "white" },
    "&>p:nth-child(1)": { fontSize: "17px", fontWeight: 600 },
    "&>p:nth-child(2)": { fontSize: "12px", fontWeight: 400, mt: 1 },
    "&>p:nth-child(3)": { fontSize: "12px", fontWeight: 400, pb: 1 },
  },
 
};