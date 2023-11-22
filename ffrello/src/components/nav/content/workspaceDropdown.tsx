import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Link } from 'react-router-dom';

import { Box, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AddIcon from '@mui/icons-material/Add';

import LetterBox from '../../letterBox';
import { setCurrentWorkspace } from '../../../redux/userSlice';
import { ApiCallStatus } from '../../../types/ApiCallStatus';
import { setOpenCreateWorkspaceModal } from '../../../redux/homeSlice';

const WorkspaceDropdown = () => {

    const dispatch = useAppDispatch()

    const workspaces = useAppSelector((state) => state.userSlice.Workspaces)
    const currentWorkspace = useAppSelector((state) => state.userSlice.CurrentWorkspace)

    let dropdownContent;
    const workspaceStatus = useAppSelector((state) => state.userSlice.workspaceStatus);
    if (workspaceStatus == ApiCallStatus.Loading) {
        dropdownContent =
            <Box justifyContent="center" display="flex">
                <CircularProgress />
            </Box >
    }
    else if (workspaceStatus == ApiCallStatus.Failure) {
        dropdownContent =
            <Box justifyContent="center" display="flex">
                <ReportProblemIcon />
            </Box >
    }
    else if (workspaceStatus == ApiCallStatus.Success && workspaces && workspaces.length > 0) {
        dropdownContent =
            <>
                <Typography variant="h2" fontSize="12px" mb="5px">Your Workspaces</Typography>
                {workspaces?.map((workspace) => {
                    return (
                        <MenuItem
                            component={Link}
                            to={`w/${workspace.id}`}
                            sx={{ ":hover": '-moz-border-radius: 8px; -webkit-border-radius: 8px; border-radius: 8px;', padding: '8px', minWidth: '250px' }}
                            onClick={() => { dispatch(setCurrentWorkspace(workspace.id)) }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box sx={{ display: 'flex', height: '40px', width: '40px', background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(223,255,42,1) 0%, rgba(64,135,0,1) 100%)', borderRadius: '5px' }} alignItems="center" justifyContent="center">
                                    <Typography variant="h6" sx={{ color: 'black' }} fontWeight="800">{workspace.name.substring(0, 1)}</Typography>
                                </Box>
                                <Typography variant="subtitle2">{workspace.name} Workspace</Typography>
                            </Stack>
                        </MenuItem>
                    );
                })}
            </>
    }
    else if (workspaceStatus == ApiCallStatus.Success && workspaces?.length == 0) {
        dropdownContent =
            <>
                <Typography variant="h2" fontSize="12px" mb="5px">Your Workspaces</Typography>
                <Box component={MenuItem} onClick={() => dispatch(setOpenCreateWorkspaceModal(true))} display="flex" justifyContent="center" sx={{ borderRadius: '8px' }}>
                    <AddIcon />
                </Box>
            </>
    }

    return (
        <Box sx={{ minWidth: '200px' }}>
            {currentWorkspace ?
                <>
                    <Box m="12px">
                        <Typography variant="h2" fontSize="12px">Current Workspace</Typography>
                        <MenuItem sx={{ ":hover": '-moz-border-radius: 8px; -webkit-border-radius: 8px; border-radius: 8px;', padding: '8px', minWidth: '250px' }} disabled>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <LetterBox backgroundColor={'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(223,255,42,1) 0%, rgba(64,135,0,1) 100%)'} size={40} letter={currentWorkspace.name.substring(0, 1)} />
                                <Typography variant="subtitle2">{currentWorkspace.name} Workspace</Typography>
                            </Stack>
                        </MenuItem>
                    </Box>
                    <Divider />
                </>
                :
                <></>
            }

            <Box m="12px" >
                {dropdownContent}
            </Box>

        </Box>
    )
}

export default WorkspaceDropdown;