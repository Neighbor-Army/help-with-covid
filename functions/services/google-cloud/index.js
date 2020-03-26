const speech = require("@google-cloud/speech").v1p1beta1;
const axios = require("axios");

const speechToText = async (url, cb) => {
    const client = new speech.SpeechClient();
    const speechContext = {
        phrases: ["$ADDRESSNUM", "$STREET"]
    };
    const config = {
        encoding: "LINEAR16",
        sampleRateHertz: 8000,
        languageCode: "en-US",
        speechContexts: [speechContext],
        model: "phone_call"
    };

    const request = {
        config: config,
        interimResults: false
    };

    let chonks = "";
    const recognizeStream = client
        .streamingRecognize(request)
        .on("error", console.error)
        .on("data", data => {
            //console.log(data.results[0].alternatives[0].transcript);
            chonks = data.results[0].alternatives[0].transcript;
        })
        .on("end", () => {
            cb(chonks);
        });
    axios.get(url, { responseType: "stream" }).then(res => {
        res.data.pipe(recognizeStream);
    });
};

const geocode = async address => {
    const encoded = encodeURI(address);
    console.log(encoded);
    return axios
        .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=`
        )
        .then(function(response) {
            console.log(response.data);
            return response.data.results[0].formatted_address;
        });
};
/*
speechToText(
    "https://api.twilio.com/2010-04-01/Accounts/ACb228c71773482b13000655101442e779/Recordings/RE8cb962be17b2d948da1f3ded8d68b68c",
    (data) => {
        console.log(data);
    }
);
*/

//console.log(geocode("3372 West Heston, 65803"));
module.exports = {
    speechToText,
    geocode
};
