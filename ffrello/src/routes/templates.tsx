import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/nav/navbar";
import SideNavbar from "../components/nav/sideNavbar";
import HomePageHighlightCard from "../components/homepageHighlightCard";

const TemplatesPage = () => {
    return (
        <>
            <Navbar />
            <Container sx={{ padding: '10px', pt: '30px' }}>
                <Grid container>
                    <Grid item md={3}>
                        <SideNavbar />
                    </Grid>
                    <Grid item>
                        Hello
                    </Grid>
                </Grid>
            </Container >
        </>

    )
}

export default TemplatesPage;