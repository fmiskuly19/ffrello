import Navbar from "../components/nav/navbar";
import { Outlet } from "react-router-dom";

const MainPage = () => {

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MainPage;