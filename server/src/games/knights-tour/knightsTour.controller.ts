import type { Request, Response, NextFunction } from 'express';
import { newRound, submitAnswer, getSolution } from './knightsTour.service.js';
import { createError } from '../../shared/middleware/errorHandler.js';

export function handleNewRound(req: Request, res: Response, next: NextFunction): void {
  try {
    const { boardSize } = req.body as { boardSize: number };
    if (boardSize !== 8 && boardSize !== 16) {
      throw createError('boardSize must be 8 or 16', 400);
    }
    const data = newRound(boardSize as 8 | 16);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export function handleGetSolution(req: Request, res: Response, next: NextFunction): void {
  try {
    const roundId = Number(req.params.id);
    const data = getSolution(roundId);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export function handleSubmitAnswer(req: Request, res: Response, next: NextFunction): void {
  try {
    const roundId = Number(req.params.id);
    const { playerName, moves } = req.body as { playerName: string; moves: [number, number][] };
    if (!playerName || !Array.isArray(moves)) {
      throw createError('playerName and moves array are required', 400);
    }
    const result = submitAnswer(roundId, playerName.trim(), moves);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
