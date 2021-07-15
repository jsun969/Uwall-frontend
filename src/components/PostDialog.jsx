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

export default function PostDialog(props) {
  const classes = useStyles();
  const content = [
    {
      type: 'love',
      title: '表白',
      component: (
        <Love
          onClose={() => {
            props.onClose();
          }}
        />
      ),
    },
    { type: 'complaint', title: '吐槽', component: '' },
    { type: 'help', title: '求助', component: '' },
    { type: 'notice', title: '通知', component: '' },
    { type: 'expand', title: '扩列', component: '' },
  ];
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
        <Typography variant="h6">{content.find(({ type }) => type === props.type).component}</Typography>
      </Dialog>
    </div>
  );
}
