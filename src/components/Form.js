import React from 'react';
import {SuggestionContainer} from './SuggestionContainer';

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
            onSubmit={handleSubmit}
            autoComplete="off">
            <div className="formContainer">
              <div className="inputContainer">
                <input
                  className="col-md-6 input"
                  name="playerName"
                  type="text"
                  data-testid="player-input"
                  value={player.name}
                  onChange={handleChange}
                  placeholder={placeholder}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  disabled={disabled}
                >
                </input>
              </div>
              <div className="suggestionsContainer">
                {suggestions && suggestions.map((suggestion, i) =>
                    <div key={i}
                        id={i}
                        className={"suggestion col-md-6 justify-content-md-center " + (cursor === i ? "highlight" : null)}
                        onMouseDown={() => handleMouseDown(suggestion, i)}
                        onMouseOver={() => handleMouseOver(i)}
                    >
                  <SuggestionContainer key={suggestion.personId} props={props}>
                    {suggestion.firstName} {suggestion.lastName}
                  </SuggestionContainer>
                    </div>
                )}
              </div>
            </div>
          </form>
    )
}