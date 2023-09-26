import Navbar from "../components/nav/navbar";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { useEffect } from "react";
import GetWorkspaces from "../data/api/getWorkspaces";
import Workspace from "../types/Workspace";
import { setWorkspaces } from "../redux/userSlice";

const MainPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const getWorkspaces = async () => {
            return await GetWorkspaces().then((result) => {
                dispatch(setWorkspaces(result as Workspace[]))
            })
        }

        getWorkspaces();
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MainPage;