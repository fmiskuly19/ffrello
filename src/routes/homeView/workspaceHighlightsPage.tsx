import { useEffect, useState } from "react"
import { useAppDispatch } from "../../hooks"
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/homeSlice"
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { SkeletonHighlightCard } from "../../components/material-ui-cards/highlightCard";

const WorkspaceHighlightsPage = () => {

    let { workspaceid } = useParams();

    const dispatch = useAppDispatch()

    const [workspaceHighlights, setWorkspaceHighlights] = useState<any[] | undefined>(undefined)

    useEffect(() => {
        dispatch(setSelectedMenu(''))
        dispatch(setSelectedWorkspaceMenu(`Highlights-${workspaceid}`))

        // const getWorkspaceHighlights = async () => {
        //     return await GetWorkspaceHighlights().then(() => {
        //         setWorkspaceHighlights([])
        //     })
        // }

        // getWorkspaceHighlights();
    }, [])

    return (
        <>
            {workspaceHighlights != undefined ?
                <>Hello Workspace Highlights</>
                :
                <Stack direction="column" spacing={4}>
                    <SkeletonHighlightCard />
                </Stack>
            }
        </>
    )
}

export default WorkspaceHighlightsPage;