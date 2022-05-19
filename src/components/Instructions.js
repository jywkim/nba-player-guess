import React from 'react'

export const Instructions = (props) => {
    const popupContent = props.popupContent;

    return (
      <div className="instructions">
        <h1 className="instructionH1" data-testid="instructions-text">Guess the NBA player in 8 tries!</h1>
        <div className="instructionList">
          <ul>
            {popupContent.map(function(p, index){
              return (<li key={index} className="instruction"><i className="fa-solid fa-basketball fa-2xs"></i> {p}</li>)
            })}
          </ul>
        </div>
      </div>
    )
}