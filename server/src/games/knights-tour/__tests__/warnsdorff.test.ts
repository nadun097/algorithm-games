import { describe, it, expect } from 'vitest';
import { warnsdorff } from '../algorithms/warnsdorff.js';

function isValidTour(board: number[][], n: number): boolean {
  const flat = board.flat();
  const sorted = [...flat].sort((a, b) => a - b);
  for (let i = 0; i < n * n; i++) {
    if (sorted[i] !== i + 1) return false;
  }
  // Verify each move is a valid knight's jump
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

describe("Warnsdorff's Knight Tour", () => {
  it('completes an 8x8 tour from (0,0)', () => {
    const result = warnsdorff(8, 0, 0);
    expect(result.success).toBe(true);
    expect(isValidTour(result.board, 8)).toBe(true);
  });

  it('completes an 8x8 tour from center (4,4)', () => {
    const result = warnsdorff(8, 4, 4);
    expect(result.success).toBe(true);
    expect(isValidTour(result.board, 8)).toBe(true);
  });

  it('visits all 64 cells on 8x8 board when tour succeeds', () => {
    // Try multiple starting positions; at least one should succeed
    const starts = [[0,0],[1,0],[2,0],[4,4],[0,2]];
    let anySuccess = false;
    for (const [r, c] of starts) {
      const result = warnsdorff(8, r, c);
      if (result.success) {
        const visited = result.board.flat().filter((v) => v > 0).length;
        expect(visited).toBe(64);
        anySuccess = true;
        break;
      }
    }
    expect(anySuccess).toBe(true);
  });
});
