# Playwright BDD Training

A comprehensive Playwright BDD testing project for learning and practicing behavior-driven development with end-to-end testing. This project contains test scenarios for the [PocketBase Demo](https://pocketbase.io/demo/) admin dashboard.

## Test Website

- **URL**: https://pocketbase.io/demo/
- **Email**: `test@example.com`
- **Password**: `123456`

> Note: The demo database resets every hour. Realtime data and file upload are disabled.

## Features

- End-to-end tests for the PocketBase admin dashboard
- Page Object Model (POM) design pattern
- Multi-browser testing (Chromium, Firefox, WebKit)
- Authentication state management
- Parallel test execution
- HTML test reports
- TypeScript support

## Test Coverage

The project includes test cases for:

- **Login**: Email/password authentication, field validation, invalid credentials handling
- **Dashboard**: Admin dashboard navigation and page interactions

## Prerequisites

- Node.js v20+
- pnpm v10+

## Installation

1. Clone the repository:

```bash
git clone https://gitlab.asoft-python.com/linh.lethi/playwright-training.git
```

2. Checkout the BDD branch:

```bash
git checkout feat/pocket-base-bdd
```

3. Install dependencies:

```bash
pnpm install
```

4. Install Playwright browsers:

```bash
pnpm exec playwright install
```

## Usage

### Running Tests

Run all tests (generates BDD files then runs):

```bash
pnpm test
```

Run in headed mode:

```bash
pnpm test:headed
```

Run in UI mode:

```bash
pnpm test:ui
```

Run in debug mode:

```bash
pnpm test:debug
```

Generate BDD spec files only:

```bash
pnpm bddgen
```

### Viewing Reports

Show Playwright HTML report:

```bash
pnpm test:show-report
```

### Code Quality

Run ESLint:

```bash
pnpm lint
```

Fix linting issues:

```bash
pnpm lint:fix
```

Check code formatting:

```bash
pnpm format:check
```

Format code:

```bash
pnpm format
```

## Project Structure

```
playwright-training/
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI/CD pipeline
├── .features-gen/                # Auto-generated BDD spec files (gitignored)
├── pocket-base/
│   ├── constants/                # URLs, messages, API paths
│   ├── data/                     # Test data and validation cases
│   ├── features/
│   │   ├── steps/                # Step definitions
│   │   │   ├── fixtures.ts       # Re-export shim
│   │   │   ├── common.ts         # Shared steps
│   │   │   ├── login.ts
│   │   │   ├── user-create.ts
│   │   │   ├── user-delete.ts
│   │   │   ├── user-search.ts
│   │   │   ├── user-sort.ts
│   │   │   └── user-update.ts
│   │   ├── login.feature
│   │   ├── user-create.feature
│   │   ├── user-delete.feature
│   │   ├── user-search.feature
│   │   ├── user-sort.feature
│   │   └── user-update.feature
│   ├── fixtures/                 # Playwright fixtures
│   │   ├── api.ts                # Base fixture (apiContext, ctx)
│   │   ├── users.ts              # Page fixtures with user setup/teardown
│   │   └── index.ts              # Exports Given/When/Then/After
│   ├── pages/                    # Page Object Models
│   ├── services/                 # API service helpers
│   └── utils/                   # Utility functions
├── playwright.config.ts          # Playwright + BDD configuration
├── package.json
└── pnpm-lock.yaml
```

## Test Report

[View Latest Test Report](https://playwright-training-ten.vercel.app/)
