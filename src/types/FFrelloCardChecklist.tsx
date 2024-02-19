interface FFrelloCardChecklist {
    id: number,
    name: string,
    items: FFrelloCardChecklistItem[]
}

interface FFrelloCardChecklistItem {
    id: number,
    name: string,
    isChecked: boolean,
}