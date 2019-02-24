

const express = require('express');

const scraper = require('./scraper');
const app = express();

app.set('view engine', 'pug');

app.get('/api/wm-search/:searchTerm?', async (req, res) => {

const getItems = (scraperProvider) => {
	return new Promise((resolve, reject) => {
	scraperProvider(req.query.searchTerm)
		.then(data => {
			resolve(data)
		})
		.catch(err => reject('Scrape failed'))
});
}

const wmItems = await getItems(scraper.scrapeWm);
const amItems =  await getItems(scraper.scrapeAmx);
const sorItems = await getItems(scraper.scrapeSor);
const chedItems = await getItems(scraper.scrapeSor);
const samaItems = await getItems(scraper.scrapeSama);

await Promise.all([wmItems, amItems, sorItems, chedItems, samaItems])
	.then(data => {
		res.send({ data: { itemsWm: data[0], itemsAm: data[1], itemsSor: data[2], itemsChed: data[3], itemsSama: data[4] } })
	})
	.catch(err => res.status(500).send(err))
});

app.listen(process.env.PORT || 3030);
