
import { test } from '@playwright/test';
import { RegistrationAndLoginPage } from '../pom/RegistrationAndLoginPage';
import { setCookie } from '../utils/cookieHelper';
import { generateRandomEmail } from '../utils/generateValidRandomEmail';
import { generateRandomPwd } from '../utils/generateValidRandomPwd';

test.describe('User Registration and Login scenario', () => {
    let registrationAndLoginPage: RegistrationAndLoginPage;

    test.beforeEach(async ({ page }) => {
        registrationAndLoginPage = new RegistrationAndLoginPage(page);
        await registrationAndLoginPage.goTo();
    });

    test('Create new account, sign out and Login with new account data', async ({ page }) => {

       // define cookie name, value and domain
        const cookieName = "interview";
        const cookieValue = "7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl";
        const cookieDomain = ".tractive.com";       
       // set cookies for access to https://my-stage.tractive.com 
        await setCookie(page, cookieName, cookieValue, cookieDomain);
       // refresh page after setup of cookies
        await page.reload(); 
      // accept cookies
        await registrationAndLoginPage.acceptCookieConsent();

      // define mockup data for registration
        const firstName = 'John';
        const lastName = 'Doe';
        const email = await generateRandomEmail();
        const password = await generateRandomPwd();  
      // create new account
        await registrationAndLoginPage.clickCreateAccount();
        await registrationAndLoginPage.fillAndSubmitRegistrationForm(firstName, lastName, email, password);
      // open profile page and sign out
        await registrationAndLoginPage.openProfilePage();
        await registrationAndLoginPage.signOutfromProfile();
      // Check if login form is visible and login with register data
        await registrationAndLoginPage.checkLoginFormVisible();
        await registrationAndLoginPage.loginWithRegisterData(email, password);

    });
});