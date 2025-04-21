import React from "react";
import '../styles/Login.css'
const AUTH_URL="https://accounts.spotify.com/authorize?client_id=41718ba145cd477aa62bd5a48e0b6507&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative"

function Login(){
    return(
        <div className="Content">
            <a className="loginbtn" href={AUTH_URL}>Login With spotify</a>
        </div>
    )
}
export default Login