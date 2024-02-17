import FFrelloCard from "./FFrelloCard";
import User from "./User";

interface Comment {
    id?: number,
    value: string,
    cardId: number,
    userId: number,
    User: User,
    username: string,
    profilePhotoUrl: string,
    timestamp: string,
    Card: FFrelloCard,
    isUserWatching: boolean,
}

export default Comment;