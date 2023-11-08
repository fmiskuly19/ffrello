import FCard from "./FCard";

export interface BoardList {
    //the api BoardList returns "id" not Id for some reason not sure why
    id: number,
    cards: FCard[],
    name: string,
}