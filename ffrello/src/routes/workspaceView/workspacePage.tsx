import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import WorkspaceViewLeftSidebar from "../../components/sidebars/workspaceViewLeftSidebar";

const WorkspaceView = () => {

    return (
        <Grid container>
            <Grid item xl={1.5}>
                <WorkspaceViewLeftSidebar />
            </Grid>
            <Grid item xl={10.5} >
                <Outlet />
            </Grid>
        </Grid >
    )
}

export default WorkspaceView;