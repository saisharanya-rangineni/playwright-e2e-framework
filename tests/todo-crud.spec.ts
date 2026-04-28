import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { DEFAULT_TODOS, TEST_DATA, waitForAppReady } from '../utils/test-helpers';

test.describe('Todo CRUD Operations', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await waitForAppReady(page);
  });

  test.describe('Create Todos', () => {
    test('should add a new todo item', async () => {
      await todoPage.addTodo(DEFAULT_TODOS[0]);

      await todoPage.verifyTodoExists(DEFAULT_TODOS[0]);
      await todoPage.verifyTodoCount(1);
    });

    test('should add multiple todo items', async () => {
      await todoPage.addMultipleTodos(DEFAULT_TODOS);

      await todoPage.verifyTodoCount(3);
      for (const todo of DEFAULT_TODOS) {
        await todoPage.verifyTodoExists(todo);
      }
    });

    test('should clear input field after adding a todo', async () => {
      await todoPage.addTodo(DEFAULT_TODOS[0]);

      await expect(todoPage.newTodoInput).toBeEmpty();
    });

    test('should handle special characters in todo text', async () => {
      for (const todo of TEST_DATA.specialCharTodos) {
        await todoPage.addTodo(todo);
        await todoPage.verifyTodoExists(todo);
      }
    });

    test('should trim whitespace from todo text', async ({ page }) => {
      await todoPage.addTodo('   Trimmed todo item   ');

      const todoText = await todoPage.todoItems.first().innerText();
      expect(todoText.trim()).toBe('Trimmed todo item');
    });

    test('should display correct item count after adding todos', async () => {
      await todoPage.addMultipleTodos(DEFAULT_TODOS);

      const countText = await todoPage.getItemCount();
      expect(countText).toContain('3');
    });
  });

  test.describe('Complete Todos', () => {
    test.beforeEach(async () => {
      await todoPage.addMultipleTodos(DEFAULT_TODOS);
    });

    test('should mark a todo as completed', async () => {
      await todoPage.toggleTodo(DEFAULT_TODOS[0]);

      await todoPage.verifyTodoCompleted(DEFAULT_TODOS[0]);
    });

    test('should update item count when completing a todo', async () => {
      await todoPage.toggleTodo(DEFAULT_TODOS[0]);

      const countText = await todoPage.getItemCount();
      expect(countText).toContain('2');
    });

    test('should show Clear Completed button after completing a todo', async () => {
      await todoPage.toggleTodo(DEFAULT_TODOS[0]);

      await expect(todoPage.clearCompletedButton).toBeVisible();
    });

    test('should mark all todos as completed using toggle all', async () => {
      await todoPage.toggleAll.check();

      for (const todo of DEFAULT_TODOS) {
        await todoPage.verifyTodoCompleted(todo);
      }
    });
  });

  test.describe('Delete Todos', () => {
    test.beforeEach(async () => {
      await todoPage.addMultipleTodos(DEFAULT_TODOS);
    });

    test('should delete a todo item', async () => {
      await todoPage.deleteTodo(DEFAULT_TODOS[1]);

      await todoPage.verifyTodoCount(2);
      await expect(todoPage.todoItems.filter({ hasText: DEFAULT_TODOS[1] })).toHaveCount(0);
    });

    test('should clear all completed todos', async () => {
      await todoPage.toggleTodo(DEFAULT_TODOS[0]);
      await todoPage.toggleTodo(DEFAULT_TODOS[2]);
      await todoPage.clearCompletedButton.click();

      await todoPage.verifyTodoCount(1);
      await todoPage.verifyTodoExists(DEFAULT_TODOS[1]);
    });
  });

  test.describe('Edit Todos', () => {
    test.beforeEach(async () => {
      await todoPage.addTodo(DEFAULT_TODOS[0]);
    });

    test('should edit an existing todo item', async () => {
      const updatedText = 'Updated automation test';
      await todoPage.editTodo(DEFAULT_TODOS[0], updatedText);

      await todoPage.verifyTodoExists(updatedText);
      await expect(todoPage.todoItems.filter({ hasText: DEFAULT_TODOS[0] })).toHaveCount(0);
    });
  });
});
