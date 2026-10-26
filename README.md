# Playwright Automation Project

## Overview
This repository demonstrates end-to-end testing with **Playwright + TypeScript**, showcasing best practices in automation, CI/CD integration, and scalable architecture. It is part of my QA Automation Portfolio.

## Features
- Page Object Model (POM) for maintainable test design
- Multi-browser testing (Chromium, Firefox, WebKit)
- UI, API, and visual regression tests
- Reporting with HTML and Allure
- CI/CD pipeline using GitHub Actions
- Dockerized execution for portability

## Project Structure
/tests
/pages
/fixtures
/utils

Code

## Setup & Installation
1. Install [Node.js](https://nodejs.org/)
2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/playwright-automation.git
   cd playwright-automation
   
Install dependencies:
npm install

Install Playwright browsers:
npx playwright install

##Running Tests
Run all tests:
npx playwright test

Run tests in a specific browser:
npx playwright test --project=chromium

Generate reports:
npx playwright show-report

##CI/CD Integration
Automated workflows with GitHub Actions

Matrix builds across browsers

Badges for build status and coverage

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

##License
MIT License
