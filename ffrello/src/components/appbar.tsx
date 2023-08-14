import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Avatar, Box, AppBar as MuiAppBar, Stack, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import NavDropdown from './dropdowns/navDropdown';
import WorkspaceDropdownContent from './nav/content/workspaceDropdownContent';
import RecentBoardsDropdownContent from './nav/content/recentBoardsDropdownContent';
import StarredDropdownContent from './nav/content/starredDropdownContent';
import TemplatesDropdownContent from './nav/content/templatesDropdownContent';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TonalityIcon from '@mui/icons-material/Tonality';

const AppBar = () => {
  //   const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiAppBar position="static">
      {isMobile ? (
        <Toolbar variant="dense" >
          <SearchIcon />
          <AccountCircleIcon />
        </Toolbar>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Toolbar variant="dense">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1" fontWeight="bold" fontFamily="Helvetica">FFrello</Typography>
                <NavDropdown label="Workspaces" menuContent={<WorkspaceDropdownContent />} />
                <NavDropdown label="Recent" menuContent={<RecentBoardsDropdownContent />} />
                <NavDropdown label="Starred" menuContent={<StarredDropdownContent />} />
                <NavDropdown label="Templates" menuContent={<TemplatesDropdownContent />} />
              </Stack>
            </Toolbar>
            <Toolbar variant="dense">
              <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
                <TextField id="outlined-basic" label="Search" variant="outlined" size="small" sx={{ color: 'white' }} />
                <NotificationsNoneIcon sx={{ transform: 'rotate(45deg)' }} />
                <HelpOutlineIcon />
                <TonalityIcon />
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
              </Stack>
            </Toolbar>
          </Box>
        </>
      )}
    </MuiAppBar>
  );
};

export default AppBar;