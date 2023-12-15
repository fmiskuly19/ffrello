import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/homeSlice";

import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material"

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomePageRightSidebar from "../../components/sidebars/homePageRightSidebar";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { getUserWorkspaces } from "../../redux/userSlice";

import * as data from '../../data/hardcodes'
import HighlightCard, { SkeletonHighlightCard } from "../../components/material-ui-cards/highlightCard";


const HighlightsPage = () => {

    const dispatch = useAppDispatch()

    const [homepageHighlights, setHomepageHighlights] = useState<any[] | undefined>(data.hardCodedHighlights)

    useEffect(() => {
        dispatch(setSelectedMenu('Home')) //set this so when we navigate here the left sidebar reflects that
        dispatch(setSelectedWorkspaceMenu(''))

        if (workspaceStatus == ApiCallStatus.Failure) {
            dispatch(getUserWorkspaces('fwank'))
        }
    }, [])

    let highlightsContent;
    const workspaceStatus = useAppSelector((state) => state.userSlice.workspaceStatus);
    if (workspaceStatus == ApiCallStatus.Loading) {
        highlightsContent = <>
            <Stack direction="row" spacing={1} mb={1} alignItems="center" pl={1}>
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
    else if (workspaceStatus == ApiCallStatus.Failure) {
        highlightsContent = <Box justifyContent="center" display="flex">
            <ReportProblemIcon />
        </Box>
    }
    else if (workspaceStatus == ApiCallStatus.Success) {
        highlightsContent = <>
            <Stack direction="row" spacing={1} mb={1} alignItems="center" pl={1}>
                <FavoriteBorderIcon style={{ fontSize: '12px' }} />
                <Typography sx={{ fontSize: '14px' }}>Highlights</Typography>
            </Stack>
            <Stack direction="column" spacing={4}>
                {homepageHighlights?.map((x) => {
                    return (<HighlightCard {...x} />)
                })}
            </Stack>
        </>
    }

    return (
        <>
            <Grid container spacing={6}>
                <Grid item lg={7} sx={{ margin: '8px' }}>
                    {highlightsContent}
                </Grid>
                <Grid item md={0} lg={4} >
                    <HomePageRightSidebar />
                </Grid>
            </Grid>
        </>
    )
}

export default HighlightsPage;