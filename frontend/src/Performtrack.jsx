import React, { useEffect, useState } from "react";
import "../styles/Performtrack.css";
import SpotifyWebApi from "spotify-web-api-node";
import Content from "./Content.jsx";
import All from "./All.jsx";
import Playlists from "./Playlists.jsx";
import Artists from "./Artists.jsx";
import Albums from "./Albums.jsx";
import Home from "./Home.jsx";
import Playlistdetail from "./Playlistdetail.jsx";
import AlbumsDetail from "./AlbumsDetail.jsx";
function Performtrack({home,setSearch,setAlbumDetailImage,setAlbumdetail,Albumdetail,search,setSearchResult,setHome,setplaylistDetail, setIsTrackDiscripVisible,setselectedSong,playlistDetail,currAccessToken,searchPlaylists, searchResult, settrackdescrip,searchAlbums,searchArtists,searchEpisodes,searchshow }) {
  const [activeComponent, setactiveComponent] = useState([]);
  const [popularAlbums, setpopularAlbums] = useState([]);
  const [music,setMusic] = useState([]);
  const Client_Id="1c25fe1a10d24783afb0875502548b7b"

 console.log("Albumdetail in performtrack",Albumdetail);
 console.log("playlistDetail in performtrack",playlistDetail);
  const [mca,setMca]=useState([]);
  const spotifyApi = new SpotifyWebApi({
    clientId:Client_Id,
  });
  useEffect(() => {
    if (!currAccessToken) return;
    spotifyApi.setAccessToken(currAccessToken);

    spotifyApi
      .getNewReleases({ limit: 30, offset: 0, country: "IN" })
      .then((res) => {
        setpopularAlbums(res.body.albums.items);
      })
      .catch((err) => {
        console.error("Error fetching new releases:", err);
        setpopularAlbums([]);
      });

    // Fetch artist albums
    spotifyApi
      .getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE", { limit: 30, offset: 0 })
      .then((res) => {
        setMusic(res.body.items);
      })
      .catch((err) => {
        console.error("Error fetching top tracks:", err);
        setMusic([]);
      });
    
  }, [currAccessToken]);
  
  useEffect(() => {
  
    
    if(home){
        console.log("home button clicked");
        setplaylistDetail();
        setHome(false);
        setSearchResult([]);
        setSearch("");
       
      }

    
    if( searchResult.length > 0){ 
      setactiveComponent(<All settrackdescrip={settrackdescrip} Albumdetail={Albumdetail} setAlbumdetail={setAlbumdetail} setIsTrackDiscripVisible={setIsTrackDiscripVisible} setselectedSong={setselectedSong}   searchResult={searchResult} popularAlbums={popularAlbums} searchAlbums={searchAlbums} searchArtists={searchArtists} searchEpisodes={searchEpisodes} searchshow={searchshow} />);
      
      setHome(false);
    }
    if(Albumdetail){
      setactiveComponent(<AlbumsDetail  setAlbumDetailImage={setAlbumDetailImage} Albumdetail={Albumdetail} currAccessToken={currAccessToken} settrackdescrip={settrackdescrip} setIsTrackDiscripVisible={setIsTrackDiscripVisible} setselectedSong={setselectedSong}/>)
    }
  }, [searchResult,home,Albumdetail,currAccessToken]);

  const handleSongsClick = () => {
    if (searchResult && searchResult.length > 0) {
      setactiveComponent(
        searchResult.map((track) => (
          <Content track={track} key={track.uri} setIsTrackDiscripVisible={setIsTrackDiscripVisible} settrackdescrip={settrackdescrip} setselectedSong={setselectedSong} />
        ))
      );
    }
  };
  
  return (
    <>
    <div className="perfrom">

      {searchResult.length > 0 && activeComponent ? (
        <>
          <div className="category">
            <button onClick={()=>setactiveComponent(<All setIsTrackDiscripVisible={setIsTrackDiscripVisible} setselectedSong={setselectedSong} setplaylistDetail={setplaylistDetail}  settrackdescrip={settrackdescrip} searchResult={searchResult} popularAlbums={popularAlbums} searchAlbums={searchAlbums} searchArtists={searchArtists} searchEpisodes={searchEpisodes} searchshow={searchshow} />)}>All</button>
            <button onClick={()=>setactiveComponent(<Playlists setSearchResult={setSearchResult} settrackdescrip={settrackdescrip} setselectedSong={setselectedSong}  setplaylistDetail={setplaylistDetail} searchPlaylists={searchPlaylists} setIsTrackDiscripVisible={setIsTrackDiscripVisible}/>)}>Playlist</button>
            <button onClick={handleSongsClick}>Songs</button>
            <button onClick={()=>setactiveComponent(<Albums  setAlbumDetailImage={setAlbumDetailImage} setselectedSong={setselectedSong}  searchAlbums={searchAlbums} settrackdescrip={settrackdescrip} setIsTrackDiscripVisible={setIsTrackDiscripVisible} setplaylistDetail={setplaylistDetail}/>)}>Albums</button>
            <button onClick={()=>setactiveComponent(<Artists  setselectedSong={setselectedSong} searchArtists={searchArtists} setIsTrackDiscripVisible={setIsTrackDiscripVisible} />)}>Artists</button>
          </div>
          {activeComponent}
        </>
      ) : (
          !Albumdetail && search=== "" ?(
            <Home settrackdescrip={settrackdescrip} setIsTrackDiscripVisible={setIsTrackDiscripVisible} setselectedSong={setselectedSong} music={music} popularAlbums={popularAlbums}/>
        ):(
        
         playlistDetail && (
            <Playlistdetail Albumdetail={Albumdetail} currAccessToken={currAccessToken} playlistDetail={playlistDetail} setselectedSong={setselectedSong} settrackdescrip={settrackdescrip} setIsTrackDiscripVisible={setIsTrackDiscripVisible}  />
      
          )
        
       
          
        )
      )}
      </div>
      
    </>
  );
}
export default Performtrack;