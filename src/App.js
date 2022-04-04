import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';
import { Players } from './components/Players'

export default function App() {
  const [cursor, setCursor] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [player, setPlayer] = useState({ name: "", team: "", conf: "", div: "", pos: "", heightFt: "", heightIn: "", age: "", jersey: "" })
  const [players, setPlayers] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState({ name: "", team: "", conf: "", div: "", pos: "", heightFt: "", heightIn: "", age: "", jersey: "" })
  const [submit, setSubmit] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const urlPlayers = "https://data.nba.net/data/10s/prod/v1/2021/players.json";
  const urlTeams = "https://data.nba.net/data/10s/prod/v1/2021/teams.json";

  useEffect(() => {
    const getRandomPlayer = async () => {
      const resPlayers = await axios.get(urlPlayers);
      let randomPlayer = resPlayers.data.league.standard.find(x => x.personId === "1629027"); //Trae Young
      const resTeams = await axios.get(urlTeams);
      let name = randomPlayer.firstName + ' ' + randomPlayer.lastName;
      let team = resTeams.data.league.standard.find(x => x.teamId === randomPlayer.teamId);
      let pos = randomPlayer.pos;
      let heightFt = randomPlayer.heightFeet;
      let heightIn = randomPlayer.heightInches;
      let age = getAge(randomPlayer.dateOfBirthUTC);
      let jersey = randomPlayer.jersey;
      let randomPlayerObj = {name: name, team: team.tricode, conf: team.confName, div: team.divName, pos: pos, heightFt: heightFt, heightIn: heightIn, age: age, jersey: jersey};
      setRandomPlayer(randomPlayerObj);
    }
    const loadPlayers = async () => {
      const response = await axios.get(urlPlayers);
      console.log(response.data.league.standard);
      setPlayers(response.data.league.standard);
    }
    getRandomPlayer();
    loadPlayers();
  }, []);

  const checkPlayer = (selectedPlayer) => {
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
    return checkWithinTwo(selectedAge, randomAge)
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
    return checkWithinTwo(selectedInchesTotal, randomInchesTotal)
  }

  const checkJersey = (selectedJersey, randomJersey)  => {
    return checkWithinTwo(selectedJersey, randomJersey)
  }

  const checkPosition = (selectedPlayer, randomPlayer) => {
    if (selectedPlayer.pos === randomPlayer.pos) return "green";
    let selectedPos = selectedPlayer.pos.replace(/[^a-zA-Z]+/g, '');
    let randomPos = randomPlayer.pos.replace(/[^a-zA-Z]+/g, '');
    let randomPosSplit = randomPos.split("")
    for (let i = 0; i < randomPosSplit.length; i++) {
      if (selectedPos.includes(randomPos[i])) return "yellow";
    }
  }

  const checkTeam = (selectedPlayer, randomPlayer) => {
    if (selectedPlayer.team === randomPlayer.team) return "green";
  }

  const checkWithinTwo = (selected, random) => {
    if (selected === random) return "green";
    if (selected > random) {
      if (selected <= random + 2) return "yellow";
    }
    if (selected < random) {
      if (selected >= random - 2) return "yellow";
    }
  }

  const enterPlayer = (name, suggestions, i) => {
    axios.get(urlTeams)
    .then(async res => {
      let team = res.data.league.standard.find(x => x.teamId === suggestions[i].teamId);
      let pos = suggestions[i].pos;
      let heightFt = suggestions[i].heightFeet;
      let heightIn = suggestions[i].heightInches;
      let age = getAge(suggestions[i].dateOfBirthUTC);
      let jersey = suggestions[i].jersey;
      let selectedPlayer = {name: name, team: team.tricode, conf: team.confName, div: team.divName, pos: pos, heightFt: heightFt, heightIn: heightIn, age: age, jersey: jersey};
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

