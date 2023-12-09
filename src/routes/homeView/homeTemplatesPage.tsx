import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { setSelectedMenu, setSelectedWorkspaceMenu } from "../../redux/homeSlice";

const TemplatesPage = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setSelectedMenu('Templates')) //set this so when we navigate here the left sidebar reflects that
        dispatch(setSelectedWorkspaceMenu(''))
    })

    return (
        <>
            <div>
                Hello this is the templates page
            </div >
        </>

    )
}

export default TemplatesPage;