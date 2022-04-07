import React from 'react'

export const Header = (props) => {
    const showInstructions = () => {
        props.instructions();
      }

    return (
        <div className="header">
            <button className="instructionsButton" onClick={showInstructions}>HOW TO PLAY</button>
        </div>
    )
}