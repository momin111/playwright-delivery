import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const filePath = "https://fe-delivery.tallinn-learning.ee/signin";
  await page.goto(filePath);
})
test('Check for error message for login input', async ({ page }) => {
  const usernameField = page.getByTestId("username-input")
  const passwordField = page.getByTestId("password-input")
  const signInButton =  page.getByTestId("signIn-button")
  const errorPopUpMessage = page.getByTestId("authorizationError-popup")
  const closeButton = page.getByTestId("authorizationError-popup-close-button")

  await usernameField.fill("incorrectUsername")
  await passwordField.fill("incorrectPassword")
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

  await usernameField.fill("t")
  await expect(emptyErrorMessageForShortUsername).toBeVisible()
  await usernameField.fill("")
  await expect(emptyErrorMessageForUsername).toBeVisible()
  await passwordField.fill("pass")
  await expect(emptyErrorMessageForShortPassword).toBeVisible()
  await passwordField.fill("")
  await expect(emptyErrorMessageForPassword).toBeVisible()
});
