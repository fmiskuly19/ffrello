import BoardIssue from './BoardIssue'
import User from './User';

interface HomePageHighlight {
    id?: number,
    issue?: BoardIssue,
    author?: User,
    comment?: string,
    timestamp?: string
}

export default HomePageHighlight;