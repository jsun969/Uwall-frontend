import { useState } from 'react';
import { sendForm } from '../../apis';
import { useSnackbar } from 'notistack';
import { TextField, Box, Container, FormControlLabel, Grid, Switch, Button, Collapse } from '@material-ui/core';

export default function BaseForm(props) {
  const { haveAnonymous, type } = props;

  const [fromName, setFromName] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async () => {
    try {
      const { status } = await sendForm(type, {
        name: anonymous ? '' : fromName,
        message,
        anonymous,
      });
      if (status === 201) {
        enqueueSnackbar('发送成功 , 请等待审核通过', { variant: 'success' });
        props.onClose();
      }
    } catch (error) {
      enqueueSnackbar(`发送失败 ${error}`, { variant: 'error' });
      props.onClose();
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
                    value={fromName}
                    onChange={(event) => {
                      setFromName(event.target.value);
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
                disabled={!((anonymous || !!fromName) && !!message)}
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
