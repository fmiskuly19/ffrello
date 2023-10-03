import { Box, DialogTitle, IconButton, Menu } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface CreateBoardMenuProps {
    open: boolean
    anchorEl: HTMLElement | null
    onClose: () => void
}

const CreateBoardMenu = (props: CreateBoardMenuProps) => {

    return (

        <Menu open={props.open}
            onClose={props.onClose}
            anchorEl={props.anchorEl}
            MenuListProps={{
                'aria-labelledby': 'workspace-dropdown-button',
                'disablePadding': true,
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} minWidth="300px" minHeight="200px">
                <h5>Dialog...</h5>
                <IconButton onClick={props.onClose}>
                    <CloseIcon height="12px" width="12px" />
                </IconButton>
            </Box>
        </Menu>
    )
}

export default CreateBoardMenu;