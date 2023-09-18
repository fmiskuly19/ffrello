import { Container, Grid, Stack, Typography } from "@mui/material"
import Navbar from "../components/nav/navbar";
import HomePageLeftSidebar from "../components/sidebars/homePageLeftSidebar";
import HomePageHighlight from '../types/HomePageHighlight'
import * as data from '../data/hardcodes'
import { Outlet } from "react-router-dom";

const MainPage = () => {

    const highlights: HomePageHighlight[] = data.hardCodedHighlights;

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MainPage;