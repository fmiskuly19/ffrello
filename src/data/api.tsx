import { enqueueSnackbar } from "notistack";
import { getBoard, getUserWorkspaceArgs, newBoardArgs, newWorkspaceArgs, removeWorkspaceArgs } from "../redux/userSlice";
import { addCardCommentArgs, addNewCardArgs, editCommentArgs, editDescriptionArgs, getCardArgs, moveCardArgs, newBoardListArgs, removeBoardListArgs, removeCommentArgs, starBoardArgs, watchCardArgs } from "../redux/workspaceViewSlice";

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
    const target = `workspaces/`;
    return await fetch(`${API_HOST_URL}${target}`, {
        headers: {
            "Authorization": `Bearer ${data.accessToken}`
        },
        signal: thunkAPI.signal,
    }).then((res) => {
        if (res.ok) return res.json();
        else {
            if (isDev) {
                console.log(`Error getting workspaces. Status Code: ${res.status}`)
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
    const target = `workspace/new`;
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
                console.log(`Error creating new workspace. Status Code: ${res.status}`)
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
    const target = `workspace/remove/${data.workspaceid}`;
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
                console.log(`Error removing workspace. Status Code: ${res.status}`);
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
    const target = `board/new`;
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
                console.log(`Error creating new Board. Status Code: ${res.status}`);
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
    const target = `board/star/${data.boardId}`;
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
    const target = `getBoard/${data.boardid}`;
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
                console.log(`Error getting Board. Status Code: ${res.status}`);
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
    const target = `newBoardList/`;
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
                console.log(`Error creating Board List. Status Code: ${res.status}`);
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
    const target = `boardList/remove/${data.boardListId}`;
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
                console.log(`Error removing Board List. Status Code: ${res.status}`);
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
    const target = `card/new`;
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
                console.log(`Error creating new card. Status Code: ${res.status}`);
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
    const target = `card/move`;
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
    const target = `card/${data.cardId}`;
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
                console.log(`Error cgetting card. Status Code: ${res.status}`);
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

export const WatchCardApiCall = async (data: watchCardArgs, thunkAPI: any) => {
    const target = `card/${data.cardId}/watch`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ watch: data.isWatching, cardId: data.cardId, userId: data.userId }),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar("Success watching card from api", { variant: "success" });
            return Promise.resolve();
        }
        else {
            if (isDev) {
                console.log(`Error watching card. Status Code: ${res.status}`);
                enqueueSnackbar("Error watching card, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error watching card: ${err}`);
            enqueueSnackbar("Error watching card, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

export const AddCardCommentApiCall = async (data: addCardCommentArgs, thunkAPI: any) => {
    const target = `card/comment/new`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardId: data.cardId, userId: data.userId, comment: data.comment }),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar("Success adding comment", { variant: "success" });
            return res.json();
        }
        else {
            if (isDev) {
                console.log(`Error adding comment. Status Code: ${res.status}`);
                enqueueSnackbar("Error adding comment, see log", { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error adding comment: ${err}`);
            enqueueSnackbar("Error adding comment, see log", { variant: "error" });
        }
        return Promise.reject();
    });
};

export const RemoveCommentApiCall = async (data: removeCommentArgs, thunkAPI: any) => {
    const target = `card/comment/remove`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ commentId: data.comment.id as number }),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar(`Success removing comment with id ${data.comment.id}`, { variant: "success" });
            return Promise.resolve();
        }
        else {
            if (isDev) {
                console.log(`Error removing comment with id ${data.comment.id}. Status Code: ${res.status}`);
                enqueueSnackbar(`Error removing comment with id ${data.comment.id}, see log`, { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error removing comment with id ${data.comment.id}: ${err}`);
            enqueueSnackbar(`Error removing comment with id ${data.comment.id}, see log`, { variant: "error" });
        }
        return Promise.reject();
    });
};

export const EditCommentApiCall = async (data: editCommentArgs, thunkAPI: any) => {
    const target = `card/comment/edit`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ commentId: data.originalComment.id as number, Value: data.newValue }),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar(`Success editing comment with id ${data.originalComment.id}`, { variant: "success" });
            return Promise.resolve();
        }
        else {
            if (isDev) {
                console.log(`Error editing comment with id ${data.originalComment.id}. Status Code: ${res.status}`);
                enqueueSnackbar(`Error editing comment with id ${data.originalComment.id}, see log`, { variant: "error" });
            }
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error editing comment with id ${data.originalComment.id}: ${err}`);
            enqueueSnackbar(`Error editing comment with id ${data.originalComment.id}, see log`, { variant: "error" });
        }
        return Promise.reject();
    });
};

export const EditDescriptionApiCall = async (data: editDescriptionArgs, thunkAPI: any) => {
    const target = `card/description/edit`;
    return await fetch(`${API_HOST_URL}${target}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${data.accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardId: data.cardId, Value: data.newValue }),
        signal: thunkAPI.signal
    }).then((res) => {
        if (res.ok) {
            if (isDev) enqueueSnackbar(`Success editing description`, { variant: "success" });
            return Promise.resolve();
        }
        else {
            if (isDev) {
                console.log(`Error editing description. Status Code: ${res.status}`);
            }
            //show error editing description always
            enqueueSnackbar(`Error editing description`, { variant: "error" });
            return Promise.reject();
        }
    }).catch(err => {
        if (isDev) {
            console.log(`Error editing description: ${err}`);
            //why is this 
            enqueueSnackbar(`Error editing description, see log`, { variant: "error" });
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

