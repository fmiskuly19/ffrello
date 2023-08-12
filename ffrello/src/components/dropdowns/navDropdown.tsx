import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


interface NavDropdownProps{
    label: string,
    menuContent: JSX.Element,
}

const NavDropdown = (props: NavDropdownProps) => {

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
                id={props.label + '-dropdown-button'}
                aria-controls={open ? props.label + '-dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                sx={{ color: 'white', textTransform:'none', ":hover": {background: 'rgba(255, 255, 255, .1)' } }}
            >
                {props.label}
            </Button>
            <Menu
                id={props.label + '-dropdown-menu'}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': props.label + '-dropdown-button',
                    'disablePadding': true,
                }}
                sx={{top: '10px'}}
            >
                    {props.menuContent}
            </Menu>
        </>
    )
}

export default NavDropdown;