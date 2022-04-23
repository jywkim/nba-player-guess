import React, { useEffect, useRef, useState } from "react";
import {CSSTransition} from "react-transition-group";

export const Players = ({players}) => {
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  const nodeRef3 = useRef(null);
  const nodeRef4 = useRef(null);
  const nodeRef5 = useRef(null);
  const nodeRef6 = useRef(null);
  const nodeRef7 = useRef(null);
  const nodeRef8 = useRef(null);

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

        return(
     
              <tr key = {index}>
                  <CSSTransition 
                    in={fade}
                    nodeRef={nodeRef}
                    appear={true}
                    timeout={300}
                    classNames="fade"
                  >
                    <td ref={nodeRef} className={"cell cellLong " + (player.nameStatus)}>
                      <div>
                        <div className="cellValue">
                          {player.name}
                        </div>
                      </div>
                    </td>
                  </CSSTransition>
                  <CSSTransition 
                    in={fade}
                    nodeRef={nodeRef2}
                    appear={true}
                    timeout={400}
                    classNames="fade2"
                  >
                  <td ref={nodeRef2} className={"cell cellShort " + (player.teamStatus)}>
                    <div>
                      <div>
                        <img className="cellTeamLogo" src={playerPicUrl} alt="Team Logo"></img>
                      </div>
                      <div className="cellValue">
                        {player.team}
                      </div>
                    </div>
                  </td>
                  </CSSTransition>
                  <CSSTransition 
                    in={fade}
                    nodeRef={nodeRef3}
                    appear={true}
                    timeout={500}
                    classNames="fade3"
                  >
                  <td ref={nodeRef3} className={"cell cellShort " + (player.confStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.conf}
                      </div>
                    </div>
                  </td>
                  </CSSTransition>
                  <CSSTransition 
                    in={fade}
                    nodeRef={nodeRef4}
                    appear={true}
                    timeout={600}
                    classNames="fade4"
                  >
                  <td ref={nodeRef4} className={"cell cellShort " + (player.divStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.div}
                      </div>
                    </div>                    
                  </td>
                  </CSSTransition>
                  <CSSTransition 
                    in={fade}
                    nodeRef={nodeRef5}
                    appear={true}
                    timeout={700}
                    classNames="fade5"
                  >
                  <td ref={nodeRef5} className={"cell cellShort " + (player.posStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.pos}
                      </div>
                    </div>                    
                  </td>
                  </CSSTransition>
                  <CSSTransition 
                    in={fade}
                    nodeRef={nodeRef6}
                    appear={true}
                    timeout={800}
                    classNames="fade6"
                  >
                  <td ref={nodeRef6} className={"cell cellShort " + (player.heightStatus)}>
                    <div className="cellDirection">
                      <div className="cellValue">
                        {player.heightFt + "'" + player.heightIn + '"'}
                      </div>
                      <div className="cellArrow">
                        {player.heightDirection}
                      </div>
                    </div>
                  </td>
                  </CSSTransition>
                  <CSSTransition 
                    in={fade}
                    nodeRef={nodeRef7}
                    appear={true}
                    timeout={900}
                    classNames="fade7"
                  >
                  <td ref={nodeRef7} className={"cell cellShort " + (player.ageStatus)}>
                    <div className="cellDirection">
                      <div className="cellValue">
                        {player.age}
                      </div>
                      <div className="cellArrow">
                        {player.ageDirection}
                      </div>
                    </div>
                  </td>
                  </CSSTransition>
                  <CSSTransition 
                    in={fade}
                    nodeRef={nodeRef8}
                    appear={true}
                    timeout={1000}
                    classNames="fade8"
                  >
                  <td ref={nodeRef8} className={"cell cellShort " + (player.jerseyStatus)}>
                    <div className="cellDirection">
                      <div className="cellValue">
                        {player.jersey}
                      </div>
                      <div className="cellArrow">
                        {player.jerseyDirection}
                      </div>
                    </div>
                  </td>
                  </CSSTransition>
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