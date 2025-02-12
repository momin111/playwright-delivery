1. Check for error message for login input
2. Check for error message for password input
3. Check for incorrect credentials message and close popup message

usernameField = data-name "username-input"
passwordField = data-name "password-input"
signInButton =  data-name "signIn-button"
errorPopUpMessage = data-name "authorizationError-popup"
closeButton = data-name "authorizationError-popup-close-button"

Install the Faker.js library
by running: npm install @faker-js/faker

Run tests
npx playwright test
