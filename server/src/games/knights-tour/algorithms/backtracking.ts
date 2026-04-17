import type { TourResult } from './warnsdorff.js';

const MOVES = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1],
];

function isValid(r: number, c: number, n: number, board: number[][]): boolean {
  return r >= 0 && r < n && c >= 0 && c < n && board[r][c] === -1;
}

function getDegree(r: number, c: number, n: number, board: number[][]): number {
  let count = 0;
  for (const [dr, dc] of MOVES) {
    if (isValid(r + dr, c + dc, n, board)) count++;
  }
  return count;
}

function solve(
  r: number,
  c: number,
  move: number,
  n: number,
  board: number[][]
): boolean {
  if (move > n * n) return true;

  // Get sorted candidate moves (Warnsdorff order to prune backtracking)
  const candidates: [number, number, number][] = [];
  for (const [dr, dc] of MOVES) {
    const nr = r + dr;
    const nc = c + dc;
    if (isValid(nr, nc, n, board)) {
      candidates.push([getDegree(nr, nc, n, board), nr, nc]);
    }
  }
  candidates.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

  for (const [, nr, nc] of candidates) {
    board[nr][nc] = move;
    if (solve(nr, nc, move + 1, n, board)) return true;
    board[nr][nc] = -1;
  }

  return false;
}

export function backtracking(n: number, startRow: number, startCol: number): TourResult {
  const board = Array.from({ length: n }, () => new Array<number>(n).fill(-1));
  board[startRow][startCol] = 1;

  const success = solve(startRow, startCol, 2, n, board);
  return { board, success };
}
