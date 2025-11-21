import { test, expect } from '@playwright/test';

test.describe('AI Chat Interface', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Open chat if not already open
    const chatButton = page.getByRole('button', { name: /chat|talk|zarvis/i });
    if (await chatButton.isVisible()) {
      await chatButton.click();
    }
  });

  test('should display chat interface', async ({ page }) => {
    // Check if chat input is visible
    const chatInput = page.getByPlaceholder(/ask me anything/i);
    await expect(chatInput).toBeVisible();
  });

  test('should send and receive messages', async ({ page }) => {
    // Type a message
    const chatInput = page.getByPlaceholder(/ask me anything/i);
    await chatInput.fill('Hello');

    // Send the message
    await chatInput.press('Enter');

    // Wait for the user message to appear
    await expect(page.getByText('Hello')).toBeVisible();

    // Wait for AI response (with longer timeout since it calls OpenAI API)
    await expect(page.locator('text=/Hi|Hello|Greetings/i')).toBeVisible({ timeout: 15000 });
  });

  test('should handle empty message submission', async ({ page }) => {
    const chatInput = page.getByPlaceholder(/ask me anything/i);

    // Try to send empty message
    await chatInput.press('Enter');

    // Message count should not increase
    const messages = page.locator('[class*="message"]');
    const initialCount = await messages.count();

    await page.waitForTimeout(500);

    const finalCount = await messages.count();
    expect(finalCount).toBe(initialCount);
  });

  test('should show loading state while waiting for response', async ({ page }) => {
    const chatInput = page.getByPlaceholder(/ask me anything/i);
    await chatInput.fill('Tell me about your experience');
    await chatInput.press('Enter');

    // Check for loading indicator
    await expect(page.getByText(/thinking/i)).toBeVisible({ timeout: 2000 });
  });

  test('should handle voice mode toggle', async ({ page }) => {
    // Look for voice/microphone button
    const voiceButton = page.getByRole('button', { name: /voice|microphone|mic/i });

    if (await voiceButton.isVisible()) {
      await voiceButton.click();

      // Check if voice interface appears
      await expect(page.getByText(/speak|recording|listening/i)).toBeVisible({ timeout: 2000 });
    }
  });
});

test.describe('Chat Error Handling', () => {
  test('should handle API errors gracefully', async ({ page, context }) => {
    // Intercept API calls and force an error
    await context.route('**/api/chat', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await page.goto('/');

    const chatInput = page.getByPlaceholder(/ask me anything/i);
    if (await chatInput.isVisible()) {
      await chatInput.fill('Test message');
      await chatInput.press('Enter');

      // Should show error message
      await expect(page.getByText(/error|failed|try again/i)).toBeVisible({ timeout: 5000 });
    }
  });
});
