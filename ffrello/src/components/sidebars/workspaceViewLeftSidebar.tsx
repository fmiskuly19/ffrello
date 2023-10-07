import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, CircularProgress, Divider, IconButton, Menu, MenuItem, Skeleton, Stack, Typography } from "@mui/material";

import LogoDevIcon from '@mui/icons-material/LogoDev';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import WindowIcon from '@mui/icons-material/Window';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import LetterBox from "../letterBox";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useAppSelector } from "../../hooks";

interface WorkspaceLeftSidebarProps {
    workspaceId: number,
}


const WorkspaceViewLeftSidebar = (props: WorkspaceLeftSidebarProps) => {

    const [workspaceSettingsAnchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const workspaceSettingsOpen = Boolean(workspaceSettingsAnchorEl);

    const workspaceFromUserSlice = useAppSelector((state) => state.userSlice.Workspaces?.find((workspace) => workspace.id == props.workspaceId))

    const handleWorkspaceSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleWorkspaceSettingsClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ paddingTop: '15px', borderRight: '1px solid gray' }}>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems='center' sx={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '5px' }}>
                    <Stack direction='row' justifyContent='center' spacing={1} alignItems={'center'}>
                        <LetterBox backgroundColor={'lightgreen'} size={32} letter={workspaceFromUserSlice?.name.substring(0, 1) as string} />
                        <Stack direction='column'>
                            <Typography variant="h6" sx={{ wordBreak: "break-word" }}>{workspaceFromUserSlice?.name}</Typography>
                            <Typography variant="body2">{workspaceFromUserSlice?.name} Workspace</Typography>
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
                        to={`/w/${workspaceFromUserSlice?.id}/`}
                        sx={{ paddingLeft: '3px', marginBottom: '2px', height: '44px' }}
                        disabled={workspaceFromUserSlice == undefined}
                    >
                        <Stack direction="row" spacing={1} alignItems="center" ml='10px'>
                            <LogoDevIcon sx={{ fontSize: '16px' }} />
                            <Typography variant="body1">Boards</Typography>
                        </Stack>
                    </MenuItem>

                    <MenuItem
                        component={Link}
                        to={`/w/${workspaceFromUserSlice?.id}/members`}
                        sx={{ paddingLeft: '3px', marginBottom: '2px' }}
                        disabled={workspaceFromUserSlice == undefined}
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
                        disabled={workspaceFromUserSlice == undefined}
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
                        to={`/w/${workspaceFromUserSlice?.id}/views/table`}
                        sx={{ paddingLeft: '3px', marginBottom: '2px' }}
                        disabled={workspaceFromUserSlice == undefined}
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
                        to={`/w/${workspaceFromUserSlice?.id}/views/calendar`}
                        sx={{ paddingLeft: '3px', marginBottom: '2px' }}
                        disabled={workspaceFromUserSlice == undefined}
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
                    {workspaceFromUserSlice ?
                        workspaceFromUserSlice?.boards.map((board) => {
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
                        })
                        :
                        <Box display="flex" justifyContent="center">
                            <ReportProblemIcon />
                        </Box>
                    }
                </Stack>
            </Stack >
        </Box >
    )
}

export const SkeletonWorkspaceViewLeftSideBar = () => {
    return (
        <Box sx={{ paddingTop: '15px', borderRight: '1px solid gray' }}>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems='center' sx={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: '5px' }}>
                    <Stack direction='row' justifyContent='center' spacing={1} alignItems={'center'}>
                        <LetterBox backgroundColor={'lightpink'} size={32} letter={'E'} />
                        <Stack direction='column'>
                            <Skeleton>
                                <Typography variant="h6" sx={{ wordBreak: "break-word" }}> Hello</Typography>
                            </Skeleton>
                            <Skeleton>
                                <Typography variant="body2">Free?</Typography>
                            </Skeleton>
                        </Stack>
                    </Stack>
                    <Skeleton>
                        <IconButton color="primary" size='small' sx={{ borderRadius: '5px' }}>
                            <KeyboardArrowLeftIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </Skeleton>
                </Stack>
                <Divider sx={{ marginTop: '10px' }} />
                <Stack direction='column'>
                    <Skeleton>
                        <MenuItem
                            sx={{ paddingLeft: '3px', marginBottom: '2px', height: '44px' }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center" ml='10px'>
                                <LogoDevIcon sx={{ fontSize: '16px' }} />
                                <Typography variant="body1">Boards</Typography>
                            </Stack>
                        </MenuItem>
                    </Skeleton>


                    <Skeleton>
                        <MenuItem
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
                    </Skeleton>


                    <Skeleton>
                        <MenuItem
                            sx={{ paddingLeft: '3px', marginBottom: '2px', textTransform: 'none' }} //textTransform to none to get rid of button styling
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
                    </Skeleton>


                </Stack >

                <Stack direction='column'>
                    <Typography variant='body1' fontWeight='600' pl='10px' pb='5px'>
                        Workspace Views
                    </Typography>
                    <Skeleton>
                        <MenuItem
                            sx={{ paddingLeft: '3px', marginBottom: '2px' }}
                        >
                            <Stack direction='row' ml='10px' justifyContent='space-between'>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <WindowIcon sx={{ fontSize: '16px' }} />
                                    <Typography variant="body1">Table</Typography>
                                </Stack>
                            </Stack>
                        </MenuItem>
                    </Skeleton>

                    <Skeleton>
                        <MenuItem
                            sx={{ paddingLeft: '3px', marginBottom: '2px' }}
                        >
                            <Stack direction='row' ml='10px' justifyContent='space-between'>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <CalendarMonthIcon sx={{ fontSize: '16px' }} />
                                    <Typography variant="body1">Calendar</Typography>
                                </Stack>
                            </Stack>
                        </MenuItem>
                    </Skeleton>
                </Stack>
                <Stack direction='column'>
                    <Typography variant='body1' fontWeight='600' pl='10px' pb='5px'>
                        Your Boards
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                </Stack>
            </Stack >
        </Box >
    )
}

export default WorkspaceViewLeftSidebar;