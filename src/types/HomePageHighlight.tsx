import FFrelloCard from './FFrelloCard'
import User from './User';

interface HomePageHighlight {
    id?: number,
    issue: FFrelloCard,
    author?: User,
    comment?: string,
    timestamp?: string
}

export default HomePageHighlight;