import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

/**
 * Page object representing the checkout completion page of the Sauce Demo application.
 * Displays order confirmation and allows navigation back to products.
 */
export class CheckoutCompletePage extends BasePage {
  /** Image element showing the pony express delivery confirmation */
  readonly ponyExpressImage: Locator;
  
  /** Header element containing the completion message */
  readonly completeHeader: Locator;
  
  /** Text element containing the completion details */
  readonly completeText: Locator;
  
  /** Button to return to the products page */
  readonly backToProductsButton: Locator;

  /**
   * Creates an instance of CheckoutCompletePage.
   * @param {Page} page - The Playwright page object
   */
  constructor(page: Page) {
    super(page);
    this.urlPath = 'https://www.saucedemo.com/checkout-complete.html';
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Gets the text content of the completion header.
   * @returns {Promise<string | null>} The header text or null if not found
   */
  async getHeaderText(): Promise<string | null> {
    return await this.completeHeader.textContent();
  }

  /**
   * Gets the text content of the completion message.
   * @returns {Promise<string | null>} The completion text or null if not found
   */
  async getCompleteText(): Promise<string | null> {
    return await this.completeText.textContent();
  }

  /**
   * Navigates back to the products page.
   * @returns {Promise<void>} A promise that resolves when navigation is complete
   */
  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
} 