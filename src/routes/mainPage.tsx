import Navbar from "../components/nav/navbar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";

import CreateWorkspaceModal from "../components/modals/createWorkspaceModal";

import { getUserWorkspaces } from "../redux/userSlice";
import { useEffect, useState } from "react";
import LoginPage from "./loginPage";

const MainPage = () => {

    //pre auth stuff
    const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
    const accessToken = useAppSelector((state) => state.authSlice.accessToken);

    const [userLoginStatus, setUserLoginStatus] = useState(false)

    useEffect(() => {
        setUserLoginStatus(isLoggedIn);
        console.log(`user Logged in status: ${isLoggedIn}`)

        //get workspaces with new creddentials
        if (isLoggedIn) {
            console.log('dispatching getUserWorkspaces')
            dispatch(getUserWorkspaces({ userId: 'fwank', accessToken: accessToken }));
        }
    }, [isLoggedIn])

    //after auth stuff
    const dispatch = useAppDispatch();

    return (
        userLoginStatus ?
            <>
                <Navbar />
                <Outlet />
                <CreateWorkspaceModal />
            </>
            :
            <>
                <Navbar />
                <LoginPage />
            </>
    )
}

export default MainPage;