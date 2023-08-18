import { Container, Grid, Stack, Typography } from "@mui/material"
import Navbar from "../components/nav/navbar";
import HomePageLeftSidebar from "../components/sidebars/homePageLeftSidebar";
import HomePageHighlight from '../types/HomePageHighlight'
import HomePageHighlightCard from "../components/cards/homepageHighlightCard";
import * as data from '../data/hardcodes'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomePageRightSidebar from "../components/sidebars/homePageRightSidebar";

const HomePage = () => {

    const highlights: HomePageHighlight[] = data.hardCodedHighlights;

    return (
        <>
            <Navbar />
            <Container sx={{ padding: '10px', pt: '30px' }}>
                <Grid container spacing={6}>
                    <Grid item md={3} xl={3}>
                        <HomePageLeftSidebar expandedAccordions={[]} />
                    </Grid>
                    <Grid item md={5} xl={5} sx={{ margin: '8px' }}>
                        <Stack direction="row" spacing={1} mb={1} alignItems="center" pl={1}>
                            <FavoriteBorderIcon style={{ fontSize: '12px' }} />
                            <Typography sx={{ fontSize: '14px' }}>Highlights</Typography>
                        </Stack>
                        <Stack direction="column" spacing={4}>
                            {highlights.map((x) => {
                                return (<HomePageHighlightCard {...x} />)
                            })}
                        </Stack>
                    </Grid>
                    <Grid item md={3} xl={3}>
                        <HomePageRightSidebar />
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}

export default HomePage;