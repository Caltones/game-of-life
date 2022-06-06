import { useState, useEffect } from 'react';
import Gameboard from './Gameboard';
import {
  create2Darr,
  randomArr,
  nextRound,
  Plusar,
  Pentadecathlon,
  lwss,
} from './gameLogic';
import { Button, Typography, Menu, MenuItem } from '@mui/material';
import StartIcon from '@mui/icons-material/Start';
import ClearIcon from '@mui/icons-material/Clear';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
function App() {
  const col = 25;
  const row = 25;
  const [grid, setGrid] = useState(randomArr(create2Darr(row, col)));
  const [run, setRun] = useState(false);
  const [gen, setGen] = useState(0);
  const [id, setId] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    if (run) {
      let tempId = setInterval(() => {
        setGrid((prevGrid) => nextRound(prevGrid));
        setGen((prevGen) => prevGen + 1);
        setId(tempId);
      }, 100);
    } else {
      clearInterval(id);
    }
  }, [run]);
  const clearHandler = () => {
    setGen(0);
    setRun(false);
    setGrid(create2Darr(row, col));
  };
  const randomHandler = () => {
    setGen(0);
    setGrid(randomArr(create2Darr(row, col)));
    setRun(false);
  };
  const runHandler = () => {
    setRun(!run);
  };
  const clickHandler = (e) => {
    if (run) return;
    const [x, y] = e.target.id.split(',');
    const copy = [...grid];
    copy[x][y] = copy[x][y] === 0 ? 1 : 0;
    setGrid(copy);
    console.log(copy);
  };
  const patternHandler = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(!menuOpen);
  };
  const PlusarHandler = () => {
    if (run) return;
    setGrid(Plusar);
  };
  const PentadecathlonHandler = () => {
    if (run) return;
    setGrid(Pentadecathlon);
  };
  const lwssHandler = () => {
    if (run) return;
    setGrid(lwss);
  };
  return (
    <div>
      <div
        className="App"
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          margin: 10,
        }}
      >
        <Gameboard
          grid={grid}
          col={col}
          row={row}
          clickHandler={clickHandler}
        />
      </div>
      <Typography variant="body1">Generation: {gen}</Typography>
      <Button endIcon={<StartIcon />} variant="outlined" onClick={runHandler}>
        {run ? 'Pause' : 'Start'}
      </Button>
      <Button endIcon={<ClearIcon />} variant="outlined" onClick={clearHandler}>
        Clear
      </Button>
      <Button
        endIcon={<ShuffleIcon />}
        variant="outlined"
        onClick={randomHandler}
      >
        Random
      </Button>
      <Button
        endIcon={<ViewComfyIcon />}
        variant="outlined"
        onClick={patternHandler}
      >
        Pattern
      </Button>
      <Menu
        open={menuOpen}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorEl={anchorEl}
        onClose={() => setMenuOpen(false)}
      >
        <MenuItem onClick={PlusarHandler}>Pulsar</MenuItem>
        <MenuItem onClick={PentadecathlonHandler}>Pentadecathlon</MenuItem>
        <MenuItem onClick={lwssHandler}>Light-weight spaceship</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
