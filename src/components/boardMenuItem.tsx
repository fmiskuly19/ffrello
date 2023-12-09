import { Stack, Box, Typography, MenuItem } from "@mui/material"
import Board from "../types/Board";

import React, { useEffect, useState } from "react";
import InteractiveStarIcon from "./interactiveStarIcon";
import { Link } from "react-router-dom";

interface BoardMenuItemProps extends Board {
}

const BoardMenuItem = (props: BoardMenuItemProps) => {

    const [color1, setColor1] = useState<number>();
    const [color2, setColor2] = useState<number>();
    const [color3, setColor3] = useState<number>();

    useEffect(() => {
        const min = 1;
        const max = 255;

        const getRand = () => {
            return min + Math.random() * (max - min);
        }

        setColor1(getRand());
        setColor2(getRand());
        setColor3(getRand());
    }, [])

    return (
        <MenuItem sx={{ padding: '4px', borderRadius: '5px', display: 'block' }} component={Link} to={`/b/${props.id}/${props.name}`}>
            <Box sx={{ display: 'flex' }} flexDirection="row" alignItems="center" justifyContent="space-between">
                {/* this is the box and workspace/board name */}
                <Stack direction="row" spacing={1} >
                    <Box sx={{ height: '32px', width: '40px', background: `linear-gradient(180deg, rgba(${color1},${color2},${color3},1) 0%, rgba(${color3},${color2},${color1},1) 100%)`, borderRadius: '5px' }}></Box>
                    <Stack direction="column">
                        <Typography variant="h2" fontSize="14px">{props.name}</Typography>
                        <Typography variant="h2" fontSize="12px">{props.Workspace?.name}</Typography>
                    </Stack>
                </Stack>
                {/* this is the icon at the end of the menuitem */}
                <InteractiveStarIcon isStarred={props.isStarred} />
            </Box>
        </MenuItem >
    )
}

export default BoardMenuItem;