import { Locator, Page } from "@playwright/test";



/**
 * Base page class that provides common functionality for all page objects
 */
export class BasePage {
  urlPath: string;
  // declare all locators here, example:
  readonly title: Locator;
  readonly shoppingCartLink: Locator;
  

  /**
   * Creates an instance of BasePage
   * @param page - The Playwright Page object
   */
  constructor(protected page: Page) {
    this.page = page;
    // assign all locators here, example:
    // this.title = this.page.getByRole("heading", { name: "Welcome" });
    this.title = page.locator('[data-test="title"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  /**
   * Logs out the current user
   */
  async logout(): Promise<void> {
    // open user menu and click logout
  }

  /**
   * Opens the page using its URL path
   */
  async open(): Promise<void> {
      await this.page.goto(this.urlPath);
      await this.page.waitForLoadState('networkidle');
 
  }

  /**
   * Gets the page title text
   */
  async getTitleText(): Promise<string | null> {
    return await this.title.textContent();
  }
}
