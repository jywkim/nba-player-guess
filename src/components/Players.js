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
        return(
              <tr key = {index}>
                  <td className={"cellSingle cellLong " + (player.nameStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.name}
                      </div>
                    </div>
                  </td>
                  <td className={"cellSingle " + (player.teamStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.team}
                      </div>
                    </div>
                  </td>
                  <td className={"cellSingle " + (player.confStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.conf}
                      </div>
                    </div>
                  </td>
                  <td className={"cellSingle " + (player.divStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.div}
                      </div>
                    </div>                    
                  </td>
                  <td className={"cellSingle " + (player.posStatus)}>
                    <div>
                      <div className="cellValue">
                        {player.pos}
                      </div>
                    </div>                    
                  </td>
                  <td className={"cellSingle " + (player.heightStatus)}>
                    <div className="cellDirection">
                      <div className="cellValue">
                        {player.heightFt + "'" + player.heightIn + '"'}
                      </div>
                      <div className="dirArrow">
                        {player.heightDirection}
                      </div>
                    </div>
                  </td>
                  <td className={"cellSingle " + (player.ageStatus)}>
                    <div className="cellDirection">
                      <div className="cellValue">
                        {player.age}
                      </div>
                      <div className="dirArrow">
                        {player.ageDirection}
                      </div>
                    </div>
                  </td>
                  <td className={"cellSingle " + (player.jerseyStatus)}>
                    <div className="cellDirection">
                      <div className="cellValue">
                      {player.jersey}
                      </div>
                      <div className="dirArrow">
                      {player.jerseyDirection}
                      </div>
                    </div>
                  </td>
              </tr>
          )
      }

      const PlayerTable = players.map((play, index) => PlayerRow(play, index))

      const tableHeader = <thead className="classHeader">
                            <tr className="rowHeader">
                                <th className="cellHeader headerLong"></th>
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