import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { pink, purple } from '@material-ui/core/colors';
import PostButton from './components/PostButton';

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: purple,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">万能墙</Typography>
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <PostButton />
      </main>
    </ThemeProvider>
  );
}

export default App;
