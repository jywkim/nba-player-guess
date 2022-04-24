import React, { useEffect, useRef, useState } from "react";
import {CSSTransition} from "react-transition-group";
import {CellContainer} from './CellContainer';

export const Players = ({players}) => {
  const nodeRef = useRef(null);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(true);

    const scrollToBottom = async () => {
      var element = document.getElementById("tableBody");
      element.scrollTop = element.scrollHeight;
    }
    scrollToBottom();
  }, [players]);

    const PlayerRow = (player,index) => {
        let playerPicUrl = "https://cdn.nba.com/logos/nba/" + player.teamId + "/primary/L/logo.svg";

        return (
            <tr key = {index}>
                <CellContainer key={"name_" + player.name} ptimeout={300} pindex={index} pclass="fade" ptableclass={"cell cellLong " + (player.nameStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.name}
                      </div>
                    </div>
                </CellContainer>
                <CellContainer key={"team_" + player.team} ptimeout={400} pindex={index} pclass="fade2" ptableclass={"cell cellShort " + (player.teamStatus)}>
                  <div>
                    <div>
                      <img className="cellTeamLogo" src={playerPicUrl} alt="Team Logo"></img>
                    </div>
                    <div className="cellValue">
                      {player.team}
                    </div>
                  </div>
                </CellContainer>
                <CellContainer key={"conf_" + player.conf} ptimeout={500} pindex={index} pclass="fade3" ptableclass={"cell cellShort " + (player.confStatus)}>
                  <div>
                    <div className="cellValue">
                      {player.conf}
                    </div>
                  </div>
                </CellContainer>
                <CellContainer key={"div_" + player.div} ptimeout={600} pindex={index} pclass="fade4" ptableclass={"cell cellShort " + (player.divStatus)}>
                  <div>
                    <div className="cellValue">
                      {player.div}
                    </div>
                  </div>                    
                </CellContainer>
                <CellContainer key={"pos_" + player.pos} ptimeout={700} pindex={index} pclass="fade5" ptableclass={"cell cellShort " + (player.posStatus)}>
                  <div>
                    <div className="cellValue">
                      {player.pos}
                    </div>
                  </div>                    
                </CellContainer>
                <CellContainer key={"height_" + player.heightFt} ptimeout={800} pindex={index} pclass="fade6" ptableclass={"cell cellShort " + (player.heightStatus)}>
                  <div className="cellDirection">
                    <div className="cellValue">
                      {player.heightFt + "'" + player.heightIn + '"'}
                    </div>
                    <div className="cellArrow">
                      {player.heightDirection}
                    </div>
                  </div>
                </CellContainer>
                <CellContainer key={"age_" + player.age} ptimeout={900} pindex={index} pclass="fade7" ptableclass={"cell cellShort " + (player.ageStatus)}>
                  <div className="cellDirection">
                    <div className="cellValue">
                      {player.age}
                    </div>
                    <div className="cellArrow">
                      {player.ageDirection}
                    </div>
                  </div>
                </CellContainer>
                <CellContainer key={"jersey_" + player.jersey} ptimeout={1000} pindex={index} pclass="fade8" ptableclass={"cell cellShort " + (player.jerseyStatus)}>
                  <div className="cellDirection">
                    <div className="cellValue">
                      {player.jersey}
                    </div>
                    <div className="cellArrow">
                      {player.jerseyDirection}
                    </div>
                  </div>
                </CellContainer>
            </tr>
          )
      }

      const PlayerTable = players.map((play, index) => PlayerRow(play, index))

      const tableHeader = 
        <CSSTransition 
          in={fade}
          nodeRef={nodeRef}
          appear={true}
          timeout={300}
          classNames="fade"
        >
          <thead ref={nodeRef} className="cellHeaderHead">
              <tr className="cellHeaderRow">
                  <th className="cellHeader cellHeaderLong"></th>
                  <th className="cellHeader">TEAM</th>
                  <th className="cellHeader">CONF</th>
                  <th className="cellHeader">DIV</th>
                  <th className="cellHeader">POS</th>
                  <th className="cellHeader">HT</th>
                  <th className="cellHeader">AGE</th>
                  <th className="cellHeader">#</th>
              </tr>
          </thead>
        </CSSTransition>
    
    return (
        <table>
            {tableHeader}
            <tbody id="tableBody">
                {PlayerTable}
            </tbody>
        </table>
    )
}