import FFrelloCard from "./FFrelloCard";

export interface BoardList {
    //the api BoardList returns "id" not Id for some reason not sure why
    id: number,
    cards: FFrelloCard[],
    name: string,
}