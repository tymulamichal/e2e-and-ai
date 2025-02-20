import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/sourcedemo/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('standard user login test', async ({ page }) => {
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
});

test('go to product page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-4-title-link"]').click();
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
});

test('add to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory-item.html?id=4');
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="remove"]')).toBeVisible();
  await page.locator('[data-test="shopping-cart-link"]').click();
});

test('cart page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/cart.html');
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await expect(page.locator('[data-test="cart-quantity-label"]')).toBeVisible();
  await expect(page.locator('[data-test="cart-quantity-label"]')).toContainText('QTY');
  await expect(page.locator('[data-test="cart-desc-label"]')).toBeVisible();
  await expect(page.locator('[data-test="cart-desc-label"]')).toContainText('Description');
  await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
});

test('checkout page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/cart.html');
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');
  await expect(page.locator('.checkout_info')).toBeVisible();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Yan');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Ush');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('123456');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
  await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('[data-test="finish"]')).toBeVisible();
}); 

test('complete order', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/checkout-step-two.html');
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');
  await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await expect(page.locator('[data-test="complete-text"]')).toBeVisible();
  await expect(page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  await page.locator('[data-test="back-to-products"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
});