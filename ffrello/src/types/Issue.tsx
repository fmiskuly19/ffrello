interface Issue {
    id?: number,
    name: string,
    comments: string[],
    attachments: string[],
    users: string[]
}

export default Issue;