import React from "react";
import './App.css';

import { useState } from "react";
import { Pyodide } from "./pyodide";

function App(){
  const [pyoutput, setPyoutput] = useState(null);
  const [pyprompt, setPyprompt] = useState("Enter codes here...");
  const pyodide = Pyodide.getInstance();


  function handleSubmit(e){
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson.codes);
    
    const iframe = document.querySelector("iframe");
    if(iframe){
      iframe.contentWindow.postMessage({type: "BROWSER_TO_UNITY", value: formJson.codes}, "*");
    }
  }

  const pythonExe = () => {

    pyodide.setOutput((text) => {
      setPyoutput(text);
    });
    console.log("clicked, print input from python:"+pyprompt);
    pyodide.run("print('"+pyprompt+"')");
  
  }

  const element = (
    <div className="App">
      
      <iframe 
        src = "https://k-aii.github.io/Validators-WebGL/"
        title = "unity webgl"
        width = "100%"
        height = "60%"
        onLoad={()=>{
          console.log("LOADED")
        }}
      ></iframe>

      <div className="panel">
        <div className="objects">
          <button disabled>Objects</button>
          <p>{pyoutput}</p>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <textarea className="console" name="codes" value={pyprompt}
          onChange={(e) => {
            setPyprompt(e.target.value);
          }}/>
          <button className="exe" type="submit">&gt;&gt; Execute &lt;&lt;</button>
          <button className="exe2" onClick={pythonExe}>python</button>
        </form>
      </div>
      
    </div>
  );

  return element;
}

export default App