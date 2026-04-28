# 🎭 Playwright E2E Testing Framework

[![Playwright E2E Tests](https://github.com/saisharanya-rangineni/playwright-e2e-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/saisharanya-rangineni/playwright-e2e-framework/actions/workflows/playwright.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)

A production-grade end-to-end testing framework built with **Playwright** and **TypeScript**, demonstrating Page Object Model design patterns, cross-browser testing, parallel execution, and CI/CD integration via GitHub Actions.

> **Note:** This project is built for portfolio and demonstration purposes. No proprietary or company-related information, code, or projects have been used. All tests run against the publicly available [Playwright TodoMVC Demo](https://demo.playwright.dev/todomvc).

---

## 🏗️ Architecture

```
playwright-e2e-framework/
├── tests/                      # Test suites
│   ├── todo-crud.spec.ts       # CRUD operations (Create, Read, Update, Delete)
│   └── todo-filters.spec.ts    # Filtering & navigation tests
├── pages/                      # Page Object Models
│   └── TodoPage.ts             # TodoMVC page abstraction
├── utils/                      # Shared utilities
│   └── test-helpers.ts         # Helper functions & test data
├── reports/                    # Generated test reports (gitignored)
├── .github/workflows/          # CI/CD pipeline
│   └── playwright.yml          # GitHub Actions workflow
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies & scripts
```

## ✨ Key Features

| Feature | Description |
|---|---|
| **Page Object Model** | Clean separation of test logic and page interactions |
| **Cross-Browser Testing** | Chromium, Firefox, WebKit, and Mobile Chrome |
| **Parallel Execution** | Tests run in parallel for faster feedback |
| **CI/CD Pipeline** | Automated runs on every push via GitHub Actions |
| **HTML Reports** | Rich interactive reports with screenshots and traces |
| **Data-Driven Tests** | Reusable test data and parameterised scenarios |
| **Auto-Retries** | Configurable retry logic for flaky test resilience |
| **TypeScript** | Full type safety and IDE autocompletion |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/saisharanya-rangineni/playwright-e2e-framework.git
cd playwright-e2e-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Running Tests

```bash
# Run all tests across all browsers
npm test

# Run tests for a specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Open interactive UI mode
npm run test:ui
```

### Viewing Reports

```bash
# Open the HTML report after a test run
npm run report
```

The HTML report includes:
- Test pass/fail status with execution time
- Screenshots on failure
- Trace viewer for step-by-step debugging
- Filter by browser, status, and test suite

## 🧪 Test Coverage

### CRUD Operations (`todo-crud.spec.ts`)
- Add a single todo item
- Add multiple todo items
- Clear input field after submission
- Handle special characters
- Trim whitespace from input
- Verify item count
- Mark todo as completed
- Toggle all todos
- Delete individual todo
- Clear completed todos
- Edit existing todo

### Filtering & Navigation (`todo-filters.spec.ts`)
- Filter active todos
- Filter completed todos
- Show all todos
- Highlight active filter
- Persist filter state
- Count accuracy across filters

## ⚙️ CI/CD Pipeline

The GitHub Actions workflow runs automatically on every push and pull request:

- **Matrix Strategy:** Tests run in parallel across Chromium, Firefox, and WebKit
- **Artifacts:** HTML reports and test results are uploaded and available for download
- **Timeout:** 15-minute limit per job to prevent hanging pipelines
- **Retention:** Reports are stored for 30 days

## 📊 Sample Report

After running tests, an interactive HTML report is generated in `reports/html-report/`. The report provides:

- Visual summary of pass/fail rates
- Detailed error messages and stack traces
- Screenshot attachments for failed tests
- Trace files for step-by-step replay

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Playwright | Browser automation and testing |
| TypeScript | Type-safe test scripting |
| Page Object Model | Design pattern for maintainability |
| GitHub Actions | Continuous Integration / Continuous Delivery |
| HTML Reporter | Test result visualisation |

## 📝 License

This project is licensed under the MIT License.

---

**Author:** [Sai Sharanya Rangineni](https://saisharanya-rangineni.github.io/) | [LinkedIn](https://www.linkedin.com/in/sai-sharanya-r-27b003257/)
