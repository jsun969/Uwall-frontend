import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useState } from 'react';
import { sendComment } from '../apis';
import { useSnackbar } from 'notistack';
import storage from '../storage';

export default function CommentDialog(props) {
  const [name, setName] = useState(storage.getName());
  const [comment, setComment] = useState('');

  const [disableSubmit, setDisableSubmit] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      setDisableSubmit(true);
      storage.setName(name);
      const { status } = await sendComment({
        id: props.id,
        name,
        comment,
      });
      if (status === 201) {
        enqueueSnackbar('评论成功 , 请等待审核通过', { variant: 'success' });
        props.onClose();
        setDisableSubmit(true);
      }
    } catch (error) {
      enqueueSnackbar(`评论失败 ${error}`, { variant: 'error' });
      props.onClose();
      setDisableSubmit(false);
    }
  };

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
          <DialogContentText>给 {props.from ? props.from : '匿名'} 评论</DialogContentText>
          <TextField
            margin="dense"
            label="你的名字"
            fullWidth
            inputProps={{ maxLength: 15 }}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="说点什么~"
            fullWidth
            inputProps={{ maxLength: 50 }}
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
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
          <Button onClick={handleSubmit} color="primary" disabled={!(name && comment) || disableSubmit}>
            发送
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
