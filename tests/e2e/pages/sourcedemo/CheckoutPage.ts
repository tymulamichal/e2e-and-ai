import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

/**
 * Page object representing the checkout process pages of the Sauce Demo application.
 * Handles both the information input step and the confirmation step of checkout.
 */
export class CheckoutPage extends BasePage {
  /** Container for the checkout information form */
  readonly checkoutInfo: Locator;
  
  /** Input field for customer's first name */
  readonly firstNameInput: Locator;
  
  /** Input field for customer's last name */
  readonly lastNameInput: Locator;
  
  /** Input field for postal code */
  readonly postalCodeInput: Locator;
  
  /** Button to continue to the next checkout step */
  readonly continueButton: Locator;
  
  /** Button to cancel the checkout process */
  readonly cancelButton: Locator;
  
  /** Button to finish the checkout process */
  readonly finishButton: Locator;
  
  /** Label displaying payment information */
  readonly paymentInfoLabel: Locator;
  
  /** Label displaying shipping information */
  readonly shippingInfoLabel: Locator;
  
  /** Label displaying total cost information */
  readonly totalInfoLabel: Locator;

  /**
   * Creates an instance of CheckoutPage.
   * @param {Page} page - The Playwright page object
   */
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

  /**
   * Fills in the shipping information form with customer details.
   * @param {string} firstName - Customer's first name
   * @param {string} lastName - Customer's last name
   * @param {string} postalCode - Customer's postal code
   * @returns {Promise<void>} A promise that resolves when all fields are filled
   */
  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Continues to the next step of the checkout process.
   * @returns {Promise<void>} A promise that resolves when navigation to the next step is complete
   */
  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Cancels the checkout process.
   * @returns {Promise<void>} A promise that resolves when the checkout is cancelled
   */
  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Completes the checkout process.
   * @returns {Promise<void>} A promise that resolves when the order is finished
   */
  async finish(): Promise<void> {
    await this.finishButton.click();
  }
} 