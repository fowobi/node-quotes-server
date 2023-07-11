const express = require("express");
const lodash = require("lodash");
const app = express();
const quotes = require("./quotes.json");
const cors = require("cors");
const port = 45479;


app.use(cors());

app.get("/", function (request, response) {
  response.send(
    "Neill's Quote Server! Ask me for /quotes/random, /quotes, or /quotes/search?term={your search term}"
  );
});

app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.get("/quotes/random", function (request, response) {
//   const randomQuote = pickFromArray(quotes);
    const randomQuote = lodash.sample(quotes); 
  response.json(randomQuote);
});

app.get("/quotes/search", function (request, response) {
  const searchTerm = request.query.term;
  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  response.json(filteredQuotes);
});

function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
