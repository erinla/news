var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.npr.org/", function (err, res, body) {
        var $ = cheerio.load(body);

        var articles = [];

        $("h3.title").each(function (i, element) {

            var head = $(element).text();
            var url = $(element).parent("a").attr("href");
            console.log(head)
            console.log(url)

            if (head && url) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = url.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    sum: sumNeat
                };
                articles.push(dataToAdd);

            }
            console.log(dataToAdd);
        });
        cb(articles);
    });
};
module.exports = scrape;

