import { launch, Browser, Page } from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as XLSX from 'xlsx';

function wait(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

interface ProductData {
	title: string | null;
	price: string | null;
	product_img: string | null;
}

export async function POST(req: NextRequest) {
	let browser: Browser | null = null;

	try {
		const body = await req.json();
		const { category }: { category: string } = body;

		browser = await launch({
			headless: false,
			defaultViewport: null,
		});

		const page: Page = await browser.newPage();
		await page.goto(
			`https://www.flipkart.com/search?q=${encodeURIComponent(
				category
			)}&otracker=search&otracker1=search&marketplace=GROCERY&as-show=on&as=off`,
			{
				waitUntil: 'networkidle2',
			}
		);

		await wait(20000);
		console.log('Waiting...');

		const productData: ProductData[] = [];

		async function fetchData(): Promise<void> {
			const fetchElements = await page.evaluate(productsDataEval);
			productData.push(...fetchElements);
		}

		let isNextBtnPresent = true;
		let currentPage = 1;

		while (currentPage < 5) {
			try {
				await fetchData();

				const nextBtn = (await page.$$('._9QVEpD')).pop();
				isNextBtnPresent = nextBtn
					? (await nextBtn.evaluate((node: any) => node.textContent)) === 'Next'
					: false;

				if (nextBtn && isNextBtnPresent) {
					await nextBtn.evaluate((node: any) => (node as HTMLElement).click());
					await wait(1000);
					currentPage++;
				} else {
					console.log('No Next Button found or scraping done');
					break;
				}
			} catch (err) {
				console.error('Error navigating to the next page:', err);
				break;
			}
		}

		console.log('Finished scraping');

		// Save the scraped data to Excel
		const savedPath = await saveDataToExcel(productData);
		console.log(`Excel file saved at: ${savedPath}`);

		return NextResponse.json(
			{ success: true, message: `File saved to ${savedPath}`, data: productData },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error in scraping:', error);
		return NextResponse.json(
			{ success: false, error: (error as Error).message },
			{ status: 500 }
		);
	} finally {
		if (browser) {
			console.log('Closing browser...');
			await browser.close();
		}
	}
}

// Function to save data to Excel in the Downloads folder
async function saveDataToExcel(data: ProductData[]): Promise<string> {
	try {
		// Create a new workbook and worksheet
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(data);

		// Append the worksheet to the workbook
		XLSX.utils.book_append_sheet(workbook, worksheet, 'ScrapedData');

		// Convert the workbook to a buffer
		const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

		// Define the Downloads path
		const downloadsPath = path.join(os.homedir(), 'Downloads', 'scraped_data.xlsx');

		// Save the file in the Downloads folder
		await fs.writeFile(downloadsPath, excelBuffer);

		console.log(`File saved to: ${downloadsPath}`);
		return downloadsPath;
	} catch (error) {
		console.error('Error saving Excel file:', error);
		throw error;
	}
}

// Puppeteer scraping logic
function productsDataEval(): ProductData[] {
	function sanitizeHTMLToData(node: HTMLElement): ProductData {
		const title = node.querySelector('.GK7Sfa')?.textContent || null;
		const price = node.querySelector('.Nx9bqj.GvWNMG')?.textContent || null;
		const product_img = node.querySelector('.DByuf4')?.getAttribute('src') || null;
		return { title, price, product_img };
	}

	function getProductDetails(node: HTMLElement): ProductData {
		return sanitizeHTMLToData(node);
	}

	const fetchElements = Array.from(document.getElementsByClassName('_07q2O3'), (node) =>
		getProductDetails(node as HTMLElement)
	);

	return fetchElements;
}
