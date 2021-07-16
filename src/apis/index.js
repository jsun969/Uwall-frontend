import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const sendLove = (data) => service.post('/love', data);

export const sendForm = (type, data) => service.post(`/${type}`, data);

export const getMessages = (type, page) => service.get(type ? `/messages/${type}?page=${page}` : `/messages?page=${page}`);

export const sendLike = (id) => service.patch('/like', { id });

export const sendComment = (data) => service.post('/comment', data);
