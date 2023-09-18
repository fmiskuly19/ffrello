import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import * as data from '../data/hardcodes'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BoardCard from "../components/cards/boardCard";
import HistoryIcon from '@mui/icons-material/History';
import WorkspaceCard from "../components/cards/workspaceCard";

const BoardsPage = () => {
    return (
        <>
            <Stack direction="column" spacing={8}>
                <Stack direction="column" spacing={4}>
                    <Stack direction="column">
                        <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                            <StarBorderIcon style={{ fontSize: '26px' }} />
                            <Typography variant="h6" fontWeight="700">Starred Boards</Typography>
                        </Stack>
                        <Grid container rowSpacing={2} columnGap={2}>
                            {data.hardCodedBoards.map((x) => {
                                if (x.isStarred) return (<Grid item xl={3}><BoardCard {...x} /></Grid>)
                            })}
                        </Grid>
                    </Stack>
                    <Stack direction="column" >
                        <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                            <HistoryIcon style={{ fontSize: '26px' }} />
                            <Typography variant="h6" fontWeight="700">Recent Boards</Typography>
                        </Stack>
                        <Grid container>
                            <Grid item xl={3}>
                                <BoardCard id={0} name={"Dummy Board"} isStarred={false} Workspace={{ id: 0, name: 'Dummy Board Name' }} />
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
                <Box>
                    <Typography variant="h6" fontWeight="700" mb={2} sx={{ textTransform: 'uppercase' }}>Your Workspaces</Typography>
                    <Stack direction="column" spacing={4}>
                        {data.workspaces.map((x) => {
                            return (<WorkspaceCard {...x} />)
                        })}
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}

export default BoardsPage;