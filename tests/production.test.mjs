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
  assert.ok(!built.some(f => /demo-/.test(f)));
  const home = await readFile(path.join(root, 'index.html'), 'utf8');
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


test('content sections and directory are generated', async () => {
  const sitemap = await readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
  for (const section of ['research', 'projects', 'articles', 'about', 'contents']) {
    await access(path.join(root, section, 'index.html'));
    assert.ok(sitemap.includes(`/${section}/`));
  }
});

test('internal fragment links have matching targets', async () => {
  for (const file of (await files(root)).filter(f => f.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    for (const [, url] of html.matchAll(/href="((?:\/[^"#]*)?#[^"]+)"/g)) {
      const [pathname, hash] = url.split('#');
      let target = pathname ? path.join(root, pathname) : file;
      if (pathname.endsWith('/')) target = path.join(target, 'index.html');
      const targetHtml = await readFile(target, 'utf8');
      assert.ok(targetHtml.includes(`id="${decodeURIComponent(hash)}"`), `${file}: ${url}`);
    }
  }
});
