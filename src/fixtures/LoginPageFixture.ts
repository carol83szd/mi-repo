import { test as base, expect } from "@playwright/test";
import { LogInPage } from "../pages/LogInPage";

export const test = base.extend<{ loginPage: LogInPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LogInPage(page);
    await use(loginPage);
  },
});

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goTo();
  await loginPage.fillUsernameInput("username");
  await loginPage.fillPasswordInput("password");
  await loginPage.clickLoginButton();
});

export { expect };
