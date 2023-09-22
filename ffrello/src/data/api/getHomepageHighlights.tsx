//api call that just sleeps for 3 seconds, use for loading

const host = "https://localhost:7135"
const target = "/api/dummy/"; //TODO implement

const GetHomepageHighlights = async () => {
    return await fetch(`${host}${target}`)
        .then((response) => {
            if (response.ok) return response.json();
            else return Promise.reject(`Could not get dummy method`);
        })
        .catch((err) =>
            Promise.reject(
                `Could not get dummy method. Error: ${err}`
            )
        );
};

export default GetHomepageHighlights;