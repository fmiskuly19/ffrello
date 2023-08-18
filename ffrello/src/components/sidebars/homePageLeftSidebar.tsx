import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, IconButton, MenuItem, Stack, Typography, Link as LinkBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import DvrIcon from '@mui/icons-material/Dvr';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppSelector, useAppDispatch } from '../../hooks'
import { setExpandedAccordions, setSelectedMenu, setSelectedWorkspaceMenu } from '../../ducks/navSlice'
import * as data from '../../data/hardcodes'
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import GridViewIcon from '@mui/icons-material/GridView';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export interface HomePageLeftSidebarProps {
    sticky?: boolean,
    selectedMenu?: string,
    selectedWorkspaceMenu?: string,
    expandedAccordions: string[],
}

const iconFontSize = '22px';

const links = [
    { name: "Boards", logo: <LogoDevIcon sx={{ fontSize: iconFontSize }} />, link: `/boards` },
    { name: "Templates", logo: <DvrIcon sx={{ fontSize: iconFontSize }} />, link: `/templates` },
    { name: "Home", logo: <HomeIcon sx={{ fontSize: iconFontSize }} />, link: `/` }
]

const workspaceMenuItems = [
    { name: "Boards", icon: <LogoDevIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: false },
    { name: "Highlights", icon: <FavoriteBorderIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: false },
    { name: "Views", icon: <GridViewIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: true },
    { name: "Members", icon: <PeopleIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: true },
    { name: "Settings", icon: <SettingsIcon sx={{ fontSize: iconFontSize }} />, hasAnimatedMenuButton: true }
]

const HomePageLeftSidebar = (props: HomePageLeftSidebarProps) => {

    const selectedMenu = useAppSelector((state) => state.nav.selectedMenu)
    const selectedWorkspaceMenu = useAppSelector((state) => state.nav.selectedWorkspaceMenu)
    const expanded = useAppSelector((state) => state.nav.expandedAccordions)
    const dispatch = useAppDispatch()

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

    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="column">
                {links.map((x) => {
                    return (
                        <MenuItem
                            component={Link}
                            to={x.link}
                            onClick={(e: React.MouseEvent) => { dispatch(setSelectedMenu(x.name)) }}
                            selected={selectedMenu === x.name}
                            sx={{ paddingLeft: '3px' }}
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
                        <IconButton size={"small"} sx={{ borderRadius: '8px' }}>
                            <AddIcon color="primary" sx={{ fontSize: iconFontSize }} />
                        </IconButton>
                    </Stack>
                    <Stack direction='column'>
                        {data.workspaces.map((x, i) => {
                            return (
                                <Accordion disableGutters sx={{ "&.MuiPaper-root::before": { content: 'none' } }} elevation={0} expanded={expanded.includes(`accordion${i}`)} onChange={handleChange(`accordion${i}`)}>
                                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon sx={{ fontSize: iconFontSize }} />} sx={{ backgroundColor: '#1f1f26', paddingLeft: '0px', paddingRight: '3px' }}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Box sx={{ display: 'flex', height: '22px', width: '22px', background: `linear-gradient(180deg, rgba(${color1},${color2},${color3},1) 0%, rgba(${color3},${color2},${color1},1) 100%)`, borderRadius: '2px' }} alignItems="center" justifyContent="center">
                                                <Typography variant="body1" sx={{ color: 'black' }} fontWeight="800">{x.name.substring(0, 1)}</Typography>
                                            </Box>
                                            <Typography variant="body1" fontWeight="600">{x.name} Workspace</Typography>
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ backgroundColor: '#1f1f26' }}>
                                        <Stack direction="column" spacing={1}>
                                            {workspaceMenuItems.map((workspaceMenuItem) => {
                                                return (
                                                    <MenuItem onClick={(e: React.MouseEvent) => { dispatch(setSelectedWorkspaceMenu(`${workspaceMenuItem.name}-${i}`)) }}
                                                        selected={selectedWorkspaceMenu == `${workspaceMenuItem.name}-${i}` && expanded.includes(`accordion${i}`)}
                                                        sx={{ paddingLeft: '25px' }}
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
                                </Accordion>
                            )
                        })}
                    </Stack>
                </Stack>
            </Box >
        </Stack >
    )
}

export default HomePageLeftSidebar;