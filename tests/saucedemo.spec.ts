import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/sourcedemo/LoginPage';
import { InventoryPage } from '../pages/sourcedemo/InventoryPage';
import { ProductPage } from '../pages/sourcedemo/ProductPage';
import { CartPage } from '../pages/sourcedemo/CartPage';
import { CheckoutPage } from '../pages/sourcedemo/CheckoutPage';
import { CheckoutCompletePage } from '../pages/sourcedemo/CheckoutCompletePage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('standard user login test', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(inventoryPage.inventoryList).toBeVisible();
  await expect(inventoryPage.title).toContainText('Products');
});

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

test('add to cart', async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.open();
  await productPage.addToCart();
  await expect(productPage.removeButton).toBeVisible();
  await productPage.goToCart();
});

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