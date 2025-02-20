import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CheckoutPage extends BasePage {
  readonly checkoutInfo: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly paymentInfoLabel: Locator;
  readonly shippingInfoLabel: Locator;
  readonly totalInfoLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.urlPath = 'https://www.saucedemo.com/checkout-step-one.html';
    this.checkoutInfo = page.locator('.checkout_info');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
    this.totalInfoLabel = page.locator('[data-test="total-info-label"]');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
} 