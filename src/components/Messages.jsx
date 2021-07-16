import { getMessages } from '../apis';
import { useEffect, useState } from 'react';
import MessageCard from './MessageCard';
import { Grid, Button } from '@material-ui/core';
import storage from '../storage';

export default function Messages(props) {
  const { type } = props;
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoad, setShowLoad] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await getMessages(type, 0);
      if (data.length < 10) setShowLoad(false);
      setMessages(data);
    })();
  }, [type]);

  const handleLoad = () => {
    (async () => {
      const { data } = await getMessages(type, page);
      if (data.length < 10) setShowLoad(false);
      setMessages([...messages, ...data]);
      setPage(page + 1);
    })();
  };

  return (
    <Grid container spacing={2}>
      {messages.map((message) => (
        <Grid item xs={12} key={message.id}>
          <MessageCard
            showType={!type}
            id={message.id}
            type={message.type}
            fromName={message.fromName}
            fromSex={message.fromSex}
            toName={message.toName}
            toSex={message.toSex}
            time={message.time}
            message={message.message}
            anonymous={message.anonymous}
            likes={message.likes}
            imageUrl={message.imageUrl}
            comments={message.comments}
            isLike={storage.getLikes().includes(message.id)}
          />
        </Grid>
      ))}
      <Grid item container justifyContent="center">
        <Grid item>
          <Button onClick={handleLoad} color="secondary" variant="contained" disabled={!showLoad}>
            {showLoad ? '加载更多' : '没了'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
