import React from 'react'

export const Form = (props) => {
    const handleSubmit = props.handleSubmit;
    const player = props.player;
    const handleChange = props.handleChange;
    const placeholder = props.placeholder;
    const handleBlur = props.handleBlur;
    const handleKeyDown = props.handleKeyDown;
    const disabled = props.disabled;
    const suggestions = props.suggestions;
    const cursor = props.cursor;
    const handleMouseDown = props.handleMouseDown;
    const handleMouseOver = props.handleMouseOver;

    return (
          <form
            id="formPlayer"
            onSubmit={handleSubmit}
            autoComplete="off">
            <div className="containersContainer">
              <div className="inputContainer">
                <input
                  className="col-md-6 input"
                  name="playerName"
                  type="text"
                  value={player.name}
                  onChange={handleChange}
                  placeholder={placeholder}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  disabled={disabled}
                >
                </input>
              </div>
              <div className="suggestionContainer">
                {suggestions && suggestions.map((suggestion, i) =>
                  <div key={i}
                      id={i}
                      className={"suggestion col-md-6 justify-content-md-center " + (cursor === i ? "highlight" : null)}
                      onMouseDown={() => handleMouseDown(suggestion, i)}
                      onMouseOver={() => handleMouseOver(i)}
                  >{suggestion.firstName} {suggestion.lastName}</div>
                )}
              </div>
            </div>
          </form>
    )
}