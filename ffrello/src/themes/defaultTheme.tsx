import { ThemeOptions, createTheme } from '@mui/material/styles';
import { FFrelloTheme } from '../types/FFrelloTheme';

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
        mode: 'light',
        primary: {
            main: '#036ddd',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#acba0a',
        },
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