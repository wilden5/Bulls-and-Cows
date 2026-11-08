import type { Settings } from './settings.js';
import { loadRecords } from '../core/records.js';
import { createText } from '../utility/elements.js';

export const renderRecords = (
  root: HTMLElement,
  settings: Settings,
  onBack: () => void,
): void => {
  root.replaceChildren();

  const records = loadRecords(
    window.localStorage,
    settings.length,
    settings.base,
  );

  const heading = createText(
    'h2',
    `Records: ${settings.length} digits in base ${settings.base}`,
  );

  const table = document.createElement('table');

  const headerRow = document.createElement('tr');
  headerRow.append(
    createText('th', '#'),
    createText('th', 'Date'),
    createText('th', 'Attempts'),
    createText('th', 'Time'),
  );
  table.append(headerRow);

  for (const [index, entry] of records.entries()) {
    const row = document.createElement('tr');

    const seconds = Math.round(entry.timeMs / 1000);

    row.append(
      createText('td', String(index + 1)),
      createText('td', entry.date.slice(0, 10)),
      createText('td', String(entry.attempts)),
      createText('td', `${seconds} s`),
    );
    table.append(row);
  }

  const backButton = document.createElement('button');
  backButton.textContent = 'Back to settings';
  backButton.addEventListener('click', onBack);

  if (records.length === 0) {
    const emptyMessage = createText('p', 'No records yet. Win a game first!');
    root.append(heading, table, emptyMessage, backButton);
  } else {
    root.append(heading, table, backButton);
  }
};
