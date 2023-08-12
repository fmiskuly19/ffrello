import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Divider, MenuList, Stack, Typography } from '@mui/material';

interface Workspaces {
    currentWorkspaces: string[],
    workspaces: string[]
}

const WorkspaceDropdownContent = () => {

    //this should come from react store once that is setup
    const [workspaces, setWorkspaces] = React.useState<Workspaces>({ currentWorkspaces: ["Eastman Workspace"], workspaces: ["Eastman Workspace", "Personal Workspace", "Catherine Workspace"] });

    return (
        <>
            <Box m="12px">
                <Typography variant="h2" fontSize="12px">Current Workspace</Typography>

                {workspaces.currentWorkspaces.map((x) => {
                    return (<MenuItem sx={{ mb: '8px', ":hover": '-moz-border-radius: 8px; -webkit-border-radius: 8px; border-radius: 8px;', padding: '8px', minWidth: '250px' }}><Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ display: 'flex', height: '40px', width: '40px', background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(223,255,42,1) 0%, rgba(64,135,0,1) 100%)', borderRadius: '5px' }} alignItems="center" justifyContent="center">
                            <Typography variant="h6">{x.substring(0, 1)}</Typography>
                        </Box>
                        <Typography variant="subtitle2">{x}</Typography>
                    </Stack></MenuItem>);
                })}

            </Box>
            <Divider />
            <Box m="12px">
                <Typography variant="h2" fontSize="12px">Your Workspaces</Typography>

                {workspaces.workspaces.map((x) => {
                    return (
                        <MenuItem
                            sx={{ mb: '8px', ":hover": '-moz-border-radius: 8px; -webkit-border-radius: 8px; border-radius: 8px;', padding: '8px', minWidth: '250px' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box sx={{ display: 'flex', height: '40px', width: '40px', background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(223,255,42,1) 0%, rgba(64,135,0,1) 100%)', borderRadius: '5px' }} alignItems="center" justifyContent="center">
                                    <Typography variant="h6">{x.substring(0, 1)}</Typography>
                                </Box>
                                <Typography variant="subtitle2">{x}</Typography>
                            </Stack>
                        </MenuItem>
                    );
                })}
            </Box>

        </>
    )
}

export default WorkspaceDropdownContent;