import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { QuestionAnswer } from '@material-ui/icons';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { pink, purple } from '@material-ui/core/colors';
import PostButton from './components/PostButton';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: purple,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <header>
          <AppBar>
            <Toolbar>
              <QuestionAnswer />
              <Box ml={1}>
                <Typography variant="h6">{process.env.REACT_APP_SCHOOL}万能墙</Typography>
              </Box>
            </Toolbar>
          </AppBar>
        </header>
        <main>
          <PostButton />
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
