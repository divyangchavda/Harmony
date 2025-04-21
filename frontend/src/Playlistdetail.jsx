import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/playlistdetail.css';

function Playlistdetail({ playlistDetail,Albumdetail, currAccessToken,settrackdescrip,setIsTrackDiscripVisible,setselectedSong}) {
  const [tracks, setTracks] = useState([]);
  const Client_Id=process.env.Client_Id
  const spotifyApi = new SpotifyWebApi({
    Client_Id,
  });
  console.log("playlistDetail in its component",playlistDetail.id);
  useEffect(() => {
    if (!currAccessToken || !Albumdetail) return;
    spotifyApi.setAccessToken(currAccessToken);
    
    const albumlistId = Albumdetail.id;
    
    
    spotifyApi.getAlbumTracks(albumlistId)
      .then((response) => {
        const fetchedTracks = response.body.items      
        setTracks(fetchedTracks); 
        console.log("fetchedTracks");
      })
      .catch((err) => console.error('Error fetching tracks:', err));
})
  useEffect(() => {
    if (!currAccessToken || !playlistDetail) return;
    spotifyApi.setAccessToken(currAccessToken);
    
    const playlistId = playlistDetail.id;
    console.log("playlistId",playlistId);
    
    spotifyApi.getPlaylistTracks(playlistId)
      .then((response) => {
        const fetchedTracks = response.body.items.map((item) => item.track);      
        setTracks(fetchedTracks); 
        console.log("fetchedTracks");
      })
      .catch((err) => console.error('Error fetching tracks:', err));
  }, [currAccessToken, playlistDetail,Albumdetail]); 
  useEffect(()=>{
    console.log("tracks",tracks);
  },[tracks])
  return (
    <div className='playlisthome'>
      <div className='playlsitheader'>
        <img src={playlistDetail.images[0]?.url}></img>
        <div className='playlistinfo'>
          <p className='selectedplaylisttype'>{playlistDetail.type}</p>
          <span className='selectedplaylistname'>{playlistDetail.name}</span>
          <p className='selectedplaylistowner'>{playlistDetail.owner?.display_name || "Unknown"}</p>
        </div>
      </div>
      <table className='list-table'>
             <thead className='table-head'>
                <tr className='head-tr'>
                     <th className='playlistdetailheading-1' style={{paddingTop:'20px'}}>#</th>
                     <th className='playlistdetailheading-2' style={{paddingTop:'20px'}}>Title</th>
                     <th className='playlistdetailheading-3' style={{paddingTop:'20px'}}>Album</th>
                     <th className='playlistdetailheading-4' style={{paddingTop:'20px'}}>Duration</th>
                </tr>
             </thead>
             <tbody className="tbody"> 
            {tracks.length>0?(tracks.map((track,index)=>(
                    <tr className="trackshover" key={track.uri} onClick={() => {settrackdescrip(track);setIsTrackDiscripVisible(track);setselectedSong(track)}}>
                        <td className="td-1">  {index+1}</td>
                        <td className='td-2'>
                            <div className="trackhome">
                                <img src={track.album.images[0]?.url} style={{ width: '50px', height: '50px' ,borderRadius:'10px'}} alt="Album" />
                                <div className="trackdes"><span className="playlistdetailitemname">{track.name}</span><span className="fadeitemname">{track.artists[0].name}</span></div>
                            </div>
                        </td>
                        <td className='playlistdetailitemname'>{track.album.name}</td>
                        <td className='playlistdetailitemname'>{Math.floor(track.duration_ms/60000)}.
                            {Math.floor((track.duration_ms%60000)/1000).toFixed(0)}
                        </td>
                    </tr>
            ))):(<><h1>thega</h1></>)}
            </tbody>
        </table>
      </div>
  );
}

export default Playlistdetail;
