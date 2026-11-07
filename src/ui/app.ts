import { renderSettings, type Settings } from './settings.js';

const DEFAULT_SETTINGS: Settings = { length: 4, base: 10 };

export const startApp = (): void => {
  renderSettings(document.body, DEFAULT_SETTINGS, (_settings) => {});
};
