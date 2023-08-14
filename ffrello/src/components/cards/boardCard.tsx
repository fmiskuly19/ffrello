import { Box, MenuItem, Stack, Typography } from "@mui/material";
import Board from "../../types/Board";
import InteractiveStarIcon from "../interactiveStarIcon";

interface BoardCardProps extends Board {

}

const BoardCard = (props: BoardCardProps) => {
    return (
            <Stack sx={{ backgroundColor: '#c7c7c7', width: '100%', height: '100%', minHeight: '96px', maxHeight: '96px', p: '8px', borderRadius: '2px' }} direction="column" justifyContent="space-between">
                <Typography>{props.name}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography noWrap>{props.Workspace?.name}</Typography>
                    <InteractiveStarIcon  isStarred={props.isStarred} />
                </Stack>
            </Stack>
    )
}

export default BoardCard;