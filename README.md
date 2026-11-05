# Playwright Automation Project

![Playwright Tests] (https://github.com/anakarlaorret-lang/playwright/actions/workflows/ci.yml/badge.svg)

![Lint] (https://github.com/anakarlaorret-lang/playwright/actions/workflows/lint.yml/badge.svg)

![Node.js] (https://img.shields.io/badge/node-18.x-green)

![License] (https://img.shields.io/github/license/anakarlaorret-lang/playwright)

![Dependabot] (https://img.shields.io/badge/dependabot-enabled-blue)

## Overview
This repository demonstrates end-to-end testing with **Playwright + TypeScript**, showcasing best practices in automation, CI/CD integration, and scalable architecture. It is part of my QA Automation Portfolio.

## Features
- Playwright + TypeScript for reliable, typed automation.
- Page Object Model (POM) for maintainable test design and clean test organization.
- Authentication state via .auth/messageUser.json
- retries, screenshots, and video recording for robust test runs.
- CI/CD with GitHub Actions including HTML reports.
- Linting & Prettier for consistent code style.
- Dependabot for automated dependency updates.
- Multi-browser testing (Chromium, Firefox, WebKit)
- UI, API, and visual regression tests

## Project Structure
playwright/
 ├── tests/          # Test cases
 ├── pages/          # Page Objects
 ├── utils/          # Helpers and utilities
 ├── config/         # Configuration files
 ├── .auth/          # Authentication state
 ├── .github/        # Workflows and templates
 ├── README.md       # Documentation
 └── playwright.config.ts

## Setup & Installation
1. Install [Node.js](https://nodejs.org/)
2. Clone the repository:
   
   git clone https://github.com/your-username/playwright-automation.git
   cd playwright-automation
   
Install dependencies:
npm install

Install Playwright browsers:
npx playwright install

##Running Tests
npx playwright test

Run tests in a specific browser:
npx playwright test --project=chromium

Generate reports:
npx playwright show-report

##CI/CD Integration
Tests run automatically on push and pull requests.

Reports are uploaded as artifacts in GitHub Actions.

Status badges show test and lint results directly in the README.

##Demo & Screenshots
Include screenshots or GIFs of test runs and reports here.

##Highlights
Clean code with ESLint + Prettier

Reusable fixtures and utilities

Scalable test architecture

##Future Work
Expand test coverage

Add cloud execution support

Enhance reporting with dashboards

## Portfolio release checklist

- [ ] Before publishing, evaluate whether to demonstrate test-management traceability with Jira + Xray or Jira + TestRail.
- [ ] If selected, integrate a small representative set of test cases, execution results, and linked defects; document setup, limitations, and any access or licensing requirements.
- [ ] Choose only one test-case management approach; do not add Xray and TestRail in parallel without a specific reason.
- [ ] If no suitable account or license is available, document the decision and retain GitHub Issues/Projects as the lightweight tracking approach.

##Contributing
Follow the guidelines in CONTRIBUTING.md.

Ensure code passes lint checks before committing.

Write clear commit messages and PR descriptions.

##License
This project is licensed under the terms of the LICENSE file included in the repository.
