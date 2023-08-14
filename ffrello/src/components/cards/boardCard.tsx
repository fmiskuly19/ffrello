import { Box, Stack, Typography } from "@mui/material";
import Board from "../../types/Board";
import InteractiveStarIcon from "../interactiveStarIcon";

interface BoardCardProps extends Board {

}

const BoardCard = (props: BoardCardProps) => {
    return(
        <Box>
            <Stack direction="column" alignContent="space-between">
                <Typography>{props.name}</Typography>
                <Stack direction="row">
                    <InteractiveStarIcon isStarred={props.isStarred} />
                    <Typography>{props.Workspace?.name}</Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default BoardCard;