import { Outlet } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import HomePageLeftSidebar from "../../components/sidebars/homePageLeftSidebar";

const HomePages = () => {

    return (
        <>
            <Container sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <Grid container spacing={6}>
                    <Grid item lg={4} justifyContent='center'>
                        <HomePageLeftSidebar />
                    </Grid>
                    <Grid item lg={8}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default HomePages;