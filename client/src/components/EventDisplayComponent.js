import React from 'react';

export default function EventManagement(props) {
  if (props.loading) {
    return <p>Loading...</p>
  }
  if (!props.events) {
    return null;
  }

  let formattedEvents = props.events.map( e => {
    return <li style={{textAlign: "left"}} key={e.eventID}>{e.eventID}  - {e.eventName} - {e.eventDate} - {e.eventCategory} - {e.eventLocation}</li>
  })

  if (formattedEvents.length === 0) {
    formattedEvents = "No Events Found"
  }

  return (
    <>
      <h3>{props.header}</h3>
      <ul>{formattedEvents}</ul>
    </>
  );
}