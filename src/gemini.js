
// The Summarizer Service
// It uses Gemini to summarize the transcript text

const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL;

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// Summarizes the transcript text using Gemini
async function summarizeText(transcript) {
  if (!transcript || transcript.trim().length < 5) {
    return "No transcript provided or too short";
  }

  const PROMPT = `
        Summarize the following voice note transcript clearly and concisely. 
        Retain the voice note language as much as possible.

        If there are action items, highlight them. Keep the summary simple.

        Transcript:
        """ 
        ${transcript} 
        """ 
    `;

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: PROMPT,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return summary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    return "An error occurred while summarizing the text.";
  }
}

module.exports = {
  summarizeText,
};
