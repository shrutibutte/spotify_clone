import React, { useEffect, useState } from 'react'
import Login from './Login';
import "./App.css";
import { getTokenFromUrl } from './spotify';
import Player from "./Player"
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();


function App() {
  const [token, setToken] = useState(null);
  const [{ user, playlists }, dispatch] = useDataLayerValue();
  // const [dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        console.log('user', user);
        dispatch({  
          type: 'SET_USER',
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,

        });
      });

      spotify.getPlaylist('4yJzNIoNknZHcMRsvjAssJ').then(response => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      }
      )

     


    }
  }, []);
  // console.log("I have a token >>>", token);

  return (
    <div className='app'>
      {/* {token ? <Player /> 
      : <Login />} */}
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  )
}

export default App


// 3:44 min