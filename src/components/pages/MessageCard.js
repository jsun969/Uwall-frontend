import { Card, Chip, CardContent, Typography, CardActions, IconButton, Box, Badge, CardMedia } from '@material-ui/core';
import { Favorite, RecordVoiceOver, Help, Notifications, People, Forward, ThumbUp, Comment } from '@material-ui/icons';

export default function MessageCard(props) {
  const { time, type, fromName, fromSex, toName, toSex, message, anonymous, likes, imageUrl, comments, showType } = props;

  const types = {
    love: <Chip label="表白" icon={<Favorite />} />,
    complaint: <Chip label="吐槽" icon={<RecordVoiceOver />} />,
    help: <Chip label="求助" icon={<Help />} />,
    notice: <Chip label="求助" icon={<Notifications />} />,
    expand: <Chip label="扩列" icon={<People />} />,
  };
  const from = <span style={{ color: ['#000000', '#0069c0', '#b0003a'][fromSex] }}>{fromName} </span>;
  const to = <span style={{ color: ['#000000', '#0069c0', '#b0003a'][toSex] }}> {toName}</span>;

  return (
    <Card>
      <CardContent>
        {showType && types[type]}
        <Box mb={2.5}>
          <Typography variant="h5">
            {type === 'love' ? (
              <span>
                {anonymous || from}
                <Forward style={{ color: '#f06292', marginBottom: '-5px' }} />
                {to}
              </span>
            ) : (
              anonymous || from
            )}
          </Typography>
          <Box mt={anonymous && type !== 'love' && 2.5}>
            <Typography color="textSecondary">{time}</Typography>
          </Box>
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
        <IconButton>
          <Badge badgeContent={comments.length} color="secondary">
            <Comment />
          </Badge>
        </IconButton>
      </CardActions>
    </Card>
  );
}
