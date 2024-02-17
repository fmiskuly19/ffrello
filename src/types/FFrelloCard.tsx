import Comment from "./Comment";
import User from "./User";

interface FFrelloCard {
    id?: number,
    boardListId: number,
    boardListName: string,
    title: string,
    description?: string,
    comments: Comment[],
    attachments?: string[],
    members?: User[],
    checklistItems?: string[],
    isUserWatching: boolean,
}

export default FFrelloCard;