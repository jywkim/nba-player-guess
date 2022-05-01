import React from 'react'

export const Stats = (props) => {
    const popupContent = props.popupContent;

    return (
      <div className="statsContainer">
          <div className='statsDiv'>
            <h6 className='statsHeader'>GAMES<br/>PLAYED</h6>
            <h3 className='statsValue'>{popupContent[0]}</h3>
          </div>
          <div className='statsDiv'>
            <h6 className='statsHeader'>TOTAL<br/>WINS</h6>
            <h3 className='statsValue'>{popupContent[1]}</h3>
          </div>
          <div className='statsDiv'>
            <h6 className='statsHeader'>WIN<br/>PCT</h6>
            <h3 className='statsValue'>{popupContent[2]}</h3>
          </div>
          <div className='statsDiv'>
            <h6 className='statsHeader'>GUESSES<br/>PER GAME</h6>
            <h3 className='statsValue'>{popupContent[3]}</h3>
          </div>
      </div>
    )
}