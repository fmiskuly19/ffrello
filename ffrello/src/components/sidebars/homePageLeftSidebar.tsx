import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../hooks'
import { setExpandedAccordions, setOpenCreateWorkspaceModal, setSelectedMenu, setSelectedWorkspaceMenu } from '../../redux/homeSlice'

import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, IconButton, MenuItem, Stack, Typography, Container, Skeleton, CircularProgress } from "@mui/material";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import DvrIcon from '@mui/icons-material/Dvr';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import GridViewIcon from '@mui/icons-material/GridView';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import LetterBox from "../letterBox";
import { removeWorkspaceArgs, setCurrentWorkspace, setRemoveWorkspaceStatus } from "../../redux/userSlice";
import { ApiCallStatus } from "../../types/ApiCallStatus";
import { useSnackbar } from "notistack";

export interface HomePageLeftSidebarProps {
    selectedMenu?: string,
    selectedWorkspaceMenu?: string,
    expandedAccordions: string[],
}

const iconFontSize = '22px';

const HomePageLeftSidebar = () => {

    const { enqueueSnackbar } = useSnackbar();

    const selectedMenu = useAppSelector((state) => state.home.selectedMenu)
    const selectedWorkspaceMenu = useAppSelector((state) => state.home.selectedWorkspaceMenu)
    const expanded = useAppSelector((state) => state.home.expandedAccordions)
    const workspaces = useAppSelector((state) => state.userSlice.Workspaces)
    const userid = useAppSelector((state) => state.userSlice.User.userid)
    const dispatch = useAppDispatch()

    const links = [
        { name: "Boards", logo: <LogoDevIcon sx={{ fontSize: iconFontSize }} />, link: `/u/${userid}/boards` },
        { name: "Templates", logo: <DvrIcon sx={{ fontSize: iconFontSize }} />, link: `/templates` },
        { name: "Home", logo: <HomeIcon sx={{ fontSize: iconFontSize }} />, link: `/` }
    ]

    const workspaceMenuItems = [
        { name: "Boards", icon: <LogoDevIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: false, link: 'home' },
        { name: "Highlights", icon: <FavoriteBorderIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: false, link: 'highlights' },
        { name: "Views", icon: <GridViewIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: true, link: 'views/table' },
        { name: "Members", icon: <PeopleIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: true, link: 'members' },
        { name: "Settings", icon: <SettingsIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: true, link: 'account' }
    ]

    const handleChange = (accordionName: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        if (isExpanded) {
            let temp = [...expanded];
            temp?.push(accordionName)
            dispatch(setExpandedAccordions(temp));
        }
        else {
            let temp = [...expanded];
            temp = temp.filter(x => x != accordionName);
            dispatch(setExpandedAccordions(temp));
        }
    };

    const [color1, setColor1] = useState<number>();
    const [color2, setColor2] = useState<number>();
    const [color3, setColor3] = useState<number>();

    useEffect(() => {
        const min = 1;
        const max = 255;

        const getRand = () => {
            return min + Math.random() * (max - min);
        }

        setColor1(getRand());
        setColor2(getRand());
        setColor3(getRand());
    }, [])

    let accordionContent;
    const workspaceStatus = useAppSelector((state) => state.userSlice.workspaceStatus);
    const removeWorkspaceStatus = useAppSelector((state) => state.userSlice.removeWorkspaceStatus);

    if (removeWorkspaceStatus == ApiCallStatus.Failure) {
        enqueueSnackbar('error removing workspace', { variant: 'error' });
        dispatch(setRemoveWorkspaceStatus(ApiCallStatus.Idle))
    }

    if (removeWorkspaceStatus == ApiCallStatus.Success) {
        enqueueSnackbar('success removing workspace', { variant: 'success' });
        dispatch(setRemoveWorkspaceStatus(ApiCallStatus.Idle))
    }

    if (workspaceStatus == ApiCallStatus.Loading || removeWorkspaceStatus == ApiCallStatus.Loading) {
        accordionContent =
            <Box justifyContent="center" display="flex">
                <CircularProgress />
            </Box >
    }
    if (workspaceStatus == ApiCallStatus.Failure) {
        accordionContent =
            <Box justifyContent="center" display="flex">
                <ReportProblemIcon />
            </Box >
    }
    else if (workspaceStatus == ApiCallStatus.Success && workspaces && workspaces.length > 0) {
        accordionContent =
            <>
                {
                    workspaces.map((workspace) => {
                        return (
                            <Accordion disableGutters sx={{
                                "&.MuiPaper-root::before": { content: 'none' }
                            }} elevation={0} expanded={expanded.includes(`accordion${workspace.id}`)} onChange={handleChange(`accordion${workspace.id}`)}>
                                <AccordionSummary expandIcon={<KeyboardArrowDownIcon sx={{ fontSize: iconFontSize }} color='primary' />} sx={{
                                    backgroundColor: '#1f1f26', paddingLeft: '6px', paddingRight: '3px', '&:hover': { background: 'rgba(255, 255, 255, .1)' }, borderRadius: '8px'
                                }}>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ marginTop: '0px' }}>
                                        <LetterBox backgroundColor={`linear-gradient(180deg, rgba(${color1},${color2},${color3},1) 0%, rgba(${color3},${color2},${color1},1) 100%)`} size={24} letter={workspace.name.substring(0, 1)} />
                                        <Typography variant="body1" fontWeight="600">{workspace.name} Workspace</Typography>
                                    </Stack>
                                    <IconButton onClick={() => dispatch(removeWorkspace({ userid: userid, workspaceid: workspace.id, workspace: workspace }))}>
                                        <DeleteOutlineIcon sx={{ height: "15px", width: "15px" }} />
                                    </IconButton>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#1f1f26', paddingLeft: '0px', paddingRight: '0px' }}>
                                    <Stack direction="column" spacing={1}>
                                        {workspaceMenuItems.map((workspaceMenuItem) => {
                                            return (
                                                <MenuItem onClick={(e: React.MouseEvent) => {
                                                    dispatch(setCurrentWorkspace(workspace.id))
                                                    dispatch(setSelectedWorkspaceMenu(`${workspaceMenuItem.name}-${workspace.id}`))
                                                    dispatch(setSelectedMenu(''))
                                                }}
                                                    selected={selectedWorkspaceMenu == `${workspaceMenuItem.name}-${workspace.id}` && expanded.includes(`accordion${workspace.id}`)}
                                                    sx={{ paddingLeft: '25px', borderRadius: '6px', width: '100%' }}
                                                    component={Link}
                                                    to={`w/${workspace.id}/${workspaceMenuItem.link}`}
                                                >
                                                    <Stack direction="row" alignItems="center" spacing={1} >
                                                        {workspaceMenuItem.icon}
                                                        <Typography variant="body2">{workspaceMenuItem.name}</Typography>
                                                    </Stack>
                                                </MenuItem>
                                            )
                                        })}
                                    </Stack>
                                </AccordionDetails>
                            </Accordion >
                        )
                    })}
            </>
    }
    else if (workspaceStatus == ApiCallStatus.Success && workspaces && workspaces.length == 0) {
        accordionContent =
            <Box component={MenuItem} sx={{ borderRadius: '8px' }} onClick={() => dispatch(setOpenCreateWorkspaceModal(true))}>
                <Typography>Create Workspace ...</Typography>
            </Box>
    }

    return (
        <Container>
            <Stack direction="column" spacing={1}>
                <Stack direction="column">
                    {links.map((x) => {
                        return (
                            <MenuItem
                                component={Link}
                                to={x.link}
                                onClick={(e: React.MouseEvent) => { dispatch(setSelectedMenu(x.name)) }}
                                selected={selectedMenu === x.name}
                                sx={{ paddingLeft: '3px', borderRadius: '5px', marginBottom: '2px' }}
                            >
                                <Stack direction="row" spacing={1} alignItems="center" >
                                    {x.logo}
                                    <Typography variant="body1">{x.name}</Typography>
                                </Stack>
                            </MenuItem>)
                    })}
                </Stack>
                <Divider />
                <Box sx={{ m: 2 }}>
                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
                            <Typography variant="body2" sx={{ paddingLeft: '2px' }}>Workspaces</Typography>
                            <IconButton size={"small"} sx={{ borderRadius: '8px' }} onClick={() => dispatch(setOpenCreateWorkspaceModal(true))}>
                                <AddIcon color="primary" sx={{ fontSize: iconFontSize }} />
                            </IconButton>
                        </Stack>
                        <Stack direction='column'>
                            {accordionContent}
                        </Stack>
                    </Stack>
                </Box >
            </Stack >
        </Container >
    )
}

export default HomePageLeftSidebar;