import { Avatar, Box, AppBar as MuiAppBar, Stack, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Search as SearchIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import NavDropdown from './navDropdown';
import WorkspaceDropdownContent from './content/workspaceDropdownContent';
import RecentBoardsDropdownContent from './content/recentBoardsDropdownContent';
import StarredDropdownContent from './content/starredDropdownContent';
import TemplatesDropdownContent from './content/templatesDropdownContent';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TonalityIcon from '@mui/icons-material/Tonality';
import ThemeDropdownContent from './content/themeDropdownContent';
import AppswitcherDropdownContent from './content/appswitcherDropdownContent';
import AppsIcon from '@mui/icons-material/Apps';
import { Link } from 'react-router-dom';
import InformationDropdownContent from '../../components/nav/content/informationDropdownContent'
import CreateButtonDropdown from './createButtonDropdown';

const Navbar = () => {
  //   const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiAppBar position="sticky" >
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
                <NavDropdown label="Appswitcher" menuContent={<AppswitcherDropdownContent />} icon={<AppsIcon style={{ fontSize: '20px' }} />} />
                <Stack direction='row'>
                  {/* logo goes here */}
                  <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.main }}><Typography variant="h4" fontWeight="bold" fontFamily="Helvetica" sx={{ textDecoration: 'none' }}>FFrello</Typography></Link>
                </Stack>
                <NavDropdown label="Workspaces" menuContent={<WorkspaceDropdownContent />} />
                <NavDropdown label="Recent" menuContent={<RecentBoardsDropdownContent />} />
                <NavDropdown label="Starred" menuContent={<StarredDropdownContent />} />
                <NavDropdown label="Templates" menuContent={<TemplatesDropdownContent />} />
                <CreateButtonDropdown />
              </Stack>
            </Toolbar>
            <Toolbar variant="dense">
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextField id="outlined-basic" label="Search" size="small" color="primary" InputLabelProps={{ color: 'primary' }} />
                <NavDropdown label="Notifications" menuContent={<ThemeDropdownContent />} icon={<NotificationsNoneIcon sx={{ transform: 'rotate(45deg)' }} />} />
                <NavDropdown label="Information" menuContent={<InformationDropdownContent />} icon={<HelpOutlineIcon />} />
                <NavDropdown label="Theme" menuContent={<ThemeDropdownContent />} icon={<TonalityIcon />} />
                <NavDropdown label="Avatar" menuContent={<ThemeDropdownContent />} icon={<Avatar alt="Fwank Misk" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />} />
              </Stack>
            </Toolbar>
          </Box>
        </>
      )}
    </MuiAppBar>
  );
};

export default Navbar;