import axios from 'axios';
import md5 from 'md5';

const publicKey = '5a65dd346ae2568af09f200faf24986f';
const privateKey = '77e5d2dd26cf7cbfb839258a3a2faf04fdb12ce9';
const ts = new Date().getTime().toString(); 

const hash = md5(ts + privateKey + publicKey);

const instance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    apikey: publicKey,
    ts,
    hash,
  },
});

console.log('Request Params:', {
  apikey: publicKey,
  ts,
  hash,
});

export default instance;
