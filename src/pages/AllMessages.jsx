import { getAllMessages } from '../apis';
import { useEffect, useState } from 'react';
import MessageCard from '../components/MessageCard';
import { Grid } from '@material-ui/core';
import storage from '../storage';

export default function AllMessages() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function fetchMsg() {
      const { data } = await getAllMessages();
      setMessages(data);
    }
    fetchMsg();
  }, []);

  return (
    <Grid container spacing={2}>
      {messages.map((message) => (
        <Grid item xs={12} key={message.id}>
          <MessageCard
            showType
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
    </Grid>
  );
}
