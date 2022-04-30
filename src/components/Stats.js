import React from 'react'

export const Stats = (props) => {
    const popupContent = props.popupContent;

    return (
      <div className="statsContainer">
          <div className='statsDiv'>
            <h5 className='statsHeader'>Games Played</h5>
            {popupContent[0]}
          </div>
          <div className='statsDiv'>
            <h5 className='statsHeader'>Total Wins</h5>
            {popupContent[1]}
          </div>
          <div className='statsDiv'>
            <h5 className='statsHeader'>Win Pct</h5>
            {popupContent[2]}
          </div>
          <div className='statsDiv'>
            <h5 className='statsHeaderGuesses'>Guesses Per Game</h5>
            {popupContent[3]}
          </div>
      </div>
    )
}