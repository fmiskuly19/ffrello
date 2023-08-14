import { Stack, Box, Typography, MenuItem, ListItemIcon } from "@mui/material"
import Board from "../types/Board";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface BoardMenuItemProps extends Board {

}

const BoardMenuItem = (props: BoardMenuItemProps) => {
    return (
        <MenuItem sx={{ padding: '4px', borderRadius: '5px', display: 'block' }}>
            <Box sx={{ display: 'flex' }} flexDirection="row" alignItems="center" justifyContent="space-between">
                {/* this is the box and workspace/board name */}
                <Stack direction="row" spacing={1} >
                    <Box sx={{ height: '32px', width: '40px', background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,255,1) 0%, rgba(0,100,255,1) 100%)', borderRadius: '5px' }}></Box>
                    <Stack direction="column">
                        <Typography variant="h2" fontSize="14px">{props.name}</Typography>
                        <Typography variant="h2" fontSize="12px">{props.Workspace?.name}</Typography>
                    </Stack>
                </Stack>
                {/* this is the icon at the end of the menuitem */}
                {props.isStarred ? <StarIcon htmlColor="#F8C021" sx={{ fontSize: '22px' }} /> : <StarBorderIcon sx={{ fontSize: '22px' }} />}
            </Box>
        </MenuItem >
    )
}

export default BoardMenuItem;