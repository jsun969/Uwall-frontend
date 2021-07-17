const initialize = () => {
  if (!localStorage.getItem('likes')) {
    localStorage.setItem('likes', '[]');
  }
};

const addLike = (id) => {
  const likes = JSON.parse(localStorage.getItem('likes'));
  likes.push(id);
  localStorage.setItem('likes', JSON.stringify(likes));
};

const getLikes = () => JSON.parse(localStorage.getItem('likes'));

const setName = (name) => localStorage.setItem('name', name);

const getName = () => localStorage.getItem('name');

const storage = { initialize, addLike, getLikes, setName, getName };
export default storage;
