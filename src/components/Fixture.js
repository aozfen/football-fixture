import Player from './Player';

const Fixture = ({ fixtureData }) => {
  return (
    <>
      <div>{fixtureData.teams[0].name} - {fixtureData.teams[1].name}</div>
      <div>{fixtureData.location}</div>
      <div>{fixtureData.date}</div>
      <div>
        <div>
          {fixtureData.teams[0].players.map((d, i) => {
            return (<Player key={d.playerId} playerData={d} />)
          })}
        </div>
        <hr />
        <div>
          {fixtureData.teams[1].players.map((d, i) => {
            return (<Player key={d.playerId} playerData={d} />)
          })}
        </div>
      </div>
    </>
  )
}

export default Fixture;