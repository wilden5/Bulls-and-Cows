import { generateSecret } from './generate-secret.js';
import { evaluateGuess } from './guess.js';
export const startGame = (length, base, random = Math.random) => ({
    secret: generateSecret(length, base, random),
    base,
    status: 'playing',
    history: [],
});
export const isWin = (result, length) => {
    return result.bulls === length;
};
export const submitGuess = (state, guess) => {
    if (state.status === 'won')
        return state;
    const normalizedGuess = guess.toLowerCase();
    const isRepeat = state.history.some((entry) => entry.guess === normalizedGuess);
    if (isRepeat)
        return state;
    const result = evaluateGuess(state.secret, normalizedGuess);
    const entry = { guess: normalizedGuess, ...result };
    const won = isWin(result, state.secret.length);
    return {
        ...state,
        history: [...state.history, entry],
        status: won ? 'won' : 'playing',
    };
};
//# sourceMappingURL=game-state.js.map