import { Page } from "@playwright/test";
import { LogInLocators } from "../locators/LoginLocators";

export class LogInPage {
  constructor(public page: Page) {}

  async goTo() {
    await this.page.goto("/admin");
  }

  async fillUsernameInput(username: string) {
    await this.page.locator(LogInLocators.usernameinput).fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.page.locator(LogInLocators.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(LogInLocators.loginButton).click();
  }
}
