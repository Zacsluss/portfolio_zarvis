import { test, expect } from '@playwright/test';

test.describe('Portfolio Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Zachary Sluss/i);

    // Check main sections are visible
    await expect(page.getByRole('heading', { name: /Zachary Sluss/i })).toBeVisible();
  });

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/');

    // Test navigation
    await page.getByRole('link', { name: /About/i }).click();
    await expect(page.url()).toContain('#about');

    await page.getByRole('link', { name: /Experience/i }).click();
    await expect(page.url()).toContain('#experience');

    await page.getByRole('link', { name: /Projects/i }).click();
    await expect(page.url()).toContain('#projects');
  });

  test('should display portfolio sections', async ({ page }) => {
    await page.goto('/');

    // Check that key portfolio sections are present
    await expect(page.getByText(/Lead CRM Systems Analyst/i)).toBeVisible();
    await expect(page.getByText(/Enterprise Technology Leader/i)).toBeVisible();
  });
});
