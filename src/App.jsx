import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import { QuestionAnswer } from '@material-ui/icons';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { pink, purple } from '@material-ui/core/colors';
import PostButton from './components/PostButton';
import Messages from './components/Messages';
import { SnackbarProvider } from 'notistack';
import storage from './storage';

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: purple,
  },
});

function App() {
  const [tabIndex, setTabIndex] = useState('all');
  useEffect(() => {
    storage.initialize();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1}>
        <TabContext value={tabIndex}>
          <AppBar>
            <Toolbar>
              <QuestionAnswer />
              <Box ml={1}>
                <Typography variant="h6">{process.env.REACT_APP_SCHOOL}万能墙</Typography>
              </Box>
            </Toolbar>
            <TabList
              onChange={(event, value) => {
                setTabIndex(value);
              }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="全部" value="all" />
              <Tab label="表白" value="love" />
              <Tab label="吐槽" value="complaint" />
              <Tab label="求助" value="help" />
              <Tab label="通知" value="notice" />
              <Tab label="扩列" value="expand" />
            </TabList>
          </AppBar>
          <Box pt={12}>
            <TabPanel value="all">
              <Messages />
            </TabPanel>
            <TabPanel value="love">
              <Messages type="love" />
            </TabPanel>
            <TabPanel value="complaint">
              <Messages type="complaint" />
            </TabPanel>
            <TabPanel value="help">
              <Messages type="help" />
            </TabPanel>
            <TabPanel value="notice">
              <Messages type="notice" />
            </TabPanel>
            <TabPanel value="expand">
              <Messages type="expand" />
            </TabPanel>
          </Box>
        </TabContext>
        <PostButton />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
