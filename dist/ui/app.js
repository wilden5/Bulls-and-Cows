import { renderSettings } from './settings.js';
import { renderGame } from './game.js';
import { renderRecords } from './records.js';
const DEFAULT_SETTINGS = { length: 4, base: 10 };
export const startApp = () => {
    const showSettings = () => {
        renderSettings(document.body, DEFAULT_SETTINGS, (settings) => {
            renderGame(document.body, settings, showSettings);
        }, (settings) => {
            renderRecords(document.body, settings, showSettings);
        });
    };
    showSettings();
};
//# sourceMappingURL=app.js.map