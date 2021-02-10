import axios from 'axios';
const token = "eFExWCgsmCX066dKSsJVmGu2HUYATekkGFcxbgnIfjPTtQ67JZrWjDnmwS3dn93p";

const getFixture = async (fixtureId) => {
  //Axios ile isteği atıyor ve fixture bilgilerini alıyor.
  return axios.get('http://dev.webuildbots.ai:9123/fixtures?fixtureId=' + fixtureId + '&token=' + token)
    .then(async res => res.data)
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

export {
  getFixture,
  getPlayer
}
