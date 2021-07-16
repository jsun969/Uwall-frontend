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
import {
  Favorite,
  RecordVoiceOver,
  Help,
  Notifications,
  People,
  Forward,
  ThumbUp,
  Comment,
  AddComment,
} from '@material-ui/icons';
import { sendLike } from '../apis';
import dayjs from 'dayjs';
import CommentDialog from './CommentDialog';
import storage from '../storage';
import { useSnackbar } from 'notistack';

function CommentText(props) {
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
  const { enqueueSnackbar } = useSnackbar();

  const { id, time, type, fromName, fromSex, toName, toSex, message, anonymous, imageUrl, comments, showType } = props;

  const [showComments, setShowComments] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [isLike, setIsLike] = useState(props.isLike);
  const [likes, setLikes] = useState(props.likes);

  const types = {
    love: <Chip label="表白" icon={<Favorite />} />,
    complaint: <Chip label="吐槽" icon={<RecordVoiceOver />} />,
    help: <Chip label="求助" icon={<Help />} />,
    notice: <Chip label="通知" icon={<Notifications />} />,
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
        {showType ? (
          <Grid container justifyContent="space-between">
            <Grid item>{types[type]}</Grid>
            <Grid item>
              <Typography color="textSecondary">{dayjs(time).format('YYYY年M月D号 HH:mm')}</Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography color="textSecondary">{dayjs(time).format('YYYY年M月D号 HH:mm')}</Typography>
        )}
        <Box mb={2.5} mt={showType ? 2.5 : 0}>
          <Typography variant="h5">{type === 'love' ? loveTitle : from}</Typography>
        </Box>
        <Typography component="pre">
          {message}
        </Typography>
      </CardContent>
      {imageUrl && <CardMedia image={imageUrl} style={{ height: 0, paddingTop: '56.25%' }} />}
      <CardActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            <IconButton
              onClick={async () => {
                setIsLike(true);
                if (!isLike) {
                  storage.addLike(id);
                  try {
                    const { status } = await sendLike(id);
                    if (status === 200) {
                      enqueueSnackbar(`为 ${fromName ? fromName : '匿名'} 点赞成功`, { variant: 'success' });
                      setLikes(likes + 1);
                    }
                  } catch (error) {
                    enqueueSnackbar(`点赞失败 ${error}`, { variant: 'error' });
                  }
                }
              }}
              color={isLike ? 'primary' : 'default'}
            >
              <Badge badgeContent={likes} color="secondary">
                <ThumbUp />
              </Badge>
            </IconButton>
            <IconButton
              color={showComments ? 'primary' : 'default'}
              onClick={() => {
                if (comments.length !== 0) setShowComments(!showComments);
                else setShowCommentDialog(true);
              }}
            >
              <Badge badgeContent={comments.length} color="secondary">
                {comments.length !== 0 ? <Comment /> : <AddComment />}
              </Badge>
            </IconButton>
          </Grid>
          {comments.length !== 0 && (
            <Grid item>
              <IconButton
                onClick={() => {
                  setShowCommentDialog(true);
                }}
              >
                <AddComment />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </CardActions>
      <Collapse in={showComments}>
        <CardContent>
          {comments.map((comment) => (
            <CommentText time={comment.time} name={comment.name} comment={comment.comment} key={comment.id} />
          ))}
        </CardContent>
      </Collapse>
      <CommentDialog
        from={fromName}
        open={showCommentDialog}
        id={id}
        onClose={() => {
          setShowCommentDialog(false);
        }}
      />
    </Card>
  );
}
