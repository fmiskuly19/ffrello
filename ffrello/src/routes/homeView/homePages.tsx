import { Container, Grid } from "@mui/material";
import HomePageLeftSidebar from "../../components/sidebars/homePageLeftSidebar";
import { Outlet } from "react-router-dom";
import CreateWorkspaceModal from "../../components/modals/createWorkspaceModal";

const HomePages = () => {
    return (
        <>
        <Container sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Grid container spacing={6}>
                <Grid item lg={4} justifyContent='center'>
                    <HomePageLeftSidebar expandedAccordions={[]} />
                </Grid>
                <Grid item lg={8}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container >
        <CreateWorkspaceModal />
        </>
    )
}

export default HomePages;