import { enqueueSnackbar } from "notistack";
import { getBoard, getUserWorkspaceArgs, newBoardArgs, newWorkspaceArgs, removeWorkspaceArgs } from "../redux/userSlice";
import { addNewCardArgs, getCardArgs, moveCardArgs, newBoardListArgs, removeBoardListArgs, starBoardArgs } from "../redux/workspaceViewSlice";

const API_HOST_URL = import.meta.env.VITE_FFRELLO_API_ENDPOINT;
const isDev = import.meta.env.MODE == "development"

// #region Authentication

export const AuthenticateWithApiAfterGoogleSignIn = async (googleUserAccessToken: string) => {
    const target = "auth/google-signin/";
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accessToken: googleUserAccessToken }),
    })
        .then((response) => {
            if (response.ok) {
                enqueueSnackbar("Logged into FFrello!", { variant: "success" })
                return response.json();
            }
            else {
                enqueueSnackbar("Could not authenticate FFrello account", { variant: "error" })
                return Promise.reject();
            }
        })
        .catch((err) => {
            enqueueSnackbar("Could not authenticate FFrello account", { variant: "error" })
            if (isDev) console.log(`Error authenticating with FFrello api: ${err}`);
            //must return a promise so the async thunk changes state!
            return Promise.reject();
        });
}

// #endregion

// #region user data

export const DummyApiCall = async () => {
    const target = "/api/dummy/";
    return await fetch(`${API_HOST_URL}${target}`)
        .then((response) => {
            if (response.ok) return response.json();
            else return Promise.reject(`Could not get dummy method`);
        })
        .catch((err) => {
            return Promise.reject(
                `Could not get dummy method. Error: ${err}`
            )
        });
}

// #region workspaces

//
export const GetWorkspacesApiCall = async (data: getUserWorkspaceArgs, thunkAPI: any) => {
    const target = `${data.userId}/workspaces/`;
    return await fetch(`${API_HOST_URL}${target}`, {
        headers: {
            "Authorization": `Bearer ${data.accessToken}`
        },
        signal: thunkAPI.signal,
    }).then((res) => {
        if (res.ok) return res.json();
        else {
            if (isDev) {
                console.log(`Error getting workspaces. Status Code: ${res.status}. Text: ${res.statusText}`)
                enqueueSnackbar("Error getting workspaces, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error getting workspaces: ${err}`)
            enqueueSnackbar("Error getting workspaces, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

//
export const NewWorkspaceApiCall = async (data: newWorkspaceArgs, thunkAPI: any) => {
    const target = `${data.userid}/workspace/new`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) return res.json();
        else {
            if (isDev) {
                console.log(`Error creating new workspace. Status Code: ${res.status}. Text: ${res.statusText}`)
                enqueueSnackbar("Error creating new workspace, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error creating new workspace: ${err}`)
            enqueueSnackbar("Error creating new workspace, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};


//
export const RemoveWorkspace = async (data: removeWorkspaceArgs, thunkAPI: any) => {
    const target = `${data.userid}/workspace/remove/${data.workspaceid}`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar("Success removing workspace", { variant: "success" });
            return res.json();
        }
        else {
            if (isDev) {
                console.log(`Error removing workspace. Status Code: ${res.status}. Text: ${res.statusText}`);
                enqueueSnackbar("Error removing workspace, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error removing workspace: ${err}`);
            enqueueSnackbar("Error removing workspace, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

// #endregion

// #region Boards

export const NewBoardApiCall = async (data: newBoardArgs, thunkAPI: any) => {
    const target = `${data.userid}/board/new`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar("Success creating new Board", { variant: "success" });
            return res.json();
        }
        else {
            if (isDev) {
                console.log(`Error creating new Board. Status Code: ${res.status}. Text: ${res.statusText}`);
                enqueueSnackbar("Error creating new Board, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error creating new Board: ${err}`);
            enqueueSnackbar("Error creating new Board, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

export const StarBoardApiCall = async (data: starBoardArgs, thunkAPI: any) => {
    const target = `${data.userId}/board/star/${data.boardId}`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            return Promise.resolve();
        }
        else {
            throw new Error('Did not star Board');
        }
    });
};

export const GetBoardApiCall = async (data: getBoard, thunkAPI: any) => {
    const target = `${data.userid}/getBoard/${data.boardid}`;
    return await fetch(`${API_HOST_URL}${target}`, {
        headers: {
            "Authorization": `Bearer ${data.accessToken}`
        },
        signal: thunkAPI.signal,
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar("Success getting Board", { variant: "success" });
            return res.json();
        }
        else {
            if (isDev) {
                console.log(`Error getting Board. Status Code: ${res.status}. Text: ${res.statusText}`);
                enqueueSnackbar("Error getting Board, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error getting Board: ${err}`);
            enqueueSnackbar("Error getting Board, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

export const NewBoardListApiCall = async (data: newBoardListArgs, thunkAPI: any) => {
    const target = `${data.userid}/newBoardList/`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar("Success creating Board List", { variant: "success" });
            return res.json();
        }
        else {
            if (isDev) {
                console.log(`Error creating Board List. Status Code: ${res.status}. Text: ${res.statusText}`);
                enqueueSnackbar("Error creating Board List, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error creating Board List: ${err}`);
            enqueueSnackbar("Error creating Board List, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

export const RemoveBoardListApiCall = async (data: removeBoardListArgs, thunkAPI: any) => {
    const target = `${data.userId}/boardList/remove/${data.boardListId}`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar("Success removing Board List", { variant: "success" });
            //return a resolved promise, there is no json response to return
            return Promise.resolve();
        }
        else {
            if (isDev) {
                console.log(`Error removing Board List. Status Code: ${res.status}. Text: ${res.statusText}`);
                enqueueSnackbar("Error removing Board List, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error removing Board List: ${err}`);
            enqueueSnackbar("Error removing Board List, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

// #endregion

// #region cards

export const NewCardApiCall = async (data: addNewCardArgs, thunkAPI: any) => {
    const target = `${data.userid}/card/new`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar("Success creating new card", { variant: "success" });
            return res.json();
        }
        else {
            if (isDev) {
                console.log(`Error creating new card. Status Code: ${res.status}. Text: ${res.statusText}`);
                enqueueSnackbar("Error creating new card, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error creating new card: ${err}`);
            enqueueSnackbar("Error creating new card, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

//TODO this is not set up for auth
export const MoveCardApiCall = async (data: moveCardArgs, thunkAPI: any) => {
    const target = `${data.userid}/card/move`;
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
            throw new Error('Did not move card');
        }
    });
};

export const GetCardApiCall = async (data: getCardArgs, thunkAPI: any) => {
    const target = `${data.userid}/card/${data.cardId}`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar("Success getting card", { variant: "success" });
            return res.json();
        }
        else {
            if (isDev) {
                console.log(`Error cgetting card. Status Code: ${res.status}. Text: ${res.statusText}`);
                enqueueSnackbar("Error getting card, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error getting card: ${err}`);
            enqueueSnackbar("Error getting card, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

// #endregion

export const GetWorkspaceHighlights = async () => {
    return DummyApiCall();
};

export const GetHomepageHighlights = async () => {
    return DummyApiCall();
};

export const GetWorkspaceMembers = async () => {
    return DummyApiCall();
};

export const GetWorkspaceSettings = async () => {
    return DummyApiCall();
};

// #endregion

