import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Form} from './components/Form';
import {Instructions} from './components/Instructions';
import { Players } from './components/Players';
import Popup from './components/Popup';
import {Silhouette} from './components/Silhouette';

export default function App() {
  const [counter, setCounter] = useState(1);
  const [cursor, setCursor] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [instructions, setInstructions] = useState(false);
  const [placeholder, setPlaceholder] = useState("Guess 1 of 8");
  const [player, setPlayer] = useState({ name: "", personId: "", team: "", teamId: "", teams: [], conf: "", div: "", pos: "", heightFt: "", heightIn: "", age: "", jersey: "" })
  const [players, setPlayers] = useState([]);
  const [popupContent, setPopupContent] = useState([]);
  const [popupDisplay, setPopupDisplay] = useState(false);
  const [randomPlayer, setRandomPlayer] = useState({ name: "", personId: "", team: "", teamId: "", teams: [], conf: "", div: "", pos: "", heightFt: "", heightIn: "", age: "", jersey: "" })
  const [silhouette, setSilhouette] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const urlPlayerPic = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + randomPlayer.personId + ".png"
  const urlPlayers = "https://data.nba.net/data/10s/prod/v1/2021/players.json";
  const urlTeams = "https://data.nba.net/data/10s/prod/v1/2021/teams.json";

  useEffect(() => {
    const initializePlayers = async () => {
      await axios.get(urlPlayers)
      .then(async resPlayers => {
        let activePlayers = resPlayers.data.league.standard.filter(p => p.isActive === true);
        setPlayers(activePlayers);
        let playerIds = activePlayers.map(p => p.personId);
        let randomPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];
        let randomPlayer = activePlayers.find(p => p.personId === randomPlayerId);
        console.log(randomPlayer);
        await axios.get(urlTeams)
        .then(async resTeams => {
          let name = randomPlayer.firstName + ' ' + randomPlayer.lastName;
          let randomPlayerObj = createPlayerObject(name, randomPlayer, resTeams);
          setRandomPlayer(randomPlayerObj);
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      })
    }
    initializePlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePlaceholder = (selectedPlayer) => {
    return (selectedPlayer.personId === randomPlayer.personId) ? 
           "You solved it in " + counter + "!" :
           counter < 8 ? "Guess " + (counter + 1) + " of 8" : "Game Over";
  }

  const changePlayerStatus = (player, name, team, conf, div, pos, height, age, jersey) => {
    player.nameStatus = name;
    player.teamStatus = team;
    player.confStatus = conf;
    player.divStatus = div;
    player.posStatus = pos;
    player.heightStatus = height;
    player.ageStatus = age;
    player.jerseyStatus = jersey;
    return player;
  }

  const checkPlayer = (selectedPlayer) => {
    let statusPlayer = selectedPlayer;
    if (selectedPlayer.personId === randomPlayer.personId) {
      setDisabled(true);
      statusPlayer.nameStatus = "green";
      setPopupContent(["Match!", randomPlayer.name.toUpperCase(), "You solved it in " + (counter) + (counter === 1 ? " guess" : " guesses")]);
      setPopupDisplay(true);
    }
    if (counter === 8 && selectedPlayer.personId !== randomPlayer.personId) {
      setDisabled(true);
      statusPlayer.final = true;
      setPopupContent(["Sorry, the correct answer is", randomPlayer.name, "Please try again!"]);
      setPopupDisplay(true);
    }

    let selectedAge = parseInt(selectedPlayer.age);
    let randomAge = parseInt(randomPlayer.age);
    let selectedInchesTotal = parseInt(selectedPlayer.heightFt) * 12 + parseInt(selectedPlayer.heightIn);
    let randomInchesTotal = parseInt(randomPlayer.heightFt) * 12 + parseInt(randomPlayer.heightIn);
    let selectedJersey = parseInt(selectedPlayer.jersey);
    let randomJersey = parseInt(randomPlayer.jersey);

    let teamStatus = checkTeam(selectedPlayer, randomPlayer);
    let confStatus = checkConference(selectedPlayer, randomPlayer);
    let divStatus = checkDivision(selectedPlayer, randomPlayer);
    let posStatus = checkPosition(selectedPlayer, randomPlayer);
    let heightStatus = checkHeight(selectedInchesTotal, randomInchesTotal);
    let ageStatus = checkAge(selectedAge, randomAge);
    let jerseyStatus = checkJersey(selectedJersey, randomJersey);
    let selectedPlayerStatus = changePlayerStatus(statusPlayer, statusPlayer.nameStatus, teamStatus, confStatus, divStatus, posStatus, heightStatus, ageStatus, jerseyStatus);

    selectedPlayerStatus.heightDirection = checkDirection(selectedInchesTotal, randomInchesTotal);
    selectedPlayerStatus.ageDirection = checkDirection(selectedAge, randomAge);
    selectedPlayerStatus.jerseyDirection = checkDirection(selectedJersey, randomJersey);
    return selectedPlayerStatus;
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
    let randomPlayerTeams = randomPlayer.teams.map(t => t.teamId);
    if (randomPlayerTeams.includes(selectedPlayer.teamId)) return "yellow";
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
    let div = shortenDivision(team.divName);
    let pos = playerRes.pos;
    let heightFt = playerRes.heightFeet;
    let heightIn = playerRes.heightInches;
    let age = getAge(playerRes.dateOfBirthUTC);
    let jersey = playerRes.jersey;
    let playerObject = {name: name, personId: personId, team: team.tricode, teamId: teamId, teams: teams, conf: team.confName, div: div, pos: pos, heightFt: heightFt, heightIn: heightIn, age: age, jersey: jersey};
    return playerObject;
  }

  const enterPlayer = (name, suggestions, i) => {
    axios.get(urlTeams)
    .then(async res => {
      let selectedPlayer = createPlayerObject(name, suggestions[i], res);
      setPlayer(selectedPlayer);
      let checkedPlayer = checkPlayer(selectedPlayer);
      setGuesses((g) => ([ ...g, checkedPlayer ]));
      if (checkedPlayer.final) {
        let randomPlayerStatus = changePlayerStatus(randomPlayer, "red", "red", "red", "red", "red", "red", "red", "red");
        setGuesses((g) => ([ ...g, randomPlayerStatus ]));
      }
      setSuggestions([]);
      setCounter(counter + 1);
      setPlayer({ name: "" });
      setPlaceholder(changePlaceholder(selectedPlayer));
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
    let replaceText = text.replace(/([.?*+^$[\]\\(){}|-])/g, '');
    let matches = [];
    if (text.length > 0) {
      matches = players.filter(player => {
        const regex = new RegExp(`${replaceText}`, "gi");
        let playerFullName = player.firstName + ' ' + player.lastName;
        return playerFullName.match(regex);
      });
    }
    setSuggestions(matches.slice(0, 5));
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
        setSilhouette(false);
        setInstructions(false);
        enterPlayer(name, suggestions, cursor);
      }
    }
  }

  const handleMouseDown = (suggestion, i) => {
    let name = suggestion.firstName + ' ' + suggestion.lastName;
    enterPlayer(name, suggestions, i);
    setSubmit(true);
  }

  const handleMouseOver = (i) => {
    setCursor(i);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length !== 0) {
      setSubmit(true);
    }
  }

  const shortenDivision = (division) => {
    let short = "";
    switch(division) {
      case "Atlantic":
        short = "Atl";
        break;
      case "Central":
        short = "Cen";
        break;
      case "Southeast":
        short = "SE";
        break;
      case "Northwest":
        short = "NW";
        break;
      case "Pacific":
        short = "Pac";
        break;
      case "Southwest":
        short = "SW";
        break;
      default:
        short = division;
      }
      return short;
    }

  const showInstructions = () => {
    setInstructions(true);
    setSilhouette(false);
    setPopupContent(
      ["Green in any column is a match",
      "Yellow in TEAM column is player's old team",
      "Yellow in POS column is a partial match (e.g. G and G-F)",
      "Yellow in HT, AGE, # columns is within 2 (inches, years, numbers)"
    ]);
    setPopupDisplay(true);
  }

  const showSilhouette = () => {
    setSilhouette(true);
    setInstructions(false);
    setPopupContent(["Do you know", "this player?", ""]);
    setPopupDisplay(true);
  }

  return (
    <div className="container" align="center">
        <Header className="header" instructions={showInstructions} silhouette={showSilhouette}/>
        <br/>
        <div className="col-lg-10">
          <div className="appHeader">
            <i className="fa-solid fa-basketball fa-2x appLogo"></i>
            <h1 className="titleH1">NBA Wordle</h1>
          </div>
          <br/>
          <br/>
          <br/>
          <Form 
            className="form" 
            handleSubmit = {handleSubmit}
            player = {player}
            handleChange = {handleChange}
            placeholder = {placeholder}
            // handleBlur = {handleBlur}
            handleKeyDown = {handleKeyDown}
            disabled = {disabled}
            suggestions = {suggestions}
            cursor = {cursor}
            handleMouseDown = {handleMouseDown}
            handleMouseOver = {handleMouseOver}
          />
          <br/>
          <br/>
          {submit && guesses && (
            <div className="playersContainer">
              <Players players={guesses}/>
            </div>
          )}

          <Popup trigger={popupDisplay} setTrigger={setPopupDisplay}>
            {!instructions ? (
            <Silhouette 
              className="silhouette" 
              urlPlayerPic={urlPlayerPic} 
              silhouette={silhouette} 
              popupContent={popupContent} 
            />
            ) : (
            <Instructions className="instructions" popupContent={popupContent}/>
            )}
          </Popup>
        </div>
        <Footer className="footer"/>
    </div>
  );
}

