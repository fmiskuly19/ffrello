import FFrelloCard from "./FFrelloCard";
import User from "./User";

interface Comment {
    id?: number,
    value: string,
    cardId: number,
    userId: number,
    User: User,
    Card: FFrelloCard,
    isUserWatching: boolean,
}

export default Comment;