import { Avatar, Box, Button, IconButton, Paper, Skeleton, Stack, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Highlight from "../../types/HomePageHighlight";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import IssueCard from "./IssueCard";

interface HighlightCardProps extends Highlight {

}

const HighlightCard = (props: HighlightCardProps) => {

    const min = 1;
    const max = 255;

    const getRand = () => {
        return min + Math.random() * (max - min);
    }

    return (
        <Paper sx={{ borderRadius: '8px' }} square={false} key={props.id}>
            <Stack direction="column">
                <Box p={"12px"} sx={{ backgroundColor: `rgb(${getRand()}, ${getRand()}, ${getRand()})` }}>
                    <IssueCard {...props.issue} />
                </Box>
                <Box m={"12px"} mt={"16px"}>
                    <Stack direction="column" spacing={1} justifyContent="center">
                        <Box px={"12px"}>
                            <Stack direction="column" spacing={1}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Stack direction="row" spacing={1}>
                                        <Avatar alt={props.author?.name} src={props.author?.icon} sx={{ width: 28, height: 28 }} />
                                        <Stack direction="column" spacing={0}>
                                            <Typography fontSize={"14px"}>{props.author?.name}</Typography>
                                            <Typography fontSize={"12px"}>{props.timestamp}</Typography>
                                        </Stack>
                                    </Stack>
                                    <IconButton>
                                        <MoreHorizIcon color="primary" />
                                    </IconButton>
                                </Stack>
                                <Box>
                                    <Typography>{props.comment}</Typography>
                                </Box>
                            </Stack>
                        </Box>
                        <Box>
                            <IconButton>
                                <AddReactionIcon sx={{ width: '18px', height: '18px' }} />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex' }} justifyContent="center">
                            <Button variant="outlined" startIcon={<SendRoundedIcon />} sx={{ width: '95%', textTransform: 'none' }}>
                                Reply
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    )
}

export const SkeletonHighlightCard = () => {
    return (
        <Paper sx={{ borderRadius: '8px' }} square={false}>
            <Stack direction="column">
                <Box p={"12px"} >
                    {/* <IssueCard {...props.issue} /> replace this with skeleton */}
                    <Skeleton variant="rounded" height="60px" />
                </Box>
                <Box m={"12px"} mt={"8px"}>
                    <Stack direction="column" spacing={1} justifyContent="center">
                        <Box px={"12px"}>
                            <Stack direction="column" spacing={1}>
                                <Stack direction="row" justifyContent="space-between">
                                    {/* set full width here so that we can expand the skeleton  */}
                                    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                                        <Skeleton variant="circular" width="34px" height="34px" sx={{ minHeight: '34px', minWidth: '34px' }} />
                                        {/* set full width here so that we can expand the skeleton  */}
                                        <Stack direction="column" spacing={0} sx={{ width: '100%' }}>
                                            <Skeleton width="40%" animation="wave">
                                                <Typography fontSize={"14px"}>Hello</Typography>
                                            </Skeleton>
                                            <Skeleton width="15%" animation="wave">
                                                <Typography fontSize={"12px"}>World</Typography>
                                            </Skeleton>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box>
                            <Skeleton />
                            <Skeleton />
                        </Box>
                        <Box sx={{ display: 'flex' }} justifyContent="center">
                            <Skeleton variant="rounded" width="100%">
                                <Button size="small">
                                    Reply
                                </Button>
                            </Skeleton>
                        </Box>
                    </Stack>
                </Box>
            </Stack>

        </Paper>
    )
}

export default HighlightCard;