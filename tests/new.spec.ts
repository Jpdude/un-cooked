//demo.spec.ts

import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  

  await page.goto('https://login.microsoftonline.com/eb1c9d1a-e6e8-4097-87fe-bb01690935b7/saml2?SAMLRequest=jZJbj9MwEIX%2FSuR3J07a3Ky2UtkKUWmBalt44AU59mRrKbaDx%2BHy73GTRew%2BsOLNGs83c87RbFCYYeT7KVztA3ybAEPy0wwW%2BfyxJZO33AnUyK0wgDxIft6%2Fv%2BdFyvjoXXDSDeQZ8johEMEH7SxJjoct%2Bbqqmer6qmIV60pZtivJ1hVTPbBWdGotqqapVdP0XUGSz%2BAxklsSB0UccYKjxSBsiCVWlDRntGguecmLgrPVF5IcohttRZipawgj8iwb3KO2qdHSO3R9cHbQFlLpTAZdLluVCwoVNHTN2po2dQ%2B061hetaxdlV2d3TxGMfs%2FRu6cxcmAP4P%2FriV8erj%2Fu8o4pwZIg59SKTIRM17wDMflQYXEdLyOLztJcnoK9o22StvH1zPtlibk7y6XEz19PF%2FIbnMbz%2BeM%2FO5%2F5BgIQokgbmo22XN6s1zIh7j3eDi5QctfyVvnjQj%2FlpWn%2BVzRivZzK58sjiB1r0HF8IbB%2FbjzIAJsSZQDJNstS19e4u43&RelayState=https%3A%2F%2Fmoodle.tru.ca%2Flogin%2Findex.php&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=Ghz2S1EJRI4pjFbIeFNZkWUp31SXg6ZKQ8KRtU7XE%2B8MoiaY9ADNgiSYAeiw71dGnSIE3erNPmIyI3AiZdDUtBEaKdloT4yptFeNV0E%2FFBKQ1NjoIEvFIOXDRGClY%2BM4aUhiElFsyIewaYmoleh5NtLuBlHW3rOnCtWafUf6nIUlqXKtZntSYOe0oWm68p9OtbyQoOlaayTs7dchYf4NFe3b%2FEeVNuM9vYxCEYPvc0JsUyGe6IGNhx9extWDX6V0mqSRiRE2bdIjefRsKRjJP4Wg%2FZd4SZfXObzyucl5wILzRduyVuUuplw%2BYsbZOAY9kEm2FVTtIUb1AOELmC2N7Q%3D%3D&sso_reload=true');

});

test.describe('Demo Test', () => {

    test('Verify Login Error Message', async ({ page , context }) => {

        await page.waitForSelector('text=Sign in',{state:'visible'});

        await page.locator('text=Sign in').first().click();

        await page.waitForSelector('#i0116')
        await page.locator('#i0116').type('t00749160@mytru.ca');

        await page.locator('text= Next').first().click();
        await page.waitForSelector('text=Enter Password',{state:'visible'});
        await page.locator('#i0118').type('example1@example.com');

        

        await page.locator('text= Sign in').first().click();

        // await page.locator('#user_submit').click();

        const errorMessage = await page.locator("//input[@id='user_password']/../div[@class='error-msg']").textContent();

        console.log("cool gng");


    });

});