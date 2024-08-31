import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import account from "../../../assets/images/account.png";
import accountactive from "../../../assets/images/accountactive.png";
import activity from "../../../assets/images/activity.png";
import activityactive from "../../../assets/images/activityactive.png";
import footer from "../../../assets/images/footer.png";
import home from "../../../assets/images/home.png";
import homeactive from "../../../assets/images/homeactive.png";
import promotion from "../../../assets/images/promotion.png";
import wallet from "../../../assets/images/wallet.png";
import walletactive from "../../../assets/images/walletactive.png";
import theme from "../../../utils/theme";

function Footer() {
  const [nav, setNav] = useState(1);
  const navigation = (value) => {
    setNav(value);
  };

  return (
    <Box
      sx={{
        px: 1,
        backgroundImage: `url(${footer})`,
        backgroundSize: "100% 100%",
        filter: 'hue-rotate(50deg)',
      }}
      className="footerBox"
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-around" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(1)}
          to="/dashboard"
        >
          {nav !== 1 ? (
            <Box component="img" src={home} width={20}></Box>
          ) : (
            <Box component="img" src={homeactive} width={20}></Box>
          )}
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: nav === 1 ? theme.palette.primary.main : "black",
            }}
          >
            Home
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(2)}
          to="/activity"
        >
          {nav !== 2 ? (
            <Box component="img" src={activity} width={20}></Box>
          ) : (
            <Box component="img" src={activityactive} width={20}></Box>
          )}

          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: nav === 2 ? theme.palette.primary.main : "black",
            }}
          >
            Special
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(3)}
          to="/promotion"
        >
          <Box
            component="img"
            src={promotion}
            sx={{
              position: "absolute",
              width: "120px",
              top: "-40px",
              // left: "5px",
              // ml: '5px',
            }}
          ></Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              mt: 3,
              fontSize: "11px",
              fontWeight: 500,
              color: nav === 3 ? theme.palette.primary.main : "black",
            }}
          >
            Promotion
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(4)}
          to="/wallet"
        >
          {nav === 4 ? (
            <Box component="img" src={walletactive} width={20}></Box>
          ) : (
            <Box component="img" src={wallet} width={20}></Box>
          )}
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: nav === 4 ? theme.palette.primary.main : "black",
            }}
          >
            Wallet
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          component={NavLink}
          onClick={() => navigation(5)}
          to="/account"
        >
          {nav === 5 ? (
            <Box component="img" src={accountactive} width={20}></Box>
          ) : (
            <Box component="img" src={account} width={20}></Box>
          )}
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "11px",
              fontWeight: 500,
              color: nav === 5 ? theme.palette.primary.main : "black",
            }}
          >
            Account
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default Footer;
