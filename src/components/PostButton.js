import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { Edit, Favorite, RecordVoiceOver, Help, Notifications, People } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <Favorite />, name: '表白' },
  { icon: <RecordVoiceOver />, name: '吐槽' },
  { icon: <Help />, name: '求助' },
  { icon: <Notifications />, name: '通知' },
  { icon: <People />, name: '扩列' },
];

export default function PostButton() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleAction = () => {
    setOpen(false);
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
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} tooltipOpen onClick={handleAction} />
        ))}
      </SpeedDial>
    </div>
  );
}
