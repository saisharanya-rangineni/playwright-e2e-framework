import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the TodoMVC application.
 * Encapsulates all page interactions and element locators
 * for maintainable and reusable test code.
 */
export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly toggleAll: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  readonly filterAll: Locator;
  readonly filterActive: Locator;
  readonly filterCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.toggleAll = page.getByLabel('Mark all as complete');
    this.todoCount = page.getByTestId('todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.filterAll = page.getByRole('link', { name: 'All' });
    this.filterActive = page.getByRole('link', { name: 'Active' });
    this.filterCompleted = page.getByRole('link', { name: 'Completed' });
  }

  /**
   * Navigate to the TodoMVC application
   */
  async goto() {
    await this.page.goto('/todomvc');
  }

  /**
   * Add a new todo item
   * @param text - The todo item text to add
   */
  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /**
   * Add multiple todo items at once
   * @param items - Array of todo item texts
   */
  async addMultipleTodos(items: string[]) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  /**
   * Toggle (complete/uncomplete) a todo item by its text
   * @param text - The todo item text to toggle
   */
  async toggleTodo(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.getByRole('checkbox').click();
  }

  /**
   * Delete a todo item by its text
   * @param text - The todo item text to delete
   */
  async deleteTodo(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.locator('button.destroy').click();
  }

  /**
   * Edit an existing todo item
   * @param oldText - Current text of the todo
   * @param newText - New text to replace with
   */
  async editTodo(oldText: string, newText: string) {
    const todo = this.todoItems.filter({ hasText: oldText });
    await todo.dblclick();
    const editInput = todo.getByRole('textbox', { name: 'Edit' });
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  /**
   * Get the count of remaining active items
   * @returns The count text (e.g., "3 items left")
   */
  async getItemCount(): Promise<string> {
    return await this.todoCount.innerText();
  }

  /**
   * Verify the number of visible todo items
   * @param count - Expected number of items
   */
  async verifyTodoCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }

  /**
   * Verify a todo item exists with specific text
   * @param text - The expected todo text
   */
  async verifyTodoExists(text: string) {
    await expect(this.todoItems.filter({ hasText: text })).toBeVisible();
  }

  /**
   * Verify a todo item is marked as completed
   * @param text - The todo text to check
   */
  async verifyTodoCompleted(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await expect(todo).toHaveClass(/completed/);
  }

  /**
   * Filter todos by status
   * @param filter - The filter to apply: 'all', 'active', or 'completed'
   */
  async filterBy(filter: 'all' | 'active' | 'completed') {
    switch (filter) {
      case 'all':
        await this.filterAll.click();
        break;
      case 'active':
        await this.filterActive.click();
        break;
      case 'completed':
        await this.filterCompleted.click();
        break;
    }
  }
}
