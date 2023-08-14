import Issue from './Issue'
import User from './User';

interface HomePageHighlight {
    id?: number,
    issue: Issue,
    author?: User,
    comment?: string,
    timestamp?: string
}

export default HomePageHighlight;