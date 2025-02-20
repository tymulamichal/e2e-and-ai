import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

/**
 * Page object representing the shopping cart page of the Sauce Demo application.
 * Provides methods and locators for interacting with the shopping cart contents and actions.
 */
export class CartPage extends BasePage {
  /** Container element for the list of cart items */
  readonly cartList: Locator;
  
  /** Label displaying the quantity column header */
  readonly quantityLabel: Locator;
  
  /** Label displaying the description column header */
  readonly descriptionLabel: Locator;
  
  /** Button to continue shopping and return to products */
  readonly continueShoppingButton: Locator;
  
  /** Button to proceed to checkout */
  readonly checkoutButton: Locator;

  /**
   * Creates an instance of CartPage.
   * @param {Page} page - The Playwright page object
   */
  constructor(page: Page) {
    super(page);
    this.urlPath = 'https://www.saucedemo.com/cart.html';
    this.cartList = page.locator('[data-test="cart-list"]');
    this.quantityLabel = page.locator('[data-test="cart-quantity-label"]');
    this.descriptionLabel = page.locator('[data-test="cart-desc-label"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Returns to the products page to continue shopping.
   * @returns {Promise<void>} A promise that resolves when navigation is complete
   */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Proceeds to the checkout process.
   * @returns {Promise<void>} A promise that resolves when navigation to checkout is complete
   */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
} 