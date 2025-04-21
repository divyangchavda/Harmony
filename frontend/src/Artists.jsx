import React from "react";
import "../styles/Performtrack.css"
import '../styles/All.css';
import "../styles/Artists.css";

function Artists({searchArtists}){
    console.log("artists in serach:",searchArtists)
    return(
        <>
    <div className="playlists">
                <div className="playlist-name">
                    <h1>Artists</h1>
                </div>
                <div className="playlist-items-artists">
                    {searchArtists && searchArtists.length > 0 ? (
                        searchArtists.map((album) => (
                    <div
                        className="playlist-single-divs"
                        key={album.id}
                        onClick={() => settrackdescrip(album)}
                        >
                    <div className="playlist-artist-imgs">
                      <img src={album.images[0]?.url} alt={album.name} />
                    </div>
                    <div className="playlist-item-detailss">
                      <p>{album.name}</p>
                      
                    </div>
                  </div>
                ))
              ) : (
                <div>No new releases</div>
              )}
            </div>
          </div>
</>
)
}
export default Artists;