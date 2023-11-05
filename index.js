// Import packages
const express = require("express");
const home = require("./routes/home");

const colors = require('colors');

const { google } = require('googleapis');
const { YoutubeTranscript } = require('youtube-transcript');
const path = require('path'); // Import the 'path' module


// Middlewares
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'routes/public')));


// Routes
app.use("/", home);

const API_KEY = process.env.YOUTUBE_API_KEY

// Create a YouTube Data API client
const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY,
});


// Middleware for parsing POST data (if needed)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//======================


const admin = require('firebase-admin');






// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
