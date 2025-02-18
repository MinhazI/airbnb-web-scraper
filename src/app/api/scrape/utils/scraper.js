const MAX_RETRIES = 3;

const validateArticle = (article) => {
  return (
    typeof article.title === "string" &&
    typeof article.image === "string" &&
    typeof article.link === "string"
  );
};

export const scrapeListings = async ({ browser, retryCount }) => {
  try {
    const page = await browser.newPage();

    try {
      await page.goto("https://www.newswire.lk", { waitUntil: "load" });

      await page.waitForSelector(".posts-list-widget.posts-list-style1", {
        timeout: 10000,
      });

      const listings = await page.$$eval(
        ".posts-list-widget.posts-list-style1",
        (elements) => {
          console.log(elements);
          return elements.slice(0, 10).map((element) => {
            const title =
              element.querySelector(".posts-listunit-title")?.innerText ||
              "N/A";
            const image = element.querySelector(".wp-post-image")?.src || "N/A";
            const link =
              element.querySelector(".posts-listunit-title a")?.href || "N/A";

            return { title, image, link };
          });
        }
      );

      const validArticles = listings.filter(validateArticle);

      if (validArticles.length === 0) {
        throw new Error("No articles found");
      }

      return validArticles;
    } catch (pageError) {
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying ... (${retryCount + 1}/${MAX_RETRIES})`);
        return await scrapeListings(retryCount + 1);
      } else {
        throw new Error(
          `Failed to scrape data after ${MAX_RETRIES} attempts: ${pageError.message}`
        );
      }
    } finally {
      await page.close();
    }
  } catch (browserError) {
    throw new Error(`Failed to launch browser: ${browserError.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
