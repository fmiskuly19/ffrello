import { getBoard, getWorkspaceArgs, newBoardArgs, newWorkspaceArgs, removeWorkspaceArgs } from "../redux/userSlice";

export const API_HOST_URL = "https://localhost:7135/api"

export const Dummy = async () => {
    const target = "/api/dummy/";
    return await fetch(`${API_HOST_URL}${target}`)
        .then((response) => {
            if (response.ok) return response.json();
            else return Promise.reject(`Could not get dummy method`);
        })
        .catch((err) =>
            Promise.reject(
                `Could not get dummy method. Error: ${err}`
            )
        );
}

export const GetWorkspaces = async (userid: string, thunkAPI: any) => {
    const target = `/${userid}/workspaces/`;
    return await fetch(`${API_HOST_URL}${target}`, {
        signal: thunkAPI.signal,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error('Did not get workspaces');
        }
    });
};

export const NewWorkspace = async (data: newWorkspaceArgs, thunkAPI: any) => {
    const target = `/${data.userid}/workspace/new`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error('Did not create new workspace');
        }
    });
};

export const NewBoard = async (data: newBoardArgs, thunkAPI: any) => {
    const target = `/${data.userid}/board/new`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error('Did not create new board');
        }
    });
};

export const GetBoardPage = async (data: getBoard, thunkAPI: any) => {
    const target = `/${data.userid}/getBoardPage/${data.boardid}`;
    return await fetch(`${API_HOST_URL}${target}`, {
        signal: thunkAPI.signal,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error('Did not get board page');
        }
    });
};

export const GetWorkspace = async (data: getWorkspaceArgs, thunkAPI: any) => {
    const target = `/${data.userid}/workspace/${data.workspaceid}`;
    return await fetch(`${API_HOST_URL}${target}`, {
        signal: thunkAPI.signal,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error('Did not get workspace');
        }
    });
};

export const RemoveWorkspace = async (data: removeWorkspaceArgs, thunkAPI: any) => {
    const target = `/${data.userid}/workspace/remove/${data.workspaceid}`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error('Did not delete new workspace');
        }
    });
};

export const GetWorkspaceHighlights = async () => {
    return Dummy();
};

export const GetHomepageHighlights = async () => {
    return Dummy();
};

export const GetWorkspaceMembers = async () => {
    return Dummy();
};

export const GetWorkspaceSettings = async () => {
    return Dummy();
};


