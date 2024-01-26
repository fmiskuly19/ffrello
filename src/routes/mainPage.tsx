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

    const [userLoginStatus, setUserLoginStatus] = useState(isLoggedIn)

    useEffect(() => {
        console.log(`login status changed to ${isLoggedIn}`)
        setUserLoginStatus(isLoggedIn);
        console.log(`acccess token changed ${accessToken}`)

        //get workspaces with new creddentials
        dispatch(getUserWorkspaces({ userId: 'fwank', accessToken: accessToken }));
    }, [isLoggedIn, accessToken])

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