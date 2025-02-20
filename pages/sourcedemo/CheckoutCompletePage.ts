import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CheckoutCompletePage extends BasePage {
  readonly ponyExpressImage: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.urlPath = 'https://www.saucedemo.com/checkout-complete.html';
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async getHeaderText(): Promise<string | null> {
    return await this.completeHeader.textContent();
  }

  async getCompleteText(): Promise<string | null> {
    return await this.completeText.textContent();
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
} 