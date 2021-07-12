import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';

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
  const handleClose = () => {
    props.onClose();
  };
  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.type}
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography variant="h6">Nothing Here..</Typography>
      </Dialog>
    </div>
  );
}
