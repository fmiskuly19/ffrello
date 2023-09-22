import Navbar from "../components/nav/navbar";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { useEffect } from "react";
import GetWorkspaces from "../data/api/getWorkspaces";
import { setWorkspaces } from "../redux/homeViewSlice";
import Workspace from "../types/Workspace";

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