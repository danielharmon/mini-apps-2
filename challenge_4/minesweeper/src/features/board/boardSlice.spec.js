import boardReducer, {
  gameOver,
  increment,
  reveal,
  reset

} from './boardSlice';

describe('board reducer', () => {
  const initialState = {
    board: [[{revealed: false, x: 0, y: 0, value: ""}, {revealed: false, x: 0, y: 1, value: "1"}, {revealed: false, x: 0, y: 2, value: "*"}]],
    revealedCells: 0,
    gameOver: false,
  };

  it('should handle increment', () => {
    const actual = boardReducer(initialState, increment());
    expect(actual.revealedCells).toEqual(1);
  });

  it('should handle gameOver', () => {
    const actual = boardReducer(initialState, gameOver());
    expect(actual.gameOver).toEqual(true);
  });

  it('should handle reveal', () => {
    const actual = boardReducer(initialState, reveal(initialState.board[0][0]));
    expect(actual.board).toEqual([[{revealed: true, x: 0, y: 0, value: ""}, {revealed: true, x: 0, y: 1, value: "1"}, {revealed: false, x: 0, y: 2, value: "*"}]]);
  });
  it('should handle reset', () => {
    const actual = boardReducer(initialState, reset());
    expect(actual.board.length).toBe(10)
  })
});
