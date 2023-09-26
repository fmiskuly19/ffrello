import { useEffect } from "react"
import { useAppDispatch } from "../../hooks"
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/homeSlice"
import { useParams } from "react-router-dom";

const WorkspaceHomePage = () => {

    let { workspaceid } = useParams();

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setSelectedMenu(''))
        dispatch(setSelectedWorkspaceMenu(`Boards-${workspaceid}`))
    })

    return (
        <>
            Workspace Home Page
        </>
    )
}

export default WorkspaceHomePage;