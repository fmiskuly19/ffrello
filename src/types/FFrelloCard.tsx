interface FFrelloCard {
    id?: number,
    boardListId: number,
    boardListName: string,
    title: string,
    description?: string,
    comments?: string[],
    attachments?: string[],
    users?: string[],
    checklistItems?: string[],
}

export default FFrelloCard;