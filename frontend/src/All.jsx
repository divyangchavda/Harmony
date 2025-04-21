import React from 'react';
import '../styles/All.css';
import '../styles/Performtrack.css';


function All({setselectedSong,Albumdetail,setAlbumdetail,searchResult,searchArtists,searchAlbums,searchEpisodes,searchshow,setIsTrackDiscripVisible,settrackdescrip,setplaylistDetail}) {
  
  
    return (
        <>
        <div className='main'>
            <div className='serachResult'>
                <div className='search-name'>
                    <h1>Top Results</h1>
                    {searchResult.slice(0,1).map(track => {
                        return (
                            <>
                                <img src={track.album.images[0]?.url} alt={track.name}/>
                                <h1 >{track.name}</h1>
                            </>
                        );
                    })}
                    
                    
                </div>
                <div className='search-list'>
                    <h1>Songs</h1>
                    <tbody>
                        {searchResult.slice(0,4).map((track) => (
                          <tr key={track.id} onClick={() => {settrackdescrip(track),setIsTrackDiscripVisible(track),setselectedSong(track)}}>
                                <td className='td-1'>
                                    <img src={track.album.images[0]?.url} alt={track.name} />
                                </td>
                                <td className='td-2'>
                                    <h3>{track.name}</h3>
                                    <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
                                </td>
                                <td  className='td-3'>
                                    <p>{Math.floor(track.duration_ms/60000)}:{(Math.floor(track.duration_ms%60000)/1000).toFixed(0)}</p>     
                                </td>
                            </tr>
                        ))}


                    </tbody>

                    
                    

                </div>
            </div>
            <div>
            <div className="playlist">
                <div className="playlist-name">
                    <h1>Albums</h1>
                </div>
                <div className="playlist-items">
                    {searchAlbums && searchAlbums.length > 0 ? (
                        searchAlbums.map((album) => (
                    <div
                        className="playlist-single-div"
                        key={album.id}
                        onClick={() => {settrackdescrip(album),setIsTrackDiscripVisible(album),setAlbumdetail(album)}}
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
            </div>
            <div>

            <div className="playlist">
                <div className="playlist-name">
                    <h1>Artists</h1>
                </div>
                <div className="playlist-items">
                    {searchArtists && searchArtists.length > 0 ? (
                        searchArtists.map((album) => (
                    <div
                        className="playlist-single-div"
                        key={album.id}
                        onClick={() => {settrackdescrip(album),setIsTrackDiscripVisible(album),setAlbumdetail(album)}}
                        >
                    <div className="playlist-artist-img">
                      <img src={album.images[0]?.url} alt={album.name} />
                    </div>
                    <div className="playlist-item-details">
                      <p>{album.name}</p>
                      
                    </div>
                  </div>
                ))
              ) : (
                <div>No new releases</div>
              )}
            </div>
          </div>

            </div>
            <div>
            <div className="playlist">
                <div className="playlist-name">
                    <h1>Episodes</h1>
                </div>
                <div className="playlist-items">
                    {searchEpisodes && searchEpisodes.length > 0 ? (
                        searchEpisodes.map((episode) => (
                    <div
                        className="playlist-single-div"                      
                        key={episode.id}
                        onClick={() => {settrackdescrip(album),setIsTrackDiscripVisible(album),setplaylistDetail(album)}}
                        >
                    <div className="playlist-item-img">
                      <img src={episode.images?.[0]?.url} alt={episode.name} />
                    </div>
                    <div className="playlist-item-details">
                      <p>{episode.name}</p>
                      
                    </div>
                  </div>
                ))
              ) : (
                <div>No new releases</div>
              )}
            </div>
          </div>

            </div>
        </div>
        </>
    )
}
export default All;