import { getMessages } from '../apis';
import { useEffect, useState } from 'react';
import MessageCard from './MessageCard';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import storage from '../storage';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: pink,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Messages(props) {
  const { type } = props;
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoad, setShowLoad] = useState(true);
  const [Loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await getMessages(type, 0);
      if (data.length < 10) {
        setShowLoad(false);
      }
      setMessages(data);
      setLoading(false);
    })();
  }, [type]);

  const handleLoad = () => {
    (async () => {
      setLoading(true);
      const { data } = await getMessages(type, page);
      setMessages([...messages, ...data]);
      if (data.length < 10) {
        setLoading(false);
        setShowLoad(false);
        return;
      }
      setPage(page + 1);
      setLoading(false);
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
          <Button onClick={handleLoad} color="secondary" variant="contained" disabled={!showLoad || Loading}>
            {Loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            {showLoad ? '加载更多' : '没了'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
