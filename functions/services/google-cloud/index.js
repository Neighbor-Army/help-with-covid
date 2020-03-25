const speech = require("@google-cloud/speech");
const axios = require("axios");

const getBase64 = async (url) => {
    const response = await axios.get(url, {
        responseType: "arraybuffer"
    });
    return Buffer.from(response.data, "binary").toString("base64");
};
const speechToText = async (url) => {
    const client = new speech.SpeechClient();

    const audioBytes = await getBase64(url);

    const audio = {
        content: audioBytes
    };
    const speechContext = {
        phrases: ["$ADDRESSNUM", "$STREET"]
    };
    const config = {
        encoding: "LINEAR16",
        sampleRateHertz: 8000,
        languageCode: "en-US",
        speechContexts: [speechContext]
    };

    const request = {
        audio: audio,
        config: config
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");

    return transcription;
};

module.exports = {
    speechToText
};
