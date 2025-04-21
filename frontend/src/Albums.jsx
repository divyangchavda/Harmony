import React from "react";
import "../styles/albums.css";
import "../styles/Performtrack.css";

function Albums({searchAlbums,settrackdescrip,setIsTrackDiscripVisible,setplaylistDetail,setSearchResult}){
    return(
        <>
            <div className="playlists">
                
                <div className="playlist-items-search">
                    {searchAlbums && searchAlbums.length > 0 ? (
                        searchAlbums.map((album) => (
                    <div
                        className="playlist-single-div-search"
                        key={album.id}
                        onClick={() => {settrackdescrip(album);setIsTrackDiscripVisible(album);}}
                        >
                    <div className="playlist-item-img_search">
                      <img src={album.images[0]?.url} alt={album.name} />
                    </div>
                    <div className="playlist-item-details">
                      <p>{album.name}</p>
                      <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
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
export default Albums;