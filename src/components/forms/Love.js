import { useState } from 'react';
import { sendLove } from '../../api';
import { useSnackbar } from 'notistack';
import {
  TextField,
  Box,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Switch,
  Button,
  Collapse,
} from '@material-ui/core';

export default function Love(props) {
  const [fromSex, setFromSex] = useState(0);
  const [toSex, setToSex] = useState(0);
  const [fromName, setFromName] = useState('');
  const [toName, setToName] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async () => {
    try {
      const { status } = await sendLove({
        from: {
          name: anonymous ? '' : fromName,
          sex: anonymous ? 0 : fromSex,
        },
        to: {
          name: toName,
          sex: toSex,
        },
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
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>你的性别</FormLabel>
                    <RadioGroup
                      row
                      value={fromSex}
                      onChange={(event) => {
                        setFromSex(+event.target.value);
                      }}
                    >
                      <FormControlLabel value={0} control={<Radio />} label="保密" />
                      <FormControlLabel value={1} control={<Radio />} label="男" />
                      <FormControlLabel value={2} control={<Radio />} label="女" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="TA的名字"
              fullWidth
              value={toName}
              onChange={(event) => {
                setToName(event.target.value);
              }}
              inputProps={{ maxLength: 15 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel>TA的性别</FormLabel>
              <RadioGroup
                row
                value={toSex}
                onChange={(event) => {
                  setToSex(+event.target.value);
                }}
              >
                <FormControlLabel value={0} control={<Radio />} label="保密" />
                <FormControlLabel value={1} control={<Radio />} label="男" />
                <FormControlLabel value={2} control={<Radio />} label="女" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="想对TA说的话"
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
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              disabled={!((anonymous || !!fromName) && !!toName && !!message)}
              onClick={handleSubmit}
            >
              发送
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
