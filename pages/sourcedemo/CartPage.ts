import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CartPage extends BasePage {
  readonly cartList: Locator;
  readonly quantityLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.urlPath = 'https://www.saucedemo.com/cart.html';
    this.cartList = page.locator('[data-test="cart-list"]');
    this.quantityLabel = page.locator('[data-test="cart-quantity-label"]');
    this.descriptionLabel = page.locator('[data-test="cart-desc-label"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
} 