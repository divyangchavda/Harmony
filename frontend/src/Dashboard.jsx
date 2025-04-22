import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import Auth from "./Auth.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import Mylibrary from "./Mylibrary.jsx";
import Performtrack from "./Performtrack.jsx";
import Trackdiscrip from "./Trackdiscrip.jsx";
import Player from "./Player.jsx";

function Dashboard({ code }) {
    const Client_Id="3deb2b64a9c04861b3ea982dada2a6c4"
    console.log("Client_Id",Client_Id);
    const spotifyApi = new SpotifyWebApi({
        clientId:Client_Id,
    });

    const [home,setHome]=useState();
    const [currAccessToken, setCurrAccessToken] = useState(null);
    const [selectedSong,setselectedSong] = useState(null);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchAlbums, setSearchAlbums] = useState([]);
    const [searchArtists, setSearchArtists] = useState();
    const [searchEpisodes, setSearchEpisodes] = useState([]);
    const [searchshow, setSearchshow] = useState([]);
    const [AlbumDetailImage,setAlbumDetailImage] = useState([]);
    const [searchPlaylists, setsearchPlaylists] = useState([]);
    const [trackdescrip, settrackdescrip] = useState();
    const [isTrackDiscripVisible, setIsTrackDiscripVisible] = useState(true); 
    const [playlistDetail,setplaylistDetail]=useState();
    const[Albumdetail,setAlbumdetail]=useState();
    const albums = Array.isArray(trackdescrip) ? trackdescrip : trackdescrip ? [trackdescrip] : [];
    const track = Array.isArray(trackdescrip) ? trackdescrip : trackdescrip ? [trackdescrip] : [];


    
    useEffect(() => {
        if (!search) return setSearchResult([]);
        if (!currAccessToken) return;

        spotifyApi.setAccessToken(currAccessToken);

        spotifyApi.searchTracks(search)
            .then(res => setSearchResult(res.body.tracks.items))
            .catch(err => console.error("Error searching tracks:", err));

        spotifyApi.searchAlbums(search)
            .then(res => setSearchAlbums(res.body.albums.items))
            .catch(err => console.error("Error searching albums:", err));

        spotifyApi.searchArtists(search)
            .then(res => setSearchArtists(res.body.artists.items))
            .catch(err => console.error("Error searching artists:", err));

        spotifyApi.searchEpisodes(search)
            .then(res => setSearchEpisodes(res.body.episodes.items))
            .catch(err => console.error("Error searching episodes:", err));

        spotifyApi.searchShows(search)
            .then(res => setSearchshow(res.body.shows.items))
            .catch(err => console.error("Error searching shows:", err));

        spotifyApi.searchPlaylists(search, { limit: 30, offset: 0 })
            .then(res => setsearchPlaylists(res.body.playlists.items))
            .catch(err => console.error("Error searching playlists:", err));
        
    }, [search, currAccessToken]);

    return (
        <>
            <div className="Main">
                <div className="header">
                    <div className="logo">
                        <h1><b>HARMONY</b></h1>
                    </div>
                    <div className="search-home">
                        <button onClick={()=>setHome(true)}><i class="fa-solid fa-house fa-xl"></i></button>
                        <input
                            type="text"
                            value={search}
                            placeholder="Search something"
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ padding: "15px 150px" }}
                        />
                    </div>
                    <div className="profile">
                        <button>
                            <i className="fa-solid fa-user fa-2xl"></i>
                        </button>
                    </div>
                </div>

                <div className="centerdiv">
                    <div className="my-library">
                        <Mylibrary currAccessToken={currAccessToken} setplaylistDetail={setplaylistDetail} settrackdescrip={settrackdescrip} setIsTrackDiscripVisible={setIsTrackDiscripVisible} setselectedSong={setselectedSong}/>
                    </div>
                    <div className="perform">
                            <Performtrack  
                            search={search}
                            currAccessToken={currAccessToken}
                            searchPlaylists={searchPlaylists}
                            searchshow={searchshow}
                            
                            searchEpisodes={searchEpisodes}
                            searchArtists={searchArtists}
                            searchResult={searchResult}
                            settrackdescrip={settrackdescrip}
                            track={track}
                            searchAlbums={searchAlbums}
                            setIsTrackDiscripVisible={setIsTrackDiscripVisible}
                            playlistDetail={playlistDetail}
                            setselectedSong={setselectedSong}
                            setHome={setHome}
                            home={home}
                            setplaylistDetail={setplaylistDetail}
                            setSearch={setSearch}
                            setSearchResult={setSearchResult}
                            Albumdetail={Albumdetail}
                            setAlbumdetail={setAlbumdetail}
                            setAlbumDetailImage={setAlbumDetailImage}
                        />        
                        {/* <Playlistdetail playlistDetail={playlistDetail} /> */}
                        {isTrackDiscripVisible && (
                            <div className="trackdiscrip">
                                <Trackdiscrip
                                    trackdescrip={albums}
                                    AlbumDetailImage={AlbumDetailImage}
                                    onClose={() => setIsTrackDiscripVisible(false)

                                    } 
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="track-div">
                    {/* <Trackdiv /> */}
                    <Player currAccessToken={currAccessToken}  trackUri={selectedSong?.uri}/>
                    
                </div>
            </div>
            <Auth code={code} setCurrAccessToken={setCurrAccessToken} />
        </>
    );
}

export default Dashboard;
