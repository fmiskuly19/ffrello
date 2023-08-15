import { Outlet, useParams } from "react-router-dom";
import Navbar from "../../components/nav/navbar";
import { Box, Container } from "@mui/material";
import WorkspaceLeftSidebar from "../../components/sidebars/workspaceLeftSidebar";

const WorkspacePage = () => {
    let { workspaceid } = useParams();

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Navbar />
            <WorkspaceLeftSidebar outletContent={<Container sx={{ border: '1px solid green' }}><Outlet /></Container>} />
        </Box>
    )
}

export default WorkspacePage;