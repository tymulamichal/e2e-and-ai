import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class InventoryPage extends BasePage {
  readonly inventoryList: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    super(page);
    this.urlPath = 'https://www.saucedemo.com/inventory.html';
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.productTitles = page.locator('[data-test="item-4-title-link"]');
  }

  async clickProduct(productId: string = '4'): Promise<void> {
    await this.page.locator(`[data-test="item-${productId}-title-link"]`).click();
  }
} 