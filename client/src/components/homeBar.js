/*
This is the js for the home bar, which has four icons: the calorie tracker, 
the nutrition tracker, the workout plans & sessions, and the user profile. 
*/

import React from "react";
import Homebar1 from "./images/Homebar1.png";
import Homebar2 from "./images/Homebar2.png";
import Homebar3 from "./images/Homebar3.png";
import Homebar4 from "./images/Homebar4.png";
import "./homeBar.css";

export default function HomeBar(){
    return (
    <div className="homebar-container">
        <img src={Homebar1}/>
        <img src={Homebar2}/>
        <img src={Homebar3}/>
        <img src={Homebar4}/>

    </div>
    )
}