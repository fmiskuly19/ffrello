import BoardIssueCard from "./BoardIssueCard";

export interface BoardList {
    //the api BoardList returns "id" not Id for some reason not sure why
    id: number,
    cards: BoardIssueCard[],
    name: string,
}