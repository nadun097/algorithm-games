import { randomInt } from '../../shared/utils/random.js';
import { timeExecution } from '../../shared/utils/timer.js';
import { warnsdorff } from './algorithms/warnsdorff.js';
import { backtracking } from './algorithms/backtracking.js';
import { createGameRound, getGameRoundById } from '../../shared/models/gameRound.model.js';
import { saveAlgorithmTiming, getTimingsByRoundId } from '../../shared/models/algorithmTiming.model.js';
import { saveGameResult } from '../../shared/models/gameResult.model.js';
import { findOrCreatePlayer } from '../../shared/models/player.model.js';
import { createError } from '../../shared/middleware/errorHandler.js';

const GAME_TYPE = 'knights_tour' as const;
const MOVES = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];

function isValidKnightMove(r1: number, c1: number, r2: number, c2: number): boolean {
  return MOVES.some(([dr, dc]) => r1 + dr === r2 && c1 + dc === c2);
}

export function newRound(boardSize: 8 | 16) {
  if (boardSize !== 8 && boardSize !== 16) {
    throw createError('Board size must be 8 or 16', 400);
  }

  const startRow = randomInt(0, boardSize - 1);
  const startCol = randomInt(0, boardSize - 1);

  const { result: wResult, executionTimeMs: wTime } = timeExecution(() =>
    warnsdorff(boardSize, startRow, startCol)
  );

  const { result: bResult, executionTimeMs: bTime } = timeExecution(() =>
    backtracking(boardSize, startRow, startCol)
  );

  const solution = wResult.success ? wResult.board : bResult.board;

  const round = createGameRound(
    GAME_TYPE,
    { boardSize, startRow, startCol, solution },
    JSON.stringify(solution)
  );

  saveAlgorithmTiming(round.id, "Warnsdorff's", wTime, wResult.success ? 'success' : 'failed', GAME_TYPE);
  saveAlgorithmTiming(round.id, 'Backtracking', bTime, bResult.success ? 'success' : 'failed', GAME_TYPE);

  return {
    roundId: round.id,
    boardSize,
    startRow,
    startCol,
    timings: [
      { algorithmName: "Warnsdorff's", executionTimeMs: wTime, result: wResult.success ? 'success' : 'failed' },
      { algorithmName: 'Backtracking', executionTimeMs: bTime, result: bResult.success ? 'success' : 'failed' },
    ],
  };
}

export function getSolution(roundId: number) {
  const round = getGameRoundById(roundId);
  if (!round) throw createError('Round not found', 404);
  const data = JSON.parse(round.round_data_json) as { solution: number[][] };
  return { solution: data.solution };
}

export function submitAnswer(roundId: number, playerName: string, moves: [number, number][]) {
  const round = getGameRoundById(roundId);
  if (!round) throw createError('Round not found', 404);

  const data = JSON.parse(round.round_data_json) as {
    boardSize: number;
    startRow: number;
    startCol: number;
    solution: number[][];
  };

  const n = data.boardSize;
  const totalCells = n * n;
  let isCorrect = false;
  let outcome: 'win' | 'lose' = 'lose';

  if (moves.length === totalCells) {
    // Verify it starts at the correct position
    const [r0, c0] = moves[0];
    if (r0 === data.startRow && c0 === data.startCol) {
      // Verify all cells visited and all moves are valid knight jumps
      const visitedCells = new Set<string>();
      let valid = true;
      for (let i = 0; i < moves.length; i++) {
        const [r, c] = moves[i];
        if (r < 0 || r >= n || c < 0 || c >= n) { valid = false; break; }
        const key = `${r},${c}`;
        if (visitedCells.has(key)) { valid = false; break; }
        visitedCells.add(key);
        if (i > 0) {
          const [pr, pc] = moves[i - 1];
          if (!isValidKnightMove(pr, pc, r, c)) { valid = false; break; }
        }
      }
      if (valid && visitedCells.size === totalCells) {
        isCorrect = true;
        outcome = 'win';
      }
    }
  }

  if (isCorrect) {
    const player = findOrCreatePlayer(playerName);
    saveGameResult(roundId, player.id, JSON.stringify(moves), round.correct_answer, true, GAME_TYPE);
  }

  const timings = getTimingsByRoundId(roundId).map((t) => ({
    algorithmName: t.algorithm_name,
    executionTimeMs: t.execution_time_ms,
    result: t.result,
  }));

  return {
    isCorrect,
    outcome,
    timings,
    solution: data.solution,
  };
}
