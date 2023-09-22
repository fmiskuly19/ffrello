import Card from './Card'
import User from './User';

interface HomePageHighlight {
    id?: number,
    issue: Card,
    author?: User,
    comment?: string,
    timestamp?: string
}

export default HomePageHighlight;