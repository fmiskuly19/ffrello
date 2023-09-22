import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import Workspace from "../../types/Workspace";
import BoardCard, { BoardCardHeight } from "./boardCard";
import LogoDevIcon from '@mui/icons-material/LogoDev';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import WindowIcon from '@mui/icons-material/Window';
import { Link } from "react-router-dom";
import LetterBox from "../letterBox";
import NewBoardCard from "./newBoardCard";

interface WorkspaceCardProps extends Workspace {

}

const BOXHEIGHT = 32;

const WorkspaceCard = (props: WorkspaceCardProps) => {

    return (
        <Stack direction="column" spacing={.25}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <LetterBox backgroundColor={'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(223,255,42,1) 0%, rgba(64,135,0,1) 100%)'} size={BOXHEIGHT} letter={props.name.substring(0, 1)} />
                        <Typography variant="h6" fontWeight="600">{props.name} Workspace</Typography>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction="row" spacing={1}>
                        <Button size="small" variant="contained" color="secondary" startIcon={<LogoDevIcon />} component={Link} to={`/w/${props.id}`} sx={{ textTransform: 'none' }}>
                            Boards
                        </Button>
                        <Button size="small" variant="contained" color="secondary" startIcon={<WindowIcon />} component={Link} to={`/w/${props.id}/views/table`} sx={{ textTransform: 'none' }}>
                            Views
                        </Button>
                        <Button size="small" variant="contained" color="secondary" startIcon={<PeopleIcon />} component={Link} to={`/w/${props.id}/members`} sx={{ textTransform: 'none' }}>
                            Members
                        </Button>
                        <Button size="small" variant="contained" color="secondary" startIcon={<SettingsIcon />} component={Link} to={`/w/${props.id}/account`} sx={{ textTransform: 'none' }}>
                            Settings
                        </Button>
                    </Stack>
                </Box>
            </Stack>
            <Grid container rowSpacing={2} columnGap={2}>
                {props.boards.length > 0 ?
                    props.boards?.map((x) => {
                        return (<Grid item xl={3}><BoardCard {...x} /></Grid>)
                    })
                    :
                    <Grid item xl={3}><NewBoardCard /></Grid>
                }

            </Grid>
        </Stack>
    )
}

export const SkeletonWorkspaceCard = () => {
    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1} justifyContent={'center'}>
                    <Skeleton variant="rounded" height={`${BOXHEIGHT}px`} width={`${BOXHEIGHT}px`} sx={{ borderRadius: '8px' }} animation="wave" />
                    {/* this is the workspace title  */}
                    <Skeleton width="150px" animation="wave" />
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Skeleton variant="rounded" width="83px" height="30px" />
                    <Skeleton variant="rounded" width="83px" height="30px" />
                    <Skeleton variant="rounded" width="83px" height="30px" />
                    <Skeleton variant="rounded" width="83px" height="30px" />
                </Stack>
            </Stack>
            <Grid container rowSpacing={2} columnGap={2} >
                <Grid xl={3}><Skeleton variant="rounded" height="96px" width="100%" /></Grid>
            </Grid >
        </Stack >
    )
}

export default WorkspaceCard;