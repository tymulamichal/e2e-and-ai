import { faker } from '@faker-js/faker';

/**
 * Generates random user information for checkout
 * @returns Object containing first name, last name, and postal code
 */
export const generateUserInfo = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode()
});

/**
 * Generates random login credentials
 * @returns Object containing username and password
 */
export const generateLoginCredentials = () => ({
  username: 'standard_user', // keeping the standard user for sauce demo
  password: 'secret_sauce'  // keeping the standard password for sauce demo
});

/**
 * Generates random product data
 * @returns Object containing product details
 */
export const generateProductData = () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price()
}); 