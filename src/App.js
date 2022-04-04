import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';
import { Players } from './components/Players'

export default function App() {
  const [cursor, setCursor] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [player, setPlayer] = useState({ name: "", personId: "", team: "", teamId: "", teams: [], conf: "", div: "", pos: "", heightFt: "", heightIn: "", age: "", jersey: "" })
  const [players, setPlayers] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState({ name: "", personId: "", team: "", teamId: "", teams: [], conf: "", div: "", pos: "", heightFt: "", heightIn: "", age: "", jersey: "" })
  const [submit, setSubmit] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const urlPlayers = "https://data.nba.net/data/10s/prod/v1/2021/players.json";
  const urlTeams = "https://data.nba.net/data/10s/prod/v1/2021/teams.json";

  useEffect(() => {
    const getRandomPlayer = async () => {
      const resPlayers = await axios.get(urlPlayers);
      let randomPlayer = resPlayers.data.league.standard.find(p => p.personId === "1629027"); //Trae Young
      const resTeams = await axios.get(urlTeams);
      let name = randomPlayer.firstName + ' ' + randomPlayer.lastName;
      let randomPlayerObj = createPlayerObject(name, randomPlayer, resTeams);
      setRandomPlayer(randomPlayerObj);
    }
    const loadPlayers = async () => {
      const response = await axios.get(urlPlayers);
      console.log(response.data.league.standard);
      setPlayers(response.data.league.standard);
    }
    getRandomPlayer();
    loadPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkPlayer = (selectedPlayer) => {
    if (selectedPlayer.personId === randomPlayer.personId) alert("MATCH!");

    let statusPlayer = selectedPlayer;
    let selectedAge = parseInt(selectedPlayer.age);
    let randomAge = parseInt(randomPlayer.age);
    let selectedInchesTotal = parseInt(selectedPlayer.heightFt) * 12 + parseInt(selectedPlayer.heightIn);
    let randomInchesTotal = parseInt(randomPlayer.heightFt) * 12 + parseInt(randomPlayer.heightIn);
    let selectedJersey = parseInt(selectedPlayer.jersey);
    let randomJersey = parseInt(randomPlayer.jersey);
  
    statusPlayer.teamStatus = checkTeam(selectedPlayer, randomPlayer);
    statusPlayer.confStatus = checkConference(selectedPlayer, randomPlayer);
    statusPlayer.divStatus = checkDivision(selectedPlayer, randomPlayer);
    statusPlayer.posStatus = checkPosition(selectedPlayer, randomPlayer);
    statusPlayer.heightStatus = checkHeight(selectedInchesTotal, randomInchesTotal);
    statusPlayer.heightDirection = checkDirection(selectedInchesTotal, randomInchesTotal);
    statusPlayer.ageStatus = checkAge(selectedAge, randomAge);
    statusPlayer.ageDirection = checkDirection(selectedAge, randomAge);
    statusPlayer.jerseyStatus = checkJersey(selectedJersey, randomJersey);
    statusPlayer.jerseyDirection = checkDirection(selectedJersey, randomJersey);
    return statusPlayer;
  }

  const checkAge = (selectedAge, randomAge)  => {
    return checkWithinTwo(selectedAge, randomAge);
  }

  const checkConference = (selectedPlayer, randomPlayer) => {
    if (selectedPlayer.conf === randomPlayer.conf) return "green";
  }

  const checkDirection = (selected, random) => {
    if (selected > random) return "↓";
    if (selected < random) return "↑";
  }

  const checkDivision = (selectedPlayer, randomPlayer) => {
    if (selectedPlayer.div === randomPlayer.div) return "green";
  }

  const checkHeight = (selectedInchesTotal, randomInchesTotal) => {
    return checkWithinTwo(selectedInchesTotal, randomInchesTotal);
  }

  const checkJersey = (selectedJersey, randomJersey)  => {
    return checkWithinTwo(selectedJersey, randomJersey);
  }

  const checkPosition = (selectedPlayer, randomPlayer) => {
    if (selectedPlayer.pos === randomPlayer.pos) return "green";
    let selectedPos = selectedPlayer.pos.replace(/[^a-zA-Z]+/g, '');
    let randomPos = randomPlayer.pos.replace(/[^a-zA-Z]+/g, '');
    let randomPosSplit = randomPos.split("");
    for (let i = 0; i < randomPosSplit.length; i++) {
      if (selectedPos.includes(randomPos[i])) return "yellow";
    }
  }

  const checkTeam = (selectedPlayer, randomPlayer) => {
    if (selectedPlayer.team === randomPlayer.team) return "green";
    let selectedPlayerTeams = selectedPlayer.teams.map(t => t.teamId);
    if (selectedPlayerTeams.includes(randomPlayer.teamId)) return "yellow";
  }

  const checkWithinTwo = (selected, random) => {
    if (selected === random) return "green";
    if (selected >= random - 2 && selected <= random + 2) return "yellow";
  }

  const createPlayerObject = (name, playerRes, teamRes) => {
    let personId = playerRes.personId;
    let team = teamRes.data.league.standard.find(t => t.teamId === playerRes.teamId);
    let teamId = playerRes.teamId;
    let teams = playerRes.teams;
    let pos = playerRes.pos;
    let heightFt = playerRes.heightFeet;
    let heightIn = playerRes.heightInches;
    let age = getAge(playerRes.dateOfBirthUTC);
    let jersey = playerRes.jersey;
    let playerObject = {name: name, personId: personId, team: team.tricode, teamId: teamId, teams: teams, conf: team.confName, div: team.divName, pos: pos, heightFt: heightFt, heightIn: heightIn, age: age, jersey: jersey};
    return playerObject;
  }

  const enterPlayer = (name, suggestions, i) => {
    axios.get(urlTeams)
    .then(async res => {
      let selectedPlayer = createPlayerObject(name, suggestions[i], res);
      setPlayer(selectedPlayer);
      let checkedPlayer = checkPlayer(selectedPlayer);
      setGuesses([...guesses, checkedPlayer]);
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
              <Players players={guesses}/>
            </div>
          )}
        </div>
    </div>
  );
}

