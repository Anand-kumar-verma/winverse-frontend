import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: '400px !important',
                    backgroundColor: '#F7F8FF',
                    margin: '0 auto ',
                    padding: '0px 0px 40px 0px !important',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '0 !important',
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#63BA0E',
        },
        secondary: {
            main: '#0D0335',
        },
        error: {
            main: '#fff',
        },
    },

});

export default theme;