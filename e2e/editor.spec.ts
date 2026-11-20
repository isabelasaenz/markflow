import { test, expect } from '@playwright/test';

test('deve carregar a página inicial com o editor', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'MarkFlow' })).toBeVisible();
});