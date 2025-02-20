import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

/**
 * Page object representing the login page of the Sauce Demo application.
 * Provides methods and locators for interacting with login functionality.
 */
export class LoginPage extends BasePage {
  /** Input field for entering the username */
  readonly usernameInput: Locator;
  
  /** Input field for entering the password */
  readonly passwordInput: Locator;
  
  /** Button to submit login credentials */
  readonly loginButton: Locator;

  /**
   * Creates an instance of LoginPage.
   * @param {Page} page - The Playwright page object
   */
  constructor(page: Page) {
    super(page);
    this.urlPath = 'https://www.saucedemo.com/';
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  /**
   * Logs in with the specified credentials.
   * Fills in the username and password fields and submits the form.
   * @param {string} username - The username to login with
   * @param {string} password - The password to login with
   * @returns {Promise<void>} A promise that resolves when login is complete
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
