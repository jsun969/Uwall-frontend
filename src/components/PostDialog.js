import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Love from './forms/Love';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const content = [
  { type: 'love', title: '表白', data: <Love /> },
  { type: 'complaint', title: '吐槽', data: '' },
  { type: 'help', title: '求助', data: '' },
  { type: 'notice', title: '通知', data: '' },
  { type: 'expand', title: '扩列', data: '' },
];

export default function PostDialog(props) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={() => {
          props.onClose();
        }}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                props.onClose();
              }}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {content.find(({ type }) => type === props.type).title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography variant="h6">{content.find(({ type }) => type === props.type).data}</Typography>
      </Dialog>
    </div>
  );
}
