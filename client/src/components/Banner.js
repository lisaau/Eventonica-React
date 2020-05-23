import React from 'react';
import logo from '../event-recommender-image-294.png';
import "../styles.css";

export default function Banner() {
  return (
    <div className="row main-section">
    <div className="col mx-auto col-md-6 order-md-2 text-center main-section">
        <img src={logo} alt="event-logo" />
    </div>
    <div className="col-md-6 order-md-1 text-center text-md-left pr-md-5 main-section" style={{padding: "5%"}}>
        <h1 style={{color: "blue"}}>Event Recommender</h1>
        <p>Eventonica is a web app to manage events. Users of the site will be able to add and delete events, mark themselves as attending events, search for events, and see which events are most popular.</p>
    </div>
</div>
  )
}