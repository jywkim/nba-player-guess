import React, { useEffect, useState, useCallback } from "react";
import "./index.css";
import axios from 'axios';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Form} from './components/Form';
import {Instructions} from './components/Instructions';
import { Players } from './components/Players';
import Popup from './components/Popup';
import {Silhouette} from './components/Silhouette';
import {Stats} from './components/Stats';

export default function App() {
  const useStickyState = (defaultValue, key) => {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  };

  const [counter, setCounter] = useState(1);
  const [cursor, setCursor] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [finalGuess, setFinalGuess] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [instructions, setInstructions] = useState(false);
  const [placeholder, setPlaceholder] = useState("Guess 1 of 8");
  const [player, setPlayer] = useState({ name: "", personId: "", team: "", teamId: "", teams: [], conf: "", div: "", pos: "", heightFt: "", heightIn: "", age: "", jersey: "" })
  const [players, setPlayers] = useState([]);
  const [popupContent, setPopupContent] = useState([]);
  const [popupDisplay, setPopupDisplay] = useState(false);
  const [randomPlayer, setRandomPlayer] = useState({ name: "", personId: "", team: "", teamId: "", teams: [], conf: "", div: "", pos: "", heightFt: "", heightIn: "", age: "", jersey: "" })
  const [silhouette, setSilhouette] = useState(true);
  const [stats, setStats] = useState(true);
  const [statsGames, setStatsGames] = useStickyState(0, "games");
  const [statsGuesses, setStatsGuesses] = useStickyState(0, "guesses");
  const [statsCurrentStreak, setStatsCurrentStreak] = useStickyState(0, "currentstreak");
  const [statsMaxStreak, setStatsMaxStreak] = useStickyState(0, "maxstreak");
  const [statsWins, setStatsWins] = useStickyState(0, "wins");
  const [submit, setSubmit] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const urlPlayerPic = process.env.REACT_APP_PLAYER_IMG + randomPlayer.personId + ".png"
  const urlPlayers = process.env.REACT_APP_PLAYERS_URL;
  const urlTeams = process.env.REACT_APP_TEAMS_URL;

  useEffect(() => {
    const initializePlayerPool = async () => {
      await axios.get(urlPlayers)
      .then(async resPlayers => {
        const activePlayers = resPlayers.data.league.standard.filter(p => p.isActive === true);
        setPlayers(activePlayers);
      }).catch(err => {
        console.log(err);
      })
    }

    initializePlayerPool();
  }, [urlPlayers]);

  const createPlayerObject = useCallback((name, playerRes, teamRes) => {
    const team = teamRes.data.league.standard.find(t => t.teamId === playerRes.teamId);
    const playerObject = {
      name: name, 
      personId: playerRes.personId, 
      team: team.tricode, 
      teamId: playerRes.teamId, 
      teams: playerRes.teams, 
      conf: team.confName, 
      div: shortenDivision(team.divName), 
      pos: playerRes.pos, 
      heightFt: playerRes.heightFeet, 
      heightIn: playerRes.heightInches, 
      age: getAge(playerRes.dateOfBirthUTC), 
      jersey: playerRes.jersey
    };
    return playerObject;
  }, []);

  useEffect(() => {
    const initializeMysteryPlayer = async () => {
      const playerIds = players.map(p => p.personId);
      const randomPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];
      const randomPlayer = players.find(p => p.personId === randomPlayerId);
      await axios.get(urlTeams)
      .then(async resTeams => {
        const name = randomPlayer.firstName + ' ' + randomPlayer.lastName;
        const randomPlayerObj = createPlayerObject(name, randomPlayer, resTeams);
        setRandomPlayer(randomPlayerObj);
        console.log('Need a hint? The player plays for', randomPlayerObj.team);
      }).catch(err => {
        console.log(err);
      })
    }

    if (players.length > 0) initializeMysteryPlayer();
  }, [players, urlTeams, createPlayerObject]);

  useEffect(() => {
    if (finalGuess) {
      const coloursObject = {
        name: "red", 
        team: "red", 
        conf: "red", 
        div: "red", 
        pos: "red", 
        height: "red", 
        age: "red", 
        jersey: "red"
      };
      const randomPlayerStatus = changePlayerStatus(randomPlayer, coloursObject);
      setGuesses((g) => ([ ...g, randomPlayerStatus ]));
    }
  }, [finalGuess, randomPlayer]);

  const changePlaceholder = (selectedPlayer) => {
    return (selectedPlayer.personId === randomPlayer.personId) ? 
           "You solved it in " + counter + "!" :
           counter < 8 ? "Guess " + (counter + 1) + " of 8" : "Game Over";
  }

  const changePlayerStatus = (player, coloursObject) => {
    player.nameStatus = coloursObject.name;
    player.teamStatus = coloursObject.team;
    player.confStatus = coloursObject.conf;
    player.divStatus = coloursObject.div;
    player.posStatus = coloursObject.pos;
    player.heightStatus = coloursObject.height;
    player.ageStatus = coloursObject.age;
    player.jerseyStatus = coloursObject.jersey;
    return player;
  }

  const checkPlayer = (selectedPlayer) => {
    const statusPlayer = selectedPlayer;
    if (selectedPlayer.personId === randomPlayer.personId) {
      setDisabled(true);
      setSilhouette(false);
      setStats(false);
      setGameOver(true);
      statusPlayer.nameStatus = "green";
      setPopupContent(["Match!", randomPlayer.name.toUpperCase(), "You solved it in " + (counter) + (counter === 1 ? " guess" : " guesses")]);
      setPopupDisplay(true);
      updateStats(1);
    }
    if (counter === 8 && selectedPlayer.personId !== randomPlayer.personId) {
      setDisabled(true);
      setSilhouette(false);
      setStats(false);
      setGameOver(true);
      statusPlayer.final = true;
      setFinalGuess(true);
      setPopupContent(["Sorry, the correct answer is", randomPlayer.name, "Please try again!"]);
      setPopupDisplay(true);
      updateStats(0);
    }
    const selectedAge = parseInt(selectedPlayer.age);
    const randomAge = parseInt(randomPlayer.age);
    const selectedInchesTotal = parseInt(selectedPlayer.heightFt) * 12 + parseInt(selectedPlayer.heightIn);
    const randomInchesTotal = parseInt(randomPlayer.heightFt) * 12 + parseInt(randomPlayer.heightIn);
    const selectedJersey = parseInt(selectedPlayer.jersey);
    const randomJersey = parseInt(randomPlayer.jersey);
    const coloursObject = {
      name: statusPlayer.nameStatus, 
      team: (selectedPlayer.team === randomPlayer.team) ? "green" : checkTeamHistory(selectedPlayer, randomPlayer), 
      conf: (selectedPlayer.conf === randomPlayer.conf) ? "green" : "", 
      div: (selectedPlayer.div === randomPlayer.div) ? "green" : "", 
      pos: (selectedPlayer.pos === randomPlayer.pos) ? "green" : checkPositionPartialMatch(selectedPlayer, randomPlayer), 
      height: checkWithinTwo(selectedInchesTotal, randomInchesTotal), 
      age: checkWithinTwo(selectedAge, randomAge), 
      jersey: checkWithinTwo(selectedJersey, randomJersey)
    };
    const selectedPlayerStatus = changePlayerStatus(statusPlayer, coloursObject);
    selectedPlayerStatus.heightDirection = checkDirection(selectedInchesTotal, randomInchesTotal);
    selectedPlayerStatus.ageDirection = checkDirection(selectedAge, randomAge);
    selectedPlayerStatus.jerseyDirection = checkDirection(selectedJersey, randomJersey);
    return selectedPlayerStatus;
  }

  const checkDirection = (selected, random) => {
    if (selected > random) return "???";
    if (selected < random) return "???";
  }

  const checkPositionPartialMatch = (selectedPlayer, randomPlayer) => {
    const selectedPos = selectedPlayer.pos.replace(/[^a-zA-Z]+/g, '');
    const randomPos = randomPlayer.pos.replace(/[^a-zA-Z]+/g, '');
    for (let i = 0; i < randomPos.split("").length; i++) {
      if (selectedPos.includes(randomPos[i])) return "yellow";
    }
  }

  const checkTeamHistory = (selectedPlayer, randomPlayer) => {
    const randomPlayerTeams = randomPlayer.teams.map(t => t.teamId);
    if (randomPlayerTeams.includes(selectedPlayer.teamId)) return "yellow";
  }

  const checkWithinTwo = (selected, random) => {
    if (selected === random) return "green";
    if (selected >= random - 2 && selected <= random + 2) return "yellow";
  }

  const enterPlayer = (name, suggestions, i) => {
    axios.get(urlTeams)
    .then(async res => {
      const selectedPlayer = createPlayerObject(name, suggestions[i], res);
      setPlayer(selectedPlayer);
      const checkedPlayer = checkPlayer(selectedPlayer);
      setGuesses((g) => ([ ...g, checkedPlayer ]));
      setSuggestions([]);
      setCounter(counter + 1);
      setPlayer({ name: "" });
      setPlaceholder(changePlaceholder(selectedPlayer));
    }).catch(err => {
      console.log(err);
    })
  }

  const getAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const m = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
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
    const text = e.target.value;
    const replaceText = text.replace(/([.?*+^$[\]\\(){}|-])/g, '');
    let matches = [];
    if (text.length > 0) {
      matches = players.filter(player => {
        const regex = new RegExp(`${replaceText}`, "gi");
        const playerFullName = player.firstName + ' ' + player.lastName;
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
      const name = suggestions[cursor] ? (suggestions[cursor].firstName + " " + suggestions[cursor].lastName) : "";
      if (name.length) {
        setInstructions(false);
        enterPlayer(name, suggestions, cursor);
      }
    }
  }

  const handleMouseDown = (suggestion, i) => {
    enterPlayer(suggestion.firstName + ' ' + suggestion.lastName, suggestions, i);
    setSubmit(true);
  }

  const handleMouseOver = (i) => {
    setCursor(i);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length !== 0) setSubmit(true);
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
    setStats(false);
    setGameOver(false);
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
    setStats(false);
    setGameOver(false);
    setPopupContent(["Do you know", "this player?", ""]);
    setPopupDisplay(true);
  }

  const showStats = () => {
    const winPercent = ((statsWins/statsGames) * 100).toFixed(1);
    const averageGuesses = (statsGuesses/statsGames).toFixed(1);
    setStats(true);
    setSilhouette(false);
    setInstructions(false);
    setGameOver(false);
    setPopupContent([statsGames, 
                    statsWins, 
                    (isNaN(parseFloat(winPercent)) ? 0 : winPercent) + "%", 
                    (isNaN(parseFloat(averageGuesses)) ? 0 : averageGuesses),
                    statsCurrentStreak,
                    statsMaxStreak]
                    );
    setPopupDisplay(true);
  }

  const updateStats = (win) => {
    setStatsGames(statsGames + 1);
    setStatsWins(statsWins + win);
    setStatsGuesses(statsGuesses + counter);
    setStatsCurrentStreak(win ? (statsCurrentStreak + win) : 0);
    if (win && (statsCurrentStreak + win) > statsMaxStreak) {
      setStatsMaxStreak(statsMaxStreak + win);
    }
  }

  return (
    <div className="container" align="center">
        <Header className="header" 
          instructions={showInstructions} 
          silhouette={showSilhouette} 
          stats={showStats}
        />
        <br/>
        <div className="col-lg-10 appMain">
          <div className="appHeader">
            <i className="fa-solid fa-basketball fa-2x appLogo"></i>
            <h1 className="appTitleH1">NBA Wordle</h1>
          </div>
          <br/>
          <br/>
          <br/>
          <Form className="form" 
            handleSubmit = {handleSubmit}
            player = {player}
            handleChange = {handleChange}
            placeholder = {placeholder}
            handleBlur = {handleBlur}
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
            {instructions ? (<Instructions popupContent={popupContent}/>) : ""}

            {silhouette ? (
              <Silhouette 
                urlPlayerPic={urlPlayerPic} 
                silhouette={silhouette} 
                popupContent={popupContent} 
              />) : ""}

            {gameOver ? (
              <Silhouette 
                urlPlayerPic={urlPlayerPic} 
                popupContent={popupContent} 
              />) : ""}

            {stats ? (<Stats popupContent={popupContent}/>) : ""}
        
          </Popup>
        </div>
        <Footer className="footer"/>
    </div>
  );
}

