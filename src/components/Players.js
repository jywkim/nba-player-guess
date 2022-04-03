import React from 'react'

export const Players = ({players}) => {
    const PlayerRow = (player,index) => {
        return(
              <tr key = {index}>
                  <td className="cellSingle cellLong">
                    {player.name}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.team}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.conf}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.div}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.pos}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.heightFt + "'" + player.heightIn + '"'}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.age}
                  </td>
                  <td className="cellSingle cellSmall">
                    {player.jersey}
                  </td>
              </tr>
          )
      }

      const PlayerTable = players.map((play, index) => PlayerRow(play, index))

      const tableHeader = <thead>
                            <tr>
                                <th className="cellHeader">PLAYER</th>
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