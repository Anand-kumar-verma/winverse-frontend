import React from "react";
import Layout from "../../component/layout/Layout";
import { Box, Container,  Typography } from "@mui/material";
import theme from "../../utils/theme";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import emp from "../../assets/images/empty.png";
import backbtn from "../../assets/images/backBtn.png";
import { NavLink } from "react-router-dom";

const Subordinates = () => {
    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <>

        <Layout header={false}>
            <Container
                sx={{
                    width: "100%",
                    height: "100vh",
                    overflow: "auto",

                }}
            >
                <Box sx={style.header}>
                    <Typography variant="body1" color="initial">
                    <NavLink to="/promotion">
          <Box component="img" src={backbtn} width={25}></Box>
        </NavLink>
                    </Typography>
                    <Typography variant="body1" color="initial" className="!text-white">
                        New SubOrdinates
                    </Typography>
                    <Box >

                    </Box>
                </Box>
                <Box sx={{ width: '100%' }} >
                    <Box  >
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className=" !p-4 !shadow-xl bg-white " >
                            <Tab label="Today" {...a11yProps(0)} className="!mx-4" />
                            <Tab label="Yesterday" {...a11yProps(1)} className="!mx-4" />
                            <Tab label="This Month" {...a11yProps(2)} className="!mx-4" />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <img src={emp} alt="" className="!items-center" />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <img src={emp} alt="" className="!items-center " />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <img src={emp} alt="" className="!items-center" />
                    </CustomTabPanel>
                </Box>


            </Container>
        </Layout>

    </>
}
export default Subordinates;
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
}