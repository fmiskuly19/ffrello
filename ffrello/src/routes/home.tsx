import { Container, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import Navbar from "../components/nav/navbar";
import HomePageLeftSidebar from "../components/sidebars/homePageLeftSidebar";
import HomePageHighlight from '../types/HomePageHighlight'
import HomePageHighlightCard from "../components/cards/homepageHighlightCard";
import { useEffect } from "react";
import * as data from '../data/hardcodes'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomePageRightSidebar from "../components/sidebars/homePageRightSidebar";

const HomePage = () => {

    const theme = useTheme();
    const mq_xs = useMediaQuery(theme.breakpoints.only('xs'));
    const mq_sm = useMediaQuery(theme.breakpoints.only('sm'));
    const mq_md = useMediaQuery(theme.breakpoints.only('md'));
    const mq_lg = useMediaQuery(theme.breakpoints.only('lg'));
    const mq_xl = useMediaQuery(theme.breakpoints.only('xl'));

    const getBreakPointName = () => {

        if (mq_xs) {
            return "xs"
        }
        if (mq_sm) {
            return "sm"
        }
        if (mq_md) {
            return "md"
        }
        if (mq_lg) {
            return "lg"
        }
        if (mq_xl) {
            return "xl"
        }
    }

    useEffect(() => {
        console.log(getBreakPointName())
    })

    const highlights: HomePageHighlight[] = data.hardCodedHighlights;

    return (
        <>
            <Navbar />
            <Container sx={{ padding: '10px', pt: '30px' }}>
                <Grid container spacing={6}>
                    <Grid item md={3} xl={3}>
                        <HomePageLeftSidebar sticky={true} />
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