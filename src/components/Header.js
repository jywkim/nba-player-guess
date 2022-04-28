import React from 'react'

export const Header = (props) => {
    const showInstructions = () => {
        props.instructions();
      }

    const showSilhouette = () => {
        props.silhouette();
      }

    const showStats = () => {
        props.stats();
    }

    return (
        <div className="header">
            <button 
                className="headerButton" 
                onClick={showStats}>STATS
            </button>
            <button 
                className="headerButton" 
                onClick={showInstructions}>RULES
            </button>
            <button 
                className="headerButton"
                onClick={showSilhouette}>HINT
            </button>
        </div>
    )
}