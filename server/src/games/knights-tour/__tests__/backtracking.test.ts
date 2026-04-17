import { describe, it, expect } from 'vitest';
import { backtracking } from '../algorithms/backtracking.js';

function isValidTour(board: number[][], n: number): boolean {
  const MOVES = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
  const pos = new Array(n * n + 1);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      pos[board[r][c]] = [r, c];
    }
  }
  for (let m = 1; m < n * n; m++) {
    const [r1, c1] = pos[m];
    const [r2, c2] = pos[m + 1];
    const valid = MOVES.some(([dr, dc]) => r1 + dr === r2 && c1 + dc === c2);
    if (!valid) return false;
  }
  return true;
}

describe('Backtracking Knight Tour', () => {
  it('completes an 8x8 tour from (0,0)', () => {
    const result = backtracking(8, 0, 0);
    expect(result.success).toBe(true);
    expect(isValidTour(result.board, 8)).toBe(true);
  }, 30000);

  it('visits all 64 cells on 8x8 board', () => {
    const result = backtracking(8, 2, 2);
    expect(result.success).toBe(true);
    const visited = result.board.flat().filter((v) => v > 0).length;
    expect(visited).toBe(64);
  }, 30000);
});
