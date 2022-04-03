import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';

export default function App() {
  const [cursor, setCursor] = useState(0);
  const [player, setPlayer] = useState({ name: "", team: "", conf: "", div: "", pos: "", heightFt: "", heightIn: "", age: "", jersey: "" })
  const [players, setPlayers] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const urlPlayers = "https://data.nba.net/data/10s/prod/v1/2021/players.json";
  const urlTeams = "https://data.nba.net/data/10s/prod/v1/2021/teams.json";

  useEffect(() => {
    const loadPlayers = async () => {
      const response = await axios.get(urlPlayers);
      console.log(response.data.league.standard);
      setPlayers(response.data.league.standard);
    }
    loadPlayers();
  }, []);

  const enterPlayer = (name, suggestions, i) => {
    axios.get(urlTeams)
    .then(async res => {
      let team = res.data.league.standard.find(x => x.teamId === suggestions[i].teamId);
      let pos = suggestions[i].pos;
      let heightFt = suggestions[i].heightFeet;
      let heightIn = suggestions[i].heightInches;
      let age = getAge(suggestions[i].dateOfBirthUTC);
      let jersey = suggestions[i].jersey;
      setPlayer({name: name, team: team.tricode, conf: team.confName, div: team.divName, pos: pos, heightFt: heightFt, heightIn: heightIn, age: age, jersey: jersey});
      setSuggestions([]);
    }).catch(err => {
      console.log(err);
    })
  }

  const getAge = (dateOfBirth) => {
    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;  
  }

  const handleBlur = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  }

 const handleChange = (e) => {
    setCursor(0);
    let text = e.target.value;
    let matches = [];
    if (text.length > 0) {
      matches = players.filter(player => {
        const regex = new RegExp(`${text}`, "gi");
        let playerFullName = player.firstName + ' ' + player.lastName;
        return playerFullName.match(regex);
      });
    }
    setSuggestions(matches);
    setPlayer({name: text});
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 13) {
      let name = suggestions[cursor] ? (suggestions[cursor].firstName + " " + suggestions[cursor].lastName) : "";
      if (name.length) {
        enterPlayer(name, suggestions, cursor);
      }
    }
  }

  const handleMouseDown = (suggestion, i) => {
    let name = suggestion.firstName + ' ' + suggestion.lastName;
    enterPlayer(name, suggestions, i);
    setSubmit(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length !== 0) {
      setSubmit(true);
    }
  }

  return (
    <div className="container" align="center">
        <div className="col-lg-6">
          <h1 className="font-weight-light">NBA Player Guess</h1><br></br>
          <form 
            id="formPlayer"
            onSubmit={handleSubmit}
            autoComplete="off">
            <input
              className="col-md-12 input"
              name="playerName"
              type="text"
              value={player.name}
              onChange={handleChange}
              placeholder="Please enter player's name"
              onBlur={handleBlur}
              onKeyDown={ handleKeyDown }
            >
            </input>
            {suggestions && suggestions.map((suggestion, i) => 
              <div key={i}
                  id={i} 
                  className={"suggestion col-md-12 justify-content-md-center " + (cursor === i ? "highlight" : null)}
                  onMouseDown={() => handleMouseDown(suggestion, i)}
              >{suggestion.firstName} {suggestion.lastName}</div>
            )}
          </form>
          
          <br></br>
          
          {submit && player.team && (
            <div>

              <table>
                <tbody>
                <tr>
                  <th className="cellHeader">PLAYER</th>
                  <th className="cellHeader">TEAM</th>
                  <th className="cellHeader">CONF</th>
                  <th className="cellHeader">DIV</th>
                  <th className="cellHeader">POS</th>
                  <th className="cellHeader">HT</th>
                  <th className="cellHeader">AGE</th>
                  <th className="cellHeader">#</th>
                </tr>
                </tbody>
                <tbody>
                <tr>
                  <td className="cellSingle cellLong">
                    {player.name}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.team}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.conf}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.div}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.pos}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.heightFt + "'" + player.heightIn + '"'}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.age}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.jersey}
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
          )}
        </div>
    </div>
  );
}

