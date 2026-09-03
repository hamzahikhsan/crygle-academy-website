import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const colors = readFileSync(path.join(dirname, 'tokens/colors.css'), 'utf-8');
const typography = readFileSync(path.join(dirname, 'tokens/typography.css'), 'utf-8');
const layout = readFileSync(path.join(dirname, 'tokens/layout.css'), 'utf-8');

describe('design tokens', () => {
  it('defines the brand blue used by every filled CTA', () => {
    expect(colors).toContain('--blue-500:rgb(35,95,156)');
  });

  it('defines the strict-accent yellow', () => {
    expect(colors).toContain('--yellow-500:rgb(252,193,18)');
  });

  it('defines the core font stack starting with SF UI Text', () => {
    expect(typography).toContain('--font-core:"SF UI Text"');
  });

  it('defines the 50px marketing CTA pill radius', () => {
    expect(layout).toContain('--radius-pill:50px');
  });
});
