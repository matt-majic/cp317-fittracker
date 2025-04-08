/*
This is where the trainee can look at the available sessions to purchase. 
The sessions would probably be scheduled weekly (as that would make sense 
for buying a session in advance) (that's not really important for this implementation, though). 
*/
import React from 'react';
import './browseSessionsPage.css';  // Make sure the path is correct

export default function browseSessionsPage() {
  return (
    <div className="browse-container">
      <div className="level-buttons">
        <button className="level-button">Beginner</button>
        <button className="level-button">Intermediate</button>
        <button className="level-button">Advanced</button>
        <button className="level-button">Expert</button>
      </div>
    </div>
  );
}
