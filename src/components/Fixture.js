import Players from './Players';

const Fixture = ({ fixtureData }) => {
  return (
    <>
      <div>{fixtureData.teams[0].name} - {fixtureData.teams[1].name}</div>
      <div>{fixtureData.location}</div>
      <div>{fixtureData.date}</div>
      <div className="team-lists">
        <Players playerData={fixtureData.teams[0]} />
        <hr />
        <Players playerData={fixtureData.teams[1]} />
      </div>
    </>
  )
}

export default Fixture;