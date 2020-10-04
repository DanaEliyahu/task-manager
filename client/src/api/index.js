import axios from 'axios';

export default axios.create({
  baseURL: `api/`,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers' :'Content-Type,Authorization',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
  },
});