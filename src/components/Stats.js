import React from 'react'

export const Stats = (props) => {
    const popupContent = props.popupContent;

    return (
      <div className="statsContainer">
        <div className="statsDiv">
          {popupContent[0]}
          <br></br>
          {popupContent[1]}
          <br></br>
          {popupContent[2]}
        </div>
      </div>
    )
}