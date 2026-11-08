import type { Settings } from './settings.js';
import { type GameState, startGame, submitGuess } from '../core/game-state.js';
import {
  addRecord,
  loadRecords,
  type RecordEntry,
  saveRecords,
} from '../core/records.js';
import { createText } from '../utility/elements.js';
import { filterInput } from './filter-input.js';
import { isValidGuess } from '../core/guess.js';

export const renderGame = (
  root: HTMLElement,
  settings: Settings,
  onNewGame: () => void,
): void => {
  let state: GameState = startGame(settings.length, settings.base);
  const startTime = Date.now();

  const saveWinRecord = (attempts: number): void => {
    const entry: RecordEntry = {
      date: new Date().toISOString(),
      attempts,
      timeMs: Date.now() - startTime,
    };

    const records = addRecord(
      loadRecords(window.localStorage, settings.length, settings.base),
      entry,
    );

    saveRecords(window.localStorage, settings.length, settings.base, records);
  };

  const render = (): void => {
    root.replaceChildren();

    const info = createText(
      'h2',
      `Guess ${settings.length} unique digits in base ${settings.base}`,
    );
    root.append(info);

    if (state.status === 'playing') {
      const input = document.createElement('input');
      input.maxLength = settings.length;
      input.placeholder = 'your guess';
      input.addEventListener('input', () => {
        input.value = filterInput(input.value, settings.base, settings.length);
      });

      const message = createText('p', '');

      const handleSubmit = (): void => {
        const guess = input.value;

        if (!isValidGuess(guess, settings.length, settings.base)) {
          message.textContent = `Enter exactly ${settings.length} unique digits`;
          return;
        }

        const next = submitGuess(state, guess);

        if (next.status === 'won' && state.status === 'playing') {
          saveWinRecord(next.history.length);
        }

        state = next;
        render();
      };

      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleSubmit();
        }
      });

      const submitButton = document.createElement('button');
      submitButton.textContent = 'Submit';
      submitButton.addEventListener('click', handleSubmit);

      const formRow = createText('div');
      formRow.append(input, submitButton);

      root.append(formRow, message);
      input.focus();
    } else {
      const wonHeading = createText('h2', 'You won!');
      const seconds = Math.round((Date.now() - startTime) / 1000);
      const attemptsText = createText('p', `Attempts: ${state.history.length}`);
      const timeText = createText('p', `Time: ${seconds} s`);

      const newGameButton = document.createElement('button');
      newGameButton.textContent = 'New game';
      newGameButton.addEventListener('click', onNewGame);

      root.append(wonHeading, attemptsText, timeText, newGameButton);
    }

    const historyHeading = createText(
      'h2',
      `Your guesses (${state.history.length})`,
    );

    const list = document.createElement('ul');
    for (const entry of state.history) {
      const item = createText(
        'li',
        `${entry.guess} — ${entry.bulls} bulls, ${entry.cows} cows`,
      );
      list.append(item);
    }
    root.append(historyHeading, list);
  };
  render();
};
