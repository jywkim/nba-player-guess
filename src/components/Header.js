import React from 'react'

export const Header = (props) => {
    const showInstructions = () => {
        props.instructions();
      }

    const showSilhouette = () => {
        props.silhouette();
      }

    return (
        <div className="header">
            <button 
                className="headerButton" 
                onClick={showInstructions}>HOW TO PLAY
            </button>

            &nbsp;
            &nbsp;
            &nbsp;

            <button 
                className="headerButton"
                onClick={showSilhouette}>SHOW SILHOUETTE
            </button>
        </div>
    )
}