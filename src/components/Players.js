import React from 'react'

export const Players = ({players}) => {
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
                    <div>
                      {player.heightFt + "'" + player.heightIn + '"'}
                    </div>
                    <div>
                      {player.heightDirection}
                    </div>
                  </td>
                  <td className={"cellSingle cellSmall " + (player.ageStatus)}>
                    <div>
                      {player.age}
                    </div>
                    <div>
                      {player.ageDirection}
                    </div>
                  </td>
                  <td className={"cellSingle cellSmall " + (player.jerseyStatus)}>
                    <div>
                      {player.jersey}
                    </div>
                    <div>
                      {player.jerseyDirection}
                    </div>
                  </td>
              </tr>
          )
      }

      const PlayerTable = players.map((play, index) => PlayerRow(play, index))

      const tableHeader = <thead>
                            <tr>
                                <th className="cellHeader"></th>
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
            <tbody>
                {PlayerTable}
            </tbody>
        </table>
    )
}