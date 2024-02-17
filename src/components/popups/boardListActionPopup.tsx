import { IconButton, Menu, MenuItem, MenuList, Stack } from '@mui/material'
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from 'material-ui-popup-state/hooks'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeBoardListThunk } from '../../redux/workspaceViewSlice';
import { BoardList } from '../../types/BoardList';
import { newBoardListCard } from '../../routes/boardView/boardPage';

interface BoardListActionMenuProps {
    boardList: BoardList,
    openAddCard: React.Dispatch<React.SetStateAction<newBoardListCard>>
}

const BoardListActionMenu = (props: BoardListActionMenuProps) => {

    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.authSlice.accessToken);

    var popupstate = usePopupState({ variant: 'popover', popupId: String(props.boardList.id) });

    return (
        <>
            <IconButton size="small" sx={{ borderRadius: '8px' }} {...bindTrigger(popupstate)}>
                <MoreHorizIcon color="primary" />
            </IconButton>

            <Menu {...bindMenu(popupstate)}>
                <MenuList sx={{ minWidth: '300px' }}>
                    <MenuItem onClick={() => { popupstate.close(); props.openAddCard({ boardListId: props.boardList.id, open: true, value: '' }); }}>
                        Add Card
                        <AddIcon />
                    </MenuItem>
                    <MenuItem onClick={() => { popupstate.close(); dispatch(removeBoardListThunk({ accessToken: accessToken, boardListId: props.boardList.id, boardList: props.boardList })); }}>
                        Remove List
                    </MenuItem>
                </MenuList>
            </Menu>
        </>



    )
}

export default BoardListActionMenu;