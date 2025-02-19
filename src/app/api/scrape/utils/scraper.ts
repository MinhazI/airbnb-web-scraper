import iArticles from "@/app/interfaces/iArticles";
import { Browser } from "playwright";

const MAX_RETRIES = 3;

const validateArticle = (article: iArticles): boolean => {
  return (
    typeof article.title === "string" &&
    typeof article.image === "string" &&
    typeof article.link === "string" &&
    typeof article.date === "string"
  );
};

interface ScrapeOptions {
  browser: Browser;
  retryCount: number
}

export const scrapeListings = async ({ browser, retryCount }: ScrapeOptions): Promise<iArticles[]> => {
  try {
    const page = await browser.newPage();

    try {
      await page.goto("https://www.newswire.lk", { waitUntil: "domcontentloaded" });

      await page.waitForSelector("#frontpage-area_c_1 .posts-listunit", {
        timeout: 5000,
      });

      const listings = await page.$$eval(
        "#frontpage-area_c_1 .posts-listunit",
        (elements) => {
          return elements.slice(0, 20).map((element) => {
            const title =
              (element.querySelector(".posts-listunit-title") as HTMLElement)?.innerText ||
              "N/A";
            const image = (element.querySelector(".wp-post-image") as HTMLImageElement)?.src || "N/A";
            const link =
              (element.querySelector(".posts-listunit-title a") as HTMLAnchorElement)?.href || "N/A";
            const date = (element.querySelector(".entry-published.updated") as HTMLElement)?.title || "N/A";;

            return { title, image, link, date };
          });
        }
      );

      const validArticles = listings.filter(validateArticle);

      if (validArticles.length === 0) {
        throw new Error("No articles found");
      }

      return validArticles;
    } catch (pageError: unknown) {
      if (pageError instanceof Error) {
        if (retryCount < MAX_RETRIES) {
          console.log(`Retrying ... (${retryCount + 1}/${MAX_RETRIES})`);
          return await scrapeListings({ browser, retryCount: retryCount + 1 });
        } else {
          throw new Error(
            `Failed to scrape data after ${MAX_RETRIES} attempts: ${pageError.message}`
          );
        }
      }
    } finally {
      await page.close();
    }
  } catch (browserError: unknown) {
    if (browserError instanceof Error) {
      throw new Error(`Failed to launch browser: ${browserError.message}`);
    } else {
      throw new Error("Unknwon error occurred while launching the browser")
    }
  }

  return [];
};
