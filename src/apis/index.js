import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const sendLove = (data) => service.post('/love', data);

export const getAllMessages = () => service.get('/messages');
