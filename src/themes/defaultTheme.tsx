import { ThemeOptions, createTheme } from '@mui/material/styles';
import { FFrelloTheme } from '../types/FFrelloTheme';
import { blueGrey, green } from "@mui/material/colors";

const defaultTheme: ThemeOptions = createTheme({
    typography: {
        fontFamily: 'Montserrat',
    },
    palette: {
        mode: 'dark',
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
            paper: '#333333',
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