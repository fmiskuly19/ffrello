//using this hardcoded file until i hook this up to an api to supply data

import Board from "../types/Board"
import HomePageHighlight from "../types/HomePageHighlight"
import BoardIssueCard from "../types/BoardIssueCard"
import Workspace from "../types/Workspace";

const getRand = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max - min));
}


export const getBoards = (numBoards: number) => {

    const workspaces = [
        { id: 1, name: 'Frank Workspace' },
        { id: 2, name: 'Catherine Workspace' },
        { id: 3, name: 'M.C. Workspace' },
        { id: 4, name: 'Project Workspace' }
    ]

    const BoardNames = [
        'Epic Expedition Board',
        'Bug Battlefront',
        'Feature Frenzy Forge',
        'User Story Universe',
        'Sprint Symphony Stage',
        'Task Trekker Terrain',
        'Backlog Odyssey',
        'Velocity Voyage Board',
        'Scrum Saga Station',
        'Agile Adventure Arena',
        'Innovation Island',
        'Code Crusade Cove',
        'Iteration Isle',
        'Challenge Chamber',
        'Workflow Wonderland',
        'Feature Frontier',
        'Storyboard Safari',
        'Bug Bounty Bay',
        'Task Tracker Trail',
        'User Journey Junction'
    ]

    const boards: Board[] = [];

    for (var i = 0; i < numBoards; i++) {
        boards.push({ id: i, name: BoardNames[i], Workspace: workspaces[getRand(0, workspaces.length - 1)], isStarred: i === 1 ? true : false })
    }

    return boards;
}

export const hardCodedBoards = getBoards(10);

export const workspaces: Workspace[] = [
    { id: 1, name: 'Frank', boards: getBoards(2) },
    { id: 2, name: 'Catherine', boards: getBoards(3) },
    { id: 3, name: 'M.C.', boards: getBoards(1) },
    { id: 4, name: 'Project', boards: [] }
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

export const Issues: BoardIssueCard[] = [
    { id: 1, name: 'Issue text', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 2, name: 'HUGE ISSUE HERE', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 3, name: 'OMFG there is a huge issue', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 4, name: 'Woah looks like we have an issue', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 5, name: 'I have a bad feeling about this', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
    { id: 6, name: 'Woah', comments: ["", "", ""], attachments: ["links", "links", "links"], users: [""] },
]