import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function CommentDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.onClose();
        }}
      >
        <DialogTitle>添加评论</DialogTitle>
        <DialogContent>
          <DialogContentText>给 {props.from} 评论</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="你的名字" fullWidth />
          <TextField autoFocus margin="dense" id="name" label="说点什么~" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.onClose();
            }}
            color="primary"
          >
            取消
          </Button>
          <Button
            onClick={() => {
              props.onClose();
            }}
            color="primary"
          >
            发送
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
