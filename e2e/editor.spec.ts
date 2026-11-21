import { test, expect } from '@playwright/test';

test('deve carregar a página inicial com o editor', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('MarkFlow').first()).toBeVisible();
});

test('deve atualizar a contagem de palavras ao digitar', async ({ page }) => {
  await page.goto('/');
  const textarea = page.locator('.w-md-editor-text-input');
  await textarea.fill('Olá mundo');
  await expect(page.getByText('Palavras: 2')).toBeVisible();
});

test('deve atualizar a contagem de caracteres ao digitar', async ({ page }) => {
  await page.goto('/');
  const textarea = page.locator('.w-md-editor-text-input');
  await textarea.fill('abc');
  await expect(page.getByText('Caracteres: 3')).toBeVisible();
});

test('deve exibir preview do Markdown', async ({ page }) => {
  await page.goto('/');
  const textarea = page.locator('.w-md-editor-text-input');
  await textarea.fill('# Título de Teste');
  await expect(page.locator('.w-md-editor-preview')).toContainText('Título de Teste');
});

test('deve disparar download de PDF ao clicar em Exportar', async ({ page }) => {
  await page.goto('/');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar PDF' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('documento.pdf');
});