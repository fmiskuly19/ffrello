import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { authenticateWithFFrelloApi, setFfrelloAuthenticationApiCallStatus, setIsAuthenticatedWithExternalProvider } from "../redux/authSlice";
import { GoogleLogin } from '@react-oauth/google';

import { enqueueSnackbar } from "notistack";

import { ApiCallStatus } from "../types/ApiCallStatus";

import { Box, Button, CircularProgress, Divider, OutlinedInput, Paper, Stack, Typography } from "@mui/material";
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import InstagramIcon from '@mui/icons-material/Instagram';

const isDev = import.meta.env.MODE == "development"

const LoginPage = () => {

    const dispatch = useAppDispatch();
    const ffrelloLoginStatus = useAppSelector((state) => state.authSlice.ffrelloAuthenticationApiCallStatus);

    //this returns a different token than the Google login button
    //ideally I would like to use my own button but this doenst work for now

    // const login = useGoogleLogin({
    //     flow: 'auth-code',
    //     onSuccess: tokenResponse => {
    //         enqueueSnackbar('Google Authentication Successful', { variant: 'success' });
    //         console.log(tokenResponse);
    //         dispatch(setIsAuthenticatedWithExternalProvider(true));
    //         dispatch(authenticateWithFFrelloApi(tokenResponse.code))
    //     },
    //     onError: () => {
    //         dispatch(setIsAuthenticatedWithExternalProvider(false));
    //         enqueueSnackbar('Google Login Failed', { variant: 'error' });
    //     }
    // });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isDev) console.log(`ffrelloLoginStatus changed: ${ffrelloLoginStatus}`);
        ffrelloLoginStatus == ApiCallStatus.Loading ? setIsLoading(true) : setIsLoading(false);
    }, [ffrelloLoginStatus])

    const loginSuccess = (tokenResponse: any) => {
        if (import.meta.env.MODE == "development") {
            enqueueSnackbar('Google Authentication Successful', { variant: 'success' });
            console.log(tokenResponse);
        }

        dispatch(setIsAuthenticatedWithExternalProvider(true)); //set flag that we are authenticated with an external identity provider (google, microsoft, etc.)
        dispatch(authenticateWithFFrelloApi(tokenResponse.credential as string)) //dispatch async thunk to authenticate with our ffrello api
    }

    const loginFailure = () => {
        dispatch(setIsAuthenticatedWithExternalProvider(false));
        if (import.meta.env.MODE == "development") enqueueSnackbar('Google Login Failed', { variant: 'error' });
    }

    return (
        <Box display="flex" sx={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: '80px' }}>
            {isLoading ?
                <CircularProgress />
                :
                <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <Paper elevation={10} sx={{ padding: '20px', borderRadius: '10px', minWidth: '350px' }}>
                        <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                            <Typography variant="h4" fontWeight="600">FFrello</Typography>
                            <div>
                                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                                    <Typography variant="h6">Login</Typography>
                                    <Stack direction="column" spacing={1}>
                                        <GoogleLogin
                                            onSuccess={tokenResponse => loginSuccess(tokenResponse)}
                                            onError={loginFailure}
                                        />
                                        <Button variant="contained" >
                                            Microsoft <MicrosoftIcon sx={{ width: '18px', height: '18px', ml: '5px' }} />
                                        </Button>
                                        <Button variant="contained" >
                                            Meta <InstagramIcon sx={{ width: '18px', height: '18px', ml: '5px' }} />
                                        </Button>
                                    </Stack>
                                </Stack>
                            </div>
                            <Divider><Typography>or</Typography></Divider>
                            <div>
                                <Stack direction="column" spacing={0.5} justifyContent="center" alignItems="center">
                                    <OutlinedInput placeholder="username" size="small" sx={{ width: '85%' }} value={username} onChange={(event) => setUsername(event.target.value as string)} />
                                    <OutlinedInput type="password" placeholder="password" size="small" sx={{ width: '85%' }} value={password} onChange={(event) => setPassword(event.target.value as string)} />
                                </Stack>
                            </div>
                            <div>
                                <Button variant="contained" onClick={() => { setUsername(''); setPassword(''); enqueueSnackbar(`Login failed for user ${username}`, { variant: 'error' }) }}>
                                    Login
                                </Button>
                            </div>
                            <Divider />
                            <div></div>
                        </Stack>
                    </Paper>
                </Stack >
            }
        </Box >
    )
}

export default LoginPage;