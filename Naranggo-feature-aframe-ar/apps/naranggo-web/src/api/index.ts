import axios from 'axios';

export const getMapSearchResults = () => {
  return axios
    .get(
      'https://gist.githubusercontent.com/Ndream-ChoiDaeWook/39cad9d39085ecc16161f280e89ed9d8/raw/e3ff401c08dba8985a8f69b79cd4d459a28a7139/gistfile1.json'
    )
    .then((res) => res.data);
};

export const getProfile = () => {
  return axios
    .get(
      'https://gist.githubusercontent.com/Ndream-ChoiDaeWook/8bcf986a76171dea9e7cff05396ae2b3/raw/f4ad8d43dc4eac35fe3d2c15b8f8fbace5c6b965/gistfile1.txt'
    )
    .then((res) => res.data);
};
