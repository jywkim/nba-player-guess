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
                      {player.name}
                    </div>
                  </td>
                  <td className={"cellSingle cellSmall " + (player.teamStatus)}>
                    <div>
                      {player.team}
                    </div>
                  </td>
                  <td className={"cellSingle cellSmall " + (player.confStatus)}>
                    <div>
                      {player.conf}
                    </div>
                  </td>
                  <td className={"cellSingle cellSmall " + (player.divStatus)}>
                    <div>
                      {player.div}
                    </div>
                  </td>
                  <td className={"cellSingle cellSmall " + (player.posStatus)}>
                    <div>
                      {player.pos}
                    </div>
                  </td>
                  <td className={"cellSingle cellSmall " + (player.heightStatus)}>
                    <div className="cellDirection">
                      <div className="dirVal">
                        {player.heightFt + "'" + player.heightIn + '"'}
                      </div>
                      <div className="dirArrow">
                        {player.heightDirection}
                      </div>
                    </div>
                  </td>
                  <td className={"cellSingle cellSmall " + (player.ageStatus)}>
                    <div className="cellDirection">
                      <div className="dirVal">
                        {player.age}
                      </div>
                      <div className="dirArrow">
                        {player.ageDirection}
                      </div>
                    </div>
                  </td>
                  <td className={"cellSingle cellSmall " + (player.jerseyStatus)}>
                    <div className="cellDirection">
                      <div className="dirVal">
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
                                <th className="cellHeader cellLong"></th>
                                <th className="cellHeader cellSmall">TEAM</th>
                                <th className="cellHeader cellSmall">CONF</th>
                                <th className="cellHeader cellSmall">DIV</th>
                                <th className="cellHeader cellSmall">POS</th>
                                <th className="cellHeader cellSmall">HT</th>
                                <th className="cellHeader cellSmall">AGE</th>
                                <th className="cellHeader cellSmall">#</th>
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