import { Box, Stack, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../hooks";
import { authenticateWithApi, setIsAuthenticated } from "../redux/authSlice";

const LoginPage = () => {

    const dispatch = useAppDispatch();

    return (
        <Box display="flex" sx={{ minHeight: '40vh', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                <Typography variant="h5" >FFrello Login</Typography>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        dispatch(setIsAuthenticated(true));
                        dispatch(authenticateWithApi(credentialResponse.credential as string))
                    }}
                    onError={() => {
                        console.log('Login Failed');
                        dispatch(setIsAuthenticated(false));
                    }}
                />
            </Stack>
        </Box>
    )
}

export default LoginPage;