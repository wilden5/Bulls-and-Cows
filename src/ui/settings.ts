import type { Base } from '../core/digit-validator.js';
import { createText } from '../utility/elements.js';

export type Settings = {
  length: number;
  base: Base;
};

const LENGTHS = [2, 3, 4, 5, 6];
const BASES: Base[] = [2, 8, 10, 16];

const BASE_LABELS: Record<Base, string> = {
  2: 'Binary (0-1)',
  8: 'Octal (0-7)',
  10: 'Decimal (0-9)',
  16: 'Hexadecimal (0-f)',
};

export const renderSettings = (
  root: HTMLElement,
  current: Settings,
  onStart: (settings: Settings) => void,
): void => {
  root.replaceChildren();

  const heading = createText('h1', 'Bulls and Cows');

  const lengthHeading = createText('h2', 'Secret length');
  const lengthSelect = document.createElement('select');

  for (const length of LENGTHS) {
    const option = createText('option', String(length));
    option.value = String(length);
    option.selected = length === current.length;
    lengthSelect.append(option);
  }

  const baseHeading = createText('h2', 'Number base');
  const baseSelect = document.createElement('select');

  for (const base of BASES) {
    const option = createText('option', BASE_LABELS[base]);
    option.value = String(base);
    option.selected = base === current.base;
    baseSelect.append(option);
  }

  const applyBinaryLimit = (): void => {
    const isBinary = baseSelect.value === '2';

    for (const option of Array.from(lengthSelect.options)) {
      option.disabled = isBinary && option.value !== '2';
    }

    if (isBinary) {
      lengthSelect.value = '2';
    }
  };

  baseSelect.addEventListener('change', applyBinaryLimit);

  const startButton = document.createElement('button');
  startButton.textContent = 'Start game';
  startButton.addEventListener('click', () => {
    onStart({
      length: Number(lengthSelect.value),
      base: Number(baseSelect.value) as Base,
    });
  });

  applyBinaryLimit();

  root.append(
    heading,
    lengthHeading,
    lengthSelect,
    baseHeading,
    baseSelect,
    startButton,
  );
};
