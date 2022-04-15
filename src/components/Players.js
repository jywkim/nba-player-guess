import React, { useEffect } from "react";

export const Players = ({players}) => {
  useEffect(() => {
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
                  <td className={"cell cellLong " + (player.nameStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.name}
                      </div>
                    </div>
                  </td>
                  <td className={"cell cellShort " + (player.teamStatus)}>
                    <div>
                      <div>
                        <img className="cellTeamLogo" src={playerPicUrl} alt="Team Logo"></img>
                      </div>
                      <div className="cellValue">
                        {player.team}
                      </div>
                    </div>
                  </td>
                  <td className={"cell cellShort " + (player.confStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.conf}
                      </div>
                    </div>
                  </td>
                  <td className={"cell cellShort " + (player.divStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.div}
                      </div>
                    </div>                    
                  </td>
                  <td className={"cell cellShort " + (player.posStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.pos}
                      </div>
                    </div>                    
                  </td>
                  <td className={"cell cellShort " + (player.heightStatus)}>
                    <div className="cellDirection">
                      <div className="cellValue">
                        {player.heightFt + "'" + player.heightIn + '"'}
                      </div>
                      <div className="cellArrow">
                        {player.heightDirection}
                      </div>
                    </div>
                  </td>
                  <td className={"cell cellShort " + (player.ageStatus)}>
                    <div className="cellDirection">
                      <div className="cellValue">
                        {player.age}
                      </div>
                      <div className="cellArrow">
                        {player.ageDirection}
                      </div>
                    </div>
                  </td>
                  <td className={"cell cellShort " + (player.jerseyStatus)}>
                    <div className="cellDirection">
                      <div className="cellValue">
                        {player.jersey}
                      </div>
                      <div className="cellArrow">
                        {player.jerseyDirection}
                      </div>
                    </div>
                  </td>
              </tr>
          )
      }

      const PlayerTable = players.map((play, index) => PlayerRow(play, index))

      const tableHeader = <thead className="cellHeaderHead">
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
    
    return (
        <table>
            {tableHeader}
            <tbody id="tableBody">
                {PlayerTable}
            </tbody>
        </table>
    )
}