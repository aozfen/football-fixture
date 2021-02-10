const Player = ({playerData}) => {
  return (
    <div key={playerData.playerId}>
      <b>{playerData.playerNo}</b> 
      {playerData.playerName} -  
      <b>{playerData.position}</b> - 
      GOAL: <b>{playerData.playerGoals}</b> -
      Sarı Kart: <b>{playerData.playerYellowCards}</b> -
      Kırmızı Kart:<b>{playerData.playerRedCards}</b> 
      </div>
  )
}

export default Player;
