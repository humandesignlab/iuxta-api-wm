const puppeteer = require('puppeteer');

const search = async (searchTerm, site) => {
	let searchPhrase = searchTerm;
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();

	site.unencodedURI ? searchPhrase = searchTerm.replace(/\s+/g, '+') : searchPhrase = encodeURI(searchTerm);
	try {
		await page.goto(`${site.url}${searchPhrase}`, { waitUntil : 'networkidle0' });
	} catch(err) {
		console.warn(err);
	}
	
	
	const scrapedData = await page.evaluate(site => {
		const titleObjects = [...document.querySelectorAll(site.titleClass)]
			.map(item => ({
				title: item.innerHTML.replace(/\n/g, "").trim()
			}));
		const priceObjects = [...document.querySelectorAll(site.priceClass)]
			.map(item => ({
				price: item.innerHTML.replace(/[^0-9\.]+/g, "")
			}));
		const detailUrlObjects = [...document.querySelectorAll(site.detailUrlClass)]
			.map(item => ({
				url: item.href
			}));
		const result = titleObjects.map((title, index) =>
			Object.assign({}, title, priceObjects[index], detailUrlObjects[index] || {}));	
		return result;
	},site);

	await browser.close();
	return scrapedData;
};
module.exports.search = search;

