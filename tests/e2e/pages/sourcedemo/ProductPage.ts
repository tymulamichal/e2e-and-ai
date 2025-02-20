import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

/**
 * Page object representing the product details page of the Sauce Demo application.
 * Provides methods and locators for interacting with individual product details and actions.
 */
export class ProductPage extends BasePage {
  /** Button to navigate back to the products list */
  readonly backToProductsButton: Locator;
  
  /** Product name/title element */
  readonly productName: Locator;
  
  /** Product description text element */
  readonly productDescription: Locator;
  
  /** Product price element */
  readonly productPrice: Locator;
  
  /** Button to add the product to cart */
  readonly addToCartButton: Locator;
  
  /** Button to remove the product from cart */
  readonly removeButton: Locator;

  /**
   * Creates an instance of ProductPage.
   * @param {Page} page - The Playwright page object
   */
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

  /**
   * Adds the current product to the shopping cart.
   * @returns {Promise<void>} A promise that resolves when the product is added to cart
   */
  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /**
   * Navigates to the shopping cart page.
   * @returns {Promise<void>} A promise that resolves when navigation is complete
   */
  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Navigates back to the products listing page.
   * @returns {Promise<void>} A promise that resolves when navigation is complete
   */
  async goBackToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
} 