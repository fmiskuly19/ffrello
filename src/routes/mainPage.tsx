import Navbar from "../components/nav/navbar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";

import CreateWorkspaceModal from "../components/modals/createWorkspaceModal";

import { getUserWorkspaces } from "../redux/userSlice";
import { ApiCallStatus } from "../types/ApiCallStatus";
import { GoogleLogin } from "@react-oauth/google";
import { authenticateWithApi, setIsAuthenticated } from "../redux/authSlice";
import { Box, Stack, Typography } from "@mui/material";

const MainPage = () => {

    //pre auth stuff
    const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
    const accessToken = useAppSelector((state) => state.authSlice.accessToken);

    //after auth stuff
    const dispatch = useAppDispatch();
    const workspaceStatus = useAppSelector((state) => state.userSlice.workspaceStatus);

    if (workspaceStatus == ApiCallStatus.Idle && isLoggedIn) {
        dispatch(getUserWorkspaces({ userId: 'fwank', accessToken: accessToken }));
    }

    return (
        isLoggedIn ?
            <>
                <Navbar />
                <Outlet />
                <CreateWorkspaceModal />
            </>
            :
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

export default MainPage;