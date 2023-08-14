import Board from "./Board";

interface Workspace {
    id: number,
    name: string,
    boards?: Board[],
}

export default Workspace;