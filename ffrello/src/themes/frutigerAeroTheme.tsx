import { ThemeOptions, createTheme } from "@mui/material";
import { FFrelloTheme } from "../types/FFrelloTheme";

const FrutigerAeroTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#acba0a',
            contrastText: '#f9f9f9',
        },
        secondary: {
            main: '#2dc7ff',
        },
        background: {
            default: '#e8e8e8',
            paper: '#d9d9d9',
        },
        text: {
            primary: '#014492',
            secondary: '#252c35',
            disabled: '#181d23',
        },
    },
    typography: {
        fontFamily: 'Segoe UI',
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
});

const theme: FFrelloTheme = {
    name: 'Frutiger Aero',
    theme: FrutigerAeroTheme
}

export default theme;