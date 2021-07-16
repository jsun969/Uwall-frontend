import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const sendLove = (data) => service.post('/love', data);

export const getMessages = (page) => service.get(`/messages?page=${page}`);

export const sendLike = (id) => service.patch('/like', { id });

export const sendComment = (data) => service.post('/comment', data);
