import { BoardList } from './BoardList';
import Workspace from './Workspace'

interface Board {
    Workspace?: Workspace,
    WorkspaceId: number
    id: number,
    name: string,
    isStarred: boolean,
    boardLists: BoardList[],
}

export default Board;
