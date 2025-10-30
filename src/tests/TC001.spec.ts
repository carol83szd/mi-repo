import { mergeTests } from "@playwright/test";
import { expect } from "../fixtures/LogInPageFixture";
import { test as loggedInTest } from "../fixtures/LoggedInPageFixture";
import { test as dashboardPage } from "../fixtures/DashboardFixture";
import data from "../utils/data/DataTest.json";
import { ApiClient } from "../utils/api/ApiClient";
import { config } from "../utils/config/config";
import { EndPoints } from "../utils/api/endpoints";

const test = mergeTests(loggedInTest, dashboardPage);

test.describe("YOURLS add shorturls", () => {
  let api: any;
  test.beforeAll(async () => {
    api = new ApiClient("http://localhost:8080");
    await api.init();
  });
  for (const urls of data) {
    test(`Short ure for ${urls.title} was created`, async ({
      dashboardPage,
      page,
    }) => {
      await dashboardPage.goTo();
      await dashboardPage.fillURL(urls.url);
      await dashboardPage.fillKeyword(urls.keyword);
      await dashboardPage.clickCreateShortUrl();
      const params = {
        signature: "caed1384a5",
        action: "expand",
        shorturl: urls.keyword,
        format: "json",
      };
      const response = await api.get(EndPoints.yourls.basic, params);
      const responseData = await response.json();
      expect(response.status(), "Status code").toBe(200);
    });
  }
});
