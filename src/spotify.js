// https://developer.spotify.com/
// documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "0d85f35d1d83424dab3561d8f9f2aa35";
// const responseType = "token";
// 1. click login button
// 2. redirect to spotify login page
// 3. redirect to home page onced logged in

const scopes = [ 
 "user-read-currently-playing", 
 "user-read-recently-played",
 "user-read-playback-state", 
 "user-top-read",
 "user-modify-playback-state",
  
];

export const getTokenFromUrl = () => {
    return window.location.hash    // window.location.hash gives us the access token mean # position
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        let parts = item.split('=');
        // #accessToken=mysupersecretkey&name=shruti
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial;
    },{});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
    )}&response_type=token&show_dialog=true`;
    