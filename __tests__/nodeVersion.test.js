import fs from 'fs';
import path from 'path';

describe('Node.js version configuration', () => {
  const root = path.resolve(__dirname, '..');

  test('selects Node.js 24 locally', () => {
    expect(fs.readFileSync(path.join(root, '.nvmrc'), 'utf8').trim()).toBe('24');
  });

  test.each(['test.yml', 'deploy-pages.yml'])('%s uses the local version in a single job', (name) => {
    const workflow = fs.readFileSync(path.join(root, '.github/workflows', name), 'utf8');
    expect(workflow).toMatch(/node-version-file:\s*\.nvmrc/);
    expect(workflow).not.toMatch(/node-version:\s/);
    expect(workflow).not.toMatch(/matrix:/);
  });
});
