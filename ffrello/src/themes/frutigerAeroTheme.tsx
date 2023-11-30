import { ThemeOptions, createTheme } from "@mui/material";
import { FFrelloTheme } from "../types/FFrelloTheme";

const FrutigerAeroTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#acba0a',
            contrastText: '#fbfaee',
        },
        secondary: {
            main: '#007e7b',
        },
        background: {
            default: '#e8e8e8',
            paper: '#d9d9d9',
        },
        text: {
            primary: '#006374',
            secondary: '#252c35',
            disabled: '#181d23',
        },
    },
    typography: {
        fontFamily: 'Segoe UI',
    },
});

const theme: FFrelloTheme = {
    name: 'Frutiger Aero',
    theme: FrutigerAeroTheme
}

export default theme;