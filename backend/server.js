import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import cors from 'cors';
import session from 'express-session';
import ytsr from 'ytsr';
import ytdl from 'ytdl-core';
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/dbConnection.js";
import route from './routes/route.js'


// Connecting to database
connectDB();

const app = express();
const port = 5000;


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Routes for Api
app.use('/',route);
import {greeting} from '../controllers/greet.js'
import {loginToSpotifyAccount, callbackAfterLogin, fetchPlaylist, playlistService, streamAudioFunction} from '../controllers/operations.js'

const router = express.Router();


app.get('/',greeting);

// login
app.get('/api/login', loginToSpotifyAccount);

// callback
app.get('/api/callback', callbackAfterLogin);

// to get playlists (name and id)
app.get('/api/playlists', fetchPlaylist);

// to get tracks from a specific playlist (name, artist, genre, download link)
app.get('/api/playlists/:playlistId', playlistService);

// to stream audio from youtube
app.get('/api/stream_audio/:video_id/:trackName/:artistName/:trackGenre', streamAudioFunction);



// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
