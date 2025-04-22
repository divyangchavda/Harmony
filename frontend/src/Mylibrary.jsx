import React,{useState,useEffect} from "react";
import '../styles/Mylibrary.css'
import SpotifyWebApi from "spotify-web-api-node";
import Playlistdetail from "./Playlistdetail";
function Mylibrary({currAccessToken,setplaylistDetail,settrackdescrip,setIsTrackDiscripVisible,setselectedSong}){
     const [playList,setplayList]=useState();
     const [track,setTracks]=useState([])
     const Client_Id="1c25fe1a10d24783afb0875502548b7b"
     const spotifyApi = new SpotifyWebApi({
          clientId:Client_Id,
     })
     useEffect(()=>{
          if(!currAccessToken) return;
          console.log("Access Token:", currAccessToken);

          spotifyApi.setAccessToken(currAccessToken);
          spotifyApi.getUserPlaylists()
               .then(res=>{
                    setplayList(res.body.items);
                     console.log("user playlist:",res.body.items);
                    })
     },[currAccessToken])
    
  
    return(
        <>
        <div className="lib-main">
          <div className="lib-main-div1">
               <div className=" lib-div1">
                    <h1>Your Library</h1>
                    <button><i class="fa-solid fa-plus fa-2xl"></i></button>
                    <button><i class="fa-solid fa-arrow-right fa-2xl"></i></button>
               </div>
               <div className="lib-div2">
                    <button>Playlists</button>
                    <button>Albums</button>
               </div>
          </div>
          <div>
               <div className="lib-main-div2">
                    <div className="serch-category">
                         <button><i class="fa-solid fa-magnifying-glass fa-2xl"></i></button>
                         <button><i class="fa-solid fa-list fa-2xl"></i></button>
                    </div>
                    <div className="lists" >
                         {
                              playList && playList.length>0? playList.map((item)=>(
                                   <div className="lists-item" key={item.id} onClick={()=>setplaylistDetail(item)} >
                                        <div className="lists-item-img">
                                             <img src={item.images[0].url} alt={item.name} />
                                        </div>
                                        <div className="lists-item-details">
                                             <h3>{item.name}</h3>
                                             <p>{item.owner.display_name}</p>
                                        </div>                 
                                   </div>
                              )):(
                                        <h1>Playlist not found</h1>
                              )
                         }
                    </div>
                    <div className="playlisthome">
                         {/* Add content for playlisthome here */}
                    </div>
               </div>
          </div>
       </div>
        </>)
}
export default Mylibrary;