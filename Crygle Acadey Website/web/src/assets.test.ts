import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(dirname, '../public');

const fontWeights = ['Light', 'Regular', 'Medium', 'Semibold', 'Bold', 'Heavy'];
const fontFiles = fontWeights.flatMap((w) => [`SFUIText-${w}.ttf`, `SFUIText-${w}Italic.ttf`]);

const logoFiles = [
  'book-mark-blue.svg',
  'book-mark-white.svg',
  'crygle-wordmark-blue.svg',
  'crygle-wordmark-white.svg',
  'crygle-lockup-blue.png',
  'crygle-lockup-white.png',
];

describe('static assets', () => {
  it.each(fontFiles)('font file %s exists in public/fonts', (file) => {
    expect(existsSync(path.join(publicDir, 'fonts', file))).toBe(true);
  });

  it.each(logoFiles)('logo file %s exists in public/logo', (file) => {
    expect(existsSync(path.join(publicDir, 'logo', file))).toBe(true);
  });
});
