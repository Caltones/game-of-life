export default function Gameboard({grid, col,row, clickHandler}) {

  const coloring = (val) => (val === 1 ? '#00bcd4' : '#757575');
  return (
    <div
      style={{
        margin: '10vmin',
        width: '50vmin',
        height: '50vmin',
        display: 'grid',
        gridTemplateColumns: `repeat(${col},2vmin)`,
        gridTemplateRows : `repeat(${row},2vmin)`,
        alignContent: 'center',
        justifyContent:'center',
        gap: 1,
      }}
    >
      {grid.map((v,i) => {
        return v.map((val,j) => (
          <div
          onClick={clickHandler}
            id={`${i},${j}`}
            key={i*v.length+j}
            style={{
              backgroundColor: coloring(val),
              width: '100%',
              cursor:'pointer'
            }}
          >
          </div>
        ));
      })}
    </div>
  );
}
