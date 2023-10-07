import { IconButton, Menu, MenuItem } from '@mui/material'
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from 'material-ui-popup-state/hooks'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeBoardListThunk } from '../redux/workspaceViewSlice';
import { BoardList } from '../types/BoardList';

interface BoardListActionMenuProps {
    boardList: BoardList
}

const BoardListActionMenu = (props: BoardListActionMenuProps) => {

    console.log(`new menu created with id: ${props.boardList.id}`)

    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.userSlice.User.userid);

    var popupstate = usePopupState({ variant: 'popover', popupId: String(props.boardList.id) })

    return (
        <>
            <IconButton size="small" sx={{ borderRadius: '8px' }} {...bindTrigger(popupstate)}>
                <MoreHorizIcon color="primary" />
            </IconButton>

            <Menu {...bindMenu(popupstate)}>
                <MenuItem onClick={popupstate.close}>Add Card</MenuItem>
                <MenuItem onClick={() => { popupstate.close; dispatch(removeBoardListThunk({ userId: userId, boardListId: props.boardList.id, boardList: props.boardList })) }}>Remove List</MenuItem>
            </Menu>
        </>



    )
}

export default BoardListActionMenu;