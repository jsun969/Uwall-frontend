import { useState } from 'react';
import { sendForm } from '../../apis';
import { useSnackbar } from 'notistack';
import { TextField, Box, Container, FormControlLabel, Grid, Switch, Button, Collapse } from '@material-ui/core';
import storage from '../../utils/storage';

export default function BaseForm(props) {
  const { haveAnonymous, type } = props;

  const [name, setName] = useState(storage.getName());
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const [disableSubmit, setDisableSubmit] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async () => {
    try {
      setDisableSubmit(true);
      storage.setName(name);
      const { status } =
        (await sendForm(type, {
          name: anonymous ? '' : name,
          message,
          anonymous,
        })) || {};
      if (status === 201) {
        enqueueSnackbar('发送成功 , 请等待审核通过', { variant: 'success' });
        props.onClose();
        setDisableSubmit(false);
      }
    } catch (error) {
      enqueueSnackbar(`发送失败 ${error}`, { variant: 'error' });
      props.onClose();
      setDisableSubmit(false);
    }
  };

  return (
    <Container>
      <Box mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Collapse in={!anonymous}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="你的名字"
                    fullWidth
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    inputProps={{ maxLength: 15 }}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="内容"
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              inputProps={{ maxLength: 250 }}
            />
          </Grid>
          <Grid item container justifyContent={haveAnonymous ? 'flex-start' : 'flex-end'}>
            {haveAnonymous && (
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={anonymous}
                      onChange={(event) => {
                        setAnonymous(event.target.checked);
                      }}
                    />
                  }
                  label="匿名"
                />
              </Grid>
            )}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={!((anonymous || !!name) && !!message) || disableSubmit}
                onClick={handleSubmit}
              >
                发送
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
