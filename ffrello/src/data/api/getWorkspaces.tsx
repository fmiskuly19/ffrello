//homepage view data
//gets workspaces and their boards with ids and names

const host = "https://localhost:7135"
const target = "/api/workspaces/";

const GetWorkspaces = async () => {
    return await fetch(`${host}${target}`)
        .then((response) => {
            if (response.ok) return response.json();
            else return Promise.reject(`Could not get workspaces`);
        })
        .then((result) => {
            console.log('GetWorkspaces result')
            console.log(result); //why do I have to do this?
            return result;
        })
        .catch((err) =>
            Promise.reject(
                `Could not get workspaces. Error: ${err}`
            )
        );
};

export default GetWorkspaces;
