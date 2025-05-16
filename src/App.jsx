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
    const cleanCode = formJson.codes.replace(/\s/g, "");
    console.log(cleanCode);
    
    const iframe = document.querySelector("iframe");
    if(iframe){
      iframe.contentWindow.postMessage({type: "BROWSER_TO_UNITY", value: cleanCode}, "*");
    }
  }

  const pythonExe = () => {

    pyodide.setOutput((text) => {
      setPyoutput(text);
    });
    console.log("clicked, print input from python:"+pyprompt);
    pyodide.run("print('"+pyprompt+"')");
  
  }

  const Dropdown1 = () => {
    document.getElementById("myDropdown1").classList.toggle("show");
  }
  const Dropdown2 = () => {
    document.getElementById("myDropdown2").classList.toggle("show");
  }
  const Dropdown3 = () => {
    document.getElementById("myDropdown3").classList.toggle("show");
  }
  const Dropdown4 = () => {
    document.getElementById("myDropdown4").classList.toggle("show");
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
          {/* <button disabled>Objects</button>
          <p>{pyoutput}</p> */}
          <a>Goal: Defeat the glitch and go through the gate at the end of the path<br  />
            Use ; to separate each action command</a>
          <button class="dropbtn" onClick={Dropdown1}>Move&#40;target&#41;</button>
          <div class="dropdown-content" id="myDropdown1">
            <a>- Move towards the target specified<br />
            - Targets: EnemyFront, Gate<br />
            - Case-sensitive</a>
          </div>

          <button class="dropbtn" onClick={Dropdown2}>Move&#40;direction, unit&#41;</button>
          <div class="dropdown-content" id="myDropdown2">
            <a>- Move towards the direction specified for specific unit <br  />
            - Directions: forward, back, right, left <br  />
            - Unit: interger number <br  />
            - Case-sensitive</a>
          </div>
          <button class="dropbtn" onClick={Dropdown3}>Attack&#40;counts&#41;</button>
          <div class="dropdown-content" id="myDropdown3">
            <a>- Shoot bullet to the facing direction of the player<br />
            Counts: Interger number, optional</a>
          </div>
          <button class="dropbtn" onClick={Dropdown4}>Restart&#40; &#41;</button>
          <div class="dropdown-content" id="myDropdown4">
            <a>- Restart the level when you lose or stuck</a>
          </div>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <textarea className="console" name="codes" value={pyprompt}
          onChange={(e) => {
            setPyprompt(e.target.value);
          }}/>
          <button className="exe" type="submit">&gt;&gt; Execute &lt;&lt;</button>
          {/* <button className="exe2" onClick={pythonExe}>python</button> */}
        </form>
      </div>
      
    </div>
  );

  return element;
}

export default App