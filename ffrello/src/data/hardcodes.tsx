import Board from "../types/Board"
import HomePageHighlight from "../types/HomePageHighlight"
import Issue from "../types/Issue"

export const hardCodedBoards: Board[] = [
    { id: 1, name: 'Fwanks Board', Workspace: { id: 1, name: 'Catherine Workspace' }, isStarred: false },
    { id: 2, name: 'Cafwins Board', Workspace: { id: 2, name: 'Catherine Workspace' }, isStarred: true },
    { id: 2, name: 'Thomas Board', Workspace: { id: 2, name: 'Catherine Workspace' }, isStarred: false },
    { id: 2, name: 'M.C Board', Workspace: { id: 2, name: 'M.C. Workspace' }, isStarred: true }
]

export const hardCodedHighlights: HomePageHighlight[] = [
    { author: { name: 'Fwank Misk' }, comment: 'Yo Yo Yo this is a comment', timestamp: 'Today', issue: { id: 3, name: 'OMFG there is a huge issue', comments: ["", "", ""], attachments: ["links", "links", "links"], users: ["", "", ""] } },
    { author: { name: 'Catherine Kirk' }, comment: 'comment comment comment  ', timestamp: '5 hrs. ago', issue: { id: 4, name: 'Woah looks like we have an issue', comments: ["", "", ""], attachments: ["links", "links", "links"], users: ["", "", "", "", "", ""] } },
    { author: { name: 'M.C. Misk' }, comment: 'BWAP', timestamp: '3 hrs. ago', issue: { id: 1, name: 'Issue text', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] } },
    { author: { name: 'M.C. Misk' }, comment: 'BWAP', timestamp: '3 hrs. ago', issue: { id: 2, name: 'HUGE ISSUE HERE', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] } },
    { author: { name: 'M.C. Misk' }, comment: 'BWAP', timestamp: '3 hrs. ago', issue: { id: 3, name: 'OMFG there is a huge issue', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] } },
    { author: { name: 'M.C. Misk' }, comment: 'BWAP', timestamp: '3 hrs. ago', issue: { id: 5, name: 'I have a bad feeling about this', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] } },
    { author: { name: 'M.C. Misk' }, comment: 'BWAP', timestamp: '3 hrs. ago', issue: { id: 6, name: 'Woah', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] } },
]

export const templateNames = ['Elegant Minimalist', 'Vibrant Spectrum', 'Coastal Retreat', 'Urban Chic', 'Modern Fusion', 'Serene Zen', 'Retro Remix', 'Botanical Bliss', 'Timeless Elegance', 'Industrial Edge', 'Whimsical Wonderland', 'Cosmic Dreams', 'Rustic Charm', 'Eclectic Fusion', 'Art Deco Glam', 'Tropical Paradise', 'Nordic Haven', 'Boho Chic', 'Geometric Harmony', 'Vintage Vibe']

export const Issues: Issue[] = [
    { id: 1, name: 'Issue text', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 2, name: 'HUGE ISSUE HERE', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 3, name: 'OMFG there is a huge issue', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 4, name: 'Woah looks like we have an issue', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 5, name: 'I have a bad feeling about this', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 6, name: 'Woah', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
]