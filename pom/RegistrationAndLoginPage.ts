import { Page } from 'playwright';
import { expect } from '@playwright/test';

export class RegistrationAndLoginPage {
    constructor(private page: Page) {}

    private createAccountButton = '.links.other-actions a:has(strong:has-text("Create Account"))'; 
    private firstNameInput = 'input[name="firstName"]';
    private lastNameInput = 'input[name="lastName"]';
    private emailInput = 'input[name="email"]';
    private passwordInput = 'input[name="password"]';
    private emailLoginInput = 'input[type="email"]';
    private passwordLoginInput = 'input[type="password"]';
    private createAccount = 'button[type="submit"]';
    private registrationForm = 'form[name="signUpForm"]'; 
    private loginForm = 'form[name="loginForm"]';
    private backButton = 'app-activation-button#back-button';
    private signOut = '.sign-out-container';
    private heading = '.activation-header';
    private signIn = 'button > div > span:has-text("Sign In")';

    async goTo() {
        await this.page.goto('https://my-stage.tractive.com/');
    }

    // Accept cookie consent
    async acceptCookieConsent() {
        const cookieConsentDialog = this.page.locator('section.tractive-cookie-consent-popup'); 
        const acceptAllButton = cookieConsentDialog.locator('button.js-cookie-consent-accept'); 
        await acceptAllButton.click();  
    }

    // Click on create account and check if registration form is visible
    async clickCreateAccount() {
        await this.page.click(this.createAccountButton);
        await expect(this.page.locator(this.registrationForm)).toBeVisible();
    }

    // Fill and Submit registration form with ecpected conditions
    
    async fillAndSubmitRegistrationForm(firstName: string, lastName: string, email: string, password: string) {
   
        await this.page.fill(this.firstNameInput, firstName);
        await expect(firstName).not.toBe('');
        await this.page.fill(this.lastNameInput, lastName);
        await expect(lastName).not.toBe('');
        await this.page.fill(this.emailInput, email);
        await expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        await this.page.fill(this.passwordInput, password);
        await expect(password).not.toBe('');
        await expect(password.length).toBeGreaterThanOrEqual(8);
        await this.page.click(this.createAccount);
    }
    // Open profile page
    async openProfilePage(){
        await expect(this.page.locator(this.heading)).toHaveText('Enter Tracker ID');
        await this.page.click(this.backButton);
    }

    // sign out from profile
    async signOutfromProfile(){
        await this.page.click(this.signOut);
        const signOutConfirm = this.page.locator('button > div > span:has-text("Sign Out")');

        if (await signOutConfirm.isVisible()) {
            await signOutConfirm.click();
        }

    }
    // check if login form visible
    async checkLoginFormVisible() {
        await expect(this.page.locator(this.loginForm)).toBeVisible();
    }
    
    // Login with previous register data with expected conditions

    async loginWithRegisterData(email:string, password:string){
        const myProfilePageUrl = "https://my-stage.tractive.com/#/settings/";
        await this.page.fill(this.emailLoginInput, email);
        await expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        await this.page.fill(this.passwordLoginInput, password);
        await expect(password).not.toBe('');
        await expect(password.length).toBeGreaterThanOrEqual(8);
        await this.page.click(this.signIn);
        await expect(this.page).toHaveURL(myProfilePageUrl);
    }
        
}