import React from "react";
import "../styles/Performtrack.css"
import "../styles/home.css"

function Home({settrackdescrip,setIsTrackDiscripVisible,setselectedSong,music,popularAlbums}){

    return(
        <div className="perfrom-track">
          {/* Popular Albums */}
          <div className="playlist">
            <div className="playlist-name">
              <h1>Songss</h1>
            </div>
            <div className="playlist-items">
              {popularAlbums && popularAlbums.length > 0 ? (
                popularAlbums.map((album) => (
                  <div
                  className="playlist-single-div"
                  key={album.id}
                  onClick={() => {settrackdescrip(album),setIsTrackDiscripVisible(album),setselectedSong(album)}}
                  >
                    <div className="playlist-item-img">
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

          {/* Music */}
          <div className="music">
            <div className="playlist">
              <div className="playlist-name">
                <h1>Music</h1>
              </div>
              <div className="playlist-items">
                {music && music.length > 0 ? (
                  music.map((track) => (
                    <div
                    className="playlist-single-div"
                      key={track.id}
                      onClick={() => {settrackdescrip(track),setIsTrackDiscripVisible(track),setselectedSong(track)}}
                      >
                      <div className="playlist-item-img">
                        <img src={track.images[0]?.url} alt={track.name} />
                      </div>
                      <div className="playlist-item-details">
                        <p>{track.name}</p>
                        <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No top tracks</div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      
        
    )

}
export default Home;