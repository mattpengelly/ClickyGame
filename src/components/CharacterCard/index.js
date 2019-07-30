import React from "react";
import "./style.css";

function CharacterCard(props) {
  return (
    <div className="card">
      <div
        className="img-container"
        onClick={() => props.playGuess(props.id)}>
          {/* {console.log(props.image)} */}
        <img alt={props.name} src={props.image} />
      </div>
    </div>
  );
}

export default CharacterCard;
