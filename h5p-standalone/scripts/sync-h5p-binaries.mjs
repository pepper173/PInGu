#!/usr/bin/env node
import fs from 'fs';
import os from 'os';
import path from 'path';
import https from 'https';
import { execFileSync } from 'child_process';

const REPO_ROOT = process.cwd();
const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'h5p-php-library-'));
const ARCHIVE_PATH = path.join(TMP_DIR, 'h5p-php-library.tar.gz');
const EXTRACT_DIR = path.join(TMP_DIR, 'extract');
const ARCHIVE_URL = 'https://codeload.github.com/h5p/h5p-php-library/tar.gz/refs/heads/master';
const TARGETS = [
  {
    source: 'fonts',
    destination: path.join(REPO_ROOT, 'vendor', 'h5p', 'fonts'),
  },
  {
    source: 'images',
    destination: path.join(REPO_ROOT, 'vendor', 'h5p', 'images'),
  },
];

function download(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Download failed with status ${response.statusCode}`));
        response.resume();
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (error) => {
      fs.unlink(destination, () => reject(error));
    });
  });
}

function copyRecursive(source, destination) {
  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination, { recursive: true });
}

async function main() {
  try {
    console.log(`Downloading ${ARCHIVE_URL}`);
    await download(ARCHIVE_URL, ARCHIVE_PATH);

    fs.mkdirSync(EXTRACT_DIR, { recursive: true });
    execFileSync('tar', ['-xzf', ARCHIVE_PATH, '-C', EXTRACT_DIR]);

    const [rootDir] = fs.readdirSync(EXTRACT_DIR);
    if (!rootDir) {
      throw new Error('Could not determine extracted archive root');
    }

    for (const target of TARGETS) {
      const sourceDir = path.join(EXTRACT_DIR, rootDir, target.source);
      console.log(`Syncing ${target.source} -> ${path.relative(REPO_ROOT, target.destination)}`);
      copyRecursive(sourceDir, target.destination);
    }

    console.log('Done. Review the vendor binary changes before committing them manually.');
  } finally {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
