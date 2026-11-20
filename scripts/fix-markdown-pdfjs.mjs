import { readFile, writeFile } from 'node:fs/promises';

const packagePath = new URL(
  '../node_modules/markdown-pdfjs/package.json',
  import.meta.url,
);

try {
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
  packageJson.exports['.'].import = './dist/markdown-pdf.mjs';
  await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}
