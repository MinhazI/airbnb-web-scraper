import { NextResponse } from "next/server";
import { chromium } from "playwright";
import { scrapeListings } from "./utils/scraper";

export async function GET() {
    let browser;

    try {
        browser = await chromium.launch();
        const listings = await scrapeListings({ browser, retryCount: 3 });
        return NextResponse.json(listings);
    } catch (error) {
        const errorMessage = "An unknown error occured while scraping";
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    } finally {
        browser?.close();
    }
}