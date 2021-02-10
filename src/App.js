import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ADD_FIXTURE } from './store/actions/types';
import { getFixture, getPlayer } from './apiService';

import Fixture from './components/Fixture';

import './App.css';

const App = () => {
  //useDispatch methodunu oluşturduk
  const dispatch = useDispatch()
  //redux state de bulunan fixture state'i burada alıyoruz. Dispatch ile ekleme yapıldığında anlık render edilir.
  const fixture = useSelector(state => state.fixture)
  //ilk istek atıldığın loading işlemini yapmak için gereklidir.
  const [load, setLoad] = useState(false);

  useEffect(() => {
    //ilk isteğimizi atıyoruz. Parametre olarak fixtureId alıyor.
    getData("1234567");
  }, []);

  const getData = async (fixtureId) => {
    getFixture(fixtureId)
      .then(async res => {
        //Takım listesini tekrardan oluşturuyoruz(Birinci takım/Ev sahibi)
        const team1 = res.teams[0].players.map(async (d, i) => {
          //playerId ile oyuncu bilgisini çekiyoruz
          const player = await getPlayer(d.playerId);
          return {
            playerId: d.playerId,
            position: d.position,
            playerName: player.name,
            playerNo: player.played,
            playerGoals: player.goals,
            playerRedCards: player.redCards,
            playerYellowCards: player.yellowCards
          }
        });
        //Takım listesini tekrardan oluşturuyoruz(İkinci takım/Deplasman)
        const team2 = res.teams[1].players.map(async (d, i) => {
          //playerId ile oyuncu bilgisini çekiyoruz
          const player = await getPlayer(d.playerId);
          return {
            playerId: d.playerId,
            position: d.position,
            playerName: player.name,
            playerNo: player.played,
            playerGoals: player.goals,
            playerRedCards: player.redCards,
            playerYellowCards: player.yellowCards
          }
        });
        //Gelen takım bilgileri async olduğu için Promise ile alıyoruz
        const resultTeam1 = Promise.all(team1);
        const resultTeam2 = Promise.all(team2);

        res.teams[0].players = await resultTeam1; // Birinci takım dizisini yeniden oluşturuyoruz
        res.teams[1].players = await resultTeam2; // İkinci takım dizisini yeniden oluşturuyoruz

        //dispatch ile veriyi REDUX STORE'e kaydediyoruz.
        dispatch({ type: ADD_FIXTURE, payload: res })
        //Load true olarak değiştiriyoruz artık tüm dataları aldık
        setLoad(true);
      })
      .catch(err => console.error(err));
  };

  if (load) {
    return (
      <div className="app">
        <Fixture fixtureData={fixture} />
      </div>);
  } else {
    return (
      <div className="app">
        Loading...
      </div>
    );
  }

}

export default App;
