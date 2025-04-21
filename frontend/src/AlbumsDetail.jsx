import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/playlistdetail.css';

function AlbumsDetail({Albumdetail, setAlbumDetailImage,currAccessToken,settrackdescrip,setIsTrackDiscripVisible,setselectedSong}){
    const [tracks, setTracks] = useState([]);
    const Client_Id=process.env.Client_Id
    const spotifyApi = new SpotifyWebApi({
        Client_Id,
    });
    console.log("hey",currAccessToken);
    console.log("albumDetail in its component",Albumdetail.id);

    // useEffect(() => {
    //   if (!currAccessToken || !Albumdetail) return;
    //   spotifyApi.setAccessToken(currAccessToken);
    //   const AlbumlistId = Albumdetail.id;
    //   console.log("playlistId",AlbumlistId);
    //   spotifyApi.getPlaylistTracks(AlbumlistId)
    //     .then((response) => {
    //       const fetchedTracks = response.body.items; 
    //       setTracks(fetchedTracks); 
    //     })
    //     .catch((err) => console.error('Error fetching tracks:', err));
    // }, [currAccessToken, Albumdetail]); 
    useEffect(()=>{
        if(!currAccessToken) return;
        if(!Albumdetail) return;
        spotifyApi.setAccessToken(currAccessToken);
        const Albumid=Albumdetail.id
        spotifyApi.getAlbumTracks(Albumid)
        .then((res)=>{
            const fetchedTracks=res.body.items
            console.log("fetchedTracks",fetchedTracks);
            setTracks(fetchedTracks)
        })
    },[currAccessToken,Albumdetail])
  
    return (
        <div className="playlisthome">
        <div className='playlsitheader'>
    <img src={Albumdetail.images[0]?.url}></img>
    <div className='playlistinfo'>
      <p className='selectedplaylisttype'>{Albumdetail.type}</p>
      <span className='selectedplaylistname'>{Albumdetail.name}</span>
      <p className='selectedplaylistowner'>{Albumdetail.artists[0].name}</p>
    </div>
  </div>
  <table className="list-table">
         <thead  className='table-head'>
             <tr className='head-tr'>
                 <th className='playlistdetailheading-1' style={{paddingTop:'20px',paddingLeft:'10px'}}>#</th>
                 <th className='playlistdetailheading-2' style={{paddingTop:'20px'}}>Title</th>
             </tr>
         </thead>
         <tbody className="tbody"> 
        {tracks.length>0?(tracks.map((track,index)=>(
                <tr className="trackshover" key={track.uri} onClick={()=>{setselectedSong(track)}}>
                    <td className="playlistdetailitemname" style={{paddingLeft:'10px'}}>  {index+1}</td>
                    <td>
                        <div className="trackhome">
                            <img src={Albumdetail.images[0]?.url} style={{ width: '50px', height: '50px' ,borderRadius:'10px'}} alt="Album" />
                            <div className="trackdes"><span className="playlistdetailitemname">{track.name}</span><span className="fadeitemname">{track.artists[0].name}</span></div>
                        </div>
                    </td>
                </tr>
        ))):(<></>)}
        </tbody>
    </table>
    </div>
    );
  }

export default AlbumsDetail;