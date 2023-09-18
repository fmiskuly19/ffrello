import { Box, Container, Grid } from "@mui/material";
import HomePageLeftSidebar from "../components/sidebars/homePageLeftSidebar";
import { Outlet } from "react-router-dom";

const HomePages = () => {
    return (
        <Container>
            <Grid container spacing={6}>
                <Grid item lg={4} sx={{ border: '1px solid blue' }} justifyContent='center'>
                    <HomePageLeftSidebar expandedAccordions={[]} />
                </Grid>
                <Grid item sx={{ border: '1px solid green' }}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container >
    )
}

export default HomePages;