import { Page } from '@playwright/test';

/**
 * Utility functions shared across test suites.
 * Centralises common operations for consistency and reuse.
 */

/** Default todo items used across multiple test suites */
export const DEFAULT_TODOS = [
  'Write automation tests',
  'Review pull request',
  'Update test documentation',
];

/** Sample data for data-driven testing */
export const TEST_DATA = {
  singleTodo: 'Complete Playwright framework setup',
  specialCharTodos: [
    'Fix bug #1234',
    'Update README.md & CHANGELOG',
    'Test "quoted" strings',
    'Handle special chars: @#$%',
  ],
  longTodo: 'This is a very long todo item that tests the UI rendering when text exceeds normal length boundaries and wraps to the next line',
  emptyTodo: '',
  whitespaceTodo: '   ',
};

/**
 * Wait for the application to fully load and be interactive
 * @param page - Playwright Page instance
 */
export async function waitForAppReady(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.getByPlaceholder('What needs to be done?').waitFor({ state: 'visible' });
}

/**
 * Take a timestamped screenshot for debugging
 * @param page - Playwright Page instance
 * @param name - Descriptive name for the screenshot
 */
export async function takeDebugScreenshot(page: Page, name: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `screenshots/${name}-${timestamp}.png`,
    fullPage: true,
  });
}

/**
 * Get the current local storage state (useful for debugging)
 * @param page - Playwright Page instance
 * @returns Local storage contents as an object
 */
export async function getLocalStorage(page: Page): Promise<Record<string, string>> {
  return await page.evaluate(() => {
    const storage: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        storage[key] = localStorage.getItem(key) || '';
      }
    }
    return storage;
  });
}
