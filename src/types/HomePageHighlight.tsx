import FCard from './FCard'
import User from './User';

interface HomePageHighlight {
    id?: number,
    issue: FCard,
    author?: User,
    comment?: string,
    timestamp?: string
}

export default HomePageHighlight;