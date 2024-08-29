import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import { Box, Container, Stack, Typography } from "@mui/material";
import copy from "clipboard-copy";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import cardbg from "../../assets/images/cardbg.png";
import copyinvitationcode from "../../assets/images/copyinvitationcode.png";
import subcordinatedata from "../../assets/images/subcordinatedata.png";
import Layout from "../../component/layout/Layout";
import {
  ProfileDataFunction,
  Promotionfunction,
  TeamsubFunction,
  checkTokenValidity,
  showRank,
} from "../../services/apiCallings";
import { front_end_domain } from "../../services/urls";
import CustomCircularProgress from "../../shared/loder/CustomCircularProgress";
import theme from "../../utils/theme";

function Promotion() {
  const { data } = useQuery(["get_info"], () => Promotionfunction(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const or_m_user_type = localStorage.getItem("or_m_user_type");
  const prim = data?.data?.earning || [];

  const { isLoading, data: count } = useQuery(
    ["team_count"],
    () => TeamsubFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const Counting = count?.data?.earning || [];

  const { isLoading: profileLoding, data: user } = useQuery(
    ["profile"],
    () => ProfileDataFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const profile = user?.data?.earning || [];
  const profilerec = user?.data?.earning?.rec || [];

  const [copied, setCopied] = useState(false);
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!");
  };

  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);
  return (
    <Layout header={false}>
      <Container sx={{ background: theme.palette.secondary.main }}>
        <CustomCircularProgress isLoading={isLoading || profileLoding} />
        <Box sx={style.header}>
          <Typography variant="body1" color="initial"></Typography>
          <Typography variant="body1" color="initial" className="!text-white">
            Agency
          </Typography>
          <Box component={NavLink} to="/promotion/Subordinate/"></Box>
        </Box>
        <Box sx={{ ...style.commitionboxOuter, background: theme.palette.secondary.main }}>
          <Box
            sx={{
              width: "92%",
              margin: "auto",
              background: theme.palette.primary.main,
              mt: 2,
              borderRadius: "10px",
              pb: 3,
            }}
          >
            <Box sx={style.commitionbox}>
              <Typography
                variant="body1"
                color="initial"
                className="!text-white !text-sm !py-2"
              >
                User ID :{profile?.rec?.Login_Id}
              </Typography>
              {profile?.rec?.Club !== 0 && (
                <Typography
                  variant="body1"
                  color="initial"
                  className="!text-white"
                >
                  Rank : {showRank(profilerec?.Club)}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={style.subcordinateBox}>
            <Stack
              direction="row"
              sx={{
                width: "92%",
                background: theme.palette.primary.main,
                margin: "auto",
              }}
            >
              <Box sx={style.subordinatesleft}>
                <EmojiPeopleOutlinedIcon />
                <Typography variant="body1" color="initial">
                  {" "}
                  Direct subordinates
                </Typography>
              </Box>
              <Box sx={style.subordinatesRight}>
                <Groups2OutlinedIcon />
                <Typography variant="body1" color="initial">
                  Team subordinates
                </Typography>
              </Box>
            </Stack>
            <Box sx={style.boxStyles}>
              <Box sx={style.innerBoxStyles}>
                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {prim?.number_of_register || "0"}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-whtie"
                  >
                    Number of Register
                  </Typography>
                </Box>
                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {prim?.number_of_active_direct || "0"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-black"
                  >
                    Total Active Direct
                  </Typography>
                </Box>

                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {prim?.total_amt || "0"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-black"
                  >
                    Total Amount
                  </Typography>
                </Box>
              </Box>

              <Box sx={style.innerBoxStylestwo}>
                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {Counting?.number_of_register || "0"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-black"
                  >
                    {" "}
                    Number of Registers
                  </Typography>
                </Box>

                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {Counting?.number_of_active_direct || "0"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-black"
                  >
                    {" "}
                    Total Active Team
                  </Typography>
                </Box>

                <Box sx={style.subcordinatelist}>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {Counting?.total_amt || "0"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    className="!text-black"
                  >
                    {" "}
                    Total Amount
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={style.invitebtn}>
              <NavLink>
                <Typography
                  sx={{}}
                  onClick={() => {
                    or_m_user_type === "Dummy User"
                      ? toast("Dummy User")
                      : functionTOCopy(
                        `${front_end_domain}/register/?inviteid=${profile?.rec?.Login_Id}`
                      );
                  }}
                >
                  INVITATION LINK
                </Typography>
              </NavLink>
            </Box>
          </Box>
          <Box
            sx={style.invitebutton}
            className="invitebutton"
          
          >
            <Box sx={style.invitbox} className={"!cursor-pointer"}
              onClick={() => {
                or_m_user_type === "Dummy User"
                  ? toast("Dummy User")
                  : functionTOCopy(
                    `${front_end_domain}/register/?inviteid=${profile?.rec?.Login_Id}`
                  );
              }}>
              <Stack direction="row">
                <Box component="img" src={copyinvitationcode} sx={{ filter: 'hue-rotate(45deg)' }}></Box>
                <Typography variant="body1" color="initial">
                  Copy invitation code
                </Typography>{" "}
              </Stack>
              <Stack direction="row">
                <Typography variant="body1" color="initial">
                  {profile?.rec?.Login_Id}
                </Typography>
                <ArrowForwardIosOutlinedIcon />
              </Stack>
            </Box>

            <NavLink to="/account/income-main/my-team">
              <Box sx={style.invitbox}>
                <Stack direction="row">
                  <Box component="img" src={subcordinatedata} sx={{ filter: 'hue-rotate(45deg)' }}></Box>
                  <Typography variant="body1" color="initial">
                    Subordinate data
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Box>
            </NavLink>
            <NavLink to="/account/income-main/my-team">
              <Box sx={style.invitbox}>
                <Stack direction="row">
                  <Box component="img" src={subcordinatedata} sx={{ filter: 'hue-rotate(45deg)' }}></Box>
                  <Typography variant="body1" color="initial">
                    Team data
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Box>
            </NavLink>
            <Box sx={style.promotionBoxOutertwo}></Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default Promotion;

const style = {
  header: {
    padding: 1,
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
  },
  commitionboxOuter: {
    width: "100%",
    height: "20vh",
    background: theme.palette.secondary.main,
    "&>img": { width: "100%", height: "100%" },
  },
  commitionbox: {
    margin: "auto",
    width: "70%",
    textAlign: "center",
    py: 2,
    backgroundImage: `url(${cardbg})`,
    "&>p:nth-child(1)": { fontSize: "25px", fontWeight: "500" },
    "&>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: "400",
      padding: "5px 0px",
      background: "#ffa43f",
      borderRadius: "20px",
    },
    "&>p:nth-child(3)": {
      fontSize: "13px",
      fontWeight: "400",
      marginTop: "5px",
    },
  },
  subordinatesleft: {
    width: "50%",
    textAlign: "center",
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F6F6F6",
    borderTopLeftRadius: "10px",
    borderRight: "2px solid #fefefe",
    "&>svg": {
      color: theme.palette.primary.main,
      fontSize: "25px",
      marginRight: "10px",
    },
    "&>p": { color: "gray", fontSize: "14px", fontWeight: "500" },
  },
  subordinatesRight: {
    width: "50%",
    textAlign: "center",
    py: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F6F6F6",
    borderTopRightRadius: "10px",
    "&>svg": {
      color: theme.palette.primary.main,
      fontSize: "25px",
      marginRight: "10px",
    },
    "&>p": { color: "gray", fontSize: "14px", fontWeight: "500" },
  },

  boxStyles: {
    background: "#ffffff",
    padding: "15px",
    display: "flex",
    borderRadius: " 0px 0px 10px 10px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    width: "92%",
    margin: "auto;",
  },
  innerBoxStyles: {
    width: "50%",
    borderRight: "1px solid black",
    borderBottomLeftRadius: "10px",
    padding: "0px 0px",
  },
  innerBoxStylestwo: { width: "50%", padding: "0px 0px" },
  subcordinatelist: {
    textAlign: "center",
    "&>p": { color: "black important", fontSize: "13px" },
    mb: 1,
  },
  subcordinateBox: {
    width: "100%",

    background: theme.palette.secondary.main,
    mt: -2,
  },
  invitebutton: {
    width: "100%",
    background: theme.palette.secondary.main,
  },
  invitebtn: {
    mt: "20px",
    pb: 2,
    "&>a>p": {
      width: "80%",
      marginLeft: "10%",
      borderRadius: "20px",
      textAlign: "center",
      padding: "10px",
      background: theme.palette.primary.main,
      color: "white",
      fontSize: "17px",
      fontWeight: 600,
    },
  },
  invitbox: {
    width: "92%",
    background: "#ffffff",
    padding: "10px",
    mb: "20px",
    borderRadius: "10px",
    marginLeft: "2.5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>div>img": { width: "30px", marginRight: "10px" },
    "&>div>p": {
      fontSize: "14px",
      color: "black !important",
      fontWeight: "600",
    },
    "&>div": { alignItems: "center" },
    "&>div:nth-child(2)>p": { marginRight: "20px", color: "gray !important" },
    "&>div:nth-child(2)>svg": {
      fontSize: "14px",
      marginRight: "10px",
      color: "gray !important",
    },
  },
  promotionBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&>div:nth-child(1)": { alignItems: "center" },
    "&>div:nth-child(1)>img": { width: "35px", marginRight: "10px" },
    "&>div:nth-child(1)>p": {
      fontSize: "17px",
      fontWeight: 500,
      color: "black !important",
    },
  },
  promotionBoxOuter: {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    width: "92%",
    background: "#ffffff",
    padding: "10px",
    mt: "20px",
    borderRadius: "5px",
    marginLeft: "2.5%",
    paddingBottom: "15px",
    "&>div:nth-child(2)>div:nth-child(1)": {
      my: "10px",
      borderRight: "1px solid gray",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(2)>div:nth-child(2)": {
      my: "10px",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(2)>div>p:nth-child(1)": { color: "black !important" },
    "&>div:nth-child(2)>div>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: 500,
      color: "grey !important",
    },
    "&>div:nth-child(3)>div:nth-child(1)": {
      my: "10px",
      borderRight: "1px solid gray",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(3)>div:nth-child(2)": {
      my: "10px",
      width: "50%",
      textAlign: "center",
    },
    "&>div:nth-child(3)>div>p:nth-child(1)": { color: "black !important" },
    "&>div:nth-child(3)>div>p:nth-child(2)": {
      fontSize: "13px",
      fontWeight: 500,
      color: "grey !important",
    },
  },
  promotionBoxOutertwo: {
    width: "90%",
    padding: "10px",
    borderRadius: "5px",
    marginLeft: "5%",
    paddingBottom: "70px",
  },
};
