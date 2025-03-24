export const shuffleBoard = (board: number[]): number[] => {
    const shuffled = [...board];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  export const getTilePosition = (index: number, gridSize: number) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    return { row, col };
  };
  
  export const canMoveTile = (board: number[], index: number, gridSize: number): boolean => {
    const tilePos = getTilePosition(index, gridSize);
    const emptyIndex = board.indexOf(8);
    const emptyPos = getTilePosition(emptyIndex, gridSize);
  
    return (
      (tilePos.row === emptyPos.row && Math.abs(tilePos.col - emptyPos.col) === 1) ||
      (tilePos.col === emptyPos.col && Math.abs(tilePos.row - emptyPos.row) === 1)
    );
  };
  
  export const moveTile = (board: number[], index: number, gridSize: number): number[] | null => {
    if (canMoveTile(board, index, gridSize)) {
      const newBoard = [...board];
      const emptyIndex = newBoard.indexOf(8);
      [newBoard[index], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[index]];
      return newBoard;
    }
    return null;
  };
  
  export const checkWin = (currentBoard: number[], winningBoard: number[]): boolean => {
    for (let i = 0; i < 8; i++) {
      if (currentBoard[i] !== winningBoard[i]) {
        return false;
      }
    }
    return true;
  };