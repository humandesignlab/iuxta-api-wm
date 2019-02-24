
const puppeteer = require('puppeteer')


const scrapeWm = async (searchTerm) => {
	const searchPhrase = encodeURI(searchTerm);
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto(`https://super.walmart.com.mx/productos?Ntt=${searchPhrase}&No=0&Nrpp=60`, { waitUntil : 'networkidle0' });

	const scrapedData = await page.evaluate(() => {
		const titleObjects = [...document.querySelectorAll(`._2gokS300FwkmwCmngQmkQW a ._3RwjlfvJtz6NfVmm6CO363`)]
			.map(item => ({
				title: item.innerHTML
			}));

		const priceObjects = [...document.querySelectorAll(`._2gokS300FwkmwCmngQmkQW .wKmucxCRgoQZshD8qRUcV ._3URSxitsrGAcwITNRI6nvM`)]
			.map(item => ({
				price: item.innerHTML.replace(/[^0-9\.]+/g, "")
			}));

		const result = titleObjects.map((title, index) =>
			Object.assign({}, title, priceObjects[index] || {}));

		return result;
	});
	await browser.close();
	return scrapedData;
}

const scrapeAmx = async (searchTerm) => {
	
	const searchPhrase = searchTerm.replace(/\s+/g, '+');
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto(`https://www.amazon.com.mx/s?k=${searchPhrase}`, { waitUntil : 'networkidle0' });

	const scrapedData = await page.evaluate(() => {
		const titleObjects = [...document.querySelectorAll(`.s-result-list [data-index] .a-link-normal .a-size-base-plus.a-color-base.a-text-normal`)]
			.map(item => ({
				title: item.innerHTML
			}));

		const priceObjects = [...document.querySelectorAll(`.s-result-list [data-index] .sg-col-inner .a-offscreen`)]
			.map(item => ({
				price: item.innerHTML.replace(/[^0-9\.]+/g, "")
			}));

		const result = titleObjects.map((title, index) =>
			Object.assign({}, title, priceObjects[index] || {}));

		return result;
	});
	await browser.close();
	return scrapedData;
}

const scrapeSor = async (searchTerm) => {
	
	const searchPhrase = searchTerm.replace(/\s+/g, '+');
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto(`https://www.soriana.com/soriana/es/search/?text=${searchPhrase}`, { waitUntil : 'networkidle0' });

	const scrapedData = await page.evaluate(() => {
		const titleObjects = [...document.querySelectorAll(`.product-productNameCont .name`)]
			.map(item => ({
				title: item.innerHTML.replace(/^\s+/g, '')
			}));

		const priceObjects = [...document.querySelectorAll(`.priceContainer .price`)]
			.map(item => ({
				price: item.innerHTML.replace(/[^0-9\.]+/g, "")
			}));

		const result = titleObjects.map((title, index) =>
			Object.assign({}, title, priceObjects[index] || {}));

		return result;
	});
	await browser.close();
	return scrapedData;
}

const scrapeChed = async (searchTerm) => {
	const searchPhrase = encodeURI(searchTerm);
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto(`https://www.chedraui.com.mx/search?text=${searchPhrase}`, { waitUntil : 'networkidle0' });

	const scrapedData = await page.evaluate(() => {
		const titleObjects = [...document.querySelectorAll(`.product-item .plp-grid-word-break .name`)]
			.map(item => ({
				title: item.innerHTML
			}));

		const priceObjects = [...document.querySelectorAll(`.product-item .product__list--price-panel .product__listing--price`)]
			.map(item => ({
				price: item.innerHTML.replace(/[^0-9\.]+/g, "")
			}));

		const result = titleObjects.map((title, index) =>
			Object.assign({}, title, priceObjects[index] || {}));

		return result;
	});
	await browser.close();
	return scrapedData;
}

const scrapeSama = async (searchTerm) => {
	const searchPhrase = encodeURI(searchTerm);
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto(`https://www.superama.com.mx/buscar/${searchPhrase}`, { waitUntil : 'networkidle0' });

	const scrapedData = await page.evaluate(() => {
		const titleObjects = [...document.querySelectorAll(`#resultadoProductosBusqueda .isotope-item .itemGrid .upcName .nombreProductoDisplay`)]
			.map(item => ({
				title: item.innerHTML
			}));

		const priceObjects = [...document.querySelectorAll(`#resultadoProductosBusqueda .isotope-item .itemGrid .upcPrice`)]
			.map(item => ({
				price: item.innerHTML.replace(/[^0-9\.]+/g, "")
			}));

		const result = titleObjects.map((title, index) =>
			Object.assign({}, title, priceObjects[index] || {}));

		return result;
	});
	await browser.close();
	return scrapedData;
}


module.exports.scrapeWm = scrapeWm;
module.exports.scrapeAmx = scrapeAmx;
module.exports.scrapeSor = scrapeSor;
module.exports.scrapeChed = scrapeChed;
module.exports.scrapeSama =scrapeSama;
