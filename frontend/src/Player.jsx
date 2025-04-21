import React from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
function Player({currAccessToken,trackUri}){
    return(
    <SpotifyWebPlayer
    token={currAccessToken}
    showSaveIcon
    play={true}
    styles={
        {
            bgColor:" black",
            color:"white",
            loaderColor:"white",
            sliderColor:"green",
            sliderHandleColor:"white",
            trackArtistColor:"#ccc",
            trackNameColor:"white"
        }
    }
    uris={trackUri?[trackUri]:[]}

    />
)
}

export default Player