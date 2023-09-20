import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import CreateWorkspaceModal from "../modals/createWorkspaceModal";

const CreateButtonDropdown = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [workspaceModalIsOpen, setWorkspaceModalIsOpen] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const openCreateWorkspaceModal = () => {
        setWorkspaceModalIsOpen(true);
    }

    const closeCreateWorkspaceModal = () => {
        setWorkspaceModalIsOpen(false);
    }

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
                <MenuItem onClick={openCreateWorkspaceModal}>
                    Create Workspace
                </MenuItem>
            </Menu>

            <CreateWorkspaceModal isOpen={workspaceModalIsOpen} closeModal={closeCreateWorkspaceModal} />
        </>
    )
}

export default CreateButtonDropdown;