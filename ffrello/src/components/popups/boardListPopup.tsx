import { Menu, MenuItem } from "@mui/material";

interface BoardListMenuProps {
    boardid: number,
    open: boolean
}

const BoardListMenu = (props: BoardListMenuProps) => {
    return (
        <>
            <Menu open={props.open}>
                <MenuItem>Add Card</MenuItem>
                <MenuItem>Delete Card</MenuItem>
            </Menu>
        </>)
}

export default BoardListMenu;