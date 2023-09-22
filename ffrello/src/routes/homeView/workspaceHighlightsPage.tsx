import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/navSlice"
import { useParams } from "react-router-dom";
import GetWorkspaceHighlights from "../../data/api/getWorkspaceHighlights";
import { Box, CircularProgress } from "@mui/material";

const WorkspaceHighlightsPage = () => {

    let { workspaceid } = useParams();

    const dispatch = useAppDispatch()

    const [workspaceHighlights, setWorkspaceHighlights] = useState<any[] | undefined>(undefined)

    useEffect(() => {
        dispatch(setSelectedMenu(''))
        dispatch(setSelectedWorkspaceMenu(`Highlights-${workspaceid}`))

        const getWorkspaceHighlights = async () => {
            return await GetWorkspaceHighlights().then(() => {
                setWorkspaceHighlights([])
            })
        }

        getWorkspaceHighlights();
    }, [])

    return (
        <>
            {workspaceHighlights != undefined ?
                <>Hello Workspace Highlights</>
                :
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            }
        </>
    )
}

export default WorkspaceHighlightsPage;