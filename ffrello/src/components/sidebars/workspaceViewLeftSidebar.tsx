import { Box, Button, Divider, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import LetterBox from "../letterBox";
import { Link, useParams } from "react-router-dom";
import LogoDevIcon from '@mui/icons-material/LogoDev';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import WindowIcon from '@mui/icons-material/Window';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import * as data from '../../data/hardcodes'
import React from "react";

interface WorkspaceLeftSidebarProps {
    workspaceName: string,
    workspaceId?: string,
}


const WorkspaceViewLeftSidebar = (props: WorkspaceLeftSidebarProps) => {

    //TODO
    //there is a height for each MenuItem 44px that is to make them the same size, as the buttons on some cause the height to increase.
    //need to figure out how to make the button small enough so it doesnt resize the menuitem, or find a compact menuitem setting

    const [workspaceSettingsAnchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const workspaceSettingsOpen = Boolean(workspaceSettingsAnchorEl);

    const handleWorkspaceSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleWorkspaceSettingsClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ marginTop: '15px' }}>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems='center' sx={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '5px' }}>
                    <Stack direction='row' justifyContent='center' spacing={1} alignItems={'center'}>
                        <LetterBox backgroundColor={'lightpink'} size={32} letter={'E'} />
                        <Stack direction='column'>
                            <Typography variant="h6" sx={{ wordBreak: "break-word" }}>{props.workspaceName}</Typography>
                            <Typography variant="body2">Free?</Typography>
                        </Stack>
                    </Stack>
                    <IconButton color="primary" size='small' sx={{ borderRadius: '5px' }}>
                        <KeyboardArrowLeftIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                </Stack>
                <Divider sx={{ marginTop: '10px' }} />
                <Stack direction='column'>
                    {/* this goes on the menu item below */}
                    {/* onClick={(e: React.MouseEvent) => { dispatch(setSelectedMenu(x.name)) }}
                    selected={selectedMenu === x.name} */}
                    <MenuItem
                        component={Link}
                        to={`/w/${props.workspaceId}/`}
                        sx={{ paddingLeft: '3px', marginBottom: '2px', height: '44px' }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center" ml='10px'>
                            <LogoDevIcon sx={{ fontSize: '16px' }} />
                            <Typography variant="body1">Boards</Typography>
                        </Stack>
                    </MenuItem>

                    <MenuItem
                        component={Link}
                        to={`/w/${props.workspaceId}/members`}
                        sx={{ paddingLeft: '3px', marginBottom: '2px' }}
                    >
                        <Stack direction='row' ml='10px' justifyContent='space-between' width='100%' >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <PeopleIcon sx={{ fontSize: '16px' }} />
                                <Typography variant="body1">Members</Typography>
                            </Stack>
                            <IconButton color="primary" size='small' sx={{ borderRadius: '5px' }}>
                                <AddIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Stack>
                    </MenuItem>
                    <MenuItem
                        component={Button} //set as button to get onClick handler
                        sx={{ paddingLeft: '3px', marginBottom: '2px', textTransform: 'none' }} //textTransform to none to get rid of button styling
                        onClick={handleWorkspaceSettingsClick}
                    >
                        <Stack direction='row' ml='10px' width='100%' justifyContent='space-between'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <SettingsIcon sx={{ fontSize: '16px' }} />
                                <Typography variant="body1">Workspace Settings</Typography>
                            </Stack>
                        </Stack>
                        <IconButton color="primary" size='small' disabled sx={{ borderRadius: '5px' }}>
                            <KeyboardArrowDownIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </MenuItem>

                    {/* workspace settings dropdown menu */}
                    <Menu
                        id={'workspace-dropdown-menu'}
                        anchorEl={workspaceSettingsAnchorEl}
                        open={workspaceSettingsOpen}
                        onClose={handleWorkspaceSettingsClose}
                        MenuListProps={{
                            'aria-labelledby': 'workspace-dropdown-button',
                            'disablePadding': true,
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box mt="8px" mb="8px" minWidth='250px'>
                            <MenuItem component={Link} to='account' onClick={handleWorkspaceSettingsClose}>
                                Workspace settings
                            </MenuItem>
                            <MenuItem>
                                Upgrade workspace
                            </MenuItem>
                        </Box>
                    </Menu>
                </Stack >

                <Stack direction='column'>
                    <Typography variant='body1' fontWeight='600' pl='10px' pb='5px'>
                        Workspace Views
                    </Typography>
                    <MenuItem
                        component={Link}
                        to={`/w/${props.workspaceId}/views/table`}
                        sx={{ paddingLeft: '3px', marginBottom: '2px' }}
                    >
                        <Stack direction='row' ml='10px' justifyContent='space-between'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <WindowIcon sx={{ fontSize: '16px' }} />
                                <Typography variant="body1">Table</Typography>
                            </Stack>
                        </Stack>
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        to={`/w/${props.workspaceId}/views/calendar`}
                        sx={{ paddingLeft: '3px', marginBottom: '2px' }}
                    >
                        <Stack direction='row' ml='10px' justifyContent='space-between'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <CalendarMonthIcon sx={{ fontSize: '16px' }} />
                                <Typography variant="body1">Calendar</Typography>
                            </Stack>
                        </Stack>
                    </MenuItem>
                </Stack>
                <Stack direction='column'>
                    <Typography variant='body1' fontWeight='600' pl='10px' pb='5px'>
                        Your Boards
                    </Typography>

                    {data.getBoards(4).map((board) => {
                        return (
                            <MenuItem
                                component={Link}
                                to={`/b/${board.id}/${board.name}`}
                                sx={{ paddingLeft: '3px', marginBottom: '2px' }}
                            >
                                <Stack direction='row' ml='10px' justifyContent='space-between'>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <WindowIcon sx={{ fontSize: '16px' }} />
                                        <Typography variant="body1">{board.name}</Typography>
                                    </Stack>
                                </Stack>
                            </MenuItem>
                        )
                    })}
                </Stack>
            </Stack >
        </Box >
    )
}

export default WorkspaceViewLeftSidebar;