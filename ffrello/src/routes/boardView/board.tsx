import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import WorkspaceViewLeftSidebar from "../../components/sidebars/workspaceViewLeftSidebar";

const BoardPage = () => {

    let { boardid } = useParams();
    let { boardname } = useParams();

    return (
        <Grid container>
            <Grid item xl={1.5} sx={{ borderRight: '1px solid gray' }}>
                <WorkspaceViewLeftSidebar />
            </Grid>
            <Grid item xl={10.5} >
                Board page {boardid} name: {boardname}
            </Grid>
        </Grid >
    )
}

export default BoardPage;