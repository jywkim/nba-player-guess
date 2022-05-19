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
                onClick={showStats}
                data-testid="stats-button"
                >STATS
            </button>
            <button 
                className="headerButton" 
                onClick={showInstructions}
                data-testid="rules-button"
                >RULES
            </button>
            <button 
                className="headerButton"
                onClick={showSilhouette}
                data-testid="hint-button"
                >HINT
            </button>
        </div>
    )
}