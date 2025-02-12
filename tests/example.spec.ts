import { test, expect } from '@playwright/test';
import {faker} from "@faker-js/faker/locale/ar";

const baseURL = process.env.APP_URL

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
})
test('Check for error message for login input', async ({ page }) => {
  const usernameField = page.getByTestId("username-input")
  const passwordField = page.getByTestId("password-input")
  const signInButton =  page.getByTestId("signIn-button")
  const errorPopUpMessage = page.getByTestId("authorizationError-popup")
  const closeButton = page.getByTestId("authorizationError-popup-close-button")
  const usernameFromFaker = faker.internet.username()
  const passwordFromFaker = faker.internet.password()
  await usernameField.fill(usernameFromFaker)
  await passwordField.fill(passwordFromFaker)
  await signInButton.click()
  await expect(errorPopUpMessage).toBeVisible()
  await  closeButton.click()
  await expect(signInButton).toBeEnabled()
});
test.only('Check for error message for password input', async ({ page }) => {
  const usernameField = page.getByTestId("username-input")
  const passwordField = page.getByTestId("password-input")
  const emptyErrorMessageForUsername = page.getByTestId('username-input-error').first()
  const emptyErrorMessageForPassword = page.getByTestId('username-input-error').nth(1)

  const emptyErrorMessageForShortUsername = page.getByText('The field must contain at least of characters: 2')
  const emptyErrorMessageForShortPassword = page.getByText('The field must contain at least of characters: 8')

  const shortUsernameFromFaker = faker.internet.username().slice(0, 1);
  await usernameField.fill(shortUsernameFromFaker)
  await expect(emptyErrorMessageForShortUsername).toBeVisible()
  await usernameField.fill("")
  await expect(emptyErrorMessageForUsername).toBeVisible()
  const shortPasswordFromFaker = faker.internet.password('3')
  await passwordField.fill(shortPasswordFromFaker)
  await expect(emptyErrorMessageForShortPassword).toBeVisible()
  await passwordField.fill("")
  await expect(emptyErrorMessageForPassword).toBeVisible()
});
