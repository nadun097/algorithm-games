/**
 * Warnsdorff's Heuristic for Knight's Tour (Iterative / Non-Recursive)
 * At each step, move to the neighbor with the fewest onward moves (accessibility).
 */

const MOVES = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1],
];

export interface TourResult {
  board: number[][];   // board[r][c] = move number (1-indexed), -1 = not visited
  success: boolean;
}

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

export function warnsdorff(n: number, startRow: number, startCol: number): TourResult {
  const board = Array.from({ length: n }, () => new Array<number>(n).fill(-1));
  let r = startRow;
  let c = startCol;
  board[r][c] = 1;

  for (let move = 2; move <= n * n; move++) {
    let bestDeg = Infinity;
    let bestR = -1;
    let bestC = -1;

    for (const [dr, dc] of MOVES) {
      const nr = r + dr;
      const nc = c + dc;
      if (isValid(nr, nc, n, board)) {
        const deg = getDegree(nr, nc, n, board);
        if (deg < bestDeg || (deg === bestDeg && (nr < bestR || (nr === bestR && nc < bestC)))) {
          bestDeg = deg;
          bestR = nr;
          bestC = nc;
        }
      }
    }

    if (bestR === -1) return { board, success: false };

    board[bestR][bestC] = move;
    r = bestR;
    c = bestC;
  }

  return { board, success: true };
}
