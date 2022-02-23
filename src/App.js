/* eslint-disable no-redeclare */
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import { BrowserRouter as Router, Redirect } from "react-router-dom";
import './App.css';

import axios from "axios";

function App() {
  
  const [intent, setIntent] = useState("");
  const [response, setResponse] = useState("");
  const [confidence, setConfidence] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [active, setActive] = useState(false);
  const [btnActive, setBtnActive] = useState(true);

   // //Get what command was given/ recognized to variable and print it
   const { transcript, listening, isMicrophoneAvailable } =
   useSpeechRecognition();
 // console.log(transcript);
 // console.log("Listening"+listening)

 useEffect(() => {
   if (!listening && active) {
     //If listening is completed by Web Speech API execute in this if loop
     console.log("Yeah");
     console.log("Final trnascript" + transcript);
     document.getElementById("voice-input").innerText = "";

     //This the amazon api in which we send our input and get response as intent predicted.

     //Don't change this API or else voice assistant will not work
     const api =
     "https://652tt1fzce.execute-api.ap-southeast-1.amazonaws.com/default/voiceBot_Ecom?key1=" +
       transcript;
     // const data = { "key1" : "Home" };
     axios
       .post(api)
       .then((response) => {
         setResponse(response.data.entities);
         setConfidence(response.data.confidence);
         
         setIntent(response.data.intent);

         console.log(response.data);
       })
       .catch((error) => {
         console.log(error);
       });
   }
   if (!listening && !active) {
     setActive(true);
   }
 }, [listening]);

  return (
    <div className="App">
    <div
    className="nlp"
    style={btnActive ? { opacity: "1" } : { opacity: "0.5" }}
  >
    {/* Button for voice assistant */}
    <p id="voice-input">{transcript}</p>
    <button
      onClick={() => {
        SpeechRecognition.startListening({ continuous: true });

        setActive(true);

        setTimeout(function () {
          //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
          // Alert.alert("Alert Shows After 5 Seconds of Delay.")
          SpeechRecognition.stopListening();
        }, 5000);
      }}
    >Press Here
    </button>

    
      <p>Intent predicted : {intent}</p>
      <p>Response : {response}</p>
      <p>Confidence : {confidence}</p>
      <p id="transcript">transcript : {transcript}</p> 
    </div>
    </div>
  );
}

export default App;

