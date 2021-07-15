import { useState } from 'react';
import {
  Card,
  Chip,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Box,
  Badge,
  CardMedia,
  Divider,
  Grid,
  Collapse,
} from '@material-ui/core';
import { Favorite, RecordVoiceOver, Help, Notifications, People, Forward, ThumbUp, Chat } from '@material-ui/icons';
import dayjs from 'dayjs';

function Comment(props) {
  const { time, name, comment } = props;
  return (
    <Box>
      <Box mb={2} mt={1}>
        <Divider />
      </Box>
      <Grid container justifyContent="space-between">
        <Typography display="inline" align="left">
          {name}
        </Typography>
        <Typography variant="caption" color="textSecondary" display="inline" align="right">
          {dayjs(time).format('YYYY年M月D号 HH:mm')}
        </Typography>
      </Grid>
      <Typography variant="body2">{comment}</Typography>
    </Box>
  );
}

export default function MessageCard(props) {
  const { time, type, fromName, fromSex, toName, toSex, message, anonymous, likes, imageUrl, comments, showType } = props;
  const [showComments, setShowComments] = useState(false);

  const types = {
    love: <Chip label="表白" icon={<Favorite />} />,
    complaint: <Chip label="吐槽" icon={<RecordVoiceOver />} />,
    help: <Chip label="求助" icon={<Help />} />,
    notice: <Chip label="求助" icon={<Notifications />} />,
    expand: <Chip label="扩列" icon={<People />} />,
  };
  const from = !anonymous && <span style={{ color: ['#000000', '#0069c0', '#b0003a'][fromSex] }}>{fromName} </span>;
  const to = <span style={{ color: ['#000000', '#0069c0', '#b0003a'][toSex] }}> {toName}</span>;
  const loveTitle = (
    <span>
      {from}
      <Forward style={{ color: '#f06292', marginBottom: '-5px' }} />
      {to}
    </span>
  );
  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>{showType && types[type]}</Grid>
          <Grid item>
            <Typography color="textSecondary">{dayjs(time).format('YYYY年M月D号 HH:mm')}</Typography>
          </Grid>
        </Grid>
        <Box my={2.5}>
          <Typography variant="h5">{type === 'love' ? loveTitle : from}</Typography>
        </Box>
        <Typography>{message}</Typography>
      </CardContent>
      {imageUrl && <CardMedia image={imageUrl} style={{ height: 0, paddingTop: '56.25%' }} />}
      <CardActions>
        <IconButton>
          <Badge badgeContent={likes} color="secondary">
            <ThumbUp />
          </Badge>
        </IconButton>
        <IconButton
          color={showComments ? 'primary' : 'default'}
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          <Badge badgeContent={comments.length} color="secondary">
            <Chat />
          </Badge>
        </IconButton>
      </CardActions>
      <Collapse in={showComments}>
        <CardContent>
          {comments.map((comment) => (
            <Comment time={comment.time} name={comment.name} comment={comment.comment} key={comment.id} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
