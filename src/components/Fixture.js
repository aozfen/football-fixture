import Player from './Player';

const Fixture = ({ fixtureData }) => {
  return (
    <>
      <div>{fixtureData.teams[0].name} - {fixtureData.teams[1].name}</div>
      <div>{fixtureData.location}</div>
      <div>{fixtureData.date}</div>
      <div className="team-lists">
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
            {fixtureData.teams[0].players.map((d, i) => {
              return (<Player key={d.playerId} playerData={d} />)
            })}
          </tbody>
        </table>
        <hr />
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
            {fixtureData.teams[1].players.map((d, i) => {
              return (<Player key={d.playerId} playerData={d} />)
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Fixture;