interface FCard {
    id?: number,
    boardListId: number,
    title: string,
    description?: string,
    comments?: string[],
    attachments?: string[],
    users?: string[],
    checklistItems?: string[],
}

export default FCard;