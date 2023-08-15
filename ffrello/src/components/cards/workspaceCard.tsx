import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Workspace from "../../types/Workspace";
import BoardCard from "./boardCard";
import LogoDevIcon from '@mui/icons-material/LogoDev';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import WindowIcon from '@mui/icons-material/Window';
import { Link } from "react-router-dom";

interface WorkspaceCardProps extends Workspace {

}

const WorkspaceCard = (props: WorkspaceCardProps) => {
    return (
        <Stack direction="column" spacing={.25}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ display: 'flex', height: '32px', width: '32px', background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(223,255,42,1) 0%, rgba(64,135,0,1) 100%)', borderRadius: '5px' }} alignItems="center" justifyContent="center">
                            <Typography variant="h6" sx={{ color: 'black' }} fontWeight="800">{props.name.substring(0, 1)}</Typography>
                        </Box>
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
                        <Button size="small" variant="contained" color="secondary" startIcon={<SettingsIcon />} component={Link} to={`/w/${props.id}/settings`} sx={{ textTransform: 'none' }}>
                            Settings
                        </Button>
                    </Stack>
                </Box>
            </Stack>
            <Grid container rowSpacing={2} columnGap={2}>
                {props.boards?.map((x) => {
                    return (<Grid item xl={3}><BoardCard {...x} /></Grid>)
                })}
            </Grid>
        </Stack>
    )
}

export default WorkspaceCard;