// Import packages
const express = require("express");
const home = require("./routes/home");

const openai = require('./config/open-ai');
const colors = require('colors');


const { google } = require('googleapis');
const { YoutubeTranscript } = require('youtube-transcript');

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/home", home);

app.use(express.static('routes/public'));

const API_KEY = process.env.YOUTUBE_API_KEY

// Create a YouTube Data API client
const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY,
});

// EJS template engine setup
/*app.set('view engine', 'ejs');*/
//app.set('views', __dirname + '/views');


// Serve static files (e.g., CSS, images, JavaScript)
//app.use(express.static('public'));


// Middleware for parsing POST data (if needed)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
/*
app.get('/', (req, res) => {
    res.render('index', { chatHistory: [] }); // Render the initial chat interface
});*/



app.post('/chat', async (req, res) => {
    // Obtaining Both Params
    const userInput = req.body.userInput;
    const chatHistory = req.body.chatHistory || [];

    try {
        // Construct messages by iterating over the history
        const messages = chatHistory.map(([role, content]) => ({
            role,
            content,
        }));

        // Add latest user input
        messages.push({ role: 'user', content: userInput });

        // Call the API with user input & history
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        // Get completion text/content
        const completionText = completion.data.choices[0].message.content;

        if (userInput.toLowerCase() === 'exit') {
            console.log(colors.green('Thank you for playing the game!'));
            return res.json({ response: 'Thank you for playing the game!' });
        }

        console.log(colors.green('Bot: ') + completionText);

        // Update history with user input and assistant response
        chatHistory.push(['user', userInput]);
        chatHistory.push(['assistant', completionText]);

        return res.json({ response: completionText, chatHistory });

    } catch (error) {
        console.error(colors.red(error));
        return res.status(500).json({ error: 'Failed to generate response' });
    }
});

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
