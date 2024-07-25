import axios from 'axios';

const clientId = 'e82c3afad5e8496fbd5ae3a0912345ed';
const redirectUri = 'http://localhost:5173/callback';
const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
];

export const getAccessToken = () => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("spotify_access_token");
    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));
      token = params.get("access_token");
      window.location.hash = "";
      window.localStorage.setItem("spotify_access_token", token);
    }
    return token;
  };

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

spotifyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('spotify_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const authorize = () => {
  window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    '%20'
  )}&response_type=token&show_dialog=true`;
};

const getCurrentPlayingTrack = () => spotifyApi.get('me/player/currently-playing');

const playTrack = (deviceId, uris) => spotifyApi.put(`me/player/play?device_id=${deviceId}`, { uris });

const pauseTrack = (deviceId) => spotifyApi.put(`me/player/pause?device_id=${deviceId}`);

const skipToNextTrack = (deviceId) => spotifyApi.post(`me/player/next?device_id=${deviceId}`);

const skipToPreviousTrack = (deviceId) => spotifyApi.post(`me/player/previous?device_id=${deviceId}`);

const getRecommendedTracks = (seedTrackId) =>
  spotifyApi.get(`recommendations?seed_tracks=${seedTrackId}`);

export {
  authorize,
  getAccessToken,
  getCurrentPlayingTrack,
  playTrack,
  pauseTrack,
  skipToNextTrack,
  skipToPreviousTrack,
  getRecommendedTracks,
};
