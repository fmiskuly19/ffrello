import { Box, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const AppswitcherDropdown = () => {
    return (
        <Box sx={{ minWidth: '250px', mt: '8px', mb: '8px' }}>
            <MenuItem>
                <ListItemIcon>
                    <GitHubIcon />
                </ListItemIcon>
                <ListItemText>Github</ListItemText>
                <OpenInNewIcon sx={{ width: '20px', height: '20px' }} />
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <LinkedInIcon />
                </ListItemIcon>
                <ListItemText>LinkedIn</ListItemText>
                <OpenInNewIcon sx={{ width: '20px', height: '20px' }} />
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <DownhillSkiingIcon />
                </ListItemIcon>
                <ListItemText>Personal Site</ListItemText>
                <OpenInNewIcon sx={{ width: '20px', height: '20px' }} />
            </MenuItem>
        </Box>
    )
}

export default AppswitcherDropdown;