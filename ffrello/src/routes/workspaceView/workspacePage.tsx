import { Outlet, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import WorkspaceViewLeftSidebar from "../../components/sidebars/workspaceViewLeftSidebar";

const WorkspaceView = () => {
    //this comes from the Route provider in main.tsx, this name has to match exactly
    let { workspaceid } = useParams();

    return (
        <Grid container>
            <Grid item xl={1.5} sx={{ borderRight: '1px solid gray' }}>
                <WorkspaceViewLeftSidebar />
            </Grid>
            <Grid item xl={10.5} >
                <Outlet />
            </Grid>
        </Grid >
    )
}

export default WorkspaceView;