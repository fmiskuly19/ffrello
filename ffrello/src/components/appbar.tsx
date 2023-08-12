import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Box, AppBar as MuiAppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import NavDropdown from './dropdowns/navDropdown';
import WorkspaceDropdownContent from './nav/content/workspaceDropdownContent';
import RecentBoardsDropdownContent from './nav/content/recentBoardsDropdownContent';
import StarredDropdownContent from './nav/content/starredDropdownContent';
import TemplatesDropdownContent from './nav/content/templatesDropdownContent';

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
          <Box sx={{display: "flex", justifyContent:"space-between"}}>
            <Toolbar variant="dense">
                <Typography variant="body1" fontWeight="bold" fontFamily="Helvetica">FFrello</Typography>
                <NavDropdown label="Workspaces" menuContent={<WorkspaceDropdownContent />} />
                <NavDropdown label="Recent" menuContent={<RecentBoardsDropdownContent />} />
                <NavDropdown label="Starred" menuContent={<StarredDropdownContent />} />
                <NavDropdown label="Templates" menuContent={<TemplatesDropdownContent />} />
            </Toolbar>
            <Toolbar variant="dense">
                <div>
                    < SearchIcon />
                    <AccountCircleIcon />
                </div>
            </Toolbar>
          </Box>
        </>
      )}
    </MuiAppBar>
  );
};

export default AppBar;