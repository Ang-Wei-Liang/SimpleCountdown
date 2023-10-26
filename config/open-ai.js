/*const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;*/

const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
/*
const openai = new OpenAIApi(configuration);

module.exports = openai;*/

module.exports = openai;


// "openai": "^3.3.0",

