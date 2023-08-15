import { MenuItem, Stack, Typography } from "@mui/material";
import Board from "../../types/Board";
import InteractiveStarIcon from "../interactiveStarIcon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BoardCardProps extends Board {

}

const BoardCard = (props: BoardCardProps) => {

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
                minHeight: '96px',
                maxHeight: '96px',
                p: '8px',
                borderRadius: '5px',
                textDecoration: 'none',
            }}>
            <Typography color="textSecondary" variant="h5" fontWeight="600">{props.name}</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography color="textSecondary" variant="body1" noWrap>{props.Workspace?.name}</Typography>
                <InteractiveStarIcon isStarred={props.isStarred} />
            </Stack>
        </Stack>
    )
}

export default BoardCard;