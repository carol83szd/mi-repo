import { mergeTests } from "@playwright/test";
import { test as loginTest, expect } from "../fixtures/LoginPageFixture";
import { test as dashboardTest } from "../fixtures/DashboardFixture";
import { ApiClient } from "../utils/api/ApiClient";
import { endpoints } from "../utils/api/Endpoints";
import testData from "../utils/data/DataTest.json";

const test = mergeTests(loginTest, dashboardTest);
test.describe("Test e2e search keyword", () => {
  //let api: ApiClient;

  // test.beforeAll(async () => {
  // api = new ApiClient("http://localhost:8080/yourls-api.php");
  //await api.init();
  //});

  test("TC001: Search a keyword.", async ({ dashboardPage, loginPage }) => {
    await dashboardPage.goTo();
    await dashboardPage.fillSearchInput(
      "https://www.youtube.com/watch?v=Yxigd9dlsd8"
    );
    await dashboardPage.fillKeyword("video");
    await dashboardPage.clickCreateShortUrl();
  });
});
