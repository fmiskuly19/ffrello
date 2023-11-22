import { Avatar, Box, AppBar as MuiAppBar, Stack, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Search as SearchIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import NavDropdown from './navDropdown';
import WorkspaceDropdown from './workspaceDropdown';
import RecentBoardsDropdown from './recentBoardsDropdown';
import StarredDropdown from './starredDropdown';
import TemplatesDropdownContent from './templatesDropdown';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TonalityIcon from '@mui/icons-material/Tonality';
import ThemeDropdown from './themeDropdown';
import AppswitcherDropdown from './appswitcherDropdown';
import AppsIcon from '@mui/icons-material/Apps';
import { Link } from 'react-router-dom';
import InformationDropdown from './informationDropdown'
import CreateButtonDropdown from './createButtonDropdown';
import NotificationsDropdown from './notificationsDropdown';

const Navbar = () => {
  //   const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiAppBar position="sticky">
      {isMobile ? (
        <Toolbar variant="dense" >
          <SearchIcon />
          <AccountCircleIcon />
        </Toolbar>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Toolbar variant="dense" disableGutters>
              <Stack direction="row" alignItems="center" spacing={1} pl='5px'>
                <NavDropdown label="Appswitcher" menuContent={<AppswitcherDropdown />} icon={<AppsIcon style={{ fontSize: '20px', color: theme.palette.primary.light }} />} closeOnClick={true} />
                <Stack direction='row'>
                  {/* logo goes here */}
                  <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }}>
                    <Typography variant="h4" fontWeight="bold" fontFamily="Helvetica" sx={{ textDecoration: 'none' }} >FFrello</Typography>
                  </Link>
                </Stack>
                <NavDropdown label="Workspaces" menuContent={<WorkspaceDropdown />} closeOnClick={true} />
                <NavDropdown label="Recent" menuContent={<RecentBoardsDropdown />} closeOnClick={true} />
                <NavDropdown label="Starred" menuContent={<StarredDropdown />} closeOnClick={true} />
                <NavDropdown label="Templates" menuContent={<TemplatesDropdownContent />} closeOnClick={false} />
                <CreateButtonDropdown />
              </Stack>
            </Toolbar>
            <Toolbar variant="dense">
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextField id="outlined-basic" label="Search" size="small" color="primary" InputLabelProps={{ color: 'primary' }} />
                <NavDropdown label="Notifications" menuContent={<NotificationsDropdown />} icon={<NotificationsNoneIcon sx={{ transform: 'rotate(45deg)' }} />} closeOnClick={false} />
                <NavDropdown label="Information" menuContent={<InformationDropdown />} icon={<HelpOutlineIcon />} closeOnClick={true} />
                <NavDropdown label="Theme" menuContent={<ThemeDropdown />} icon={<TonalityIcon />} closeOnClick={false} />
                <NavDropdown label="Avatar" menuContent={<ThemeDropdown />} icon={<Avatar alt="Fwank Misk" sx={{ width: 24, height: 24 }} />} closeOnClick={true} />
              </Stack>
            </Toolbar>
          </Box>
        </>
      )}
    </MuiAppBar>
  );
};

export default Navbar;