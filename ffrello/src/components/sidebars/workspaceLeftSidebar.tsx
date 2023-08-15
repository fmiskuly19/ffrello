import { Box, Button, Container, CssBaseline, Divider, Drawer, IconButton, Typography, makeStyles, styled, useTheme } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ChevronRight } from "@mui/icons-material";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface WorkspaceProps {
    outletContent: JSX.Element,
}

const WorkspaceLeftSidebar = (props: WorkspaceProps) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{
                width: '1%',
                minHeight: '95vh',
                overflowY: 'hidden',
                backgroundColor: isHovering ? theme.palette.primary.light : theme.palette.primary.main
            }} onClick={handleDrawerOpen} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
                <Button
                    variant="outlined"
                    color="secondary"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}
                    size="small"
                    sx={{
                        ...(open && { display: 'none' }), position: 'absolute', borderRadius: '25px', minWidth: '0', left: 2, mt: 2, ':hover': {
                            backgroundColor: theme.palette.primary.light
                        },
                        backgroundColor: isHovering ? theme.palette.primary.light : theme.palette.primary.main
                    }}
                >
                    <ChevronRightIcon style={{ fontSize: '12px' }} />
                </Button>
            </Box>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', top: 48 },

                }}
                variant="persistent"
                anchor="left"
                open={open}>
                <Box sx={{ backgroundColor: 'lightgreen' }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <Divider />
                    <Typography>Hello World</Typography>
                </Box>
            </Drawer>
            <Main open={open}>
                {props.outletContent}
            </Main>
        </Box>
    )
}

export default WorkspaceLeftSidebar;