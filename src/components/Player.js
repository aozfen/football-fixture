const Player = ({ playerData }) => {
  return (
    <tr key={playerData.playerId}>
      <td><b>{playerData.playerNo}</b></td>
      <td>{playerData.playerName}</td>
      <td><b>{playerData.position}</b></td>
      <td><b>{playerData.playerGoals}</b></td>
      <td><div className="td-card"><div className="card card-yellow"></div> <b>{playerData.playerYellowCards}</b></div></td>
      <td><div className="td-card"><div className="card card-red"></div><b>{playerData.playerRedCards}</b></div></td>
    </tr>
  )
}

export default Player;
