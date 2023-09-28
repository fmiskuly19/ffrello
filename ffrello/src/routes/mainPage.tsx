import Navbar from "../components/nav/navbar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import CreateWorkspaceModal from "../components/modals/createWorkspaceModal";
import { getUserWorkspaces } from "../redux/userSlice";
import { ApiCallStatus } from "../types/ApiCallStatus";

const MainPage = () => {

    const dispatch = useAppDispatch();
    const workspaceStatus = useAppSelector((state) => state.userSlice.workspaceStatus);
    if (workspaceStatus == ApiCallStatus.Idle) {
        dispatch(getUserWorkspaces('fwank'));
    }

    return (
        <>
            <Navbar />
            <Outlet />
            <CreateWorkspaceModal />
        </>
    )
}

export default MainPage;