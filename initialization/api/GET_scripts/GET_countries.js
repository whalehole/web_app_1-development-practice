var unirest = require("unirest");

var req = unirest("GET", "https://restcountries-v1.p.rapidapi.com/all");

req.headers({
	"x-rapidapi-key": "223cb4a26bmsh4a65fdf78969780p179625jsnd3fbba954b66",
	"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
	"useQueryString": true
});

module.exports = new Promise((resolve, reject)=>{
	req.end(function (res) {
		if (res.error) throw new Error(res.error);
		resolve(res.body)
	});
})

