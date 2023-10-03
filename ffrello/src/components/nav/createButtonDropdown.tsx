import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { setOpenCreateWorkspaceModal } from "../../redux/homeSlice";
import { useAppDispatch } from "../../hooks";
import CreateBoardMenu from "../menus/createBoardMenu";

const CreateButtonDropdown = () => {

    const dispatch = useAppDispatch()

    const [dropdownAnchorEl, setDropdownAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(dropdownAnchorEl);

    const handleCreateButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDropdownAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = () => {
        setDropdownAnchorEl(null);
    };

    const [openBoardAnchorEl, setOpenBoardAnchorEl] = useState<null | HTMLElement>(null);
    const [openNewBoardMenu, setOpenNewBoardMenu] = useState(false);

    const handleNewBoardClick = (event: any) => {
        setOpenBoardAnchorEl(event.currentTarget);
        setOpenNewBoardMenu(true);
    };

    const handleNewBoardClose = () => {
        setOpenBoardAnchorEl(null);
        setOpenNewBoardMenu(false);
    };

    return (
        <>
            <Button
                id={'create-dropdown-button'}
                aria-controls={open ? 'create-dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleCreateButtonClick}
                sx={{ textTransform: 'none', ":hover": { background: 'rgba(255, 255, 255, .1)' } }}
            >
                <Typography>Create</Typography>
            </Button>
            <Menu
                id={'create-dropdown-menu'}
                anchorEl={dropdownAnchorEl}
                open={open}
                onClose={handleDropdownClose}
                onClick={handleDropdownClose}
                MenuListProps={{
                    'aria-labelledby': 'create-dropdown-button',
                    'disablePadding': true,
                }}
                sx={{ top: '10px' }}
            >
                <MenuItem onClick={handleNewBoardClick} sx={{ textTransform: 'none' }}>
                    Create Board
                </MenuItem>
                <MenuItem>
                    Start with a Template
                </MenuItem>
                <MenuItem onClick={() => dispatch(setOpenCreateWorkspaceModal(true))}>
                    Create Workspace
                </MenuItem>
            </Menu>
            <CreateBoardMenu open={openNewBoardMenu} anchorEl={openBoardAnchorEl} onClose={handleNewBoardClose} />
        </>
    )
}

export default CreateButtonDropdown;