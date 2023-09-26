import { useEffect, useState } from "react";

import { useAppDispatch } from "../../hooks";
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/homeSlice";

import { Grid, Skeleton, Stack, Typography } from "@mui/material"

import HomePageHighlight from '../../types/HomePageHighlight'
import HighlightCard, { SkeletonHighlightCard } from "../../components/cards/highlightCard";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomePageRightSidebar from "../../components/sidebars/homePageRightSidebar";


import * as data from '../../data/hardcodes'
import GetHomepageHighlights from "../../data/api/getHomepageHighlights";


const HighlightsPage = () => {

    const dispatch = useAppDispatch()

    const [homepageHighlights, setHomepageHighlights] = useState<any[] | undefined>(undefined)

    useEffect(() => {
        dispatch(setSelectedMenu('Home')) //set this so when we navigate here the left sidebar reflects that
        dispatch(setSelectedWorkspaceMenu(''))

        const getHomepageHighlights = async () => {
            return await GetHomepageHighlights().then(() => {
                setHomepageHighlights([])
            })
        }

        getHomepageHighlights();
    })

    return (
        <>
            <Grid container spacing={6}>
                <Grid item lg={7} sx={{ margin: '8px' }}>
                        {homepageHighlights != undefined ? 
                            <>
                                <Stack direction="row" spacing={1} mb={1} alignItems="center" pl={1}>
                                    <FavoriteBorderIcon style={{ fontSize: '12px' }} />
                                    <Typography sx={{ fontSize: '14px' }}>Highlights</Typography>
                                </Stack>
                                <Stack direction="column" spacing={4}>
                                    {homepageHighlights.map((x) => {
                                        return (<HighlightCard {...x} />)
                                    })}
                                </Stack>
                            </>
                            
                        : 
                        <>
                            <Stack direction="row" spacing={1} mb={1} alignItems="center" pl={1} justifyItems="center">
                                <Skeleton variant="circular" width="12px" height="12px" >
                                    <FavoriteBorderIcon style={{ fontSize: '12px' }} /> 
                                </Skeleton>
                                <Skeleton>
                                    <Typography sx={{ fontSize: '14px' }}>Highlights</Typography>
                                </Skeleton>
                            </Stack>
                            <Stack direction="column" spacing={4}>
                                <SkeletonHighlightCard />
                            </Stack>
                        </>
                        }
                </Grid>
                <Grid item md={0} lg={4} >
                    <HomePageRightSidebar />
                </Grid>
            </Grid>
        </>
    )
}

export default HighlightsPage;