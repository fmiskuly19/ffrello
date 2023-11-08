import { Avatar, AvatarGroup, Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import FCard from "../../types/FCard";
import SubjectIcon from '@mui/icons-material/Subject';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

interface BoardListCard extends FCard { }

const randomChips = ['Technology', 'Travel', 'Food & Beverage', 'Sports', 'Fashion', 'Health & Fitness', 'Art & Design', 'Entertainment', 'Home & Garden', 'Science & Nature'];

const BoardListCard = (props: BoardListCard) => {

    const min = 1;
    const max = randomChips.length;

    const getRand = (min: number, max: number) => {
        return min + Math.random() * (max - min);
    }

    const getChips = () => {
        const numChips = getRand(1, 3);

        return randomChips.map((x, i) => {
            const randColor1 = getRand(1, 255);
            const randColor2 = getRand(1, 255);
            const randColor3 = getRand(1, 255);
            if (i > numChips) return (<Grid item><Chip label={x} size="small" color="primary" sx={{ backgroundColor: `rgb(${randColor1},${randColor2},${randColor3})` }} /></Grid>)
        })
    }

    return (
        <Paper sx={{ borderRadius: '5px', padding: '8px' }} key={props.title} elevation={2}>
            <Stack direction="column" spacing={1}>
                {/* <Grid container> */}
                {/* chips go here */}
                {/* {getChips()} */}
                {/* </Grid> */}
                <Box>
                    <Typography variant="body1">{props.title}</Typography>
                </Box>
                <Stack direction="row" justifyContent="space-between">

                    <Stack direction="row" spacing={1.5} alignItems="center">
                        {props.description ?
                            <SubjectIcon sx={{ fontSize: '16px' }} />
                            : <></>
                        }

                        {props.comments ?
                            <Stack direction="row" alignItems="center" ><ChatBubbleOutlineIcon sx={{ fontSize: '16px' }} />{props.comments.length}</Stack>
                            : <></>
                        }
                        {props.attachments ?
                            <Stack direction="row" alignItems="center"><AttachFileIcon sx={{ fontSize: '16px', transform: 'rotate(45deg)' }} />{props.attachments.length}</Stack>
                            : <></>
                        }

                        {props.checklistItems ?
                            <Stack direction="row" alignItems="center"><LibraryAddCheckIcon sx={{ fontSize: '16px' }} /></Stack>
                            : <></>
                        }
                    </Stack>

                    {props.users ?
                        <AvatarGroup max={8}>
                            {props.users.map((x) => {
                                return (<Avatar alt="Fwank" src="" sx={{ height: '22px', width: '22px' }} />)
                            })}
                        </AvatarGroup>
                        : <></>
                    }


                </Stack>
            </Stack>
        </Paper>
    )
}

export default BoardListCard;