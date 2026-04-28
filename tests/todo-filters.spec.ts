import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { DEFAULT_TODOS, waitForAppReady } from '../utils/test-helpers';

test.describe('Todo Filtering & Navigation', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await waitForAppReady(page);
    await todoPage.addMultipleTodos(DEFAULT_TODOS);
    await todoPage.toggleTodo(DEFAULT_TODOS[0]);
  });

  test('should filter active todos', async () => {
    await todoPage.filterBy('active');

    await todoPage.verifyTodoCount(2);
    await expect(todoPage.todoItems.filter({ hasText: DEFAULT_TODOS[0] })).toHaveCount(0);
  });

  test('should filter completed todos', async () => {
    await todoPage.filterBy('completed');

    await todoPage.verifyTodoCount(1);
    await todoPage.verifyTodoExists(DEFAULT_TODOS[0]);
  });

  test('should show all todos when All filter is selected', async () => {
    await todoPage.filterBy('active');
    await todoPage.filterBy('all');

    await todoPage.verifyTodoCount(3);
  });

  test('should highlight the active filter', async ({ page }) => {
    await todoPage.filterBy('active');

    await expect(todoPage.filterActive).toHaveClass(/selected/);
  });

  test('should persist filter state after completing a todo', async () => {
    await todoPage.filterBy('active');
    await todoPage.toggleTodo(DEFAULT_TODOS[1]);

    await todoPage.verifyTodoCount(1);
  });

  test('should update count correctly across filter switches', async () => {
    await todoPage.filterBy('active');
    const activeCount = await todoPage.getItemCount();
    expect(activeCount).toContain('2');

    await todoPage.filterBy('all');
    const allCount = await todoPage.getItemCount();
    expect(allCount).toContain('2');
  });
});
