import { MenuItem, Stack, Typography, useTheme } from "@mui/material";
import Board from "../../types/Board";
import InteractiveStarIcon from "../interactiveStarIcon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BoardCardProps extends Board {

}

export const BoardCardHeight = '96px';

const BoardCard = (props: BoardCardProps) => {

    const theme = useTheme();

    const [randomColor1, setRandomColor1] = useState(50);
    const [randomColor2, setRandomColor2] = useState(50);
    const [randomColor3, setRandomColor3] = useState(50);
    useEffect(() => {
        setRandomColor1(Math.floor(1 + Math.random() * (100 - 1)))
        setRandomColor2(Math.floor(1 + Math.random() * (100 - 1)))
        setRandomColor3(Math.floor(1 + Math.random() * (100 - 1)))
    }, [])

    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            component={Link}
            to={`/b/${props.id}/${props.name}`}
            sx={{
                backgroundColor: `rgb(${randomColor1},${randomColor2},${randomColor3})`,
                width: '100%',
                height: '100%',
                minHeight: BoardCardHeight,
                maxHeight: BoardCardHeight,
                p: '8px',
                borderRadius: '5px',
                textDecoration: 'none',
            }}>
            <Typography variant="h5" fontWeight="600" sx={{ color: theme.palette.primary.contrastText, overflowX: 'hidden', overflowY: 'hidden' }} >{props.name}</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ color: theme.palette.primary.contrastText }} noWrap>{props.Workspace?.name}</Typography>
                <InteractiveStarIcon isStarred={props.isStarred} />
            </Stack>
        </Stack >
    )
}

export default BoardCard;