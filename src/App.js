import { Box, AppBar, Toolbar, Typography } from '@material-ui/core';
import PostButton from './components/PostButton';

function App() {
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">万能墙</Typography>
        </Toolbar>
      </AppBar>
      <PostButton />
    </Box>
  );
}

export default App;
