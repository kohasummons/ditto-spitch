// The Transcription Service
// It uses Spitch to transcribe the audio

const axios = require("axios");
const FormData = require("form-data");
const dotenv = require("dotenv");

dotenv.config();

const SPITCH_API_URL = "https://api.spi-tch.com/v1";

async function transcribeAudio(audioBuffer) {
  const formData = new FormData();
  formData.append("language", "yo");
  formData.append("timestamp", "true");
  formData.append("multispeaker", "true");
  formData.append("content", audioBuffer, {filename: "audio.ogg"});

  const response = await axios.post(`${SPITCH_API_URL}/transcriptions`, formData, {
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.SPITCH_API_KEY}`,
    },
  });

  return response.data;
}

module.exports = {
  transcribeAudio,
};
