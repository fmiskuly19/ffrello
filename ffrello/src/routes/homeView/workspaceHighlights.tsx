import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/navSlice"
import { useParams } from "react-router-dom";

const WorkspaceHighlightsPage = () => {

    let { workspaceid } = useParams();

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setSelectedMenu(''))
        dispatch(setSelectedWorkspaceMenu(`Highlights-${workspaceid}`))
    })

    return (
        <>Workspace Highlights</>
    )
}

export default WorkspaceHighlightsPage;