import { Avatar, AvatarGroup, Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import Issue from "../types/Issue";
import SubjectIcon from '@mui/icons-material/Subject';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

interface IssueCardProps extends Issue {

}

const randomChips = ['Technology', 'Travel', 'Food & Beverage', 'Sports', 'Fashion', 'Health & Fitness', 'Art & Design', 'Entertainment', 'Home & Garden', 'Science & Nature'];

const IssueCard = (props: IssueCardProps) => {

    const min = 1;
    const max = randomChips.length;

    const getRand = (min: number, max: number) => {
        return min + Math.random() * (max - min);
    }

    const getChips = () => {
        const numChips = getRand(1, 10);

        return randomChips.map((x, i) => {
            const randColor1 = getRand(1, 255);
            const randColor2 = getRand(1, 255);
            const randColor3 = getRand(1, 255);
            if (i > numChips) return (<Grid item><Chip label={x} size="small" sx={{ color: 'black', backgroundColor: `rgb(${randColor1},${randColor2},${randColor3})` }} /></Grid>)
        })
    }

    return (
        <Paper sx={{ borderRadius: '5px', padding: '8px' }}>
            <Stack direction="column" spacing={1}>
                <Grid container>
                    {getChips()}
                </Grid>
                <Box>
                    <Typography>{props.name}</Typography>
                </Box>
                <Stack direction="row" justifyContent="space-between">

                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <SubjectIcon sx={{ fontSize: '16px' }} />
                        <Stack direction="row" alignItems="center" ><ChatBubbleOutlineIcon sx={{ fontSize: '16px' }} />{props.comments.length}</Stack>
                        <Stack direction="row" alignItems="center"><AttachFileIcon sx={{ fontSize: '16px', transform: 'rotate(45deg)' }} />{props.attachments.length}</Stack>
                        <Stack direction="row" alignItems="center"><LibraryAddCheckIcon sx={{ fontSize: '16px' }} /></Stack>
                    </Stack>

                    <AvatarGroup max={8}>
                        {props.users.map((x) => {
                            return (<Avatar alt="Fwank" src="" sx={{ height: '22px', width: '22px' }} />)
                        })}
                    </AvatarGroup>

                </Stack>
            </Stack>
        </Paper>
    )
}

export default IssueCard;