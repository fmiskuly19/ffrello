import { ThemeOptions, createTheme } from "@mui/material";
import { FFrelloTheme } from "../types/FFrelloTheme";

const FrutigerAeroTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#036ddd',
            contrastText: '#f9f9f9',
        },
        secondary: {
            main: '#acba0a',
        },
        background: {
            default: '#e8e8e8',
            paper: '#f9f9f9',
        },
        text: {
            primary: '#819ab7',
            secondary: '#252c35',
            disabled: '#181d23',
        },
    },
});

const theme: FFrelloTheme = {
    name: 'Frutiger Aero',
    theme: FrutigerAeroTheme
}

export default theme;