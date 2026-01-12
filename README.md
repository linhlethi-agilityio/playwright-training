# Playwright Training

A comprehensive Playwright testing project for learning and practicing automated end-to-end testing. This project contains example tests for the [Sauce Demo](https://www.saucedemo.com/) website, demonstrating various Playwright features and best practices.

## Description

This repository contains automated test cases written in Playwright for testing a demo e-commerce application. The tests cover key user flows including login, navigation, product sorting, and checkout processes. The project follows the Page Object Model (POM) pattern for better test organization and maintainability.

## Features

- End-to-end tests for an e-commerce website
- Page Object Model (POM) design pattern
- Multi-browser testing (Chromium, Firefox, WebKit)
- Authentication state management
- Parallel test execution
- HTML test reports
- TypeScript support

## Test Coverage

The project includes test cases for:

- **Login**: Empty field validation, locked out user handling, valid credentials
- **Navigation**: Menu navigation and page transitions
- **Product Sorting**: Sorting by name and price
- **Checkout**: Complete purchase flow

## Prerequisites

- Node.js (v14 or higher)
- pnpm (v10.18.2 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://gitlab.asoft-python.com/linh.lethi/playwright-training.git
cd playwright-training
```

2. Checkout to the example branch:

```bash
git checkout feat/example
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

Run all tests:

```bash
pnpm test
```

Run tests in headed mode:

```bash
pnpm test:headed
```

Run tests in UI mode:

```bash
pnpm test:ui
```

### Viewing Reports

Show the latest test report:

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
├── example/
│   ├── tests/           # Test files
│   │   ├── login.spec.ts
│   │   ├── navigation.spec.ts
│   │   ├── sort.spec.ts
│   │   └── checkout.spec.ts
│   ├── fixtures/        # Page fixtures
│   └── constants/       # Test constants
├── playwright/          # Playwright data
│   └── .auth/          # Authentication state
├── playwright.config.ts # Playwright configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Configuration

The Playwright configuration ([playwright.config.ts](playwright.config.ts)) includes:

- Test directory: `./example`
- Parallel test execution
- Retry on failure in CI
- HTML reporter
- Multi-browser support (Chromium, Firefox, WebKit)
- Authentication setup project

## License

ISC
