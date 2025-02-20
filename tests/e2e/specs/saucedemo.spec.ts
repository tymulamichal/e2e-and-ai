import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/sourcedemo/LoginPage';
import { InventoryPage } from '../pages/sourcedemo/InventoryPage';
import { ProductPage } from '../pages/sourcedemo/ProductPage';
import { CartPage } from '../pages/sourcedemo/CartPage';
import { CheckoutPage } from '../pages/sourcedemo/CheckoutPage';
import { CheckoutCompletePage } from '../pages/sourcedemo/CheckoutCompletePage';

/**
 * Test suite for the Sauce Demo e-commerce flow.
 * Tests cover the main user journey from login to checkout.
 */
test.describe('Sauce Demo E-commerce Flow', () => {
  /**
   * Setup method that runs before each test.
   * Logs in as a standard user to ensure each test starts from an authenticated state.
   * @param {import('@playwright/test').Page} page - The Playwright page object
   */
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  /**
   * Verifies that a standard user can successfully log in and see the products page.
   * Checks for the presence of key UI elements that confirm successful login.
   * @param {import('@playwright/test').Page} page - The Playwright page object
   */
  test('standard user login test', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await expect(page.locator('.app_logo')).toBeVisible();
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(inventoryPage.title).toContainText('Products');
  });

  /**
   * Tests navigation to a product detail page and verifies all essential elements are present.
   * Ensures that product information and interactive elements are properly displayed.
   * @param {import('@playwright/test').Page} page - The Playwright page object
   */
  test('go to product page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    
    await inventoryPage.open();
    await inventoryPage.clickProduct();
    
    await expect(productPage.backToProductsButton).toBeVisible();
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.productDescription).toBeVisible();
    await expect(productPage.productPrice).toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.shoppingCartLink).toBeVisible();
  });

  /**
   * Verifies the add to cart functionality and cart navigation.
   * Tests the product addition to cart and confirms the UI updates accordingly.
   * @param {import('@playwright/test').Page} page - The Playwright page object
   */
  test('add to cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.open();
    await productPage.addToCart();
    await expect(productPage.removeButton).toBeVisible();
    await productPage.goToCart();
  });

  /**
   * Tests the cart page layout and functionality.
   * Verifies all essential cart elements are present and properly labeled.
   * @param {import('@playwright/test').Page} page - The Playwright page object
   */
  test('cart page', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.open();
    await expect(cartPage.title).toBeVisible();
    await expect(cartPage.title).toContainText('Your Cart');
    await expect(cartPage.cartList).toBeVisible();
    await expect(cartPage.quantityLabel).toBeVisible();
    await expect(cartPage.quantityLabel).toContainText('QTY');
    await expect(cartPage.descriptionLabel).toBeVisible();
    await expect(cartPage.descriptionLabel).toContainText('Description');
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();
  });

  /**
   * Tests the checkout process including form filling and verification of checkout steps.
   * Validates both the information input stage and the order overview stage.
   * @param {import('@playwright/test').Page} page - The Playwright page object
   */
  test('checkout page', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    await cartPage.open();
    await cartPage.proceedToCheckout();
    
    await expect(checkoutPage.title).toBeVisible();
    await expect(checkoutPage.title).toContainText('Checkout: Your Information');
    await expect(checkoutPage.checkoutInfo).toBeVisible();
    
    await checkoutPage.fillShippingInfo('Yan', 'Ush', '123456');
    await checkoutPage.continue();
    
    await expect(checkoutPage.title).toBeVisible();
    await expect(checkoutPage.title).toContainText('Checkout: Overview');
    await expect(checkoutPage.paymentInfoLabel).toBeVisible();
    await expect(checkoutPage.shippingInfoLabel).toBeVisible();
    await expect(checkoutPage.totalInfoLabel).toBeVisible();
    await expect(checkoutPage.cancelButton).toBeVisible();
    await expect(checkoutPage.finishButton).toBeVisible();
  });

  /**
   * Tests the order completion process and final confirmation.
   * Verifies the order completion page elements and successful navigation back to products.
   * @param {import('@playwright/test').Page} page - The Playwright page object
   */
  test('complete order', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const completePage = new CheckoutCompletePage(page);
    
    await page.goto('https://www.saucedemo.com/checkout-step-two.html');
    await checkoutPage.finish();
    
    await expect(completePage.title).toBeVisible();
    await expect(completePage.title).toContainText('Checkout: Complete!');
    await expect(completePage.ponyExpressImage).toBeVisible();
    await expect(completePage.completeHeader).toBeVisible();
    await expect(completePage.completeHeader).toContainText('Thank you for your order!');
    await expect(completePage.completeText).toBeVisible();
    await expect(completePage.completeText).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await expect(completePage.backToProductsButton).toBeVisible();
    await completePage.backToProducts();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
  });
});