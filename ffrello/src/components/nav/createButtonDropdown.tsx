import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { setOpenCreateWorkspaceModal } from "../../redux/homeSlice";
import { useAppDispatch } from "../../hooks";

const CreateButtonDropdown = () => {

    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                id={'create-dropdown-button'}
                aria-controls={open ? 'create-dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ textTransform: 'none', ":hover": { background: 'rgba(255, 255, 255, .1)' } }}
            >
                <Typography>Create</Typography>
            </Button>
            <Menu
                id={'create-dropdown-menu'}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'create-dropdown-button',
                    'disablePadding': true,
                }}
                sx={{ top: '10px' }}
            >
                <MenuItem>
                    Create Board
                </MenuItem>
                <MenuItem>
                    Start with a Template
                </MenuItem>
                <MenuItem onClick={() => dispatch(setOpenCreateWorkspaceModal(true))}>
                    Create Workspace
                </MenuItem>
            </Menu>
        </>
    )
}

export default CreateButtonDropdown;