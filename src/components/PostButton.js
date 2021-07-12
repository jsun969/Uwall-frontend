import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { Edit, Favorite, RecordVoiceOver, Help, Notifications, People } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import PostDialog from './PostDialog';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { name: 'love', icon: <Favorite />, label: '表白' },
  { name: 'complaint', icon: <RecordVoiceOver />, label: '吐槽' },
  { name: 'help', icon: <Help />, label: '求助' },
  { name: 'notice', icon: <Notifications />, label: '通知' },
  { name: 'expand', icon: <People />, label: '扩列' },
];

export default function PostButton() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [type, setType] = useState(null);
  const handleAction = (name) => {
    setOpen(false);
    setType(name);
    setOpenDialog(true);
  };
  return (
    <div>
      <SpeedDial
        ariaLabel="PostButton"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<Edit />} />}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.label}
            tooltipOpen
            onClick={() => {
              handleAction(action.name);
            }}
          />
        ))}
      </SpeedDial>
      <PostDialog
        open={openDialog}
        type={type}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
    </div>
  );
}
