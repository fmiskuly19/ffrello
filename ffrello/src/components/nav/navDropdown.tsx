import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface NavDropdownProps {
    label: string, //need label for ids of button and menu for anchor
    menuContent: JSX.Element,
    icon?: JSX.Element //sending an iconbutton as a prop will render the iconbutton instead of the label
}

const NavDropdown = (props: NavDropdownProps) => {

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getEndIcon = () => {
        return (open ? <KeyboardArrowUpIcon sx={{ color: theme.palette.primary.contrastText }} /> : <KeyboardArrowDownIcon sx={{ color: theme.palette.primary.contrastText }} />)
    }

    return (
        <>
            {props.icon ?
                <Button
                    id={props.label + '-dropdown-button'}
                    aria-controls={open ? props.label + '-dropdown-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ textTransform: 'none', ":hover": { background: 'rgba(255, 255, 255, .1)' }, borderRadius: '100%', minWidth: '0px', padding: '0px', margin: '0px' }}
                >
                    <IconButton size="small" sx={{ minWidth: '0px' }} color="primary">{props.icon}</IconButton>
                </Button>
                :
                <Button
                    id={props.label + '-dropdown-button'}
                    aria-controls={open ? props.label + '-dropdown-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={getEndIcon()}
                    sx={{ textTransform: 'none', ":hover": { background: 'rgba(255, 255, 255, .1)' } }}
                >
                    <Typography sx={{ color: theme.palette?.primary?.contrastText }}>{props.label}</Typography>
                </Button>
            }
            <Menu
                id={props.label + '-dropdown-menu'}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                MenuListProps={{
                    'aria-labelledby': props.label + '-dropdown-button',
                    'disablePadding': true,
                }}
                sx={{ top: '10px' }}
            >
                {props.menuContent}
            </Menu>
        </>
    )
}

export default NavDropdown;