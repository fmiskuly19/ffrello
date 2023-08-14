import { Avatar, Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomePageHighlight from "../../types/HomePageHighlight";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import IssueCard from "./IssueCard";

interface HomepageHighlightCardProps extends HomePageHighlight {

}

const HomePageHighlightCard = (props: HomepageHighlightCardProps) => {

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
                                        <MoreHorizIcon />
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

export default HomePageHighlightCard;