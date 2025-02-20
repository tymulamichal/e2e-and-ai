import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ProductPage extends BasePage {
  readonly backToProductsButton: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.urlPath = 'https://www.saucedemo.com/inventory-item.html';
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.removeButton = page.locator('[data-test="remove"]');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async goBackToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
} 