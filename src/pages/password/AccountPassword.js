import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../component/layout/Layout";
import { endpoint } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";
import { deCryptData } from "../../shared/secret";

const AccountPassword = () => {
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
      setLoading(false)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Layout>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
          background: theme.palette.primary.main,
        }}
        className="no-scrollbar"
      >
        <Box
        sx={{
          background: "white",
          width: "100%",
          height: "100vh",
        }}>
          <div className="font-extrabold !text-center !pt-5">Change Password</div>
        <div className="!mx-2 my-5  !text-white !font-bold bg-green-500 p-5 py-10 !shadow-xl !rounded-xl">
          <span>Old Password*</span>
            <TextField
              id="oldpassword"
              name="oldpassword"
              value={fk.values.oldpassword}
              onChange={fk.handleChange}
              placeholder="Enter Old Password"
              className="!w-[100%] !bg-white !mb-5 !rounded"
            ></TextField>
            <span className="!my-2">New Password*</span>
            <TextField
              id="newpassword"
              name="newpassword"
              value={fk.values.newpassword}
              placeholder="Enter New Password"
              onChange={fk.handleChange}
              className="!w-[100%] !bg-white !mb-5 !rounded" 
            />
            <span className="!my-2">Confirm Password*</span>
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
              className="!bg-[#da1c22] !text-white"
                onClick={() => fk.handleReset()}
              >
                Cancel
              </Button>
              <Button
              className="!bg-[#0D0335] !text-white"
                onClick={() => fk.handleSubmit()}
              >
                Submit
              </Button>
              {Loading && (
                <CustomCircularProgress isLoading={Loading} />)}
            </div>
          </div>
           
        </Box>

      </Container>
    </Layout>
  );
};

export default AccountPassword;
