import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/homeSlice"
import { useParams } from "react-router-dom";
import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HistoryIcon from '@mui/icons-material/History';
import PeopleIcon from '@mui/icons-material/People';
import BoardCard, { BoardCardHeight } from "../../components/material-ui-cards/boardInfoCard";

const WorkspaceHomePage = () => {

    let { workspaceid } = useParams();

    const workspace = useAppSelector((state) => state.userSlice.Workspaces?.find(x => x.id == Number(workspaceid)))
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setSelectedMenu(''))
        dispatch(setSelectedWorkspaceMenu(`Boards-${workspaceid}`))
    })

    return (
        <Stack direction="column" spacing={4}>
            <Stack direction="column" spacing={4}>
                {workspace?.boards ?
                    workspace.boards.some(x => x.isStarred) ?
                        <Stack direction="column">
                            <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                                <StarBorderIcon style={{ fontSize: '26px' }} />
                                <Typography variant="h6" fontWeight="700">Starred Boards</Typography>
                            </Stack>
                            <Grid container rowSpacing={2} columnGap={2}>
                                {workspace.boards.map((board) => {
                                    if (board.isStarred) {
                                        return (<Grid item xl={3}><BoardCard {...board} /></Grid>)
                                    }
                                })}
                            </Grid>
                        </Stack>
                        :
                        <></>
                    :
                    <Stack direction="column">
                        <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                            <StarBorderIcon style={{ fontSize: '26px' }} />
                            <Typography variant="h6" fontWeight="700">Starred Boards</Typography>
                        </Stack>
                        <Grid container rowSpacing={2} columnGap={2}>
                            <Grid item xl={3}><Skeleton variant="rounded" height={BoardCardHeight} /></Grid>
                        </Grid>
                    </Stack>
                }
                <Stack direction="column" >
                    <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                        <HistoryIcon style={{ fontSize: '26px' }} />
                        <Typography variant="h6" fontWeight="700">Recent Boards</Typography>
                    </Stack>
                    <Grid container rowSpacing={2} columnGap={2}>
                        {workspace ?
                            <Grid item xl={3}>
                                <BoardCard id={0} name={"Dummy Board"} isStarred={false} Workspace={{ id: 0, name: 'Dummy Board Name', boards: [] }} WorkspaceId={0} boardLists={[]} />
                            </Grid>
                            :
                            <Grid item xl={3}><Skeleton variant="rounded" height={BoardCardHeight} /></Grid>
                        }
                    </Grid>
                </Stack>
                <Stack direction="column" >
                    <Stack direction="row" spacing={1} mb={1} alignItems={"center"}>
                        <PeopleIcon style={{ fontSize: '26px' }} />
                        <Typography variant="h6" fontWeight="700">All boards in this Workspace</Typography>
                    </Stack>
                    <Grid container rowSpacing={2} columnGap={2}>
                        {workspace?.boards ?
                            workspace.boards.map((x) => {
                                return (<Grid item xl={3}><BoardCard {...x} /></Grid>)
                            })
                            :
                            <Grid item xl={3}><Skeleton variant="rounded" height={BoardCardHeight} /></Grid>
                        }
                    </Grid>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default WorkspaceHomePage;