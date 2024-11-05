import { Page } from 'playwright';

export async function setCookie(page: Page, name:string, value:string, domain:string) {
    await page.context().addCookies([{
        name,
        value,
        domain, 
        path: '/',
        httpOnly: true,
        secure: true,
    }]);
}