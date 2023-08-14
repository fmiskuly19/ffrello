import Workspace from './Workspace'

interface Board {
    Workspace?: Workspace,
    id: number,
    name: string,
    isStarred: boolean
}

export default Board;
