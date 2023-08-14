import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/nav/navbar";
import HomePageLeftSidebar from "../components/sidebars/homePageLeftSidebar";
import HomePageHighlightCard from "../components/cards/homepageHighlightCard";

const TemplatesPage = () => {
    return (
        <>
            <Navbar />
            <Container sx={{ padding: '10px', pt: '30px' }}>
                <Grid container spacing={6}>
                    <Grid item md={3}>
                        <HomePageLeftSidebar />
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