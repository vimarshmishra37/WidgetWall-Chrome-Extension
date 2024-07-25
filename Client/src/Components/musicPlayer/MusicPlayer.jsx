import React, { useState, useEffect } from 'react';
import './MusicPlayer.css'
import { ChevronLeft, ChevronRight, Play, Pause, SkipForward, SkipBack, Search } from 'lucide-react';
import SpotifyWebApi from "spotify-web-api-node"
import useAuth from './useAuth';

const spotifyApi = new SpotifyWebApi({
    clientId: "e82c3afad5e8496fbd5ae3a0912345ed",
})

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=e82c3afad5e8496fbd5ae3a0912345ed&response_type=code&redirect_uri=http://localhost:5173/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const MusicPlayer = ({ code }) => {
    // const accessToken = useAuth(code)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect(() => {
    //     if (!accessToken) return
    //     spotifyApi.setAccessToken(accessToken)
    // }, [accessToken])

    // useEffect(() => {
    //     if (!searchTerm) return setSearchResults([])
    //     if (!accessToken) return
    
    //     let cancel = false
    //     spotifyApi.searchTracks(searchTerm).then(res => {
    //       if (cancel) return
    //       setSearchResults(
    //         res.body.tracks.items.map(track => {
    //           const smallestAlbumImage = track.album.images.reduce(
    //             (smallest, image) => {
    //               if (image.height < smallest.height) return image
    //               return smallest
    //             },
    //             track.album.images[0]
    //           )
    
    //           return {
    //             artist: track.artists[0].name,
    //             title: track.name,
    //             uri: track.uri,
    //             albumUrl: smallestAlbumImage.url,
    //           }
    //         })
    //       )
    //     })
    
    //     return () => (cancel = true)
    //   }, [searchTerm, accessToken])

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     // Implement search functionality here
    //     console.log('Searching for:', searchTerm);
    // }

    if (!isAuthenticated) {
        return (
            <div className="music-player login-container">
                <a className="btn btn-success btn-lg" href={AUTH_URL}>
                    Login With Spotify
                </a>
            </div>
        );
    }

    return (
        <div className="music-player">
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit"><Search size={18} /></button>
                </form>
            </div>
            <div className="player-content">
                <div className="now-playing">
                    <img src="path/to/album-cover.jpg" alt="Album cover" className="album-cover" />
                    <div className="track-info">
                        <h2 className="track-title">Birthdays in July</h2>
                        <p className="artist-name">Leith</p>
                    </div>
                </div>
                <div className="controls">
                    <button className="control-btn"><SkipBack size={24} /></button>
                    <button className="control-btn play-pause"><Play size={24} /></button>
                    <button className="control-btn"><SkipForward size={24} /></button>
                </div>
                <div className="playlist">
                    {/* Placeholder for playlist items */}
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="playlist-item">
                            <img src={`path/to/playlist-cover-${item}.jpg`} alt={`Playlist item ${item}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;