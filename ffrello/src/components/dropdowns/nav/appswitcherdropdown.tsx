import AppsIcon from '@mui/icons-material/Apps';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const AppSwitcherDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    //this should come from react store once that is setup
    const [workspaces, setWorkspaces] = useState([{workspaces: [], currentWorkspaces: []}]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton 
                sx={{ color: 'white' }} 
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <AppsIcon />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
        </>
    )
}

export default AppSwitcherDropdown;