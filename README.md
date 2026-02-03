# Playwright Training

A comprehensive Playwright testing project for learning and practicing automated end-to-end testing. This project contains example tests for the [PocketBase Demo](https://pocketbase.io/demo/) admin dashboard, demonstrating various Playwright features and best practices.

## Description

This repository contains automated test cases written in Playwright for testing the PocketBase demo admin dashboard. The tests cover key user flows including login and page interactions. The project follows the Page Object Model (POM) pattern for better test organization and maintainability.

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

- Node.js (v14 or higher)
- pnpm (v10.18.2 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://gitlab.asoft-python.com/linh.lethi/playwright-training.git
```

2. Checkout to the example branch:

```bash
git checkout feat/pocket-base
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
├── .github/
│   └── workflows/
│       └── playwright.yml   # CI workflow
├── pocket-base/
│   └── example.spec.ts      # Test file
├── .env                     # Environment variables
├── .gitignore               # Git ignore rules
├── playwright.config.ts     # Playwright configuration
├── package.json             # Project dependencies
└── pnpm-lock.yaml           # Lock file
```

## Configuration

The Playwright configuration ([playwright.config.ts](playwright.config.ts)) includes:

- Test directory: `./pocket-base`
- Parallel test execution
- Retry on failure in CI
- HTML reporter
- Multi-browser support (Chromium, Firefox, WebKit)
- Authentication setup project

## Test Report

[View Latest Test Report](https://playwright-training-ten.vercel.app/)
