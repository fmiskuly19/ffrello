import { ThemeOptions, createTheme } from '@mui/material/styles';
import { FFrelloTheme } from '../types/FFrelloTheme';

const catTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FDA1FF',
            contrastText: '#FA28FF',
        },
        secondary: {
            main: '#AB149E',
            contrastText: '#FDA1FF',
        },
        background: {
            default: '#FB9E00',
            paper: '#68CCCA',
        },
        text: {
            primary: '#655E4D',
            secondary: '#000000',
        },
    },
    typography: {
        fontFamily: 'Rubik Bubbles',
    },
});

const catsTheme: FFrelloTheme = {
    name: 'Cat\'s Theme',
    theme: catTheme
}

export default catsTheme;