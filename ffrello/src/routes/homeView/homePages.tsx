import { Box, CircularProgress, Container, Grid } from "@mui/material";
import HomePageLeftSidebar from "../../components/sidebars/homePageLeftSidebar";
import { Outlet } from "react-router-dom";
import CreateWorkspaceModal from "../../components/modals/createWorkspaceModal";
import { useEffect } from "react";
import Workspace from "../../types/Workspace";
import GetWorkspaces from "../../data/api/getWorkspaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setWorkspaces } from "../../ducks/homeViewSlice";

const HomePages = () => {

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
            <Container sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <Grid container spacing={6}>
                    <Grid item lg={4} justifyContent='center'>
                        <HomePageLeftSidebar expandedAccordions={[]} />
                    </Grid>
                    <Grid item lg={8}>
                        <Outlet />
                    </Grid>
                </Grid>
                <CreateWorkspaceModal />
            </Container>

        </>
    )
}

export default HomePages;