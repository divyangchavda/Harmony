import React from "react";
import '../styles/Trackdiv.css';

function Trackdiv(){
    return(
        <>
            <div className="track-main">
                 <div className="track-div-1">
                        <div className="track-item">
                              <div className="track-item-img">
                                   <img src="spotifylogo.jpg" alt="not fetch" />
                              </div>
                              <div className="track-item-details">
                                   <p>Playlist</p>
                                   <p>10 songs</p>

                              </div>
                              
                         </div>
                </div> 
                <div className="track-div-2">
                    <div className="track-icon-1">
                                    <button><i class="fa-solid fa-shuffle fa-xl"></i></button>
                                    <button><i class="fa-solid fa-chevron-left fa-xl"></i></button>
                                    <button><i class="fa-solid fa-play fa-xl"></i></button>
                                    <button><i class="fa-solid fa-chevron-right fa-xl"></i></button>
                                    <button><i class="fa-solid fa-repeat fa-xl"></i></button>
                    </div>
                    <div className="track-icon-2">

                    </div>

                </div>
                <div className="track-div-3">
                    <button><i class="fa-solid fa-headphones fa-xl"></i></button>
                    <button><i class="fa-solid fa-microphone-slash fa-xl"></i></button>
                    <button><i class="fa-regular fa-audio-description fa-xl"></i></button>
                </div>
            </div>
        </>
    )

}
export  default Trackdiv;