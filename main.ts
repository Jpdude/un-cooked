import {chromium} from "playwright"
(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://login.microsoftonline.com/eb1c9d1a-e6e8-4097-87fe-bb01690935b7/saml2?SAMLRequest=jZLLbtswEEV%2FReCekijHMUXYBtwYRQ2krRG7XXRTUOQoJsCHyqH6%2BPvSUoomiwbdEcM5M%2FdezBqls4PYjeniH%2BDbCJiKn856FNPHhozRiyDRoPDSAYqkxGn3%2Fl40ZS2GGFJQwZJnyOuERISYTPCkOOw35Gu3YJq3ulW8XTYgW%2BBcdY1S7Ab0sqkbteA145rpnhSfIWImNyQPyjjiCAePSfqUS3WzpKymDT%2BzlVg0gvEvpNhnN8bLNFGXlAYUVWXDo%2FGlMyoGDH0K3hoPpQqugo6pVjNJ4RY4vanbFeWrHmjX1ey2rdvFsltVV48NKXZ%2FjNwFj6ODeIL43Sj49HD%2Fd5ULQVsoUxxLJSuZM57xCof5QaXCcrgMLztJcXwK9o3x2vjH1zPt5iYU787nIz1%2BPJ3Jdn0dL6aM4vZ%2F5DhIUsskr2rW1XN6PV%2FIh7z3sD8Ga9Sv4m2ITqZ%2Fy2IlmypG035qFaPHAZTpDegcnrXhx10EmWBDshwg1XZe%2BvISt78B&RelayState=https%3A%2F%2Fmoodle.tru.ca%2Fmy%2F&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=tfCAk3ipBzKKeWOqwAGYZ2Ugjvt1p2Ob0PjW5sQRkaBwmQDMjuLk1G54cyxECMqyK7s8VM9390JDZAm6dFd6jgXwOwsr2Oty1VyJ%2BzQDCOOzC4fXswwVJGEC7%2B%2BF%2FgWxzFaDEDEQg1pU0Xbanmsv4n2DwCwK2vM3Lr%2FdWr0b1tDO5t%2FEsw37g1QJLMEGuDhWXb2VtQOJ6Y9xIw7CNBP8tC%2F3SC2IR%2B88ThqxTSIC5KUHxkC%2FyMPMZyzaZh3UPj5AebAm396v8BResJNfoHqXQvIX1eMnw3toeuL9bYInuGTLG72Pvgk1O9aH1yNTOO6CrrtPfXk9VYBrhzkFziRa1w%3D%3D&sso_reload=true');
  await page.getByRole('textbox', { name: 'someone@example.com' }).click();
  await page.getByRole('textbox', { name: 'someone@example.com' }).fill('t00749160@mytru.ca');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // ---------------------
  await context.close();
  await browser.close();
})();