import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ADD_FIXTURE } from './store/actions/types';

import './App.css';

const token = "eFExWCgsmCX066dKSsJVmGu2HUYATekkGFcxbgnIfjPTtQ67JZrWjDnmwS3dn93p";

const App = () => {
  //useDispatch methodunu oluşturduk
  const dispatch = useDispatch()
  //redux state de bulunan fixture state'i burada alıyoruz. Dispatch ile ekleme yapıldığında anlık render edilir.
  const fixture = useSelector(state => state.fixture)
  //ilk istek atıldığın loading işlemini yapmak için gereklidir.
  const [load, setLoad] = useState(false);

  useEffect(() => {
    //ilk isteğimizi atıyoruz. Parametre olarak fixtureId alıyor.
    getFixture("1234567");
  }, []);

  const getFixture = async (fixtureId) => {
    //Axios ile isteği atıyor ve fixture bilgilerini alıyor.
    axios.get('http://dev.webuildbots.ai:9123/fixtures?fixtureId=' + fixtureId + '&token=' + token)
      .then(async res => {

        //Takım listesini tekrardan oluşturuyoruz(Birinci takım/Ev sahibi)
        const team1 = res.data.teams[0].players.map(async (d, i) => {
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
        const team2 = res.data.teams[1].players.map(async (d, i) => {
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

        res.data.teams[0].players = await resultTeam1; // Birinci takım dizisini yeniden oluşturuyoruz
        res.data.teams[1].players = await resultTeam2; // İkinci takım dizisini yeniden oluşturuyoruz

        //dispatch ile veriyi REDUX STORE'e kaydediyoruz.
        dispatch({ type: ADD_FIXTURE, payload: res.data })
        //Load true olarak değiştiriyoruz artık tüm dataları aldık
        setLoad(true);
      })
      .catch(err => console.error(err));
  };

  //Oyuncuları getiren istek
  const getPlayer = async (playerId) => {
    return axios.get('http://dev.webuildbots.ai:9123/players?playerId=' + playerId + '&token=' + token)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
      });
  }
  if (load) {
    return (
      <div className="app">
        <div>{fixture.teams[0].name} - {fixture.teams[1].name}</div>
        <div>{fixture.location}</div>
        <div>{fixture.date}</div>
        <div>
          <div>
            {fixture.teams[0].players.map((d, i) => {
              return (<div key={d.playerId}><b>{d.playerNo}</b> {d.playerName} - {d.position}</div>)
            })}
          </div>
          <hr />
          <div>
            {fixture.teams[1].players.map((d, i) => {
               return (<div key={d.playerId}><b>{d.playerNo}</b> {d.playerName} - {d.position}</div>)
            })}
          </div>
        </div>
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
