import { renderSettings, type Settings } from './settings.js';
import { renderGame } from './game.js';

const DEFAULT_SETTINGS: Settings = { length: 4, base: 10 };

export const startApp = (): void => {
  const showSettings = (): void => {
    renderSettings(document.body, DEFAULT_SETTINGS, (settings) => {
      renderGame(document.body, settings, showSettings);
    });
  };
  showSettings();
};
