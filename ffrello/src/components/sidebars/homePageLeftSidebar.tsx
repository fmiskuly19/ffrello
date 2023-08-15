import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, IconButton, MenuItem, Stack, Typography, Link as LinkBase } from "@mui/material";
import React, { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import DvrIcon from '@mui/icons-material/Dvr';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppSelector, useAppDispatch } from '../../hooks'
import { setSelectedMenu } from '../../ducks/navSlice'
import * as data from '../../data/hardcodes'

export interface HomePageLeftSidebarProps {
    sticky?: boolean,
    selectedMenu?: string,
}

const HomePageLeftSidebar = (props: HomePageLeftSidebarProps) => {

    const selectedMenu = useAppSelector((state) => state.nav.selectedMenu)
    const dispatch = useAppDispatch()

    const [workspaces, setWorkspaces] = useState({ currentWorkspace: "Eastman Workspace", workspaces: ["Eastman Workspace", "Personal Workspace", "Catherine Workspace"] });

    return (
        <Stack direction="column" spacing={1}>
            <Stack direction="column">
                <LinkBase component={Link} to="/Boards" color='primary' sx={{ textDecoration: 'none', textTransform: 'none' }}>
                    <MenuItem onClick={(e: React.MouseEvent) => { dispatch(setSelectedMenu("Boards")) }} selected={selectedMenu === "Boards" ? true : false}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <LogoDevIcon sx={{ fontSize: '22px' }} />
                            <Typography sx={{ fontSize: '14px' }}>Boards</Typography>
                        </Stack>
                    </MenuItem>
                </LinkBase>
                <LinkBase component={Link} to="/Templates" color='primary' sx={{ textDecoration: 'none', textTransform: 'none' }}>
                    <MenuItem onClick={(e: React.MouseEvent) => { dispatch(setSelectedMenu("Templates")) }} selected={selectedMenu === "Templates" ? true : false}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <DvrIcon sx={{ fontSize: '22px' }} />
                            <Typography sx={{ fontSize: '14px' }}>Templates</Typography>
                        </Stack>
                    </MenuItem>
                </LinkBase>
                <LinkBase component={Link} to="/" color='primary' sx={{ textDecoration: 'none', textTransform: 'none' }}>
                    <MenuItem onClick={(e: React.MouseEvent) => { dispatch(setSelectedMenu("Home")) }} selected={selectedMenu === "Home" ? true : false}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <HomeIcon sx={{ fontSize: '22px' }} />
                            <Typography sx={{ fontSize: '14px' }}>Home</Typography>
                        </Stack>
                    </MenuItem>
                </LinkBase>
            </Stack>
            <Divider />
            <Box sx={{ m: 2 }}>
                <Stack direction="column" spacing={1}>
                    <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
                        <Typography sx={{ fontSize: '14px' }}>Workspaces</Typography>
                        <IconButton size={"small"} sx={{ borderRadius: '8px' }}>
                            <AddIcon color="primary" sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </Stack>
                    <Stack>
                        {data.workspaces.map((x) => {
                            return (
                                <Accordion disableGutters sx={{ background: { paper: 'rgba(255,255,255,1)' } }}>
                                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                                        <Stack direction="row" alignItems="center">

                                        </Stack>
                                        <Typography fontSize="14px" fontWeight="600">{x.name} Workspace</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        Hello World
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
}

export default HomePageLeftSidebar;