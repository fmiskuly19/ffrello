// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import WorkspacesDropdown from './dropdowns/nav/workspacesdropdown';
// import RecentDropdown from './dropdowns/nav/recentdropdown';
// import StarredDropdown from './dropdowns/nav/starreddropdown';
// import TemplatesDropdown from './dropdowns/nav/templatesdropdown';
// import CreateDropdown from './dropdowns/nav/createdropdown';
// import { Icon } from '@mui/material';

// const Appbar = () => {

//     const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//     const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

//     const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     return (

import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { AppBar as MuiAppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import AppSwitcherDropdown from './dropdowns/nav/appswitcherdropdown';

// const useStyles = makeStyles((theme: any) => ({
//   toolbarDesktop: {
//     justifyContent: 'space-between',
//   },
//   toolbarMobile: {
//     justifyContent: 'flex-end',
//   },
// }));

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
          <Toolbar variant="dense">
            <AppSwitcherDropdown />
            <Typography variant="h6">FFrello</Typography>
            <div>
              <SearchIcon />
              <AccountCircleIcon />
            </div>
          </Toolbar>
        </>
      )}
    </MuiAppBar>
  );
};

export default AppBar;

            // <AppBar position="static" sx={{padding: 0}} > 
            //     <Container maxWidth="xl">
            //         <Toolbar disableGutters variant="dense">
            //             <Box >
            //                 <Icon>
            //                     <img src="ffrello.png" width="25" height="25"/>
            //                 </Icon>
            //             </Box>
            //             <Typography
            //                 variant="h6"
            //                 noWrap
            //                 component="a"
            //                 href="/"
            //                 sx={{
            //                     mr: 2,
            //                     display: { xs: 'none', md: 'flex' },
            //                     fontFamily: 'monospace',
            //                     fontWeight: 700,
            //                     color: 'inherit',
            //                     textDecoration: 'none',
            //                 }}
            //             >
            //                 FFrello
            //             </Typography>

            //             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            //                 <IconButton
            //                     size="large"
            //                     aria-label="account of current user"
            //                     aria-controls="menu-appbar"
            //                     aria-haspopup="true"
            //                     onClick={handleOpenNavMenu}
            //                     color="inherit"
            //                 >
            //                     <MenuIcon />
            //                 </IconButton>
            //                 <Menu
            //                     id="menu-appbar"
            //                     anchorEl={anchorElNav}
            //                     anchorOrigin={{
            //                         vertical: 'bottom',
            //                         horizontal: 'left',
            //                     }}
            //                     keepMounted
            //                     transformOrigin={{
            //                         vertical: 'top',
            //                         horizontal: 'left',
            //                     }}
            //                     open={Boolean(anchorElNav)}
            //                     onClose={handleCloseNavMenu}
            //                     sx={{
            //                         display: { xs: 'block', md: 'none' },
            //                     }}
            //                 >
            //                     <WorkspacesDropdown />
            //                     <RecentDropdown />
            //                     <StarredDropdown />
            //                     <TemplatesDropdown />
            //                     <CreateDropdown />
            //                 </Menu>
            //             </Box>
            //             <Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} >
            //                 <img src="/public/ffrello.png" />
            //             </Icon>
            //             <Typography
            //                 variant="h5"
            //                 noWrap
            //                 component="a"
            //                 href="/"
            //                 sx={{
            //                     mr: 2,
            //                     display: { xs: 'flex', md: 'none' },
            //                     flexGrow: 1,
            //                     fontFamily: 'monospace',
            //                     fontWeight: 700,
            //                     letterSpacing: '.3rem',
            //                     color: 'inherit',
            //                     textDecoration: 'none',
            //                 }}
            //             >
            //                 FFrello
            //             </Typography>
            //             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            
            //             </Box>

            //             <WorkspacesDropdown />
            //                 <RecentDropdown />
            //                 <StarredDropdown />
            //                 <TemplatesDropdown />
            //                 <CreateDropdown />

            //             <Box sx={{ flexGrow: 0 }}>
            //                 <Tooltip title="Open settings">
            //                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            //                         <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            //                     </IconButton>
            //                 </Tooltip>
            //                 <Menu
            //                     sx={{ mt: '45px' }}
            //                     id="menu-appbar"
            //                     anchorEl={anchorElUser}
            //                     anchorOrigin={{
            //                         vertical: 'top',
            //                         horizontal: 'right',
            //                     }}
            //                     keepMounted
            //                     transformOrigin={{
            //                         vertical: 'top',
            //                         horizontal: 'right',
            //                     }}
            //                     open={Boolean(anchorElUser)}
            //                     onClose={handleCloseUserMenu}
            //                 >
            //                     <Typography>Hello world</Typography>
            //                 </Menu>
            //             </Box>
            //         </Toolbar>
            //     </Container>
            // </AppBar>)
// }

// export default Appbar;