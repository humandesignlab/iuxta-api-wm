require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();

const mongoose = require('mongoose');
const List = require('./models/List');
const bodyParser = require('body-parser');

const search = require('./search');
const storeSearchParams = require('./store-search-params');

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('iuxta-3 search api');
});

app.get('/api/item-search/:searchTerm?', (req, res) => {
  const wmArticles = [... storeSearchParams.map( (item, index) => {
		return new Promise((resolve, reject) => {
			search
				.search(req.query.searchTerm, item)
				.then(data => {
					data.map(store => {
						store.name = item.name; 
						return data
					});
					resolve(data);
				})
				.catch(err => reject(`${item.name} scrape failed: ${err}`))
		});
	})];

  Promise.all(wmArticles)
    .then(data => {
      res.send(data[0].concat(data[1], data[2], data[3], data[4]));
    })
    .catch(err => res.status(500).send(err));
});

app.post('/api/post-list', (req, res) => {
  var newList = new List(req.body);
  newList.save((err, doc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

app.get('/api/get-list:usrId?', (req, res) => {
	List.find({ userId: req.query.usrId}, (err, doc) => {
		if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
	});
});

app.post('/api/update-list', (req, res) => {
	List.findOneAndReplace({ _id: req.query.listId}, {$set: {listArray: req.body[0], date: req.query.timeStamp}}, (err, doc) => {
		if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
	});
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log("Listening on ", port));