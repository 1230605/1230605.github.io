import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
async function files(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(e =>
    e.isDirectory() ? files(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
test('production excludes all demo and draft details', async () => {
  const built = await files(root);
  assert.ok(!built.some(f => /demo-(notes|building|exploration|system)/.test(f)));
  const home = await readFile(path.join(root, 'index.html'), 'utf8');
  assert.ok(home.includes('项目正在整理'));
  assert.ok(!home.includes('Ideas in Motion'));
  const map = await readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
  assert.ok(!map.includes('demo-'));
});
test('all static internal links and assets resolve', async () => {
  for (const file of (await files(root)).filter(f => f.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) {
      if (url.startsWith('//')) continue;
      const target = path.join(root, decodeURIComponent(url));
      await access(url.endsWith('/') ? path.join(target, 'index.html') : target);
    }
    assert.ok(html.includes('lang="zh-CN"'));
    assert.ok(html.includes('name="description"'));
    assert.ok(html.includes('property="og:image"'));
  }
});
