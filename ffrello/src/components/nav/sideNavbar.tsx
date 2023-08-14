import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, IconButton, MenuItem, Stack, Typography, Link as LinkBase } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import DvrIcon from '@mui/icons-material/Dvr';
import HomeIcon from '@mui/icons-material/Home';

interface SideNavbarProps {
    sticky?: boolean,
}

const SideNavbar = (props: SideNavbarProps) => {

    const [workspaces, setWorkspaces] = useState({ currentWorkspace: "Eastman Workspace", workspaces: ["Eastman Workspace", "Personal Workspace", "Catherine Workspace"] });

    return (
        <Box sx={{ position: props.sticky, top: 0, left: 0 }}>
            <Stack direction="column" spacing={1}>
                <Stack direction="column">
                    <LinkBase component={Link} to="/Boards" color='primary' sx={{ textDecoration: 'none', textTransform: 'none' }}>
                        <MenuItem>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <LogoDevIcon sx={{ fontSize: '22px' }} />
                                <Typography sx={{ fontSize: '14px' }}>Boards</Typography>
                            </Stack>
                        </MenuItem>
                    </LinkBase>
                    <LinkBase component={Link} to="/Templates" color='primary' sx={{ textDecoration: 'none', textTransform: 'none' }}>
                        <MenuItem>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <DvrIcon sx={{ fontSize: '22px' }} />
                                <Typography sx={{ fontSize: '14px' }}>Templates</Typography>
                            </Stack>
                        </MenuItem>
                    </LinkBase>
                    <LinkBase component={Link} to="/" color='primary' sx={{ textDecoration: 'none', textTransform: 'none' }}>
                        <MenuItem>
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
                            <Typography>Workspaces</Typography>
                            <IconButton size={"small"} sx={{ borderRadius: '8px' }}>
                                <AddIcon color="primary" sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Stack>
                        <Stack>
                            {workspaces.workspaces.map((x) => {
                                return (
                                    <Accordion disableGutters>
                                        <AccordionSummary>
                                            <Typography fontSize="14px">{x}</Typography>
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
        </Box>

    )
}

export default SideNavbar;