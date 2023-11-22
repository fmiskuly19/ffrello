import { ThemeOptions, createTheme } from '@mui/material/styles';
import { FFrelloTheme } from '../types/FFrelloTheme';
import { blueGrey, green } from "@mui/material/colors";

const defaultTheme: ThemeOptions = createTheme({
    // zIndex: {
    //     appBar: 1200,
    //     drawer: 1100,
    // },
    typography: {
        fontFamily: 'Montserrat',
        body1: {
            fontSize: 14,
        },
        body2: {
            fontSize: 12,
        },
        h6: {
            fontSize: 16
        },
        h5: {
            fontSize: 18
        },
        h4: {
            fontSize: 20
        },
        h3: {
            fontSize: 22
        },
        h2: {
            fontSize: 24
        },
        h1: {
            fontSize: 28
        },
    },
    palette: {
        mode: 'dark',
        // type: 'dark',
        primary: {
            main: '#9aa1b2',
            dark: '#090a09',
            light: '#ffffff',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#313138',
            dark: '#4e4e59',
            light: '#313138',
            contrastText: '#9aa1b2'
        },
        info: {
            main: '#ffffff',
            dark: blueGrey[300],
            light: blueGrey[100],
            contrastText: blueGrey[900],
        },
        success: {
            main: green[50],
            dark: green[300],
            light: green[100],
            contrastText: green[900],
        },
        background: {
            default: '#1f1f26',
            paper: '#1e2025',
        },
        text: {
            primary: '#9aa1b2',
            secondary: '#ffffff',
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

const theme: FFrelloTheme = {
    name: 'Default',
    theme: defaultTheme
}

export default theme;