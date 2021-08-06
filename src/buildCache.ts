import fs from 'fs';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import path from 'path';
import lockfile from 'proper-lockfile';

const FILE_CACHE = path.join(process.cwd(), 'buildCache.json');

function readCache() {
  try {
    const rawText = fs.readFileSync(FILE_CACHE, { encoding: 'utf8' });

    return JSON.parse(rawText) as Record<string, string>;
  } catch (e) {
    return {};
  }
}

export async function get(keyPath: string | string[]): Promise<string | null> {
  if (fs.existsSync(FILE_CACHE) === false) {
    fs.writeFileSync(FILE_CACHE, '');
  }
  const release = await lockfile.lock(FILE_CACHE, { retries: 10 });
  const cache = readCache();
  await release();

  return lodashGet(cache, keyPath) ?? null;
}

export async function set(keyPath: string | string[], value: string) {
  if (fs.existsSync(FILE_CACHE) === false) {
    fs.writeFileSync(FILE_CACHE, '');
  }
  const release = await lockfile.lock(FILE_CACHE, { retries: 10 });
  const cache = readCache();

  lodashSet(cache, keyPath, value);
  await release();

  fs.writeFileSync(FILE_CACHE, JSON.stringify(cache, null, 2));
}
