import BoardIssueCard from './BoardIssueCard'
import User from './User';

interface HomePageHighlight {
    id?: number,
    issue: BoardIssueCard,
    author?: User,
    comment?: string,
    timestamp?: string
}

export default HomePageHighlight;