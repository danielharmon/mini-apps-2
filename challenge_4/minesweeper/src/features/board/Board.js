import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  gameOver,
  reveal,
  reset,
  changeX,
  changeY,
  changeMines,
  revealAll
} from './boardSlice';
import styles from './Board.module.css';



export function Board() {
  const dispatch = useDispatch();
  let board = useSelector((state) => state.board.board)
  let lost = useSelector((state) => state.board.gameOver)
  let revealedCells = useSelector((state) => state.board.revealedCells)
  let mines = useSelector(state => state.board.mines)
  if (revealedCells > board.length * board[0].length - mines -1) { dispatch(revealAll()) }
  const onClick = (cell) => {
   if (cell.value === '*') {
    dispatch(gameOver())
   } else {
     dispatch(reveal(cell))
   }
  }
  return (
    <div>
      <div className={styles.settings}>
      <label>Board Height</label>
      <input type="range" defaultValue="10"max="25" min="5" onChange={(e)=>dispatch(changeX(e.target.value))}></input>
      <label>Board Width</label>
      <input type="range" defaultValue="10" max="25" min="5"onChange={(e)=>dispatch(changeY(e.target.value))}></input>
      <label>Mines</label>
      <input type="range" defaultValue="10" max="50" min="5"onChange={(e)=>dispatch(changeMines(e.target.value))}></input>
      <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
      <table>
        <tbody>
          {board.map((row, x) => <tr key={x}>{row.map((cell, y) => <td key={cell.y} className={cell.revealed ? styles.revealed : ""} id={`${cell.x}${cell.y}`} onClick={cell.revealed ? ()=>{}: (e) => onClick(cell)}>{cell.revealed ? cell.value : ""}</td>)}</tr>)}
        </tbody>
      </table>
          {lost ? <div>Game Over</div>: ""}
          {revealedCells > board.length*board[0].length-mines-1 && !lost ? <div>YOU WIN!!!</div> : ""}
    </div>
  );
}
