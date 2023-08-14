import createTheme, { ThemeOptions } from "@mui/material/styles/createTheme";

const themeOptions: ThemeOptions = createTheme({
    typography: {
        fontFamily: 'Roboto'
    },
    palette: {
        mode: 'dark',
        // type: 'dark',
        primary: {
            main: '#9aa1b2',
            dark: '#9aa1b2',
            light: '#1e2025'
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#1e2025',
            paper: '#23262c',
        },
        text: {
            primary: '#9aa1b2',
            secondary: 'rgba(255,255,255,0.54)',
            disabled: 'rgba(115,115,115,0.38)',
        },
        divider: 'rgba(191,191,191,0.12)',
    },
    components: {
        MuiAccordion: {
            styleOverrides: {
                root: {

                }
            }
        }
    }
});

export default themeOptions;