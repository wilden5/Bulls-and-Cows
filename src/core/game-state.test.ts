import { describe, it, expect } from 'vitest';
import { type GameState, startGame, submitGuess } from './game-state.js';

describe('startGame', () => {
  it('creates a fresh round with a generated secret', () => {
    const state = startGame(4, 10, () => 0);

    expect(state).toEqual({
      secret: '0123',
      base: 10,
      status: 'playing',
      history: [],
    });
  });
});

describe('submitGuess', () => {
  const state: GameState = {
    secret: '0123',
    base: 10,
    status: 'playing',
    history: [],
  };

  const hexState: GameState = {
    secret: '0123',
    base: 16,
    status: 'playing',
    history: [],
  };

  it('adds a guess to the history immutably', () => {
    const next = submitGuess(state, '4567');

    expect(next.history).toEqual([{ guess: '4567', bulls: 0, cows: 0 }]);
    expect(state.history).toEqual([]);
  });

  it('does not duplicate a repeated guess', () => {
    const first = submitGuess(state, '4567');
    const second = submitGuess(first, '4567');

    expect(second).toBe(first);
  });

  it('treats hex case variants as the same guess', () => {
    const first = submitGuess(hexState, 'A1B2');
    const second = submitGuess(first, 'a1b2');

    expect(second).toBe(first);
  });

  it('marks the round as won when every digit is a bull', () => {
    const next = submitGuess(state, '0123');

    expect(next.status).toBe('won');
  });

  it('keeps the round playing on a wrong guess', () => {
    const next = submitGuess(state, '4567');

    expect(next.status).toBe('playing');
  });

  it('ignores guesses after the round is won', () => {
    const won = submitGuess(state, '0123');
    const after = submitGuess(won, '4567');

    expect(after).toBe(won);
  });
});
