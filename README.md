# E2E Testing with Playwright

This project demonstrates end-to-end testing using Playwright for the Sauce Demo e-commerce application. It includes comprehensive test coverage for the main user flows, from login to checkout.

## 🛠 Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## 🚀 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in UI mode (with debugging capabilities)
```bash
npx playwright test --ui
```

### Run tests with headed browsers
```bash
npx playwright test --headed
```

### Run a specific test file
```bash
npx playwright test tests/e2e/specs/saucedemo.spec.ts
```

## 📊 Test Reports

After test execution, you can view the HTML report:
```bash
npx playwright show-report
```

## 🔍 Debug Features

The project includes several debugging features:

- **Screenshots**: Automatically captured on test failure
- **Videos**: Recorded when tests fail
- **Trace Viewer**: Available for failed test runs
- **Slow Motion**: Tests run with 500ms delay between actions (disabled in CI)

## 📁 Project Structure

```
├── tests/
│   ├── e2e/
│   │   ├── specs/           # Test specifications
│   │   ├── pages/           # Page Object Models
│   │   └── utils/           # Utilities and helpers
├── playwright.config.ts     # Playwright configuration
└── package.json            # Project dependencies
```

## 🧪 Test Coverage

The test suite covers:
- User authentication
- Product browsing
- Shopping cart operations
- Checkout process
- Order completion

## 🛠 Configuration

Key configuration features:
- Parallel test execution
- Multi-browser support (currently using Chromium)
- Automatic retries in CI environment
- Screenshot and video capture on failure
- HTML reporting

## 📝 Writing Tests

Tests are written using:
- Page Object Model pattern
- Faker.js for test data generation
- Playwright's built-in assertions
- TypeScript for type safety

Example test structure:
```typescript
test.describe('Feature', () => {
  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📜 License

This project is licensed under the MIT License. 