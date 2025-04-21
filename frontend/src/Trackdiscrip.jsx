
import React, { useState } from "react";
import "../styles/Trackdiscrip.css";

function Trackdiscrip({ trackdescrip, onClose,AlbumDetailImage }) {
    if (!trackdescrip || trackdescrip.length === 0) {
        return <p></p>;
    }

    return (
        <>
            {trackdescrip.map((album) => (
                <div className="song-info" key={album.id}>
                    <button onClick={onClose}>
                        <i className="fa-solid fa-xmark fa-xl"></i>
                    </button>
                    {/* {AlbumDetailImage ? (
                        <img
                            src={AlbumDetailImage}
                            alt={album.name || "Album Image"}
                        />
                    ) :(
                        <img
                            src={album.images && album.images[0]
                                ? album.images[0]?.url
                                : album.album.images[0]?.url
                            }
                            alt={album.name || "Album Image"}
                        />
                    )} */}
                    <img
                        src={
                            album.images && album.images[0]
                                ? album.images[0]?.url
                                : album.album.images[0]?.url
                        }
                        alt={album.name || "Album Image"}
                    />
                    <div className="song-descrip">
                        <p>{album.name}</p>
                        <p>
                            {album.artists && album.artists[0]
                                ? album.artists[0].name
                                : "Unknown Artist"}
                        </p>
                        <p>{album.release_date}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Trackdiscrip;
