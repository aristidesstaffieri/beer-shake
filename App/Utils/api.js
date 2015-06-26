var key = require('../Creds/key');

var api = {
	getBeer(){
		var url = `http://api.brewerydb.com/v2/beer/random?key=${key}`;
		return fetch(url).then((res) => res.json());
	}
};

module.exports = api;