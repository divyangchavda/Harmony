import React from "react";
// import "../styles/Performtrack.css";
import "../styles/playlists.css";
function Playlists({ searchPlaylists,setplaylistDetail,setSearchResult ,Albumdetail}) {
    return(
        <div className="playlistss">  
            <div className="playlist-items-search">
                {searchPlaylists && searchPlaylists.length > 0 ? (
                    searchPlaylists.map((album, index) => {                    
                        if (!album) return null;
                        return (
                            <div className="playlist-single-div-search" key={album.id || index} onClick={() => {setplaylistDetail(album);setSearchResult([]);console.log("album detail",album.id)}}>
                                <div className="playlist-item-img_search">
                                    <img src={album.images?.[0]?.url || '/default-image.jpg'} alt={album.name || 'Unknown Playlist'}/>
                                </div>
                                <div className="playlist-item-details">
                                    <p>{album.name || 'Unknown Playlist'}</p>
                                   
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No new releases</div>
                )}
            </div>
        </div>
    );
}
export default Playlists;
