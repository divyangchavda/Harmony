import React, { useState } from "react";
import ReactPlayer from "react-player";
import '../styles/Content.css'
function Content({ track,settrackdescrip }) {
    const [play, setPlay] = useState(false);

    const handlePlay = () => {
        setPlay(true);
    };

    return (
        <>
       
        <div className="trackhome" onClick={()=>settrackdescrip(track)}>
            <img src={track.album.images[0]?.url} style={{ width: '80px', height: '80px' }} alt="Album" />
            <div className="trackdes">
                <div className="trackname">{track.name}</div>
                <div className="trackartist">{track.artists[0].name}</div>
                {track.preview_url ? (
                    <>
                        <button onClick={handlePlay}>Play Preview</button>
                        {play && (
                            <ReactPlayer
                                url={track.preview_url}
                                playing
                                controls
                                width="300px"
                                height="50px"
                            />
                        )}
                    </>
                ) : (
                    <div className="no-preview">Preview not available</div>
                )}
            </div>
        </div>
        
       

        </>
    );
}

export default Content;
