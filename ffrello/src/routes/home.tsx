import { Box, Button, Container, Grid, Icon, IconButton, Menu, MenuItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import Navbar from "../components/nav/navbar";
import SideNavbar from "../components/nav/sideNavbar";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomePageHighlight from '../types/HomePageHighlight'
import HomePageHighlightCard from "../components/homepageHighlightCard";
import theme from "../themes/theme";
import { useEffect } from "react";
import BoardMenuItem from "../components/boardMenuItem";
import Board from "../types/Board";
import * as data from '../data/hardcodes'
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {

    const boards: Board[] = data.hardCodedBoards

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
                <Grid container spacing={1}>
                    <Grid item md={3} xl={3}>
                        <SideNavbar sticky={true} />
                    </Grid>
                    <Grid item md={4} xl={4} sx={{ margin: '8px' }}>
                        <Stack direction="column" spacing={4}>
                            {highlights.map((x) => {
                                return (<HomePageHighlightCard author={x.author} comment={x.comment} timestamp={x.timestamp} />)
                            })}
                        </Stack>
                    </Grid>
                    <Grid item md={3} xl={3}>
                        <Box sx={{ margin: '8px' }}>
                            <Stack direction="column" spacing={1}>
                                <Stack direction="row" justifyContent="flex-start" spacing={.5} alignItems={"center"}>
                                    <StarIcon htmlColor="#F8C021" sx={{ fontSize: '16px' }} />
                                    <Typography fontSize="12px">Starred</Typography>
                                </Stack>
                                <Stack direction="column" spacing={2}>
                                    {boards.map((x: Board) => {
                                        if (x.isStarred) return (<BoardMenuItem {...x} />)
                                    })}
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" spacing={.5} alignItems={"center"}>
                                    <Typography fontSize="12px">Links</Typography>
                                    <IconButton>
                                        <AddIcon sx={{ fontSize: '20px' }} />
                                    </IconButton>
                                </Stack>
                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <IconButton sx={{ borderRadius: '5px' }}>
                                            <AddIcon sx={{ fontSize: '20px' }} />
                                        </IconButton>
                                        <Typography variant="body2">Create a Board</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container >
        </>

    )
}

export default HomePage;