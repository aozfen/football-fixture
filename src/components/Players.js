const Players = ({ playerData }) => {
  return (
    <table className="team">
      <thead>
        <tr>
          <td>No</td>
          <td>Player Name</td>
          <td>Position</td>
          <td>Goal</td>
          <td>Y. Card</td>
          <td>R. Card</td>
        </tr>
      </thead>
      <tbody>
        {playerData.players.map((d, i) => {
          return (
            <tr key={d.playerId}>
              <td><b>{d.playerNo}</b></td>
              <td>{d.playerName}</td>
              <td><b>{d.position}</b></td>
              <td><b>{d.playerGoals}</b></td>
              <td><div className="td-card"><div className="card card-yellow"></div> <b>{d.playerYellowCards}</b></div></td>
              <td><div className="td-card"><div className="card card-red"></div><b>{d.playerRedCards}</b></div></td>
            </tr>
          )
        })}


      </tbody>
    </table>


  )
}

export default Players;
